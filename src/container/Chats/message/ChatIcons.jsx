import React, { useContext } from "react";
import ProductContext from "../../ContextProvider/DataContext";
import { Tooltip } from "react-tooltip";
import { FaTrashAlt, FaClipboardList, FaRegEnvelope } from "react-icons/fa";
import { BsExclamationLg } from "react-icons/bs";
import { CiMail } from "react-icons/ci";
import axios from "axios";
const ChatIcons = ({ producName }) => {
  const {
    room_Id,
    sessionId,
    setLoading,
    setUserId,
    setRooms,
    chatHeader,
    orgId,
  } = useContext(ProductContext);
  const handleDeleteChat = async () => {
    try {
      const response = axios.get(
        `https://100096.pythonanywhere.com/delete-customer-support-room/?session_id=${sessionId.session_id}&room_id=${room_Id}`
      );
      console.log(response);
      const BASE_URL = `https://100096.pythonanywhere.com/room_list/${chatHeader}/${orgId}/`;
      setLoading(true);
      const res = await axios.get(BASE_URL);

      // console.log(`res.data from messages${chatHeader}`, res?.data?.messages);
      // console.log(`res.data from messages${chatHeader}`, res?.data);
      console.log(
        "response from get rooms",
        res?.data?.rooms?.[0 | 1]?.userinfo?.user_id
      );
      setUserId(res?.data?.rooms?.[0]?.userinfo?.user_id);
      setRooms(res?.data);
      setLoading(false);
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
