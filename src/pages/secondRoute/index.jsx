import React, { useState, useEffect } from "react";
import axios from "axios";
// import { ChatHeader } from "../../components/chat-header";
import "react-toastify/dist/ReactToastify.css";
import { ReplyChat } from "../../components/replyChat";
import { useParams } from "react-router-dom";
import { Message } from "../../components/message";
import dowellLogo from "../../assets/images/dowell.png";

const SecondRoute = () => {
  // const collectedData = JSON.parse(localStorage.getItem("collectedData"));
  const [messages, setMessages] = useState(undefined);
  const [roomId, setRoomId] = useState("");
  // let chatApi = true;

  const { userId, product_name, orgId, portfolio_name } = useParams();

  useEffect(() => {
    const data = {
      user_id: userId,
      org_id: orgId,
      portfolio_name: portfolio_name,
      product_name: product_name,
    };
    axios
      .post(`https://100096.pythonanywhere.com/api/v2/room-control/`, data)
      .then((response) => {
        sessionStorage.setItem("roomId", response.data.inserted_id);
        setRoomId(response.data.inserted_id);
      });
  }, [orgId, portfolio_name, product_name, userId]);

  const getMessages = async (roomId) => {
    // setMessages(undefined);
    axios
      .get(
        `https://100096.pythonanywhere.com/api/v2/room-service/?type=get_messages&room_id=${roomId}`
      )
      .then((response) => {
        setMessages(response.data.response.data);
      });
  };
  useEffect(() => {
    if (roomId) {
      getMessages(roomId);
      setInterval(() => {
        getMessages(roomId);
      }, 5000);
    }
  }, [roomId]);

  return (
    <div className="w-full  h-full box-border flex justify-center items-center">
      <div className="w-full h-full flex justify-center items-center max-h-full">
        <div className="min-w-[375px] w-full lg:w-1/2 ">
          <div className="public-chat ">
            <div className="flex h-[10vh] justify-between items-center bg-white p-3">
              <div className="flex items-center gap-x-3">
                <img
                  src={dowellLogo}
                  alt="dowell"
                  className="object-cover rounded-full w-12 h-12"
                />
                <span>{portfolio_name}</span>
              </div>
            </div>
            {/* <ChatHeader chatApi={chatApi} roomId={roomId} /> */}
            <div className="flex flex-col-reverse bg-[#F0F0F0] h-[80vh] box-border border-x overflow-auto">
              {messages ? (
                <div className="flex flex-col-reverse h-max px-3">
                  {messages.toReversed().map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${
                        message.side ? "justify-start" : "justify-end"
                      } w-full pb-3`}
                    >
                      {
                        <Message
                          message={message.message_data}
                          messageType={message.message_type}
                          style={
                            message.side
                              ? "bg-white rounded-e-2xl rounded-bl-2xl"
                              : "bg-[#54BF5F] rounded-s-2xl rounded-br-2xl"
                          }
                        />
                      }
                    </div>
                  ))}
                </div>
              ) : (
                <></>
                // <div className="flex h-full min-w-max items-center justify-center text-center">
                //   <div role="status">
                //     <svg
                //       aria-hidden="true"
                //       className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                //       viewBox="0 0 100 101"
                //       fill="none"
                //       xmlns="http://www.w3.org/2000/svg"
                //     >
                //       <path
                //         d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                //         fill="currentColor"
                //       />
                //       <path
                //         d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                //         fill="currentFill"
                //       />
                //     </svg>
                //   </div>
                // </div>
              )}
            </div>
            <ReplyChat
              roomId={roomId}
              setMessages={setMessages}
              // rooms={[1]}
            />
          </div>
        </div>
      </div>
      {/* {showPopUp ? (
        <PopUpChat
          activate={activateDelete}
          notify={(toastMessage, toastType) => {
            toast(toastMessage, { type: toastType });
          }}
          roomId={selectedRoomId}
          productTitle={productTitle}
          setSelectedRoomId={setSelectedRoomId}
          setShowPopUp={setShowPopUp}
        />
      ) : null} */}
    </div>
  );
};

export default SecondRoute;
