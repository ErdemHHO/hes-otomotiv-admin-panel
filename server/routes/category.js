import express from 'express';
import { getAllCategories,getCategory,addCategory,updateCategory,deleteCategory } from '../controllers/category.js';
import {auth} from '../middlewares/auth.js';

const router = express.Router();

router.get("/",auth, getAllCategories);
router.get("/:id",auth, getCategory);
router.post("/",auth, addCategory);
router.patch("/:id",auth,updateCategory);
router.delete("/:id",auth, deleteCategory);


export default router;
