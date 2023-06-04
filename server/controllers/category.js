import CategoryModel from '../models/category.js';
import slugify from 'slugify';


const getAllCategories = async (req, res) => {
  try {
    const categories = await CategoryModel.find();
    if (!categories || categories.length === 0) {
      return res.status(400).json({ success: false, message: "Kategori bulunamadı" });
    }
    return res.status(200).json({ success: true, categories });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

const getCategory = async (req, res) => {
  try {
    const category = await CategoryModel.findOne({ slug: req.params.id });
    if (!category) {
      return res.status(400).json({ success: false, message: "Kategori bulunamadı" });
    }
    return res.status(200).json({ success: true, category }); // category: category
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};


const addCategory = async (req, res) => {
    try {
      const { body } = req;
  
      const newCategory = await CategoryModel.create({ ...body });
      return res.status(201).json({ success: true, message: "Kategori basariyla eklendi.", newCategory });
    } catch (error) {
      return res.status(400).json({ success: false, message: error.message });
    }
};

const updateCategory = async (req, res) => {
  try {
    const { body } = req;
    const category = await CategoryModel.find({ slug: req.params.id });
    if (!category || category.length === 0) {
      return res.status(400).json({ success: false, message: "Kategori bulunamadi" });
    }

    const nameSlug = slugify(req.body.name, { lower: true, remove: /[*+~.()'"!:@]/g });
    const slug = nameSlug.replace(/\s+/g, "-");

    body.slug = slug;

    const updatedCategory = await CategoryModel.findByIdAndUpdate(category[0]._id, { ...body }, { new: true });

    return res.status(200).json({ success: true, message: "Kategori basariyla guncellendi", updatedCategory });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const category = await CategoryModel.find({ slug: req.params.id });
    if (!category || category.length === 0) {
      return res.status(400).json({ success: false, message: "Kategori bulunamadi" });
    }

    await CategoryModel.findByIdAndDelete(category[0]._id);

    return res.status(200).json({ success: true, message: "Kategori basariyla silindi" });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};



export {
  addCategory,
  getCategory,
  updateCategory,
  deleteCategory,
  getAllCategories
};
