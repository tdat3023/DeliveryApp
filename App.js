import { StyleSheet } from "react-native";
import { useEffect } from "react";
import RootComponent from "./src/index";
import { socket } from "./src/socket";

export default function App() {
  useEffect(() => {
    console.log("nè");
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
