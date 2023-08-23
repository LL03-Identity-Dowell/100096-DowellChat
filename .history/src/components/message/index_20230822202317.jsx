export const Message = ({ message, messageType, color }) => {
  const imageDataUrl = `data:image/png;base64,${message}`;
  return (
    <div className={`block h-fit max-w-sm rounded-md ${color} p-4`}>
      { messageType === "IMAGE" ? (
        <img src={imageDataUrl} alt="media" />
      ) : (
        <p className="break-words">{message}</p>
      ) }
    </div>
  )
};
