import { useEffect, useState } from "react";
import "../../pages/chat/chat.css";
const Conversation = ({
  currentUser,
  data,
  online,
}: any) => {
  const [userData, setUserData] = useState<any>();
  useEffect(() => {
    console.log(data);
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

  return (
    <>
      <div className="follower conversation">
        <div className="flex items-center  relative">
          {online && (
            <div className="online-dot absolute right-0 bottom-0"></div>
          )}
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
            className="ml-3"
            style={{ fontSize: "0.8rem" }}
          >
            <span className="font-semibold text-base">
              {userData?.name}
            </span>{" "}
            <br />
            <span
              className="mt-5"
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
