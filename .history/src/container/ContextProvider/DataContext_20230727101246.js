import { createContext, useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useParams, useSearchParams } from "react-router-dom";
import { Loader } from "../spinner/loader";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";
import { Browser } from "phosphor-react";
const ProductContext = createContext();

export const AppProvider = ({ children }, session_id, split) => {
  const [roomList, setRoomList] = useState({});
  const [click, setClick] = useState(null);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState();
  const [chatHeader, setChatHeader] = useState("Login" | "");
  const [rooms, setRooms] = useState();
  const [userInfo, setUserInfo] = useState();
  const [userInfoAlternate, setUserInfoAlternate] = useState();
  const [userId, setUserId] = useState("" | null);
  const [room, setRoom] = useState([]);
  const [message, setMessage] = useState();
  const [room_Id, setRoom_Id] = useState("" | null);
  const [roomsId, setRoomsId] = useState();
  const [orgId, setOrgId] = useState("");
  const [Id, setId] = useState("");
  const queryClient = new QueryClient();
  let [searchParams, setSearchParams] = useSearchParams();

  const sessionId = {
    session_id: "4sjl7vrpycwauvueewhqrme0u5vqnnmj",
  };

  // useEffect(() => {
  //   const param = window.location.href.split("?")[1].split("=")[1];
  //   sessionId.session_id = param;
  //   // if (param.has("session_id")) {
  //   //   // sessionId.session_id = param.get("session_id");
  //   //   console.log("Helllo there", param.get("session_id"));
  // }, []);

  const params = Object.fromEntries([...searchParams]);
  useEffect(() => {
    const currentParams = Object.fromEntries([...searchParams]);
    setSearchParams(sessionId);
  });
  useEffect(() => {
    const getSessionId = async () => {
      // setTimeout(() => setLoading(true), 5000);
      setLoading(true);
      // setLoading(true);
      const res = await axios.post(
        "https://100093.pythonanywhere.com/api/userinfo/",
        searchParams
      );
      setUserInfoAlternate(res?.data?.userinfo);
      setOrgId(res?.data?.selected_product?.orgid);
      setLoading(false);
    };
    getSessionId();
  }, [searchParams]);
  // useEffect(() => {
  //   const getSessionIds = async () => {
  //     const res = await axios.post(
  //       "https://100093.pythonanywhere.com/api/userinfo/",
  //       {
  //         session_id: Id,
  //       }
  //     );
  //     // console.log("res", res);
  //     setUserInfo(res?.data?.userinfo);
  //   };
  //   getSessionIds();
  // }, [Id, room_Id]);
  useEffect(() => {
    const getSessionIds = async () => {
      // setTimeout(() => setLoading(true), 5000);
      setLoading(true);

      const res = await axios.post(
        "https://100093.pythonanywhere.com/api/userinfo/",
        {
          session_id: Id,
        }
      );
      setUserInfo(res?.data?.userinfo);
      setLoading(false);

      // console.log("res", res);
    };
    getSessionIds();
  }, [Id]);

  // console.log("data from session_id", data);
  // const getNotifications = async () => {
  //   const res = await axios.get(
  //     "https://100092.pythonanywhere.com/api/v1/notifications/products/"
  //   );
  //   console.log("respomse", res);
  // };
  // const { status, data, error, isLoading } = useQuery(
  //   {
  //     queryKey: ["session_id"],
  //   },
  //   {
  //     queryFn: () => axios.get(`https://localhost:3000/?=${sessionId}`),
  //   }
  // );
  useEffect(() => {
    const getNotifications = async () => {
      const res = await axios.get(
        "https://100092.pythonanywhere.com/api/v1/notifications/products/"
      );
      // console.log("respomse", res);
    };
    getNotifications();
  }, []);
  // console.log(data);
  // create Room UseEffect
  useEffect(() => {
    const createRooms = async () => {
      const res = await axios.get(
        `https://100096.pythonanywhere.com/create-user-profile/?session_id=4sjl7vrpycwauvueewhqrme0u5vqnnmj`
      );
      // console.log("createRoom response", res);
      setUserId(res?.data?.portfolio?.userID);
    };
    createRooms();
  }, []);

  useEffect(() => {
    const getRooms = async (title) => {
      try {
        const BASE_URL = `https://100096.pythonanywhere.com/room_list1/${chatHeader}/${orgId}/`;
        setLoading(true);
        const res = await axios.get(BASE_URL);
        setRooms(res?.data);
        setLoading(false);
      } catch (error) {
        console.error("error", error);
      }
    };
    getRooms();
  }, [chatHeader, orgId]);

  // useEffect(() => {
  //   const url = `https://100096.pythonanywhere.com/send_message/${room_Id}/`;
  //   const getRoomMessage = async () => {
  //     setLoading(true);
  //     const res = await axios.get(url);
  //     setMessages(res?.data);

  //     setLoading(false);
  //   };
  //   getRoomMessage();
  // }, [room_Id]);
  // useEffect(() => {
  //   const getRooms = async (title) => {
  //     try {
  //       const BASE_URL = `https://100096.pythonanywhere.com/room_list1/${chatHeader}/${orgId}/`;
  //       setLoading(true);
  //       const res = await axios.get(BASE_URL);
  //       setRoomsId(res?.data?.rooms?.[0]?.room_id);
  //       // setRooms(res?.data);
  //       // setLoading(false);
  //     } catch (error) {
  //       console.error("error", error);
  //     }
  //   };
  //   getRooms();
  // }, [chatHeader, orgId]);

  //create a usememo for the messages data
  // const memorizedMessages = useMemo(() => messages, [messages]);
  // const memorizedRooms = useMemo(() => rooms, [rooms]);

  // .get(`https://100096.pythonanywhere.com/admin_product_list/`)

  useEffect(() => {
    const clientProductList = async () => {
      const res = await axios.get(
        "https://100096.pythonanywhere.com/client_product_list"
      );
    };
    clientProductList();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        // productList,
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
        setRoom_Id,
        room_Id,
        userInfo,
        sessionId,
        searchParams,
        loading,
        // memorizedMessages,
        // memorizedRooms,
        // getSessionIds,
        searchParams,
        orgId,
        setLoading,
        setRooms,
        userId,
        Id,
        setId,
        userInfoAlternate,
        roomsId,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;
