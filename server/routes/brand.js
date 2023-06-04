import express from 'express';
import { getAllBrands, getBrand, addBrand, updateBrand, deleteBrand } from '../controllers/brand.js';

const router = express.Router();

router.get("/", getAllBrands);
router.get("/:id", getBrand);
router.post("/", addBrand);
router.patch("/:id", updateBrand);
router.delete("/:id", deleteBrand);

export default router;
