import express from 'express';

import { getAllAdmins,getAdmin,signin,signup,deleteAdmin,updateAdmin } from '../controllers/admin.js';

const router = express.Router();


router.get("/", getAllAdmins);

router.get("/:id",getAdmin);

router.post("/signin", signin);

router.post("/signup", signup);

router.delete("/:id", deleteAdmin);

router.patch("/:id", updateAdmin);


export default router;