import BrandModel from '../models/brand.js';
import slugify from 'slugify';

const getAllBrands = async (req, res) => {
  try {
    const brands = await BrandModel.find();
    if (!brands || brands.length === 0) {
      return res.status(400).json({ success: false, message: "Marka bulunamadı" });
    }
    return res.status(200).json({ success: true, brands });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

const getBrand = async (req, res) => {
  try {
    const brand = await BrandModel.findOne({ slug: req.params.id });
    if (!brand) {
      return res.status(400).json({ success: false, message: "Marka bulunamadı" });
    }
    return res.status(200).json({ success: true, brand });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

const addBrand = async (req, res) => {
  try {
    const { body } = req;

    const newBrand = await BrandModel.create({ ...body });
    return res.status(201).json({ success: true, message: "Marka başarıyla eklendi", newBrand });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

const updateBrand = async (req, res) => {
    try {
      const { body } = req;
      const brand = await BrandModel.find({ slug: req.params.id });
      if (!brand || brand.length === 0) {
        return res.status(400).json({ success: false, message: "Marka bulunamadı" });
      }
  
      // Dize olduğunu doğrulayın
      if (typeof req.body.name !== "string") {
        return res.status(400).json({ success: false, message: "Marka adı hatalı" });
      }
  
      const nameSlug = slugify(req.body.name, { lower: true, remove: /[*+~.()'"!:@]/g });
      const slug = nameSlug.replace(/\s+/g, "-");
  
      body.slug = slug;
  
      const updatedBrand = await BrandModel.findByIdAndUpdate(brand[0]._id, { ...body }, { new: true });
  
      return res.status(200).json({ success: true, message: "Marka başarıyla güncellendi", updatedBrand });
    } catch (err) {
      return res.status(400).json({ success: false, message: err.message });
    }
  };
  

const deleteBrand = async (req, res) => {
  try {
    const brand = await BrandModel.find({ slug: req.params.id });
    if (!brand || brand.length === 0) {
      return res.status(400).json({ success: false, message: "Marka bulunamadı" });
    }

    await BrandModel.findByIdAndDelete(brand[0]._id);

    return res.status(200).json({ success: true, message: "Marka başarıyla silindi" });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};

export {
  addBrand,
  getBrand,
  updateBrand,
  deleteBrand,
  getAllBrands
};
