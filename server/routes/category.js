import express from 'express';
import { getAllCategories,getCategory,addCategory,updateCategory,deleteCategory } from '../controllers/category.js';

const router = express.Router();

router.get("/", getAllCategories);
router.get("/:id", getCategory);
router.post("/", addCategory);
router.patch("/:id",updateCategory);
router.delete("/:id", deleteCategory);


export default router;
