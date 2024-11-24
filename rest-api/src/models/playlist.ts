import { readFileSync } from "fs";
import { join } from "path";

export interface Playlist {
  id: string;
  name: string;
  userId: string;
  songs: string[];
}

const dataPath = join(__dirname, "../../data.json");
const rawData = readFileSync(dataPath, "utf-8");
const data = JSON.parse(rawData);

const userIdMap = new Map<number, string>();
data.users.forEach((user: { id: number }) => {
  userIdMap.set(user.id, user.id.toString());
});

export const playlists: Playlist[] = data.playlists.map(
  (playlist: { id: number; name: string; songs: number[] }) => ({
    id: playlist.id.toString(),
    name: playlist.name,
    userId: userIdMap.get(playlist.id) || "",
    songs: playlist.songs.map((songId) => songId.toString()),
  })
);
