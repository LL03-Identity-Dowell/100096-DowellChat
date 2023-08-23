export const Message = ({ message, messageType, color,status }) => {
  const imageDataUrl = `data:image/png;base64,${message}`;
  let loading = true
  const shimmer = () => {
    return (
      <div className="h-96bg-gray-300 rounded-lg w-[300px] animate-pulse"></div>
    )
  }
  return (
    <div className={`block h-fit max-w-sm rounded-md ${color} p-4`}>
      {  messageType === "IMAGE" ? (
      loading ? shimmer :  <img src={imageDataUrl} alt="media" />
      ) : (
        <p className="break-words">{message}</p>
      ) }
    </div>
  )
};
