import React from "react";
import user from "../../../assets/user.jpg";
import { Tooltip } from "react-tooltip";
import {
  FaRegPaperPlane,
  FaPaperPlane,
  FaTelegramPlane,
  FaReply,
  FaThumbsUp,
  FaLink,
} from "react-icons/fa";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import { HiOutlineHandThumbUp, HiHandThumbUp } from "react-icons/hi2";
import InputBox from "./InputBox";
const ReplyChat = () => {
  return (
    <div>
      <div className="d-flex justify-content-end my-5">
        <div
          className="border rounded d-flex align-self-end"
          style={{ minWidth: "10rem", height: "10rem" }}
        >
          <div className="card-body">
            <div className="d-flex align-items-center justify-content-between mx-3">
              <div className="d-flex gap-4  my-3">
                <img src={user} alt="user-image" className=" image-styles" />
                <div className="form">
                  <InputBox />
                </div>
              </div>
              {/* <div className="">
                <div className="">
                  <button className="btn">
                    <FaPaperPlane className="fs-4 text-primary" />
                  </button>
                </div>
              </div> */}
            </div>
            <div className="d-flex justify-content-end">
              <div className="">
                <ul className="">
                  <button
                    className="btn text-primary"
                    data-tooltip-id="my-tooltip"
                    data-tooltip-content="Attach a file"
                  >
                    <FaLink className="" />
                    <Tooltip id="my-tooltip" />
                  </button>
                  <button
                    className="btn text-primary"
                    data-tooltip-id="my-tooltip"
                    data-tooltip-content="Reply"
                  >
                    {" "}
                    <FaReply className="" />
                    <Tooltip id="my-tooltip" />
                  </button>
                  <button
                    className="btn text-primary"
                    data-tooltip-id="my-tooltip"
                    data-tooltip-content="emoji"
                  >
                    <HiOutlineEmojiHappy className="" />
                    <Tooltip id="my-tooltip" />
                  </button>
                  <button
                    className="btn text-primary"
                    data-tooltip-id="my-tooltip"
                    data-tooltip-content="Like"
                  >
                    <FaThumbsUp className="" />
                    <Tooltip id="my-tooltip" />
                  </button>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReplyChat;
