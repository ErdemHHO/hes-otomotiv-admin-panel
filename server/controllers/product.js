import ProductModel from '../models/product.js';
import fs from'fs';
import s3 from '../s3.js';

const bucketName = "hes-otomotiv";


const deleteImages = async (imageUrls) => {
  try {
    for (const imageUrl of imageUrls) {
      const filename = imageUrl.split('/').pop();
      const params = {
        Bucket: bucketName,
        Key: filename,
      };
      await s3.deleteObject(params).promise();
    }
  } catch (error) {
    console.log(`Resim silinirken hata oluştu: ${error}`);
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await ProductModel.find();
    if (!products || products.length === 0) {
      return res.status(400).json({ success: false, message: "Ürün bulunamadı" });
    }

    const productsWithImages = await Promise.all(
      products.map(async (product) => {
        if (product.image_urls && product.image_urls.length > 0) {
          const imageUrls = await Promise.all(
            product.image_urls.map(async (imageUrl) => {
              const filename = imageUrl.split('/').pop();
              const params = {
                Bucket: bucketName,
                Key: filename,
              };
              const signedUrl = await s3.getSignedUrlPromise('getObject', params);
              return signedUrl;
            })
          );
          return { ...product._doc, image_urls: imageUrls };
        }
        return product;
      })
    );

    return res.status(200).json({ success: true, products: productsWithImages });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

const getProduct = async (req, res) => {
  try {
    const product = await ProductModel.findOne({ slug: req.params.id });
    if (!product) {
      return res.status(400).json({ success: false, message: "Ürün bulunamadı" });
    }

    const productWithImages = { ...product._doc };

    if (productWithImages.image_urls && productWithImages.image_urls.length > 0) {
      const imageUrls = await Promise.all(
        productWithImages.image_urls.map(async (imageUrl) => {
          const filename = imageUrl.split('/').pop();
          const params = {
            Bucket: bucketName,
            Key: filename,
          };
          const signedUrl = await s3.getSignedUrlPromise('getObject', params);
          return signedUrl;
        })
      );
      productWithImages.image_urls = imageUrls;
    }

    return res.status(200).json({ success: true, product: productWithImages });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};


  
  const addProduct = async (req, res) => {
    try {
      const { body, files } = req;
      const stockCode = req.body.stockCode;
  
      const stockCodeControl = await ProductModel.findOne({ stockCode });
      if (stockCodeControl) return res.status(400).json({ success: false, message: "Bu stok kodunda başka bir ürün var" });
  
      if (parseInt(body.sellingPrice) >= parseInt(body.old_price)) return res.status(400).json({ success: false, message: "İndirimsiz fiyat indirimli fiyattan düşük olamaz" });
  
      if (files) {
        const image_urls = [];
  
        for (const file of files) {
          const params = {
            Bucket: bucketName,
            Key: file.filename,
            Body: fs.createReadStream(file.path),
          };
  
          await s3.upload(params).promise();
  
          const imageUrl = `https://${bucketName}.s3.amazonaws.com/${file.filename}`;
          image_urls.push(imageUrl);
  
          fs.unlinkSync(file.path);
        }
  
        const newProduct = await ProductModel.create({ ...body, image_urls });
        return res.status(201).json({ success: true, message: "Ürün başarıyla eklendi", newProduct });
      }
  
      const newProduct = await ProductModel.create({ ...body });
      return res.status(201).json({ success: true, message: "Resimsiz ürün başarıyla eklendi", newProduct });
    } catch (error) {
      return res.status(400).json({ success: false, message: error.message });
    }
  };
  

  const updateProduct = async (req, res) => {
    try {
      const { body, files } = req;
      const product = await ProductModel.find({ slug: req.params.id });
  
      if (!product || product.length === 0) {
        return res.status(400).json({ success: false, message: "Ürün bulunamadı" });
      }


    let oldImages = [];
    if (req.body.old_images) {
      
      if (Array.isArray(req.body.old_images)) {
        oldImages = req.body.old_images.map(url => {
          const decodedURL = decodeURIComponent(url);
          const validURL = decodedURL.split("?")[0];
          return validURL;
        });
      } else {
        const decodedURL = decodeURIComponent(req.body.old_images);
        const validURL = decodedURL.split("?")[0];
        oldImages.push(validURL);
      }
    }
  
      let image_urls = product[0].image_urls;
  
      if (files) {
        for (const file of files) {
          const params = {
            Bucket: bucketName,
            Key: file.filename,
            Body: fs.createReadStream(file.path),
          };
  
          await s3.upload(params).promise();
  
          const imageUrl = `https://${bucketName}.s3.amazonaws.com/${file.filename}`;
          image_urls.push(imageUrl);
  
          fs.unlinkSync(file.path);
        }
      }
  
      const updatedProduct = await ProductModel.findByIdAndUpdate(
        product[0]._id,
        { ...body, image_urls },
        { new: true }
      );
  
      return res.status(200).json({ success: true, message: "Ürün başarıyla güncellendi", updatedProduct });
    } catch (error) {
      return res.status(400).json({ success: false, message: error.message });
    }
  };
  


  const deleteProduct = async (req, res) => {
    try {
      const product = await ProductModel.find({ slug: req.params.id });
      if (product.length === 0) {
        return res.status(400).json({ success: false, message: "Ürün bulunamadı" });
      }
  
      const imageUrls = product[0].image_urls;
  
      await deleteImages(imageUrls);
  
      await ProductModel.findByIdAndDelete(product[0]._id);
      return res.status(200).json({ success: true, message: "Ürün başarıyla silindi" });
    } catch (error) {
      return res.status(400).json({ success: false, message: error.message });
    }
  };


  const searchProduct = async (req, res) => {
    try {
      const { q } = req.query;
  
      const products = await ProductModel.find({
        $or: [{ name: { $regex: q, $options: "i" } }, { title: { $regex: q, $options: "i" } }, { stockCode: { $regex: q, $options: "i" } }],
      });
  
      if (!products || products.length === 0) {
        return res.status(400).json({ success: false, message: "Ürün bulunamadı" });
      }
  
      const productsWithImages = await Promise.all(
        products.map(async (product) => {
          if (product.image_urls && product.image_urls.length > 0) {
            const imageUrls = await Promise.all(
              product.image_urls.map(async (imageUrl) => {
                const filename = imageUrl.split('/').pop();
                const params = {
                  Bucket: bucketName,
                  Key: filename,
                };
                const signedUrl = await s3.getSignedUrlPromise('getObject', params);
                return signedUrl;
              })
            );
            return { ...product._doc, image_urls: imageUrls };
          }
          return product;
        })
      );
  
      return res.status(200).json({ success: true, products: productsWithImages });
    } catch (error) {
      return res.status(400).json({ success: false, message: error.message });
    }
  };
  


const totalProductNumber = async (req, res) => {
  try {
      const products = await ProductModel.find();
      if (!products || products.length === 0) {
      return res.status(400).json({ success: false, message: "Ürün bulunamadı" });
      }
      // stok sayısı ile costPrice çarpılıp toplanıyor
      const totalCostPrice = products.reduce((acc, product) => acc + product.stock * product.costPrice, 0);
      // stok sayısı ile price çarpılıp toplanıyor
      const totalSalesPrice = products.reduce((acc, product) => acc + product.stock * product.sellingPrice, 0);
      // toplam ürün sayısı
      const totalProducts = products.reduce((acc, product) => acc + product.stock, 0);
      //toplam ürün çeşidi ? kaç kayıt var
      const totalProductTypes = products.length;
      //aktif ürün sayısı
      const totalActiveProducts = products.filter((product) => product.isActive).length;
      //pasif ürün sayısı
      const totalPassiveProducts = products.filter((product) => !product.isActive).length;

      res.status(200).json({
      success: true,
      totalCostPrice,
      totalSalesPrice,
      totalProducts,
      totalProductTypes,
      totalActiveProducts,
      totalPassiveProducts,
      });
  } catch (error) {
      res.status(400).json({ success: false, message: error.message });
  }
};
  

const bulkPriceUpdate = async (req, res) => {
  try {
    const { percentage } = req.body;

    // Geçerli oran kontrolü yapın
    if (percentage <= 0 || percentage >= 2) {
      return res.status(400).json({ success: false, message: "Güncelleme oranı 0 ile 2 arasında olmalıdır." });
    }

    // Tüm ürünleri getir
    const products = await ProductModel.find();

    // Her bir ürün için fiyatı güncelle
    for (let i = 0; i < products.length; i++) {
      const product = products[i];

      // Mevcut fiyatları al
      const currentSellingPrice = product.sellingPrice;
      const currentOldPrice = product.oldPrice;
      const currentCostPrice = product.costPrice;

      // Yeni fiyatları hesapla
      const newSellingPrice = Math.round(currentSellingPrice * percentage);
      const newOldPrice = Math.round(currentOldPrice * percentage);
      const newCostPrice = Math.round(currentCostPrice * percentage);

      // Fiyatları güncelle
      product.sellingPrice = newSellingPrice;
      product.oldPrice = newOldPrice;
      product.costPrice = newCostPrice;

      // Ürünü kaydet
      await ProductModel.findByIdAndUpdate(product._id, product, { new: true });
    }

    return res.status(200).json({ success: true, message: 'Fiyatlar başarıyla güncellendi.' });
  } catch (error) {
    console.error('Fiyat güncelleme hatası:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
};



export {
  getAllProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
  searchProduct,
  totalProductNumber,
  bulkPriceUpdate
  };
  