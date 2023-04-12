import { StyleSheet } from "react-native";
import RootComponent from "./src/index";
import { socket } from "./src/socket";
import { useEffect } from "react";

export default function App() {
  useEffect(() => {
    socket.on("connect", () => {
      console.log("New!");
    });
  }, []);

  return <RootComponent />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
