import React, { useContext, useEffect, useState } from "react";
import img from "../../../assets/avatar.png";
import ProductContext from "../../ContextProvider/DataContext";
import { Loader } from "../../spinner/loader";
// import { Spinner } from "phosphor-react";
const Rooms = ({ results }, index) => {
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
        className="d-flex flex-column justify-content-start gap-4  rounded"
        // onClick={() => console.log("clicked")}
      >
        {rooms?.rooms?.length <= 0 ? (
          <h1 className="text-muted fs-5">No Rooms available</h1>
        ) : loading ? (
          <Loader />
        ) : (
          rooms?.rooms?.map(({ room_id, room_name }) => {
            return (
              <button
                key={room_id}
                style={{
                  border: "none",
                  background: active ? style : "transparent",
                }}
                className="d-flex mx-2"
                onClick={() => {
                  setIds(room_id);
                  setActive(!active, room_id);
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
