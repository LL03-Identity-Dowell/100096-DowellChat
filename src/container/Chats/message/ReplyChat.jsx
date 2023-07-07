import { useState, useContext } from "react";
import user from "../../../assets/avatar.png";
// import axios from "axios";
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
import ProductContext from "../../ContextProvider/DataContext";
import { HiOutlineHandThumbUp, HiHandThumbUp } from "react-icons/hi2";
import InputBox from "./InputBox";
import axios from "axios";
const ReplyChat = () => {
  const {
    handleSendMessage,
    getMessages,
    // setData,
    setMessages,
    messages,
    room_Id,
    orgId,
    userId,
  } = useContext(ProductContext);
  const [input, setInput] = useState("");
  const [data, setData] = useState();
  // const [messages, setMessages] = useState();
  const handleSubmit = (e) => {
    e.preventDefault();
    setData(input);
    setInput("");
    // const user_id = "644f9d1e4baba28710c128ea";
    const user_id = "644f9d1e4baba28710c128ea";
    // const user_id = "5p8do0ht7no4gyjo0w2984o4vj5dc2hs";
    // const user_id = 28;
    // const user_id = "644f9d104baba28710c128e3";
    // console.log("data to submit", {
    //   message: input,
    //   user_id: user_id,
    //   side: true,
    // });
    const data = {
      // message: "input",
      message: input,
      user_id: userId,
      message_type: "TEXT",
      org_id: orgId,
    };
    axios
      .post(`https://100096.pythonanywhere.com/send_message/${room_Id}/`, data)
      .then((res) => {
        // console.log(res, "post res//");
        if (res?.status === 200 && res?.statusText === "OK") {
          console.log("successful response", res);
          const newMessage = res;
          setMessages([...messages, newMessage]);
        } else {
          console.log("failed response", res?.data?.data?.message);
        }
        // console.log(res?.config?.data, "post newMessage//");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  console.log("messages", messages);
  return (
    <div className="text-black mb-5 mb-md-5 mb-lg-5 mb-xl-5 mb-xxl-5">
      <div
        className="card py-2 ms-2 w-100 "
        style={{ height: "165px", maxWidth: "750px" }}
      >
        <div className="card-body p-1 ">
          <div
            className="d-flex w-100 justify-content-between"
            // onSubmit={handleSubmit}
          >
            <InputBox input={input} setInput={setInput} />
            <div className="d-flex align-items-center flex-column-reverse flex-md-row flex-lg-row flex-xl-row flex-xxl-row">
              <div
                className="d-flex justify-content-end"
                // style={{ marginBottom: "4rem" }}
              >
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
              </div>
              <div>
                <button
                  className="btn text-primary "
                  typeof="submit"
                  onClick={handleSubmit}
                >
                  <FaPaperPlane />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReplyChat;
