import React, { useContext, useEffect, useState } from "react";
import img from "../../../assets/avatar.png";
import ProductContext from "../../ContextProvider/DataContext";
import { Loader } from "../../spinner/loader";
// import { Spinner } from "phosphor-react";
const Rooms = ({ results }) => {
  const {
    productList,
    roomList,
    rooms,
    getMessage,
    setRoom_Id,
    room_Id,
    getRooms,
    loading,
    memorizedRooms,
  } = useContext(ProductContext);
  // console.log("results", rooms);
  const [roomId, setRoomId] = useState();
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
    <section className="m-3">
      <div
        className="d-flex flex-column justify-content-start gap-4  rounded"
        // onClick={() => console.log("clicked")}
      >
        {loading ? (
          <Loader />
        ) : memorizedRooms?.rooms?.length <= 0 ? (
          <h1 className="text-muted fs-5">No Rooms available</h1>
        ) : (
          memorizedRooms?.rooms?.map(({ room_id, room_name }) => {
            return (
              <button
                key={room_id}
                style={{ border: "none", background: "transparent" }}
                className="d-flex mx-2"
                onClick={() => setIds(room_id)}
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
                  <small className="">{room_name}</small>
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
