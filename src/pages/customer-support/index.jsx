import { Header } from "../../components/header";
import { Profile } from "../../components/profile";
import { Products } from "../../components/product_list";
import { useState, useEffect, useContext } from "react";
import profileImage from "../../assets/images/avatar.png";
import { Reply } from "../../components/reply";
import { ChatHeader } from "../../components/chat-header";
import axios from "axios";
import { Room } from "../../components/room";
import { Message } from "../../components/message";
import { PopUp } from "../../components/pop-up";
import { RoomLoader } from "../../components/room-loader";
import DataContext from "../../context/data-context";

export const CustomerSupport = () => {
  const dataContext = useContext(DataContext);
  const [productTitle, setProductTitle] = useState("Login");
  const [userInfo, setUserInfo] = useState();
  const [orgId, setOrgId] = useState();
  const [userId, setUserId] = useState();
  const [rooms, setRooms] = useState();
  const [selectedRoomId, setSelectedRoomId] = useState("42");
  const [roomSessionId, setRoomSessionId] = useState();
  const [sessionId, setSessionId] = useState();
  const [messages, setMessages] = useState();
  const [showPopUp, setShowPopUp] = useState(false);
  const [userDataStatus, setuserDataStatus] = useState(true);

  useEffect(() => {
    if (dataContext.collectedData) {
      sessionStorage.setItem("sessionId", dataContext.collectedData.sessionId);
      setSessionId(dataContext.collectedData.sessionId);
    } else {
      setSessionId(sessionStorage.getItem("sessionId"));
    }
  }, [dataContext.collectedData]);

  useEffect(() => {
    if (sessionId) {
      const formData = new FormData();
      formData.append("session_id", sessionId);
      axios
        .post("https://100093.pythonanywhere.com/api/userinfo/", formData)
        .then((response) => {
          setOrgId(response.data.selected_product.orgid);
        });
    }
  }, [sessionId]);

  useEffect(() => {
    if (productTitle && orgId) {
      setRooms(undefined);
      axios
        .get(
          `https://100096.pythonanywhere.com/room_list1/${productTitle}/${orgId}`
        )
        .then((response) => {
          if (response.data.rooms.length > 0) {
            setRooms(response.data.rooms);
            setSelectedRoomId(response.data.firstroom.room_id);
            setRoomSessionId(response.data.firstroom.session_id);
          } else {
            setRooms(response.data.rooms);
            setuserDataStatus(false);
          }
        });
    }
  }, [orgId, productTitle]);

  useEffect(() => {
    if (roomSessionId) {
      setUserInfo(null);
      setuserDataStatus(true);
      const formData = new FormData();
      formData.append("session_id", roomSessionId);
      axios
        .post("https://100093.pythonanywhere.com/api/userinfo/", formData)
        .then((response) => {
          if (response.data.userinfo) {
            setUserInfo(response.data.userinfo);
            setuserDataStatus(true);
          } else {
            setuserDataStatus(false);
          }
        })
        .catch((reason) => {
          console.log(reason);
        });
    }
  }, [roomSessionId]);

  useEffect(() => {
    if (sessionId) {
      axios
        .get(
          `https://100096.pythonanywhere.com/create-user-profile/?session_id=${sessionId}`
        )
        .then((response) => {
          setUserId(response.data?.portfolio?.userID);
        });
    }
  }, [sessionId]);

  const getMessages = (roomId) => {
    setSelectedRoomId(roomId);
    axios
      .get(`https://100096.pythonanywhere.com/send_message/${roomId}`)
      .then((response) => {
        setMessages(response.data.messages);
      });
  };

  useEffect(() => {
    if (selectedRoomId && selectedRoomId !== "42") {
      getMessages(selectedRoomId);
    } else {
      setMessages([]);
      setSelectedRoomId("42");
    }
  }, [selectedRoomId]);

  return (
    <div className="flex h-screen justify-around pt-4 gap-2 pb-2">
      <div className="flex w-11/12">
        <div className="flex flex-col w-4/5 pt-6 justify-evenly">
          <div className="flex flex-col">
            <Header />
            <div className="flex overflow-y-auto scrollbar-thin gap-4 pl-3">
              <Products
                pageName="living-lab-chat"
                setProductTitle={setProductTitle}
                selectedProduct={productTitle}
              />
            </div>
          </div>
          <div className="flex border h-4/5">
            <div className="w-1/3 border-r-2 p-3 overflow-y-auto text-center">
              <div className="flex items-center bg-[#E9EFF3] border">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 text-[#9CA3BE]"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Search Room..."
                  className="appearance-none w-full h-10 focus:outline-none  bg-transparent text-sm  rounded pl-1"
                />
              </div>
              <div className="flex justify-around pt-3">
                <div className="flex">
                  <a href="# " className="flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5 text-[#0D6EFD]"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                      />
                    </svg>
                    <span className="text-[#0D6EFD] text-sm">Unread</span>
                  </a>
                </div>
                <div className="flex">
                  <a href="# " className="flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5 text-[#0D6EFD]"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                        clipRule="evenodd"
                      />
                    </svg>

                    <span className="text-[#0D6EFD] text-sm">Follow Up</span>
                  </a>
                </div>
                <div className="flex">
                  <a href="# " className="flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5 text-[#0D6EFD]"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.25 2.25a3 3 0 00-3 3v4.318a3 3 0 00.879 2.121l9.58 9.581c.92.92 2.39 1.186 3.548.428a18.849 18.849 0 005.441-5.44c.758-1.16.492-2.629-.428-3.548l-9.58-9.581a3 3 0 00-2.122-.879H5.25zM6.375 7.5a1.125 1.125 0 100-2.25 1.125 1.125 0 000 2.25z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-[#0D6EFD] text-sm">Labels</span>
                  </a>
                </div>
              </div>
              <div className="flex flex-col overflow-auto pt-5 pl-4">
                {rooms && rooms.length !== 0 ? (
                  rooms.map((room, index) => (
                    <Room
                      key={index}
                      roomId={room.room_id}
                      roomName={room.room_name}
                      fetchRoomMessages={getMessages}
                      setRoomSessionId={setRoomSessionId}
                    />
                  ))
                ) : (
                  <>
                    {rooms && rooms.length === 0 ? (
                      <span className="text-lg font-bold">
                        No Rooms Available
                      </span>
                    ) : (
                      <RoomLoader />
                    )}
                  </>
                )}
              </div>
            </div>
            <div className="w-2/3">
              <div className="flex h-full flex-col">
                <ChatHeader
                  profileImage={profileImage}
                  roomId={selectedRoomId}
                  setShowPopUp={setShowPopUp}
                />
                <div className="flex flex-col-reverse h-4/5 px-3 overflow-auto">
                  {messages ? (
                    messages.toReversed().map((message, index) => (
                      <div
                        key={index}
                        className={`flex ${
                          message.side ? "justify-end" : "justify-start"
                        } w-full pb-3`}
                      >
                        {
                          <Message
                            message={message.message}
                            messageType={message.message_type}
                            color={message.side ? "bg-blue-600" : "bg-gray-300"}
                          />
                        }
                      </div>
                    ))
                  ) : (
                    <></>
                  )}
                </div>
                <Reply
                  roomId={selectedRoomId}
                  orgId={orgId}
                  userId={userId}
                  setMessages={setMessages}
                />
              </div>
            </div>
          </div>
        </div>
        <Profile
          userInfo={userInfo}
          roomId={selectedRoomId}
          roomSessionId={roomSessionId}
          userDataStatus={userDataStatus}
        />
      </div>
      {showPopUp && rooms && (
        <PopUp
          setRooms={setRooms}
          roomId={selectedRoomId}
          productTitle={productTitle}
          orgId={orgId}
          sessionId={sessionId}
          setSelectedRoomId={setSelectedRoomId}
          setShowPopUp={setShowPopUp}
        />
      )}
    </div>
  );
};
