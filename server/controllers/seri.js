import SeriModel from '../models/seri.js';

const getAllSeries = async (req, res) => {
  try {
    const series = await SeriModel.find();
    if (!series || series.length === 0) {
      return res.status(400).json({ success: false, message: "Seri bulunamadı" });
    }
    res.status(200).json({ success: true, series });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
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
      res.status(201).json({ success: true, message: "Resimsiz Seri basariyla eklendi.", newSeri });
    } catch (err) {
      return res.status(400).json({ success: false, message: err.message });
    }
  };

export {
  getAllSeries,
  addSeri
};
