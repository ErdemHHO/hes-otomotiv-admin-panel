import express from 'express';
import { getAllBrands, getBrand, addBrand, updateBrand, deleteBrand } from '../controllers/brand.js';

const router = express.Router();
import {auth} from '../middlewares/auth.js';

router.get("/",auth, getAllBrands);
router.get("/:id",auth, getBrand);
router.post("/",auth, addBrand);
router.patch("/:id",auth, updateBrand);
router.delete("/:id",auth, deleteBrand);

export default router;
