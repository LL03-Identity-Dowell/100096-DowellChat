export const Message = ({ message, messageType, color,status }) => {
  const imageDataUrl = `data:image/png;base64,${message}`;
  let loading = true
  const shimmer = () => {
    return (
      <div className="h-[500px] bg-gray-300 rounded-lg w-[300px] animate-pulse"></div>
    )
  }
  return (
    <div className={`block h-fit max-w-sm rounded-md ${color} p-4`}>
      { loading ? shimmer : messageType === "IMAGE" ? (
        <img src={imageDataUrl} alt="media" />
      ) : (
        <p className="break-words">{message}</p>
      ) }
    </div>
  )
};
