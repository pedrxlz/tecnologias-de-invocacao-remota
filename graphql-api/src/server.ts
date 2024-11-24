import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import bodyParser from "body-parser";
import { typeDefs, resolvers } from "./schema";

const app = express();
const PORT = 4000;

// Inicializar o Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

(async () => {
  await server.start();

  app.use("/graphql", cors(), bodyParser.json(), expressMiddleware(server));

  app.listen(PORT, () => {
    console.log(`GraphQL API rodando em http://localhost:${PORT}/graphql`);
  });
})();
