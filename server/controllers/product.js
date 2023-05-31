import ProductModel from '../models/product.js';
import fs from'fs';


const deleteImages = (imageUrls) => {
  imageUrls.forEach((imageUrl) => {
    const imagePath = `public/${imageUrl}`;
    fs.unlink(imagePath, (error) => {
      if (error) {
        console.log(`Resim silinirken hata oluştu: ${error}`);
      }
    });
  });
};

const getAllProducts = async (req, res) => {
    try {
      const products = await ProductModel.find();
      if (!products || products.length === 0) {
        return res.status(400).json({ success: false, message: "Ürün bulunamadı" });
      }
      return res.status(200).json({ success: true, products });
    } catch (error) {
      return res.status(400).json({ success: false, message: error.message });
    }
  };

  const getProduct = async (req, res) => {
    try {
      const product = await ProductModel.find({ slug: req.params.id });
      if (!product || product.length === 0) return res.status(400).json({ success: false, message: "Urun bulunamadı" });
  
      res.status(200).json({ success: true, product });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  };
  
  
  const addProduct = async (req, res) => {
    try {
      const { body, files } = req;

      const stockCode=req.body.stockCode;

      const stockCodeControl = await ProductModel.findOne({ stockCode });
      if (stockCodeControl) return res.status(400).json({ success: false, message: "Bu stok kodunda başka bir ürün var" });

      if (parseInt(body.sellingPrice) >= parseInt(body.old_price)) return res.status(400).json({ success: false, message: "İndirimsiz fiyat indirimli fiyattan düşük olamaz" });
      if (files) {
        const image_url = files.map((file) => file.path.replace("public/", ""));
        const newProduct = await ProductModel.create({ ...body, image_urls: image_url });
        return res.status(201).json({ success: true, message: "Urün basariyla eklendi", newProduct });
      }
      const newProduct = await ProductModel.create({ ...body });
      return res.status(201).json({ success: true, message: "Resimsiz ürün basariyla eklendi", newProduct });
    } catch (error) {
      return res.status(400).json({ success: false, message: error.message });
    }
  };

  const updateProduct = async (req, res) => {
    try {
      const product = await ProductModel.find({ slug: req.params.id });
      if (!product || product.length === 0) {
        return res.status(400).json({ success: false, message: "Urun bulunamadi" });
      }
      const updatedProduct = await ProductModel.findByIdAndUpdate(product[0]._id, req.body, { new: true });
      return res.status(200).json({ success: true, message: "Urun basariyla güncellendi", updatedProduct });
    } catch (error) {
      return res.status(400).json({ success: false, message: error.message });
    }
  };


const deleteProduct = async (req, res) => {
  try {
    const product = await ProductModel.find({ slug: req.params.id });
    if (product.length === 0) {
      return res.status(400).json({ success: false, message: "Urun bulunamadi" });
    }

    const imageUrls = product[0].image_urls;
    
    await deleteImages(imageUrls);

    await ProductModel.findByIdAndDelete(product[0]._id);
    return res.status(200).json({ success: true, message: "Urun basariyla silindi" });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};


const searchProduct = async (req, res) => {
  try {
    console.log(  "çalıştı");
    const { q } = req.query;
    console.log(  "q:",q);
    const products = await ProductModel.find({
      $or: [{ name: { $regex: q, $options: "i" } }, { title: { $regex: q, $options: "i" } }, { stockCode: { $regex: q, $options: "i" } }],
    });
    console.log(  "products:",products);
    if (!products || products.length === 0) return res.status(400).json({ success: false, message: "Urun bulunamadi" });
    return res.status(200).json({ success: true, products });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};



export {
  getAllProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
  searchProduct,
  };
  