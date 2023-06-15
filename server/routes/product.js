import express from 'express';
import { getAllProducts,getProduct,searchProduct,addProduct,updateProduct,deleteProduct,totalProductNumber } from '../controllers/product.js';
import {upload} from '../middlewares/multer.js';
import {auth} from '../middlewares/auth.js';

const router = express.Router();


router.get("/",auth, getAllProducts);
router.get("/:id",auth, getProduct);
router.get("/total/total",auth, totalProductNumber)
router.get("/search/search",auth,searchProduct);

router.post("/",auth,upload.array("images"),addProduct);

router.patch("/:id",auth,upload.array("images"), updateProduct);

router.delete("/:id",auth, deleteProduct);

export default router;
