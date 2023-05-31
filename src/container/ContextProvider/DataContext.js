import { createContext, useEffect, useState } from "react";
import axios from "axios";

const ProductContext = createContext();

export const AppProvider = ({ children }) => {
  const [productList, setProductList] = useState([]);
  const [roomList, setRoomList] = useState({});
  const [click, setClick] = useState(null);
  // const [message, setMessage] = useState("");
  const [messages, setMessages] = useState();
  const [chatHeader, setChatHeader] = useState("");
  const [rooms, setRooms] = useState();
  const [userInfo, setUserInfo] = useState();
  const [room, setRoom] = useState([]);
  const [message, setMessage] = useState();
  const [room_Id, setRoom_Id] = useState("");
  const [roomsId, setRoomsId] = useState();
  console.log("chatHeader from context", chatHeader);
  // const onSetChatHeader = (header) => setChatHeader(header);
  // const myMessage = [{ name: "usman" }];
  console.log(room, "room");
  console.log(room_Id);
  console.log(messages, "messages");
  // const getMessages = async (title) => {
  //   try {
  //     const res = await axios.get(
  //       `https://100096.pythonanywhere.com/room_list/Login`
  //     );

  //     console.log("res.data from context", res?.data);
  //     setRooms(res?.data);
  //   } catch (error) {
  //     console.error("error", error);
  //   }
  // };

  useEffect(() => {
    const getRooms = async (title) => {
      try {
        const BASE_URL = `https://100096.pythonanywhere.com/room_list/${chatHeader}/644f9d104baba28710c128e3/`;
        const res = await axios.get(BASE_URL);

        // console.log(`res.data from messages${chatHeader}`, res?.data?.messages);
        console.log(`res.data from messages${chatHeader}`, res?.data);
        setRooms(res?.data);
        // setMessages(res)
        // setRoom(res?.data);
      } catch (error) {
        console.error("error", error);
      }
    };
    getRooms();
  }, [chatHeader]);
  // const getMessage = async (room_Id) => {
  //   try {
  //     const BASE_URL = `https://100096.pythonanywhere.com/room_list/${chatHeader}/644f9d104baba28710c128e3/`;
  //     const res = await axios.get(BASE_URL);

  //     console.log(`res.data from messages${chatHeader}`, res?.data?.messages);
  //     setRooms(res?.data);
  //     // setRoom(res?.data);
  //   } catch (error) {
  //     console.error("error", error);
  //   }
  // };
  // useEffect(() => {
  //   const BASE_URL = `https://100096.pythonanywhere.com/room_list/Login/644f9d104baba28710c128e3`;
  //   const getRooms = async () => {
  //     const res = await axios.get(BASE_URL);
  //     console.log(res);
  //   };
  //   getRooms();
  // }, []);

  // USER INFO COMPONENT
  const url = "https://100093.pythonanywhere.com/api/userinfo/";
  useEffect(() => {
    const getUserInfo = async () => {
      const res = await axios.post(url, {
        session_id: "5p8do0ht7no4gyjo0w2984o4vj5dc2hs",
      });
      setUserInfo(res?.data?.userinfo);
      console.log(res);
    };
    getUserInfo();
  }, []);
  console.log("userInfo", userInfo);

  const handleSendMessage = async (message) => {
    try {
      // const res = await axios.post(
      //   "https://100096.pythonanywhere.com/send_message/42"
      // );
      const res = await axios.post(
        "https://100096.pythonanywhere.com/room_list/Customer-Support/644f9d104baba28710c128e3/send_message/Extension/"
      );
      // roomId would be placed in the url
      console.log(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    axios
      .get(`https://100096.pythonanywhere.com/admin_product_list/`)
      .then((res) => {
        // console.log("getting products", productList);
        setProductList(res.data.product_list);
      })
      .catch((err) => {
        console.log("error", err);
      });
  }, []);
  // useEffect(() => {
  const productUrl = `https://100096.pythonanywhere.com/room_list/${click}`;
  const handleProductClick = async () => {
    // setSelectedProduct(product);
    const res = await axios.get(productUrl);
    // console.log("this is the response", res);
    const data = res?.data;
    console.log("this is the data", data);
    // const { rooms,firstroom,messages } = data?.data;

    // setRoomList(data);
    // console.log(roomList, "roomList state");
    // console.log("data", roomList);
    // .catch(err => {
    //   console.log('error', err);
    // })
  };
  // handleProductClick();
  // }, []);
  // console.log(click);
  useEffect(() => {
    const clientProductList = async () => {
      const res = await axios.get(
        "https://100096.pythonanywhere.com/client_product_list"
      );
      console.log(productList, res);
    };
    clientProductList();
  }, []);
  // useEffect(() => {
  const getMessages = async (message) => {
    // const user_id = Math.floor(Math.random(0, ...+1));
    try {
      const res = await axios.post(
        `https://100096.pythonanywhere.com/send_message/42/`,
        {
          message,
        }
      );
      console.log(res.data, "response");
      setMessage(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const getSentMessages = async () => {
      try {
        const res = await axios.get(
          "https://100096.pythonanywhere.com/send_message/42/"
        );
        console.log(res?.data, "response2");
        setMessages(res?.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getSentMessages();
  }, []);

  const setData = (message) => setData;
  // getMessages()
  // }, []);
  console.log(message, "age");
  return (
    <ProductContext.Provider
      value={{
        productList,
        message,
        messages,
        roomList,
        click,
        setClick,
        chatHeader,
        setChatHeader,
        rooms,
        setRooms,
        room,
        // getMessage,
        setRoom_Id,
        room_Id,
        userInfo,
        handleSendMessage,
        getMessages,
        setData,
        // getRooms,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;
