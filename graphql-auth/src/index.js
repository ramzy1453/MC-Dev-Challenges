import express from "express";
import cors from "cors";
import morgan from "morgan";
import { connectDB, runServer } from "./config/db.js";
import { createHandler } from "graphql-http/lib/use/express";
import resolvers from "./schema/resolvers.js";
import { typeDefs } from "./schema/typeDefs.js";

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Graphql server
app.all(
  "/graphql",
  createHandler({
    rootValue: resolvers,
    schema: typeDefs,
    context: (req) => {
      return {
        authHeaders: req.headers.authorization,
      };
    },
  })
);

// Run server and connect to database
runServer(app);
connectDB();
