import express from 'express';
import { getAllCars,addCar,updateCar,deleteCar } from '../controllers/car.js';
import {upload} from '../middlewares/multer.js';

const router = express.Router();


router.get("/", getAllCars);
router.post("/",upload.array("images"),addCar);
router.patch("/:id",upload.array("images"),updateCar);
router.delete("/:id", deleteCar);

export default router;
