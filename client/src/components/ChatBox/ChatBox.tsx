import React from "react";
import "./Chat.css";
import { Box, Text } from "@chakra-ui/react";
import { useGetMessagesQuery } from "../../redux/feature/message/messageApi";
import moment from "moment";
import { usePostMessageMutation } from "../../redux/feature/chat/chatApi";
const ChatBox = ({
  chat,
  currentUser,
  setSendMessage,
  receivedMessage,
}: any) => {
  const [userData, setUserData] = React.useState<any>(null);
  const [messages, setMessages] = React.useState<any>([]);
  const [newMessage, setNewMessage] = React.useState("");

  const { data } = useGetMessagesQuery(chat?._id, {
    refetchOnMountOrArgChange: true,
    // pollingInterval: 5000,
  });
  const [addAMessage] = usePostMessageMutation();

  React.useEffect(() => {
    const user = chat?.members?.find(
      (user: any) => user?._id !== currentUser
    );
    setUserData(user);
    setMessages(data?.data);
  }, [chat, currentUser, data]);

  const handleChange = (newMessage: string) => {
    setNewMessage(newMessage);
  };

  // Send Message
  const handleSend = async (e: any) => {
    e.preventDefault();
    const message: any = {
      senderId: currentUser,
      text: newMessage,
      chatId: chat._id,
    };
    const receiverId = chat.members.find((user: any) => {
      return user?._id !== currentUser;
    });
    // send message to socket server
    setSendMessage({ ...message, receiverId });

    // send message to database
    try {
      const data: any = await addAMessage(message);
      setMessages([...messages, data?.data]);
      setNewMessage("");
    } catch {
      console.log("error");
    }
  };

  // Receive Message from parent component
  React.useEffect(() => {
    console.log("Message Arrived: ", receivedMessage);
    if (
      receivedMessage !== null &&
      receivedMessage.chatId === chat._id
    ) {
      setMessages([...messages, receivedMessage]);
    }
  }, [receivedMessage]);

  return (
    <>
      <div className="ChatBox-container bg-white mt-14 w-[95%] mx-auto  shadow-lg">
        {chat ? (
          <>
            {/* chat-header */}
            <div className="chat-header">
              <div className="follower">
                <Box
                  display={"flex"}
                  alignItems={"center"}
                >
                  <img
                    src={userData?.profilePicture}
                    alt="Profile"
                    className="followerImage"
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                    }}
                  />
                  <div
                    className="name"
                    style={{ fontSize: "0.9rem" }}
                  >
                    <Text
                      fontSize={"2xl"}
                      fontWeight={"medium"}
                      marginLeft={"2"}
                    >
                      {userData?.name}{" "}
                    </Text>
                  </div>
                </Box>
              </div>
              <hr
                style={{
                  width: "95%",
                  border: "0.1px solid #ececec",
                  marginTop: "20px",
                }}
              />
            </div>
            {/* chat-body */}
            <div className="chat-body">
              {messages?.map((message: any, i: number) => (
                <>
                  <div
                    key={i}
                    // ref={scroll}
                    className={
                      message.senderId === currentUser
                        ? "message own"
                        : "message"
                    }
                  >
                    <Text fontSize={"medium"}>
                      {message.text}
                    </Text>{" "}
                    <Text
                      align={"end"}
                      fontSize={"small"}
                      marginTop={"-8px"}
                    >
                      {moment(message?.createdAt)
                        .startOf("hour")
                        .fromNow()}
                    </Text>
                  </div>
                </>
              ))}
            </div>

            <div className="flex flex-row items-center h-16 rounded-xl w-full px-4">
              <div>
                <button className="flex items-center justify-center text-gray-400 hover:text-gray-600">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                    ></path>
                  </svg>
                </button>
              </div>
              <div className="flex-grow ml-4">
                <div className="relative w-full">
                  <input
                    value={newMessage}
                    onChange={(e) =>
                      handleChange(e.target.value)
                    }
                    type="text"
                    className="flex w-full border  rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                  />
                  <button className="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
              <div className="ml-2">
                <button
                  className="flex items-center justify-center rounded-sm text-gray-400 py-2 flex-shrink-0"
                  onClick={handleSend}
                >
                  {/* <span>Send</span> */}
                  <span className="ml-2">
                    <svg
                      className="w-7 h-7 transform rotate-45 -mt-px"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      ></path>
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </>
        ) : (
          <span className="chatbox-empty-message">
            Tap on a chat to start conversation...
          </span>
        )}
      </div>
    </>
  );
};

export default ChatBox;
