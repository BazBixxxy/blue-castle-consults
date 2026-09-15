import { createContext, useState, useEffect, useContext } from "react";
import io from "socket.io-client";
import { baseURL } from "@/services/baseURL";
import { useAuthContext } from "./auth-context";

const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { authUser } = useAuthContext();

  useEffect(() => {
    if (authUser) {
      const socketConnection = io(baseURL, {
        query: {
          userId: authUser._id,
        },
      });

      setSocket(socketConnection);

      socketConnection.on("onlineUsers", (users) => {
        setOnlineUsers(users);
      });

      return () => {
        socketConnection.close();
        setSocket(null);
      };
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
