import { useState, useContext } from "react";
// import user from "../../../assets/avatar.png";
// import axios from "axios";
import { Tooltip } from "react-tooltip";
import {
  // FaRegPaperPlane,
  FaPaperPlane,
  // FaTelegramPlane,
  FaReply,
  FaThumbsUp,
  FaLink,
} from "react-icons/fa";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import ProductContext from "../../ContextProvider/DataContext";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-hot-toast";

// import { HiOutlineHandThumbUp, HiHandThumbUp } from "react-icons/hi2";
import InputBox from "./InputBox";
import axios from "axios";
const ReplyChat = () => {
  const {
    // handleSendMessage,
    // getMessages,
    // setData,
    setMessages,
    // messages,
    room_Id,
    orgId,
    userId,
  } = useContext(ProductContext);
  const [input, setInput] = useState("");
  const [setData] = useState();
  // const [messages, setMessages] = useState();
  const handleSubmit = (e) => {
    e.preventDefault();
    setData(input);
    const data = {
      // message: "input",
      message: input,
      user_id: userId,
      message_type: "text/Image",
      org_id: orgId,
    };
    mutate(data);
    // axios.post(
    //   `https://100096.pythonanywhere.com/send_message/${room_Id}/`,
    //   data
    // );
    setData("");
  };
  const queryClient = useQueryClient();
  const { mutate } = useMutation("send-message", {
    mutationFn: (data) =>
      axios.post(
        `https://100096.pythonanywhere.com/send_message/${room_Id}/`,
        data
      ),
    onSuccess: async (res) => {
      queryClient.invalidateQueries("send-message");
      toast.success("sent");
      const url = `https://100096.pythonanywhere.com/send_message/${room_Id}/`;
      const response = await axios.get(url);
      // console.log("response", res);
      setMessages(response?.data);
      // console.log("mutated response", res);
    },
    onError: (error) => {
      console.log(error);
    },
  });

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
