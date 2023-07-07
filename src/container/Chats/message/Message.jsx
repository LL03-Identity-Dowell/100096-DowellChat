import React, { useState, useContext } from "react";
import ReplyChat from "./ReplyChat";
import clsx from "clsx";
import male_avatar from "../../../assets/male_avatar.png";
import ProductContext from "../../ContextProvider/DataContext";
import { Loader } from "../../spinner/loader";
const Message = ({ message }) => {
  // const [message, setMessage] = useState(true);
  const { rooms, messages, loading, memorizedMessages } =
    useContext(ProductContext);
  const { id } = messages ?? {};
  const messageUser = (id) => {
    switch (id) {
      case id === 28:
        return {
          display: "flex",
          justifyContent: "end",
        };
      case id === 29:
        return {
          display: "flex",
          justifyContent: "start",
        };

      default:
        return null;
    }
  };

  return (
    <div
      // className="appearance-none d-flex flex-column force-overflow"
      style={{
        display: "flex",
        flexDirection: "column",
        height: "200px",
        overflow: "auto",
        marginBottom: "20px",
        paddingTop: "1.5rem",
      }}
    >
      {messages?.messages?.length && rooms?.rooms?.length <= 0
        ? null
        : memorizedMessages?.messages?.map(({ message, id, side }) => {
            return (
              <div
                key={id}
                className={
                  side
                    ? "d-flex w-full justify-end"
                    : "d-flex w-full justify-start"
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
            );
          })}
    </div>
  );
};

export default Message;
