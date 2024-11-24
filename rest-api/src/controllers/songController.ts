import { Request, Response } from "express";
import { songs, Song } from "../models/song";

export const getAllSongs = (req: Request, res: Response) => {
  res.json(songs);
};

export const createSong = (req: Request, res: Response) => {
  const { id, name, artist } = req.body;

  if (!id || !name || !artist) {
    res.status(400).json({ message: "Campos obrigatórios: id, name, artist" });
    return;
  }

  const newSong: Song = { id, name, artist };
  songs.push(newSong);
  res.status(201).json(newSong);
};
