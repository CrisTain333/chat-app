import { Box } from "@chakra-ui/react";
import ChatBox from "../../components/ChatBox/ChatBox";
import Conversation from "../../components/Conversation/Conversation";
import { useGetChatsQuery } from "../../redux/feature/chat/chatApi";
import {
  useAppDispatch,
  useAppSelector,
} from "../../redux/hooks";
// import "./chat.css";
import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
const Chat = () => {
  const { user, token } = useAppSelector(
    (state) => state.auth
  );
  const [currentChat, setCurrentChat] = React.useState();
  const [onlineUsers, setOnlineUsers] = useState<any>([]);
  const [sendMessage, setSendMessage] = useState(null);
  const [receivedMessage, setReceivedMessage] =
    useState(null);
  const socket = io("ws://localhost:8800");

  // Connect to Socket.io

  useEffect(() => {
    // socket.current = io("ws://localhost:8800");
    // socket.current.emit("new-user-add", user?._id);
    socket.emit("new-user-add", user?._id);
    socket.on("get-users", (users) => {
      setOnlineUsers(users);
    });
  }, [user]);

  console.log(onlineUsers);

  // Send Message to socket server
  useEffect(() => {
    if (sendMessage !== null) {
      socket.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  // Get the message from socket server
  useEffect(() => {
    socket.on("recieve-message", (data) => {
      console.log(data);
      setReceivedMessage(data);
    });
  }, []);

  const { data: chats, isLoading } = useGetChatsQuery(
    user?._id
  );

  const checkOnlineStatus = (chat: any) => {
    const chatMember = chat.members.find(
      (member: any) => member !== user._id
    );
    console.log(chatMember);
    const online = onlineUsers.find(
      (users: any) => users.userId === chatMember?._id
    );
    console.log(online);
    return online ? true : false;
  };

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
                  online={checkOnlineStatus(chat)}
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
          token={token}
          setSendMessage={setSendMessage}
          receivedMessage={receivedMessage}
        />
      </div>
    </Box>
  );
};

export default Chat;
