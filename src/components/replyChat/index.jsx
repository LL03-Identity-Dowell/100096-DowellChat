import axios from "axios";
import { useState, useRef } from "react";

// import DataContext from "../../context/data-context";

import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

export const ReplyChat = ({ roomId, setMessages }) => {
  // const dataContext = useContext(DataContext);
  const [message, setMessage] = useState(undefined);
  const [showPicker, setShowPicker] = useState(false);
  const fileInputRef = useRef(null);

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

  const getMessages = (roomId) => {
    // setMessages(undefined);
    axios
      .get(
        `https://100096.pythonanywhere.com/api/v2/room-service/?type=get_messages&room_id=${roomId}`
      )
      .then((response) => {
        setMessages(response.data.response.data);
      });
  };

  const sendMessage = (message, type, error) => {
    if (message !== "") {
      let data = {};
      if (type === "IMAGE") {
        fileToBase64(message).then((response) => {
          data = {
            type: "create_message",
            room_id: roomId,
            message_data: message,
            side: false,
            author: "client",
            message_type: type,
          };
          axios
            .post(
              `https://100096.pythonanywhere.com/api/v2/room-service/`,
              data
            )
            .then(() => {
              getMessages(roomId);
              setMessage("");
            });
        });
      } else {
        data = {
          type: "create_message",
          room_id: roomId,
          message_data: message,
          side: false,
          author: "client",
          message_type: type,
        };
        axios
          .post(`https://100096.pythonanywhere.com/api/v2/room-service/`, data)
          .then(() => {
            getMessages(roomId);
            setMessage("");
          });
      }
    } else {
      console.log(error);
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
    <div className="bg-[#F0F0F0]">
      <div className="flex items-center rounded-3xl px-3 bg-white ">
        <div
          className="relative hover:cursor-pointer"
          onClick={handleShowEmojiPicker}
        >
          {showPicker && (
            <div className="absolute -top-[455px] -right-[280px]">
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
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`w-7 h-7 ${
              showPicker ? "text-[#0D6EFD]" : "text-[#F0F0F0]"
            }`}
          >
            <path
              d="M20 4.0625C17.7081 4.06481 15.4436 4.56142 13.3611 5.51844C11.2786 6.47547 9.42694 7.8704 7.93252 9.6081C6.4381 11.3458 5.33605 13.3854 4.70153 15.5877C4.06702 17.79 3.91496 20.1033 4.25575 22.3697C4.59653 24.6362 5.42213 26.8024 6.67624 28.7208C7.93034 30.6391 9.58345 32.2644 11.5228 33.4858C13.4622 34.7072 15.6421 35.496 17.914 35.7983C20.1859 36.1005 22.4963 35.9093 24.6875 35.2375C24.8337 35.1927 24.9668 35.1127 25.075 35.0047L35 25.0719C35.1083 24.9632 35.1882 24.8296 35.2328 24.6828C35.9634 22.2994 36.125 19.7779 35.7047 17.3207C35.2844 14.8635 34.2939 12.5391 32.8127 10.534C31.3315 8.52893 29.4008 6.89903 27.1757 5.77514C24.9505 4.65124 22.4929 4.06467 20 4.0625ZM33.511 23.9062L23.9141 33.5047C20.9206 34.3697 17.7246 34.215 14.8287 33.0649C11.9328 31.9148 9.50146 29.8345 7.91715 27.1515C6.33284 24.4684 5.68549 21.3348 6.07694 18.2436C6.46839 15.1523 7.87642 12.279 10.0795 10.0755C12.2826 7.87205 15.1558 6.46355 18.2469 6.0716C21.3381 5.67964 24.4718 6.32649 27.1551 7.91036C29.8385 9.49423 31.9191 11.9252 33.0697 14.8209C34.2202 17.7166 34.3755 20.9127 33.511 23.9062ZM12.8125 16.875C12.8125 16.566 12.9042 16.2639 13.0758 16.0069C13.2475 15.75 13.4916 15.5497 13.7771 15.4314C14.0626 15.3132 14.3767 15.2822 14.6798 15.3425C14.9829 15.4028 15.2613 15.5516 15.4799 15.7701C15.6984 15.9887 15.8472 16.2671 15.9075 16.5702C15.9678 16.8733 15.9368 17.1874 15.8186 17.4729C15.7003 17.7585 15.5 18.0025 15.2431 18.1742C14.9861 18.3459 14.684 18.4375 14.375 18.4375C13.9606 18.4375 13.5632 18.2729 13.2702 17.9799C12.9771 17.6868 12.8125 17.2894 12.8125 16.875ZM27.1875 16.875C27.1875 17.184 27.0959 17.4861 26.9242 17.7431C26.7525 18 26.5085 18.2003 26.223 18.3186C25.9374 18.4368 25.6233 18.4678 25.3202 18.4075C25.0171 18.3472 24.7387 18.1984 24.5202 17.9799C24.3016 17.7613 24.1528 17.4829 24.0925 17.1798C24.0322 16.8767 24.0632 16.5626 24.1814 16.2771C24.2997 15.9915 24.5 15.7475 24.7569 15.5758C25.0139 15.4041 25.316 15.3125 25.625 15.3125C26.0394 15.3125 26.4368 15.4771 26.7299 15.7701C27.0229 16.0632 27.1875 16.4606 27.1875 16.875ZM27.061 24.2187C25.511 26.9 22.9375 28.4375 20 28.4375C17.0625 28.4375 14.4891 26.9 12.9391 24.2187C12.827 24.0045 12.802 23.7552 12.8694 23.523C12.9368 23.2908 13.0913 23.0935 13.3006 22.9725C13.51 22.8515 13.758 22.8161 13.9928 22.8736C14.2277 22.9311 14.4312 23.0772 14.561 23.2812C15.786 25.3969 17.7172 26.5625 20 26.5625C22.2828 26.5625 24.2188 25.3969 25.4391 23.2812C25.4977 23.1692 25.5783 23.0702 25.6762 22.9901C25.7741 22.9101 25.8871 22.8507 26.0086 22.8154C26.13 22.7802 26.2573 22.7699 26.3828 22.7851C26.5083 22.8004 26.6295 22.8409 26.7389 22.9041C26.8484 22.9674 26.944 23.0522 27.0198 23.1533C27.0957 23.2545 27.1503 23.37 27.1804 23.4928C27.2104 23.6156 27.2154 23.7432 27.1948 23.868C27.1743 23.9927 27.1288 24.112 27.061 24.2187Z"
              fill="#545454"
            />
          </svg>
        </div>
        <input
          type="text"
          value={message}
          placeholder="Type message here..."
          className="w-full h-14 pl-1 focus:outline-none"
          onChange={(event) => {
            setMessage(event.target.value);
          }}
        />
        <div className="flex gap-5 pr-2 pb-2">
          <div
            className="relative hover:cursor-pointer"
            onClick={handleButtonClick}
          >
            <svg
              width="25"
              height="25"
              viewBox="0 0 35 35"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.6504 20.4167C12.4542 18.2117 12.6525 14.4375 15.0923 11.989L22.1623 4.8927C24.6021 2.4427 28.3602 2.24437 30.5579 4.44791C32.7542 6.65291 32.5558 10.4271 30.116 12.8771L26.581 16.4252"
                stroke="#777373"
                stroke-width="1.5"
                stroke-linecap="round"
              />
              <path
                d="M20.3496 14.5833C22.5458 16.7883 22.3475 20.5625 19.9077 23.011L16.3727 26.5591L12.8377 30.1073C10.3979 32.5573 6.6398 32.7556 4.44209 30.5521C2.24584 28.3471 2.44417 24.5729 4.88396 22.1229L8.41896 18.5748"
                stroke="#777373"
                stroke-width="1.5"
                stroke-linecap="round"
              />
            </svg>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          </div>

          <div
            className="hover:cursor-pointer"
            onClick={(e) => {
              sendMessage(message, "TEXT");
            }}
          >
            <svg
              width="45"
              height="30"
              viewBox="0 0 40 35"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 2.69232V14.1346L23.0769 17.5L0 20.8654V32.3077L40 17.5L0 2.69232Z"
                fill="#699BF7"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};
