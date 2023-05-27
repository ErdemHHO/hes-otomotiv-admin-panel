import CategoryModel from '../models/category.js';

const getAllCategories = async (req, res) => {
  try {
    const categories = await CategoryModel.find();
    if (!categories || categories.length === 0) {
      return res.status(400).json({ success: false, message: "Kategori bulunamadı" });
    }
    res.status(200).json({ success: true, categories });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};


const addCategory = async (req, res) => {
    try {
      const { body } = req;
  
      const newCategory = await CategoryModel.create({ ...body });
      res.status(201).json({ success: true, message: "Kategori basariyla eklendi.", newCategory });
    } catch (err) {
      return res.status(400).json({ success: false, message: err.message });
    }
};

export {
  getAllCategories,
  addCategory
};
