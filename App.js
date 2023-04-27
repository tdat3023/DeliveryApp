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
