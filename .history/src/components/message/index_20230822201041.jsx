import {useState,useEffect} from 'react'
export const Message = ({ message, messageType, color }) => {
  const imageDataUrl = `data:image/png;base64,${message}`;
  const [loading,setLoading] = useState(false)
  useEffect(() => {
  setLoading(true)
  setTimeout(() => {
    setLoading(false)
  }, 3000);
  }, [messageType])
  return (
    <div className={`block h-fit max-w-sm rounded-md ${color} p-4`}>
      {loading ?  messageType === "IMAGE" ? (
        <img src={imageDataUrl} alt="media" />
      ) : (
        <p className="break-words">{message}</p>
      ) : null}
    </div>
  )
};
