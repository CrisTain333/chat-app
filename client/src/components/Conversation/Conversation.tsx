import { useEffect, useState } from "react";
import "../../pages/chat/chat.css";
const Conversation = ({
  currentUser,
  data,
  online,
}: any) => {
  const [userData, setUserData] = useState<any>();
  console.log(userData);
  useEffect(() => {
    const user = data.members.find(
      (user: any) => user?._id !== currentUser
    );
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

  console.log(userData);
  return (
    <>
      <div className="follower conversation">
        <div>
          {/* {online && <div className="online-dot"></div>} */}
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
            style={{ fontSize: "0.8rem" }}
          >
            <span>{userData?.name}</span>
            <span
              style={{ color: online ? "#51e200" : "" }}
            >
              {online ? "Online" : "Offline"}
            </span>
          </div>
        </div>
      </div>
      <hr
        style={{
          width: "85%",
          border: "0.1px solid #ececec",
        }}
      />
    </>
  );
};

export default Conversation;
