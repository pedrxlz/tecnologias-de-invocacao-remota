import { Request, Response } from "express";
import { playlists, Playlist } from "../models/playlist";
import { users } from "../models/user";
import { songs } from "../models/song";

export const getAllPlaylists = (req: Request, res: Response) => {
  res.json(playlists);
};

export const createPlaylist = (req: Request, res: Response) => {
  const { id, name, userId, songIds } = req.body;

  if (!id || !name || !userId || !songIds) {
    res
      .status(400)
      .json({ message: "Campos obrigatórios: id, name, userId, songIds" });
    return;
  }

  // Valida se o usuário existe
  const userExists = users.some((user) => user.id === userId);
  if (!userExists) {
    res.status(404).json({ message: "Usuário não encontrado" });
    return;
  }

  // Valida se as músicas existem
  const invalidSongs = songIds.filter(
    (songId: string) => !songs.some((song) => song.id === songId)
  );
  if (invalidSongs.length > 0) {
    res
      .status(404)
      .json({ message: `Músicas não encontradas: ${invalidSongs.join(", ")}` });
    return;
  }

  const newPlaylist: Playlist = { id, name, userId, songs: songIds };
  playlists.push(newPlaylist);
  res.status(201).json(newPlaylist);
};
