import express from 'express';

import { getAllSeries,getSeri,addSeri,updateSeri,deleteSeri } from '../controllers/seri.js';
import {upload} from '../middlewares/multer.js';

const router = express.Router();

router.get("/", getAllSeries);
router.get("/:id", getSeri);
router.post("/",upload.array("images"),addSeri);
router.patch("/:id",upload.array("images"),updateSeri);
router.delete("/:id", deleteSeri);

export default router;
