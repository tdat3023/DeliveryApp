import { useEffect } from "react";
import RootComponent from "./src/index";

import { socket } from "./src/socket";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import GlobalContextProvider from "./src/redux/GlobalContext";

export default function App() {
  useEffect(() => {
    // console.log("On");
    socket.on("connect", () => {
      console.log("New!");
    });
  }, []);
  return (
    <Provider store={store}>
      <GlobalContextProvider>
        <RootComponent />
      </GlobalContextProvider>
    </Provider>
  );
}
