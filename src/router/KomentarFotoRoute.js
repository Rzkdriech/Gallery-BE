import express from "express";

import { getComments, createComment } from "../controllers/KomentarFoto.js";

const router = express.Router();

router.get("/comments", getComments);
router.post("/comment", createComment);

export default router;
