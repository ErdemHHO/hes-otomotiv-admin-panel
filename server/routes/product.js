import express from 'express';
import { getAllProducts,getProduct,searchProduct,addProduct,updateProduct,deleteProduct } from '../controllers/product.js';
import {upload} from '../middlewares/multer.js';

const router = express.Router();


router.get("/", getAllProducts);
router.get("/:id", getProduct);
router.get("/search/search",searchProduct);

router.post("/",upload.array("images"),addProduct);

router.patch("/:id",upload.array("images"), updateProduct);

router.delete("/:id", deleteProduct);

export default router;
