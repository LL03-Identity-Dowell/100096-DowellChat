import React from "react";
import Buttons from "./Buttons";
import HeaderButtons from "./HeaderButtons";
const ChatHeader = ({ title, caption, onSetChatHeader, pageName }) => {
  return (
    <div className="p-4">
      {/* <div className="d-flex"></div> */}
      <div className="">
        <div className=" d-flex flex-column flex-md-row flex-lg-row flex-xl-row flex-xxl-row my-0 justify-content-between">
          <header>
            <h1 className="header fs-4 fw-bold">{title}</h1>
            <p className="fw-medium  Header-font">{caption}</p>
          </header>
          <HeaderButtons />
        </div>
        <Buttons onSetChatHeader={onSetChatHeader} pageName={pageName} />
        {/* <Buttons onSetChatHeader={onSetChatHeader} /> */}
      </div>
      <div
        className=" my-2"
        style={{ borderBottom: "1px solid #7A7A7A" }}
      ></div>
    </div>
  );
};

export default ChatHeader;
ChatHeader.defaultProps = {
  title: "Chat Response",
  caption: "Respond to messages, set up automations and more",
};
