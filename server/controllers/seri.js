import SeriModel from '../models/seri.js';
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


const getAllSeries = async (req, res) => {
  try {
    const series = await SeriModel.find();
    if (!series || series.length === 0) {
      return res.status(400).json({ success: false, message: "Seri bulunamadı" });
    }
    return res.status(200).json({ success: true, series });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};


const addSeri = async (req, res) => {
    try {
      const { body, files } = req;
  
      if (files) {
        const image_url = files.map((file) => file.path.replace("public/", ""));
        const newSeri = await SeriModel.create({ ...body, image_urls: image_url });
        return res.status(201).json({ success: true, message: "Seri basariyla eklendi", newSeri });
      }
  
      const newSeri = await SeriModel.create({ ...body });
      return res.status(201).json({ success: true, message: "Resimsiz Seri basariyla eklendi.", newSeri });
    } catch (error) {
      return res.status(400).json({ success: false, message: error.message });
    }
  };

  const updateSeri = async (req, res) => {
    try {
      const { body, files } = req;
      const seri = await SeriModel.find({ slug: req.params.id });
  
      if (!seri || seri.length === 0) {
        return res.status(400).json({ success: false, message: "Seri bulunamadi" });
      }
  
      const nameSlug = slugify(req.body.name, { lower: true, remove: /[*+~.()'"!:@]/g });
      const slug = nameSlug.replace(/\s+/g, "-");
  
      body.slug = slug;


      const image_url = files.map((file) => file.path.replace("public/", ""));
      const updatedSeri = await SeriModel.findByIdAndUpdate(seri[0]._id, { ...body, image_urls: image_url }, { new: true });
  
      return res.status(200).json({ success: true, message: "Seri basariyla guncellendi", updatedSeri});
    } catch (err) {
      return res.status(400).json({ success: false, message: err.message });
    }
  };
  
  const deleteSeri = async (req, res) => {
    try {
      const seri = await SeriModel.find({ slug: req.params.id });
      if (!seri || seri.length === 0) {
        return res.status(400).json({ success: false, message: "Seri bulunamadi" });
      }
  


      const imageUrls = seri[0].image_urls;
      
      await deleteImages(imageUrls);

      await SeriModel.findByIdAndDelete(seri[0]._id);
  
      return res.status(200).json({ success: true, message: "Araba basariyla silindi" });
    } catch (err) {
      return res.status(400).json({ success: false, message: err.message });
    }
  };

export {
  getAllSeries,
  addSeri,
  updateSeri,
  deleteSeri
};
