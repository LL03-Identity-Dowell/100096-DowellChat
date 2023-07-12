import React, { useContext, useEffect } from "react";
// import ReplyChat from "./ReplyChat";
// import clsx from "clsx";
import axios from "axios";
import male_avatar from "../../../assets/male_avatar.png";
// import { useMutation } from "react-query";
import ProductContext from "../../ContextProvider/DataContext";
// import { Loader } from "../../spinner/loader";
// import { useQuery } from "react-query";
const Message = () => {
  // const [message, setMessage] = useState();
  const {
    rooms,
    messages,
    setMessages,
    // loading,
    // memorizedMessages,
    room_Id,
    setId,
  } = useContext(ProductContext);
  const url = `https://100096.pythonanywhere.com/send_message/${room_Id}/`;

  // useEffect(() => {
  //   const url = `https://100096.pythonanywhere.com/send_message/${room_Id}/`;
  //   const getRoomMessage = async () => {
  //     // setLoading(true);
  //     const res = await axios.get(url);
  //     setMessage(res?.data);
  //   };
  //   getRoomMessage();
  // }, [room_Id]);
  // const { status, data, error, isLoading } = useQuery(
  //   ["message", room_Id],
  //   () => getRoomMessage(room_Id),
  //   [room_Id]
  // );
  useEffect(() => {
    const getRoomMessage = async () => {
      // setLoading(true);
      const res = await axios.get(url);
      // console.log("response", res);
      setMessages(res?.data);
      // setMessage(res?.data);
    };
    getRoomMessage(room_Id);
  }, [messages, room_Id, setMessages, url]);

  setId(messages?.messages?.[0]?.author?.session_id);
  // const { mutate } = useMutation();
  // console.log("data", data);
  // if (isLoading) return <div>Loading</div>;
  // if (error) return <div>Request Failed</div>;
  // const messageUser = (id) => {
  //   switch (id) {
  //     case id === 28:
  //       return {
  //         display: "flex",
  //         justifyContent: "end",
  //       };
  //     case id === 29:
  //       return {
  //         display: "flex",
  //         justifyContent: "start",
  //       };

  //     default:
  //       return null;
  //   }
  // };

  return (
    <div className="container overflow-auto" style={{ height: "320px" }}>
      {messages?.messages?.length && rooms?.rooms?.length <= 0
        ? null
        : messages?.messages?.map(({ message, id, side }) => {
            return (
              <div
                key={id}
                className={
                  side
                    ? "d-flex justify-content-end"
                    : "d-flex justify-content-start"
                }
              >
                <div
                  id="chat1"
                  className={
                    side
                      ? "p-3 mb-4 style bg-primary"
                      : "d-flex align-items-center bg-white text-muted"
                  }
                  style={{
                    width: "fit-content",
                    maxWidth: "350px",
                    // width: "350px",
                  }}
                >
                  {side ? null : (
                    <img
                      src={male_avatar}
                      height="50px"
                      width="50px"
                      alt="male_avatar"
                    />
                  )}
                  <p
                    className="fs-6 small text-start mb-0 text-break"
                    style={{
                      // width: "350px",
                      // width: "fit-content",
                      maxWidth: "350px",
                    }}
                  >
                    {message}
                  </p>
                </div>
              </div>
              // [message]
            );
          })}
    </div>
  );
};

export default Message;
