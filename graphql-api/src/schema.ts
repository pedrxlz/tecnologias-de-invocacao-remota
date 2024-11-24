import { gql } from "graphql-tag";
import data from "../data.json";

export const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    age: Int!
    playlists: [Playlist]!
  }

  type Playlist {
    id: ID!
    name: String!
    songs: [Song]!
  }

  type Song {
    id: ID!
    name: String!
    artist: String!
  }

  type Query {
    users: [User]!
    playlists: [Playlist]!
    songs: [Song]!
    userPlaylists(userId: ID!): [Playlist]!
    playlistSongs(playlistId: ID!): [Song]!
    playlistsContainingSong(songId: ID!): [Playlist]!
  }
`;

export const resolvers = {
  Query: {
    users: () => data.users,
    playlists: () => data.playlists,
    songs: () => data.songs,
    userPlaylists: (_: unknown, { userId }: { userId: string }) => {
      const user = data.users.find((user) => user.id == parseInt(userId));
      return user
        ? data.playlists.filter((p) => user.playlists.includes(p.id))
        : [];
    },
    playlistSongs: (_: unknown, { playlistId }: { playlistId: string }) => {
      const playlist = data.playlists.find((p) => p.id == parseInt(playlistId));
      return playlist
        ? data.songs.filter((s) => playlist.songs.includes(s.id))
        : [];
    },
    playlistsContainingSong: (_: unknown, { songId }: { songId: string }) => {
      return data.playlists.filter((p) => p.songs.includes(parseInt(songId)));
    },
  },
  User: {
    playlists: (user: { playlists: number[] }) =>
      data.playlists.filter((p) => user.playlists.includes(p.id)),
  },
  Playlist: {
    songs: (playlist: { songs: number[] }) =>
      data.songs.filter((s) => playlist.songs.includes(s.id)),
  },
};
