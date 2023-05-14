import { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import { io } from "socket.io-client";
import { baseURL } from "../api/axiosClient";

const GlobalContext = createContext();

function GlobalContextProvider({ children }) {
  const [connect, setConnect] = useState();
  const [socketIo, setSocketIo] = useState(null);

  function handelIo(shipper) {
    const socket = io(baseURL);
    socket.on("connect", () => {
      console.log(socket.id);
    });
    setSocketIo(socket);
  }

  useEffect(() => {
    handelIo();
    return () => {};
  }, []);

  const GlobalContextData = { socketIo, handelIo };
  return (
    <GlobalContext.Provider value={GlobalContextData}>
      {children}
    </GlobalContext.Provider>
  );
}

export default GlobalContextProvider;
export function useGlobalContext() {
  return useContext(GlobalContext);
}
