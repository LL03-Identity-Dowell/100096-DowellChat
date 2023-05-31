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
  const { handleSendMessage, getMessages, setData, setMessages } =
    useContext(ProductContext);
  const [input, setInput] = useState("");
  // const [messages, setMessages] = useState();
  const handleSubmit = (e) => {
    e.preventDefault();
    setData(input);
    // const user_id = "644f9d1e4baba28710c128ea";
    const user_id = "644f9d1e4baba28710c128ea";
    // const user_id = "5p8do0ht7no4gyjo0w2984o4vj5dc2hs";
    // const user_id = 28;
    // const user_id = "644f9d104baba28710c128e3";
    console.log("data to submit", {
      message: input,
      user_id: user_id,
      side: true,
    });
    const data = {
      // message: "input",
      message: input,
      user_id: user_id,
      side: true,
    };

    axios
      .post(`https://100096.pythonanywhere.com/send_message/42/`, data)
      .then((res) => {
        console.log(res, "post res//");
        const newMessage = res;
        console.log(res?.config?.data, "post newMessage//");
        setMessages(newMessage);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  return (
    <div className="">
      <div className="">
        <div class="border d-flex replyBody">
          <div class="card-body">
            <form action="" onSubmit={handleSubmit}>
              <div className="d-flex align-items-center justify-content-between container-lg">
                <div className="d-flex gap-2  my-3">
                  <img src={user} alt="user-image" className=" image-styles" />
                  <div className="form">
                    <InputBox input={input} setInput={setInput} />
                  </div>
                </div>
                <div className="send_btn">
                  <div className="">
                    <button className="btn " type="submit">
                      <FaPaperPlane className="fs-4 text-primary" />
                    </button>
                  </div>
                </div>
              </div>
            </form>
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

//  <div className="mt-4">
//    <div className="d-flex justify-content-end pb-2">
//      <div class="border d-flex replyBody">
//        <div class="card-body">
//          <form action="" onSubmit={handleSubmit}>
//            <div className="d-flex align-items-center justify-content-between mx-3">
//              <div className="d-flex gap-4  my-3">
//                <img src={user} alt="user-image" className=" image-styles" />
//                <div className="form">
//                  <InputBox input={input} setInput={setInput} />
//                </div>
//              </div>
//              <div className="">
//                <div className="">
//                  <button className="btn" type="submit">
//                    <FaPaperPlane className="fs-4 text-primary" />
//                  </button>
//                </div>
//              </div>
//            </div>
//          </form>
//          <div className="d-flex justify-content-end">
//            <div className="">
//              <ul className="">
//                <button
//                  className="btn text-primary"
//                  data-tooltip-id="my-tooltip"
//                  data-tooltip-content="Attach a file"
//                >
//                  <FaLink className="" />
//                  <Tooltip id="my-tooltip" />
//                </button>
//                <button
//                  className="btn text-primary"
//                  data-tooltip-id="my-tooltip"
//                  data-tooltip-content="Reply"
//                >
//                  {" "}
//                  <FaReply className="" />
//                  <Tooltip id="my-tooltip" />
//                </button>
//                <button
//                  className="btn text-primary"
//                  data-tooltip-id="my-tooltip"
//                  data-tooltip-content="emoji"
//                >
//                  <HiOutlineEmojiHappy className="" />
//                  <Tooltip id="my-tooltip" />
//                </button>
//                <button
//                  className="btn text-primary"
//                  data-tooltip-id="my-tooltip"
//                  data-tooltip-content="Like"
//                >
//                  <FaThumbsUp className="" />
//                  <Tooltip id="my-tooltip" />
//                </button>
//              </ul>
//            </div>
//          </div>
//        </div>
//      </div>
//    </div>
//  </div>;
