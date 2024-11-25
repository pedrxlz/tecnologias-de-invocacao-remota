import * as soap from "soap";
import express from "express";
import { join } from "path";
import { readFileSync } from "fs";

const app = express();

const dataPath = join(__dirname, "../data.json");
const rawData = readFileSync(dataPath, "utf-8");

const data = JSON.parse(rawData);

export const users = data.users.map(
  (user: { id: number; name: string; age: number }) => ({
    id: user.id.toString(),
    name: user.name,
    age: user.age,
  })
);

export const songs = data.songs.map(
  (song: { id: number; name: string; artist: string }) => ({
    id: song.id.toString(),
    name: song.name,
    artist: song.artist,
  })
);

export const playlists = data.playlists.map(
  (playlist: { id: number; name: string; songs: string[] }) => ({
    id: playlist.id.toString(),
    name: playlist.name,
    songs: playlist.songs,
  })
);

const service = {
  StreamingService: {
    StreamingPort: {
      GetAllUsers: (args: any, callback: any) => {
        callback(null, { users });
      },
      GetAllSongs: (args: any, callback: any) => {
        callback(null, { songs });
      },
      GetAllPlaylists: (args: any, callback: any) => {
        callback(null, { playlists });
      },
    },
  },
};

const wsdlPath = join(__dirname, "streamingService.wsdl");
const wsdl = readFileSync(wsdlPath, "utf-8");

const server = app.listen(8000, () => {
  console.log("SOAP server listening on port 8000");
});

soap.listen(server, "/", service, wsdl);
