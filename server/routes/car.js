import express from 'express';
import { getAllCars,getCar,addCar,updateCar,deleteCar } from '../controllers/car.js';
import {upload} from '../middlewares/multer.js';
import {auth} from '../middlewares/auth.js';

const router = express.Router();


router.get("/",auth, getAllCars);
router.get("/:id",auth, getCar);
router.post("/",auth,upload.array("images"),addCar);
router.patch("/:id",auth,upload.array("images"),updateCar);
router.delete("/:id",auth, deleteCar);

export default router;
