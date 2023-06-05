import React, { useState, useContext } from "react";
import ReplyChat from "./ReplyChat";
import clsx from "clsx";
import male_avatar from "../../../assets/male_avatar.png";
import ProductContext from "../../ContextProvider/DataContext";
const Message = ({ message }) => {
  // const [message, setMessage] = useState(true);
  const { rooms, messages } = useContext(ProductContext);
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
  const chatStyle = {
    paddingTop: "8rem",
  };

  return (
    <section
      className="container"
      style={{
        chatStyle,
        // background: "purple",
        paddingBottom: "100%",
        paddingTop: "1.5rem",
      }}
    >
      {messages ? (
        messages?.messages?.map(({ message, id, side }) => {
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
          );
        })
      ) : (
        <div>
          <div
            className=""
            id="chat1"
            style={{ borderRadius: "10px", margin: "auto" }}
          >
            <div className="card-body">
              <div className="text-nowrap d-flex flex-row justify-content-end mb-4">
                <div
                  className=" style bg-primary"
                  style={{ padding: "0.5rem 1rem" }}
                >
                  <p className="small mb-0 text-wrap fs-6">
                    Hey, How may I help you ?
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Message;
