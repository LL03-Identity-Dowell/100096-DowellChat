export const Message = ({ message, messageType, style }) => {
  const imageDataUrl = `data:image/png;base64,${message}`;
  return (
    <div className={`block  max-w-sm ${style} px-6 py-2`}>
      {messageType === "IMAGE" ? (
        <img src={imageDataUrl} alt="media" />
      ) : (
        <p className="break-words">{message}</p>
      )}
    </div>
  );
};
