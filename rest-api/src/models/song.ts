import { readFileSync } from "fs";
import { join } from "path";

export interface Song {
  id: string;
  name: string;
  artist: string;
}

const dataPath = join(__dirname, "../../data.json");
const rawData = readFileSync(dataPath, "utf-8");
const data = JSON.parse(rawData);

export const songs: Song[] = data.songs.map(
  (song: { id: number; name: string; artist: string }) => ({
    id: song.id.toString(),
    name: song.name,
    artist: song.artist,
  })
);
