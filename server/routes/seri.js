import express from 'express';
import multer from 'multer';

import { getAllSeries,addSeri } from '../controllers/seri.js';
import {upload} from '../middlewares/multer.js';

const router = express.Router();

router.get("/", getAllSeries);
router.post("/",upload.array("images"),addSeri);

export default router;
