import React, { useContext, useState } from "react";
import ProductContext from "../../ContextProvider/DataContext";
import { Tooltip } from "react-tooltip";
import { FaTrashAlt, FaClipboardList, FaRegEnvelope } from "react-icons/fa";
import { BsExclamationLg } from "react-icons/bs";
import { CiMail } from "react-icons/ci";
import axios from "axios";
const ChatIcons = ({ producName }) => {
  const { room_Id, sessionId } = useContext(ProductContext);
  const handleDeleteChat = async () => {
    try {
      axios
        .get(
          `https://100096.pythonanywhere.com/delete-customer-support-room/?session_id=${sessionId.session_id}&room_id=${room_Id}`
        )
        .then((response) => {});
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="mx-3">
      <div className="d-flex gap-3 justify-content-end">
        <small
          className="text-primary fs-6"
          data-tooltip-id="my-tooltip"
          data-tooltip-content="Customize"
          data-tooltip-variant="light"
        >
          <FaClipboardList />
          <Tooltip id="my-tooltip" />
        </small>
        <small
          className="text-primary fs-6"
          data-tooltip-id="my-tooltip"
          data-tooltip-content="Move to spam"
        >
          <BsExclamationLg />
          <Tooltip id="my-tooltip" />
        </small>
        <small
          className="text-primary fs-6"
          data-tooltip-id="my-tooltip"
          data-tooltip-content="Delete conversation"
          onClick={handleDeleteChat}
        >
          <FaTrashAlt />
          <Tooltip id="my-tooltip" />
        </small>

        <small
          className="text-primary fs-6"
          data-tooltip-id="my-tooltip"
          data-tooltip-content="Mark as unread"
        >
          <FaRegEnvelope />
          <Tooltip id="my-tooltip" />
        </small>
      </div>
    </div>
  );
};

export default ChatIcons;
