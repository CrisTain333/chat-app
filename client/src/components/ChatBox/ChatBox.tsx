import React from "react";
import "./Chat.css";
const ChatBox = ({ chat, currentUser }: any) => {
  const [userData, setUserData] = React.useState<any>(null);
  const [messages, setMessages] = React.useState([]);
  const [newMessage, setNewMessage] = React.useState("");

  React.useEffect(() => {
    const user = chat?.members?.find(
      (user: any) => user?._id !== currentUser
    );
    console.log(user);
    setUserData(user);

    //    const getUserData = async () => {
    //      try {
    //        const { data } = await getUser(userId);
    //        dispatch({ type: "SAVE_USER", data: data });
    //      } catch (error) {
    //        console.log(error);
    //      }
    //    };

    //    getUserData();
  }, []);

  return (
    <>
      <div className="ChatBox-container">
        {chat ? (
          <>
            {/* chat-header */}
            <div className="chat-header">
              <div className="follower">
                <div>
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
                    <span>
                      {userData?.firstname}{" "}
                      {userData?.lastname}
                    </span>
                  </div>
                </div>
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
              {messages.map((message) => (
                <>
                  {/* <div
                    ref={scroll}
                    className={
                      message.senderId === currentUser
                        ? "message own"
                        : "message"
                    }
                  >
                    <span>{message.text}</span>{" "}
                    <span>{format(message.createdAt)}</span>
                  </div> */}
                </>
              ))}
            </div>
            {/* chat-sender */}
            <div className="chat-sender">
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
                style={{ display: "none" }}
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
