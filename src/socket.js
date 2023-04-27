import { io } from "socket.io-client";

const URL =
  process.env.NODE_ENV === "production"
    ? undefined
    : `http://${process.env.SERVER_HOST}:${process.env.PORT}`;

export const socket = io("http://192.168.1.163:4940", {
  autoConnect: true,
});
