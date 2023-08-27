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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { InvitePopup } from "../../components/invite-popup";

export const CustomerSupport = () => {
  const dataContext = useContext(DataContext);
  const [productTitle, setProductTitle] = useState("Login");
  const [rooms, setRooms] = useState();
  const [selectedRoomId, setSelectedRoomId] = useState("Room ID");
  const [messages, setMessages] = useState(undefined);
  const [showPopUp, setShowPopUp] = useState(false);
  const [showInvitePopup, setShowInvitePopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (dataContext.collectedData) {
      sessionStorage.setItem("sessionId", dataContext.collectedData.sessionId);
      sessionStorage.setItem("id", dataContext.collectedData.id);
    }
  }, [dataContext.collectedData]);

  useEffect(() => {
    setRooms(undefined);
    axios
      .get(
        `https://100096.pythonanywhere.com/room_list1/${productTitle}/${dataContext.collectedData.orgId}`
      )
      .then((response) => {
        if (response.data.rooms.length > 0) {
          setRooms(response.data.rooms);
          setSelectedRoomId(response.data.firstroom.room_id);
        } else {
          setRooms(response.data.rooms);
          setSelectedRoomId("Room ID");
          setMessages([]);
        }
      });
  }, [dataContext.collectedData.orgId, productTitle]);

  const getMessages = (roomId) => {
    setSelectedRoomId(roomId);
    setMessages(undefined);
    axios
      .get(`https://100096.pythonanywhere.com/send_message/${roomId}`)
      .then((response) => {
        setMessages(response.data.messages);
      });
  };

  useEffect(() => {
    if (selectedRoomId && selectedRoomId !== "Room ID") {
      getMessages(selectedRoomId);
    } else {
      setMessages(undefined);
      setSelectedRoomId("Room ID");
    }
  }, [selectedRoomId, productTitle]);

  const handleShowInvitePopup = () => {
    showInvitePopup ? setShowInvitePopup(false) : setShowInvitePopup(true);
  };

  const handleInvite = () => {
    setIsLoading(true);
    console.log("handle invite");
    setIsLoading(false);
  };

  return (
    <div className="flex h-screen justify-around pt-4 gap-2 pb-2">
      <div className="flex w-11/12">
        <div className="flex flex-col w-4/5 pt-6 justify-evenly">
          <div className="flex flex-col">
            <Header handleShowInvitePopup={handleShowInvitePopup} />
            <div className="flex overflow-y-auto scrollbar-thin gap-4 pl-3">
              <span className="hidden">
                {sessionStorage.getItem("sessionId")}
              </span>
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
                <div className="flex flex-col-reverse h-4/5 overflow-auto">
                  {messages ? (
                    <div className="flex flex-col-reverse h-max px-3">
                      {messages.toReversed().map((message, index) => (
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
                              color={
                                message.side ? "bg-blue-600" : "bg-gray-300"
                              }
                            />
                          }
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex h-full min-w-max items-center justify-center text-center">
                      <div role="status">
                        <svg
                          aria-hidden="true"
                          className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                          viewBox="0 0 100 101"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                          />
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                          />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>

                <Reply
                  roomId={selectedRoomId}
                  setMessages={setMessages}
                  rooms={rooms}
                />
              </div>
            </div>
          </div>
        </div>
        <Profile roomId={selectedRoomId} />
      </div>
      {showPopUp && rooms.length > 0 && (
        <PopUp
          setRooms={setRooms}
          notify={(toastMessage, toastType) => {
            toast(toastMessage, { type: toastType });
          }}
          roomId={selectedRoomId}
          productTitle={productTitle}
          setSelectedRoomId={setSelectedRoomId}
          setShowPopUp={setShowPopUp}
        />
      )}
      {showInvitePopup && (
        <InvitePopup
          handleShowInvitePopup={handleShowInvitePopup}
          isLoading={isLoading}
          handelInvite={handleInvite}
        />
      )}
      <ToastContainer />
    </div>
  );
};
