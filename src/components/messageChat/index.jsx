export const MessageChat = ({ message, color }) => {
  let messageType = false;
  const imageDataUrl = `data:image/png;base64,${message}`;
  return (
    <div className={`block h-fit max-w-sm rounded-md ${color} p-4`}>
      {messageType === "IMAGE" ? (
        <img src={imageDataUrl} alt="media" />
      ) : (
        <p className="break-words">
          {typeof message === "string" ? message : ""}
        </p>
      )}

      {/* <p className="break-words">{message}</p> */}
    </div>
  );
};
//
