import React, { useState } from "react";
import ChatHeader from "./ChatItems/ChatHeader";
import Scroll from "./Chats/rooms/Scroll";
import Profile from "./Chats/message/Profile";

const ChatSection = () => {
  const [chatHeader, setChatHeader] = useState("");

  const onSetChatHeader = (header) => setChatHeader(header);
  return (
    <div className="w-100 h-100 container-lg mw-75">
      <ChatHeader onSetChatHeader={onSetChatHeader} />
      <div
        className="
      "
      >
        <div className="d-flex myStyle flex-column flex-md-column flex-lg-row flex-xl-row flex-xxl-row ">
          <Scroll />
          <Profile />
        </div>
      </div>
    </div>
  );
};

export default ChatSection;
