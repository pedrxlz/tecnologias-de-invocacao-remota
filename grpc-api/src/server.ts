import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import path from "path";
import data from "../data.json";

const PROTO_PATH = path.resolve(__dirname, "../proto/service.proto");

const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const proto = grpc.loadPackageDefinition(packageDefinition) as any;

const musicService = {
  GetUsers: (_: any, callback: any) => {
    callback(null, { users: data.users });
  },
  GetPlaylists: (_: any, callback: any) => {
    callback(null, { playlists: data.playlists });
  },
  GetSongs: (_: any, callback: any) => {
    callback(null, { songs: data.songs });
  },
  GetUserPlaylists: (call: any, callback: any) => {
    const userId = call.request.userId;
    const user = data.users.find((u) => u.id === userId);
    const playlists = user
      ? data.playlists.filter((p) => user.playlists.includes(p.id))
      : [];
    callback(null, { playlists });
  },
  GetPlaylistSongs: (call: any, callback: any) => {
    const playlistId = call.request.playlistId;
    const playlist = data.playlists.find((p) => p.id === playlistId);
    const songs = playlist
      ? data.songs.filter((s) => playlist.songs.includes(s.id))
      : [];
    callback(null, { songs });
  },
  GetPlaylistsContainingSong: (call: any, callback: any) => {
    const songId = call.request.songId;
    const playlists = data.playlists.filter((p) => p.songs.includes(songId));
    callback(null, { playlists });
  },
};

const server = new grpc.Server();
server.addService(proto.MusicService.service, musicService);
server.bindAsync(
  "0.0.0.0:50051",
  grpc.ServerCredentials.createInsecure(),
  () => {
    console.log("Servidor gRPC rodando em 0.0.0.0:50051");
  }
);
