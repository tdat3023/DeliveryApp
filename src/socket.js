import { io } from "socket.io-client";

const URL =
  process.env.NODE_ENV === "production"
    ? undefined
    : `http://${process.env.SERVER_HOST}:${process.env.PORT}`;

export const socket = io(URL, {
  autoConnect: true,
});
