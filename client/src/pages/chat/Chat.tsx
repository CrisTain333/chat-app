import { Box } from "@chakra-ui/react";
import ChatBox from "../../components/ChatBox/ChatBox";
import Conversation from "../../components/Conversation/Conversation";
import { useGetChatsQuery } from "../../redux/feature/chat/chatApi";
import {
  useAppDispatch,
  useAppSelector,
} from "../../redux/hooks";
// import "./chat.css";
import React, { useEffect, useRef } from "react";
import { io } from "socket.io-client";
const socket = io("ws://localhost:3000");
const Chat = () => {
  const [currentChat, setCurrentChat] = React.useState();
  const { user } = useAppSelector((state) => state.auth);
  const socket: any = useRef();

  // Connect to Socket.io

  useEffect(() => {
    socket.current = io("ws://localhost:8800");
    // socket.current.emit("new-user-add", user._id);
    // socket.current.on("get-users", (users) => {
    //   setOnlineUsers(users);
    // });
  }, [user]);

  const { data: chats, isLoading } = useGetChatsQuery(
    user?._id
  );
  console.log(chats);
  return (
    <Box
      // bg={"#100E27"}
      className="Chat"
      height={"100vh"}
    >
      {/* Left Side */}
      <div className="Left-side-chat">
        {/* <LogoSearch /> */}
        <div className="Chat-container bg-white ml-10 mt-10 shadow-lg h-[90vh] overflow-y-scroll">
          <h2 className="text-base font-semibold ">
            Chats
          </h2>
          <div className="Chat-list">
            {chats?.data?.map((chat: any) => (
              <div
                onClick={() => {
                  setCurrentChat(chat);
                }}
              >
                <Conversation
                  data={chat}
                  currentUser={user?._id}
                  // online={checkOnlineStatus(chat)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side */}

      <div className="">
        <div

        // style={{ width: "20rem", alignSelf: "flex-end" }}
        >
          {/* <NavIcons /> */}
        </div>
        <ChatBox
          chat={currentChat}
          currentUser={user?._id}
          // setSendMessage={setSendMessage}
          // receivedMessage={receivedMessage}
        />
      </div>
    </Box>
  );
};

export default Chat;
