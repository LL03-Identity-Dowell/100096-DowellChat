import React, { useState, useEffect } from "react";
import ReplyChat from "./ReplyChat";
import axios from 'axios'

const Message = () => {
  const [message, setMessage] = useState(true); 

  function ChatRoom(props) {
  const [messages, setMessages] = useState([]);
  const [roomPk, setRoomPk] = useState("");
  const [roomid, setRoomId] = useState()

  useEffect(() => {
    // Make API call to retrieve sent messages for the current room
    axios.get(`https://100096.pythonanywhere.com/send_message/<int:pk>/?room_id=${3}`)
    
      .then(response => {
        console.log(response, "This is not working")

        setMessages(response.data.messages);
        setRoomPk(response.data.room_pk);
      })
      .catch(error => console.error(error));
  }, [props.roomId]);

  return (
    <div>
      <h2>Chat Room {roomPk}</h2>
      <ul>
        {messages.map(message => (
          <li key={message.id}>
            <p>{message.message}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

  return (
    <div className="">
      <div className="d-flex justify-content-end ">
        {message ? (
          <div
            className="bg-primary text-white rounded d-flex align-items-center align-self-end"
            style={{
              width: "auto",
              height: "40px",
              listStyle: "none",
              marginTop: "8rem",
            }}
          > { message.length  ?  (<li className="mx-3">{message} </li>) : null}
            
          </div>
        ) : null}
      </div>
      {/* <ReplyChat /> */}
    </div>
  );
};

export default Message;
