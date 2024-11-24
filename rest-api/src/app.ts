import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import userRoutes from "./routes/userRoutes";
import songRoutes from "./routes/songRoutes";
import playlistRoutes from "./routes/playlistRoutes";

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/users", userRoutes);
app.use("/songs", songRoutes);
app.use("/playlists", playlistRoutes);

export default app;
