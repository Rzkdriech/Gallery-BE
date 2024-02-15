import express from "express"
import { getLikes } from "../controllers/LikeFoto.js";

const router = express.Router()

router.get("/likes", getLikes)

export default router;
