import React, { useContext, useEffect, useState } from "react";
import img from "../../../assets/avatar.png";
import ProductContext from "../../ContextProvider/DataContext";
import { Loader } from "../../spinner/loader";
import { useQuery } from "react-query";
import axios from "axios";
// import { Spinner } from "phosphor-react";
const Rooms = ({ results }, index) => {
  const {
    productList,
    roomList,
    rooms,
    getMessage,
    setRooms,
    setRoom_Id,
    setLoading,
    room_Id,
    orgId,
    chatHeader,
    // getRooms,
    loading,
    memorizedRooms,
  } = useContext(ProductContext);
  //  const { status, data, error, isLoading } = useQuery(
  //    ["message", room_Id],
  //    () => getRoomMessage(room_Id),
  //    [room_Id]
  //  );
  // console.log("results", rooms);
  const [roomId, setRoomId] = useState();
  const [active, setActive] = useState("");
  const style = {
    opacity: 50,
  };
  //  useEffect(() => {
  //    const getRooms = async (title) => {
  //      try {
  //        const BASE_URL = `https://100096.pythonanywhere.com/room_list1/${chatHeader}/${orgId}/`;
  //        setLoading(true);
  //        const res = await axios.get(BASE_URL);
  //        setRooms(res?.data);
  //        setLoading(false);
  //      } catch (error) {
  //        console.error("error", error);
  //      }
  //    };
  //    getRooms();
  //  }, [chatHeader, orgId]);
  // const getRooms = async (title) => {
  //   try {
  //     const BASE_URL = `https://100096.pythonanywhere.com/room_list1/${chatHeader}/${orgId}/`;
  //     //  setLoading(true);
  //     const res = await axios.get(BASE_URL);
  //     console.log("rooms", res);
  //     return res?.data;
  //     //  setRooms(res?.data);
  //     //  setLoading(false);
  //   } catch (error) {
  //     console.error("error", error);
  //   }
  // };

  // useEffect(() => {
  //   const getRooms = async () => {
  //     const BASE_URL = `https://100096.pythonanywhere.com/room_list1/${chatHeader}/${orgId}/`;
  //     setLoading(true);
  //     const res = await axios.get(BASE_URL);

  //     // console.log(`res.data from messages${chatHeader}`, res?.data?.messages);
  //     // console.log(`res.data from messages${chatHeader}`, res?.data);
  //     setRooms(res?.data);
  //     setLoading(false);
  //   };
  //   getRooms();
  // }, [chatHeader, orgId, setLoading, setRooms]);
  const getRooms = async () => {
    const BASE_URL = `https://100096.pythonanywhere.com/room_list1/${chatHeader}/${orgId}/`;
    setLoading(true);
    const res = await axios.get(BASE_URL);
    return res?.data;
    // console.log(`res.data from messages${chatHeader}`, res?.data?.messages);
    // console.log(`res.data from messages${chatHeader}`, res?.data);
    // setRooms(res?.data);
    // setLoading(false);
  };
  const { data, isLoading, isSuccess } = useQuery(
    ["rooms", chatHeader, orgId],
    () => getRooms(orgId, chatHeader),
    [chatHeader, orgId]
  );
  // console.log("data fetched", data);

  if (isLoading) {
    return <Loader />;
  }
  if (isSuccess) {
    console.log(data);
  }

  // console.log(roomId);
  const setIds = (room_id) => {
    // setRoomId(room_id);
    setRoom_Id(room_id);
    // getRooms(room_Id);
  };
  // useEffect(() => {
  //   getMessage();
  // }, []);
  return (
    <section className="my-3">
      <div
        className="d-flex flex-column justify-content-start gap-4+
          rounded"
        // onClick={() => console.log("clicked")}
      >
        {data?.rooms?.length <= 0 ? (
          <h1 className="text-muted fs-5">No Rooms available</h1>
        ) : (
          data?.rooms?.map(({ room_id, room_name }) => {
            return (
              <button
                key={room_id}
                style={{
                  border: "none",
                  background: active ? style : "transparent",
                }}
                className="d-flex align-items-center gap-2"
                onClick={() => {
                  setIds(room_id);
                  // setActive(!active, room_id);
                }}
              >
                <figure className="d-flex ">
                  <img
                    src={img}
                    height="50px"
                    width="50px"
                    className="mx-2"
                    alt="male_avatar"
                  />
                </figure>
                <p className="d-flex flex-column" style={{ color: "black" }}>
                  <small className="fw-bold fs-6 text-start">{room_id}</small>
                  <small className="text-overflow">{room_name}</small>
                </p>
              </button>
            );
          })
        )}
      </div>
    </section>
  );
};

export default Rooms;
