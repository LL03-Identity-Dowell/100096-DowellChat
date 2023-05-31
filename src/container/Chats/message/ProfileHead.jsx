import React, { useContext, useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import user from "../../../assets/avatar.png";
import ChatIcons from "./ChatIcons";
import Message from "./Message";
import ProductContext from "../../ContextProvider/DataContext";
import ReplyChat from "./ReplyChat";
import axios from "axios";
import SearchBar from "../SearchBar";
import ScrollBar from "./ScrollBar";
const ProfileHead = ({ chatHeader }) => {
  const { rooms, room_Id } = useContext(ProductContext);
  const [result, setResult] = useState([]);

  return (
    <div className="container-lg" style={{ gap: "2rem" }}>
      <div className="">
        <div className="w-full d-flex gap-3 align-items-center border-bottom my-0 my-md-0 my-lg-0 my-xl-0 my-xxl-0 justify-content-between">
          <figure className="d-flex gap-3  align-items-center">
            <img src={user} className=" image-style" />
            <small
              className="bg-success rounded"
              style={{
                position: "absolute",
                height: "7px",
                width: "7px",
                marginLeft: "2.7rem",
                marginTop: "1.9rem",
              }}
            ></small>
            <div className="d-flex flex-column">
              <small className="fs-6 fw-extrabold">
                {room_Id ? (
                  <small className="fs-6 fw-bold">{room_Id}</small>
                ) : (
                  <small className="fs-6 fw-bold">42</small>
                )}
              </small>
              <small className="text-primary text-nowrap">Active now</small>
            </div>
          </figure>
          <ChatIcons />
        </div>
      </div>

      {/* <ReplyChat /> */}
      <ScrollBar message={result} />

      {/* <Message /> */}
      {/* <ReplyChat /> */}
    </div>
  );
};

export default ProfileHead;
