export interface Playlist {
  id: string;
  name: string;
  userId: string;
  songs: string[];
}

export const playlists: Playlist[] = [
  {
    id: "1",
    name: "Playlist 1",
    userId: "1",
    songs: ["1", "2"],
  },
  {
    id: "2",
    name: "Playlist 2",
    userId: "2",
    songs: ["3"],
  },
  {
    id: "3",
    name: "Playlist 3",
    userId: "3",
    songs: ["1", "3"],
  },
];
