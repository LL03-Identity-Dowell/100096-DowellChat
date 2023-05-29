import React, { useState } from "react";
import ChatHeader from "./ChatItems/ChatHeader";
import ProfileHead from "./Chats/message/ProfileHead";
import ReplyChat from "./Chats/message/ReplyChat";
import SearchBar from "./Chats/SearchBar";
import Scroll from "./Chats/rooms/Scroll";
import ScrollBar from "./Chats/message/ScrollBar";

const ChatSection = () => {
  const [chatHeader, setChatHeader] = useState("");

  const onSetChatHeader = (header) => setChatHeader(header);
  return (
    <div className="container-lg">
      {/* <ChatHeader /> */}
      <ChatHeader onSetChatHeader={onSetChatHeader} />
      {/* chats come here */}
      <div
        className="
      "
      >
        <div className="d-flex myStyle flex-column flex-md-row flex-lg-row flex-xl-row flex-xxl-row ">
          {/* <SearchBar chatHeader={chatHeader} /> */}
          <Scroll />
          <ProfileHead chatHeader={chatHeader} />
          {/* <ScrollBar /> */}
          {/* <ProfileHead /> */}
        </div>
        <ReplyChat chatHeader={chatHeader} />
      </div>
      {/* <ReplyChat /> */}
    </div>
  );
};

export default ChatSection;
