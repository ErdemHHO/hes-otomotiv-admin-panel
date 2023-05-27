import CarModel from '../models/car.js';

const getAllCars = async (req, res) => {
  try {
    const cars = await CarModel.find();
    if (!cars || cars.length === 0) {
      return res.status(400).json({ success: false, message: "Araba bulunamadı" });
    }
    res.status(200).json({ success: true, cars });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};

export {
  getAllCars
};
