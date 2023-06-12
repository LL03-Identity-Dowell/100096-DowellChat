import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

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
  const [orgId, setOrgId] = useState("");

  let [searchParams, setSearchParams] = useSearchParams();
  // let [searchParams] = useSearchParams();
  console.log(searchParams);
  // const date = new Date();
  // console.log("date", date);
  // for (const entry of searchParams.entries()) {
  //   const [param, value] = entry;
  // }
  // console.log([...searchParams]);
  const params = Object.fromEntries([...searchParams]);
  console.log("mounted", params);
  useEffect(() => {
    const currentParams = Object.fromEntries([...searchParams]);
    console.log(currentParams);
    setSearchParams({
      // sort: "name",
      // order: "ascending",
      session_id: "5p8do0ht7no4gyjo0w2984o4vj5dc2hs",
    });
  }, [searchParams]);
  useEffect(() => {
    const getSessionId = async () => {
      const res = await axios.post(
        "https://100093.pythonanywhere.com/api/userinfo/",
        searchParams
      );
      console.log("res.data", res);
      setOrgId(res?.data?.selected_product?.orgid);
      setUserInfo(res?.data?.userinfo);
      // console.log("organizations id", res?.data?.selected_product?.orgid);
    };
    getSessionId();
  }, []);
  console.log("searchParams", searchParams);
  console.log(`this is the organization ${orgId}`);

  useEffect(() => {
    const createRooms = async () => {
      const res = await axios.get(
        "https://100096.pythonanywhere.com/dowell-api/create-room/Login/?e0swj8kzqq3h87hagqs2b1i7kp1yqerw"
      );
      console.log("createRoom response", res, { status: 200 });
    };
    createRooms();
  }, []);

  // console.log("chatHeader from context", chatHeader);
  // const onSetChatHeader = (header) => setChatHeader(header);
  // const myMessage = [{ name: "usman" }];
  // console.log(room, "room");
  // console.log(room_Id);
  // console.log(messages, "messages");
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
  const sessionId = {
    session_id: "5p8do0ht7no4gyjo0w2984o4vj5dc2hs",
  };
  useEffect(() => {
    const getRooms = async (title) => {
      try {
        const BASE_URL = `https://100096.pythonanywhere.com/room_list/${chatHeader}/${orgId}/`;
        const res = await axios.get(BASE_URL);

        // console.log(`res.data from messages${chatHeader}`, res?.data?.messages);
        // console.log(`res.data from messages${chatHeader}`, res?.data);
        // console.log("response from get rooms", res?.data);
        setRooms(res?.data);
        // setMessages(res)
        setRoom(res?.data);
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

  // useEffect(() => {
  //   const url = "https://100093.pythonanywhere.com/api/userinfo";
  //   const getInfo = async () => {
  //     const res = await axios.get(url);
  //     console.log("response", res);
  //   };
  //   getInfo();
  // }, []);

  useEffect(() => {
    const url = `https://100096.pythonanywhere.com/send/${room_Id}/`;
    const getMessages = async () => {
      const res = await axios.get(url);
      console.log("response", res);
      setMessages(res?.data);
    };
    getMessages();
  }, [room_Id]);
  // const url = "https://100093.pythonanywhere.com/api/userinfo/";
  // useEffect(() => {
  //   const getUserInfo = async () => {
  //     const res = await axios.post(url, sessionId);
  //     setUserInfo(res?.data?.userinfo);
  //   };
  //   getUserInfo();
  // }, []);
  // console.log("userInfo", userInfo);

  useEffect(() => {
    const getSessionId = async () => {
      try {
        // const res = await axios.post(
        //   "https://100096.pythonanywhere.com/send_message/42"
        // );
        const res = await axios.get("https://100096.pythonanywhere.com/");
        // roomId would be placed in the url
        console.log(res);
      } catch (error) {
        console.log(error.message);
      }
    };
    getSessionId();
  }, []);

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

  // handleProductClick();
  // }, []);
  // console.log(click);
  useEffect(() => {
    const clientProductList = async () => {
      const res = await axios.get(
        "https://100096.pythonanywhere.com/client_product_list"
      );
      // console.log(productList, res);
    };
    clientProductList();
  }, []);
  // useEffect(() => {
  const getMessages = async (message) => {
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

  // useEffect(() => {
  //   const getSentMessages = async () => {
  //     try {
  //       const res = await axios.get(
  //         "https://100096.pythonanywhere.com/send_message/42/"
  //       );
  //       // console.log(res?.data, "response2");
  //       setMessages(res?.data);
  //     } catch (error) {
  //       console.log(error.message);
  //     }
  //   };
  //   getSentMessages();
  // }, []);

  const setData = (message) => setData;
  // getMessages()
  // }, []);
  // console.log(message, "age");
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
        // handleSendMessage,
        getMessages,
        setData,
        sessionId,
        searchParams,
        // getRooms,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;
