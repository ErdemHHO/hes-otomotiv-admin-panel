import express from 'express';

import { getAllSeries,getSeri,addSeri,updateSeri,deleteSeri } from '../controllers/seri.js';
import {upload} from '../middlewares/multer.js';
import {auth} from '../middlewares/auth.js';

const router = express.Router();

router.get("/",auth, getAllSeries);
router.get("/:id",auth, getSeri);
router.post("/",auth,upload.array("images"),addSeri);
router.patch("/:id",auth,upload.array("images"),updateSeri);
router.delete("/:id",auth, deleteSeri);

export default router;
