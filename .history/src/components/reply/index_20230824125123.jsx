import axios from "axios";
import { useState, useRef } from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { toast } from "react-toastify";

export const Reply = ({ roomId, userId, orgId, setMessages, rooms,status,statusChecking }) => {
  console.log(status,'status')
  const [message, setMessage] = useState(undefined);
  const [showPicker, setShowPicker] = useState(false);
  const [loading,setLoading] = useState(false)
  const fileInputRef = useRef(null);
  console.log(loading)

  function fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result.split(",")[1];
        resolve(base64String);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsDataURL(file);
    });
  }


  const sendMessage = (message, type) => {
    if (message !== "" && rooms.length !== 0) {
      // setLoading(true)
      // statusChecking(true)
      let data = {};
      if (type === "IMAGE") {
        fileToBase64(message).then((response) => {
          data = {
            message: response,
            user_id: userId,
            message_type: type,
            org_id: orgId,
          };
          axios
            .post(
              `https://100096.pythonanywhere.com/send_message/${roomId}/`,
              data
            )
            .then((response) => {
              // console.log(setLoading(true),'true')
        setLoading(true)
                setMessages(response.data.messages)
                setMessage("");
        setTimeout(() => 
          setLoading(true)
      , 3000);
              
            });
        });
      } else {
        data = {
          message: message,
          user_id: userId,
          message_type: type,
          org_id: orgId,
        };
        axios
          .post(
            `https://100096.pythonanywhere.com/send_message/${roomId}/`,
            data
          )
          .then((response) => {
            setMessages(response.data.messages);
            setMessage("");
          });
      }
    } else {
      rooms.length === 0
        ? toast("No Room Selected!", { type: "warning" })
        : toast("Please Enter Message", { type: "warning" });
    }
  };
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      sendMessage(selectedFile, "IMAGE");
    }
  };
  const handleShowEmojiPicker = () => {
    setShowPicker(!showPicker);
  };
  return (
    <div className="flex items-center border-t h-fit">
      <textarea
        value={message}
        rows={4}
        placeholder="Type message here..."
        className="w-full pt-1 pl-1 focus:outline-none"
        onChange={(event) => {
          setMessage(event.target.value);
        }}
      />
      <div className="flex gap-5">
        <div
          className="relative hover:cursor-pointer"
          onClick={handleButtonClick}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="w-5 h-5 text-[#0D6EFD]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
            />
          </svg>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </div>

        <div className="relative hover:cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="w-5 h-5 text-[#0D6EFD]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
            />
          </svg>
        </div>

        <div
          className="relative hover:cursor-pointer"
          onClick={handleShowEmojiPicker}
        >
          {showPicker && (
            <div className="absolute -top-[450px] right-2">
              <Picker
                data={data}
                theme="light"
                perLine={8}
                sheetSize={5}
                emojiSize={15}
                onEmojiSelect={(emoji) => {
                  setMessage(message + emoji.native);
                }}
              />
            </div>
          )}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className={`w-5 h-5  ${
              showPicker ? "text-red-400" : "text-[#0D6EFD]"
            }`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
            />
          </svg>
        </div>

        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="w-5 h-5 text-[#0D6EFD]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
            />
          </svg>
        </div>

        <div
          className="hover:cursor-pointer pr-3"
          onClick={() => {
            sendMessage(message, "TEXT");
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="w-5 h-5 text-[#0D6EFD]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};
