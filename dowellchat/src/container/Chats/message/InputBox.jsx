import React, {useState} from "react";
import axios from "axios";
import {FaPaperPlane
} from "react-icons/fa";
  
//   return (
//     <div>
//       <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
//       <button onClick={handleMessageSend}>Send</button>
//     </div>
//   );
// }
const InputBox = (props) => {

  const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([]);
  
  //  const addMessage = (message) => {
  //   setMessage([...message, message]);
  // };

  const handleMessageSend = () => {
    axios.post(`https://100096.pythonanywhere.com/send_message/<int:pk>/?room_id=${3}`, {
      message: message,
      user_id: props.userId,
      side: true
    })
    .then(response => {
      console.log(response.data);
      const newMessage = response.data;
    // Add the new message to the chat app state
      setMessages([...messages, newMessage]);
    })
    .catch(error => {
      console.log(error);
    });
    setMessage("");
  };

  return (
    <div>
      {messages.map((message, index) => (
        <div key={index}>
          {/* <span>{message.user_id}: </span> */}
          <span>{message.message}</span>
        </div>
      ))}
      <input
      value={message}
      onChange={(e) => setMessage(e.target.value)}
        className="py-2 px-2 rounded input-"
        type="text"
        placeholder="Reply in Chat..."
        style={{ minWidth: "7rem" }}
      />
      <button onClick={handleMessageSend} className="btn">
                    <FaPaperPlane className="fs-4 text-primary" />
      </button>
    </div>
  );
};

export default InputBox;
