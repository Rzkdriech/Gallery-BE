import express from "express";


import { createPhoto, getPhotos } from "../controllers/Foto.js";

const router = express.Router();

router.get("/photos", getPhotos);
router.post("/photo", createPhoto);

export default router;
