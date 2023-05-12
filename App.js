import RootComponent from "./src/index";
import { socket } from "./src/socket";
import { useEffect } from "react";

export default function App() {
  useEffect(() => {
    console.log("nè");
    socket.on("connect", () => {
      console.log("New!");
    });
  }, []);
  return <RootComponent />;
}
