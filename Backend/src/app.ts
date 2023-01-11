import dal from "./2-utils/dal";
import ws from "ws";
import http from "http";
import express from "express";
import { Request } from "express";
import cors from "cors";
import catchAll from "./3-middleware/catch-all";
import controller from "./6-controllers/controller";
import config from "./2-utils/config";
dal.connect();

const server = express();

server.use(express.static("public"));
server.use(express.json({ limit: "10mb", extended: true } as any));
server.use(
  express.urlencoded({ limit: "10mb", extended: true, parameterLimit: 50000 })
);
server.use(cors());
server.use(express.json());
server.use("/api", controller);
server.use(catchAll);

server.listen(config.port, () => {
  console.log("Listening on http://localhost:" + config.port);
});

const socketServer = http.createServer();

export const webSocketServer = new ws.Server({ server: socketServer });

webSocketServer.on("connection", (d) => {
  console.log("Connection received");
});
socketServer.listen(config.socketPort);
export type AuthenticatedRequest = Request & {
  userId: {
    _id: string;
  };
};
