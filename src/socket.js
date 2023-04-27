import { io } from "socket.io-client";

const URL =
  process.env.NODE_ENV === "production"
    ? undefined
    : `http://${process.env.SERVER_HOST}:${process.env.PORT}`;

export const socket = io("http://192.168.1.22:4940", {
  autoConnect: true,
});
