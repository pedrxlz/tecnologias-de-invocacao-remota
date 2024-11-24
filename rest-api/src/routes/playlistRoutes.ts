import { Router } from "express";
import {
  getAllPlaylists,
  createPlaylist,
} from "../controllers/playlistController";

const router = Router();

router.get("/", getAllPlaylists);
router.post("/", createPlaylist);

export default router;
