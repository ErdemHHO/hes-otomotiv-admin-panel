import CarModel from '../models/car.js';
import SeriModel from '../models/seri.js';
import mongoose from 'mongoose'
import fs from'fs';
import slugify from 'slugify';
import s3 from '../s3.js';

const bucketName = "hes-otomotiv";



const deleteImages = (imageUrls) => {
  imageUrls.forEach((imageUrl) => {
    const filename = imageUrl.split('/').pop();
    const params = {
      Bucket: bucketName,
      Key: filename,
    };
    s3.deleteObject(params, (error) => {
      if (error) {
        console.log(`Resim silinirken hata oluştu: ${error}`);
      }
    });
  });
};



const getAllCars = async (req, res) => {
  try {
    const cars = await CarModel.find();
    if (!cars || cars.length === 0) {
      return res.status(400).json({ success: false, message: "Araba bulunamadı" });
    }

    const carsWithImages = await Promise.all(
      cars.map(async (car) => {
        if (car.image_urls && car.image_urls.length > 0) {
          const validImageUrls = car.image_urls.filter((imageUrl) => imageUrl.trim() !== '');
          const imageUrls = await Promise.all(
            validImageUrls.map(async (imageUrl) => {
              const filename = imageUrl.split('/').pop();
              const params = {
                Bucket: bucketName,
                Key: filename,
              };
              const signedUrl = await s3.getSignedUrlPromise('getObject', params);
              return signedUrl;
            })
          );
          return { ...car._doc, image_urls: imageUrls };
        }
        return car;
      })
    );

    return res.status(200).json({ success: true, cars: carsWithImages });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

const getCar = async (req, res) => {
  try {
    const car = await CarModel.findOne({ slug: req.params.id });
    if (!car) {
      return res.status(400).json({ success: false, message: "Araba bulunamadı" });
    }

    // Eğer araba resim URL'leri varsa, S3 URL'leriyle değiştir
    if (car.image_urls && car.image_urls.length > 0) {
      const imageUrls = await Promise.all(
        car.image_urls.map(async (imageUrl) => {
          const filename = imageUrl.split('/').pop();
          const params = {
            Bucket: bucketName,
            Key: filename,
          };
          const signedUrl = await s3.getSignedUrlPromise('getObject', params);
          return signedUrl;
        })
      );
      car.image_urls = imageUrls;
    }

    return res.status(200).json({ success: true, car });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

const addCar = async (req, res) => {
  try {
    const { name, series_id } = req.body;
    const files = req.files;

    if (!mongoose.Types.ObjectId.isValid(series_id)) {
      return res.status(400).json({ success: false, message: "Hatalı işlem" });
    }

    let imageUrls = [];
    if (files) {
      for (const file of files) {
        const fileContent = fs.readFileSync(file.path);
        const params = {
          Bucket: bucketName,
          Key: file.filename,
          Body: fileContent,
        };

        await s3.upload(params).promise();

        const imageUrl = `https://${bucketName}.s3.amazonaws.com/${file.filename}`;
        imageUrls.push(imageUrl);
      }
    }

    const newCar = await CarModel.create({ name: name, series_id: series_id, image_urls: imageUrls });

    return res.status(201).json({ success: true, message: "Araba başarıyla eklendi", newCar });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

const updateCar = async (req, res) => {
  try {
    const { body, files } = req;
    const car = await CarModel.find({ slug: req.params.id });

    if (!car || car.length === 0) {
      return res.status(400).json({ success: false, message: "Araba bulunamadı" });
    }

    const nameSlug = slugify(req.body.name, { lower: true, remove: /[*+~.()'"!:@]/g });
    const slug = nameSlug.replace(/\s+/g, "-");

    body.slug = slug;

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
    

    const newImageUrls = [];

    for (const file of files) {
      const fileContent = fs.readFileSync(file.path);
      const params = {
        Bucket: bucketName,
        Key: file.filename,
        Body: fileContent,
      };

      await s3.upload(params).promise();

      const imageUrl = `https://${bucketName}.s3.amazonaws.com/${file.filename}`;
      newImageUrls.push(imageUrl);
    }

    const updatedCar = await CarModel.findByIdAndUpdate(
      car[0]._id,
      { ...body, image_urls: [...oldImages, ...newImageUrls] },
      { new: true }
    );

    return res.status(200).json({ success: true, message: "Araba başarıyla güncellendi", updatedCar });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};





const deleteCar = async (req, res) => {
  try {
    const car = await CarModel.find({ slug: req.params.id });
    if (!car || car.length === 0) {
      return res.status(400).json({ success: false, message: "Araba bulunamadi" });
    }

    const imageUrls = car[0].image_urls;

    await deleteImages(imageUrls);

    await CarModel.findByIdAndDelete(car[0]._id);

    return res.status(200).json({ success: true, message: "Araba basariyla silindi" });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};

export {
  getAllCars,
  getCar,
  addCar,
  updateCar,
  deleteCar
};
