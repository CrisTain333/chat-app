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
import { logout } from "../../redux/feature/user/userSlice";
import { ThreeCircles } from "react-loader-spinner";
const Chat = () => {
  const { user, token } = useAppSelector(
    (state) => state.auth
  );

  const dispatch = useAppDispatch();

  const [chats, setChats] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [sendMessage, setSendMessage] = useState(null);
  const [receivedMessage, setReceivedMessage] =
    useState(null);

  const { data, isLoading } = useGetChatsQuery(user?._id);

  // Get the chat in chat section

  // Connect to Socket.io

  const socket = io("ws://localhost:8800");
  useEffect(() => {
    socket.emit("new-user-add", user?._id);
    socket.on("get-users", (users) => {
      setOnlineUsers(users);
    });
  }, [user]);

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

  const checkOnlineStatus = (chat: any) => {
    const chatMember = chat.members.find(
      (member: any) => member !== user._id
    );
    const online = onlineUsers.find(
      (users: any) => users.userId === chatMember?._id
    );
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
        <div className="Chat-container bg-white ml-10 mt-10 shadow-lg  overflow-y-scroll">
          <div className="flex items-center justify-between text-base font-semibold text-start">
            <span>Chats</span>
            <button
              onClick={() => dispatch(logout())}
              title="logout"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6  text-[#f9a225]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                />
              </svg>
            </button>
          </div>

          <Box className="relative">
            <input
              type="text"
              className="p-2 rounded-md border w-full"
              placeholder="Search user . . . . ."
            />

            <div className="absolute z-10 w-full border divide-y shadow max-h-72 overflow-y-auto bg-white ...">
              <a
                className="block p-2 hover:bg-indigo-50 ..."
                href="#"
              >
                Tailwind
              </a>
            </div>
          </Box>
          <div className="Chat-list">
            {isLoading ? (
              <>
                <div className="flex items-center justify-center h-[50vh]">
                  <ThreeCircles
                    height="150"
                    width="150"
                    color="#f62343"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                    ariaLabel="three-circles-rotating"
                    outerCircleColor=""
                    innerCircleColor=""
                    middleCircleColor=""
                  />
                </div>
              </>
            ) : (
              <>
                {data?.data?.map((chat: any) => (
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
              </>
            )}
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
        {currentChat && (
          <ChatBox
            chat={currentChat}
            currentUser={user?._id}
            token={token}
            setSendMessage={setSendMessage}
            receivedMessage={receivedMessage}
          />
        )}
      </div>
    </Box>
  );
};

export default Chat;
