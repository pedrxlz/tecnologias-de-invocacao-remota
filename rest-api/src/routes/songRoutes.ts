import { Router } from "express";
import { getAllSongs, createSong } from "../controllers/songController";

const router = Router();

router.get("/", getAllSongs);
router.post("/", createSong);

export default router;
