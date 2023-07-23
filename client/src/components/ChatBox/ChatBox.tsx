import React from "react";
import "./Chat.css";
import { Box, Text } from "@chakra-ui/react";
import { useGetMessagesQuery } from "../../redux/feature/message/messageApi";
import moment from "moment";
const ChatBox = ({ chat, currentUser }: any) => {
  const [userData, setUserData] = React.useState<any>(null);
  const [messages, setMessages] = React.useState<any>([]);
  const [newMessage, setNewMessage] = React.useState("");

  const { data } = useGetMessagesQuery(chat?._id);

  React.useEffect(() => {
    const user = chat?.members?.find(
      (user: any) => user?._id !== currentUser
    );
    setUserData(user);
    setMessages(data?.data);
    //    const getUserData = async () => {
    //      try {
    //        const { data } = await getUser(userId);
    //        dispatch({ type: "SAVE_USER", data: data });
    //      } catch (error) {
    //        console.log(error);
    //      }
    //    };

    //    getUserData();
    console.log("hello");
  }, [chat, currentUser, data]);

  return (
    <>
      <div className="ChatBox-container">
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
              {messages?.map((message) => (
                <>
                  <div
                    // ref={scroll}
                    className={
                      message.senderId === currentUser
                        ? "message own"
                        : "message"
                    }
                  >
                    <Text fontSize={"large"}>
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
            {/* chat-sender */}
            <div
              className="chat-sender"
              // style={{
              //   background: "white",
              //   display: "flex",
              //   justifyContent: "space-between",
              //   height: "3.5rem",
              //   alignItems: "center",
              //   gap: "1rem",
              //   padding: "0.8rem",
              //   borderRadius: "1rem",
              //   alignSelf: "end",
              // }}
            >
              <div
              // onClick={() => imageRef.current.click()}
              >
                +
              </div>
              {/* <InputEmoji
                value={newMessage}
                onChange={handleChange}
              /> */}
              <div
                className="send-button button"
                // onClick={handleSend}
              >
                Send
              </div>
              <input
                type="file"
                name=""
                id=""
                // style={{
                //   height: "70%",
                //   backgroundColor: "rgb(236, 236, 236)",
                //   borderRadius: "0.5rem",
                //   border: "none",
                //   outline: "none",
                //   flex: "1",
                //   fontSize: "14px",
                //   padding: "0px 15px 0px 15px",
                // }}
                // ref={imageRef}
              />
            </div>{" "}
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
