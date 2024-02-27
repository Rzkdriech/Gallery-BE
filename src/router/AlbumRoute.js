import express from "express";
import { getAlbum, createAlbum, updateAlbum } from "../controllers/Album.js";



const router = express.Router();

router.get("/albums",getAlbum);
router.post("/album", createAlbum);
router.patch("/album/:id/:id", updateAlbum);

export default router;
