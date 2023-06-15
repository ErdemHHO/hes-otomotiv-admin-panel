import express from 'express';

import { getAllAdmins,getAdmin,signin,signup,deleteAdmin,updateAdmin } from '../controllers/admin.js';
import {auth} from '../middlewares/auth.js';

const router = express.Router();


router.get("/",auth, getAllAdmins);

router.get("/:id",auth,getAdmin);

router.post("/signin", signin);

router.post("/signup",auth, signup);

router.delete("/:id",auth, deleteAdmin);

router.patch("/:id",auth, updateAdmin);


export default router;
