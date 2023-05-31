import CarModel from '../models/car.js';
import mongoose from 'mongoose'
import fs from'fs';
import slugify from 'slugify';



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


const getAllCars = async (req, res) => {
  try {
    const cars = await CarModel.find();
    if (!cars || cars.length === 0) {
      return res.status(400).json({ success: false, message: "Araba bulunamadı" });
    }
    return res.status(200).json({ success: true, cars });

  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

const addCar = async (req,res)=>{
  try {

    const { name, series_id } = req.body;
    const files = req.files;

    if (!mongoose.Types.ObjectId.isValid(series_id)) {
      return res.status(400).json({ success: false, message: "Hatalı işlem" });
    }
    if (files) {
      const image_url = files.map((file) => file.path.replace("public/", ""));
      const newCar = await CarModel.create({ name:name,series_id:series_id, image_urls: image_url });
      return res.status(201).json({ success: true, message: "Araba basariyla eklendi", newCar });
    }


    const newCar = await CarModel.create({ name:name,series_id:series_id });
    return res.status(201).json({ success: true, message: "Resimsiz araba basariyla eklendi.", newCar });

  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
}

const updateCar = async (req, res) => {
  try {
    const { body, files } = req;
    const car = await CarModel.find({ slug: req.params.id });

    if (!car || car.length === 0) {
      return res.status(400).json({ success: false, message: "Araba bulunamadi" });
    }

    const nameSlug = slugify(req.body.name, { lower: true, remove: /[*+~.()'"!:@]/g });
    const slug = nameSlug.replace(/\s+/g, "-");

    body.slug = slug;


    const image_url = files.map((file) => file.path.replace("public/", ""));
    const updatedCar = await CarModel.findByIdAndUpdate(car[0]._id, { ...body, image_urls: image_url }, { new: true });

    return res.status(200).json({ success: true, message: "Araba basariyla guncellendi", updatedCar});
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
  addCar,
  updateCar,
  deleteCar
};
