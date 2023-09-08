import { useState } from "react";
import { NavLink } from "react-router-dom";
import roomProfileImage from "../../assets/images/avatar.png";

export const Room = ({
  roomId,
  roomName,
  fetchRoomMessages,
  intervalId,
  setIntervalId,
  name,
  selected,
  active,
  setActive,
  setMyId,
  myId
}) => {
  return (
    <div
      onClick={() => {
        setMyId(name)
        setActive(roomId)
        clearInterval(intervalId);
        setIntervalId(
          setInterval(() => {
            fetchRoomMessages(roomId);
          }, 5000)
        );
        fetchRoomMessages(roomId);
      }}
      className={`flex nav min-w-fit items-center hover:cursor-pointer gap-3 mb-3 ${
        active == roomId ? "bg-gray-200 rounded-md" : null
      }
      `}
    >
      <div className="rounded-full w-12 h-12">
        <img src={roomProfileImage} alt="profile" />
      </div>
      <div className="flex flex-col gap-1 items-start">
        <span className="font-bold text-lg">{name}</span>
        <p>{roomName}</p>
      </div>
    </div>
  );
};
