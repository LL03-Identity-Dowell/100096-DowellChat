import roomProfileImage from "../../assets/images/avatar.png";

export const Room = ({
  roomId,
  roomName,
  fetchRoomMessages,
  setRoomSessionId,
}) => {
  return (
    <div
      onClick={() => {
        setRoomSessionId(roomName);
        fetchRoomMessages(roomId);
      }}
      className={`flex min-w-fit items-center hover:cursor-pointer gap-3 mb-3`}
    >
      <div className="rounded-full w-12 h-12">
        <img src={roomProfileImage} alt="profile" />
      </div>
      <div className="flex flex-col gap-1 items-start">
        <span className="font-bold text-lg">{roomId}</span>
        <p>{roomName}</p>
      </div>
    </div>
  );
};
