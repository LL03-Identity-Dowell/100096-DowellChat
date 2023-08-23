export const Message = ({ message, messageType, color,status }) => {
  const imageDataUrl = `data:image/png;base64,${message}`;
  const shimmer = () => {
    return (
      <div className="h-26 bg-gray-300 rounded w-3/4 animate-pulse"></div>
    )
  }
  return (
    <div className={`block h-fit max-w-sm rounded-md ${color} p-4`}>
      { status ? shimmer : messageType === "IMAGE" ? (
        <img src={imageDataUrl} alt="media" />
      ) : (
        <p className="break-words">{message}</p>
      ) }
    </div>
  )
};
