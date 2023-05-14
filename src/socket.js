import { io } from "socket.io-client";
import { baseURL } from "./api/axiosClient";

// const URL =
//   process.env.NODE_ENV === "production"
//     ? undefined
//     : `http://${process.env.SERVER_HOST}:${process.env.PORT}`;

export const socket = io(baseURL, {
  autoConnect: true,
});
