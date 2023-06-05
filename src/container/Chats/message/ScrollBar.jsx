import React from "react";
import "./scrollbar.css";
import Message from "./Message";
import ReplyChat from "./ReplyChat";
import ProfileHead from "./ProfileHead";
const ScrollBar = ({ message }) => {
  return (
    <div>
      <div id="wrappers">
        <div className="scrollbars" id="style-1">
          <div className="force-overflow">
            {/* <ProfileHead /> */}
            <Message message={message} />
            {/* <ReplyChat /> */}
          </div>
        </div>

        {/* <div class="scrollbar" id="style-2">
          <div class="force-overflow"></div>
        </div> */}
      </div>
      {/* <ReplyChat /> */}
    </div>
  );
};

export default ScrollBar;
