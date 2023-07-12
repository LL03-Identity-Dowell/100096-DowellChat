import React, { useContext, useEffect } from "react";
import img from "../../../assets/avatar.png";
import ProductContext from "../../ContextProvider/DataContext";
import { Loader } from "../../spinner/loader";
import axios from "axios";
// import { Spinner } from "phosphor-react";
const Rooms = ({ results }) => {
  const {
    setRoom_Id,
    setRooms,
    rooms,
    setLoading,
    loading,
    chatHeader,
    orgId,
  } = useContext(ProductContext);
  // console.log("results", rooms);
  // const [roomId, setRoomId] = useState();
  // console.log(roomId);
  const setIds = (room_id) => {
    // setRoomId(room_id);
    setRoom_Id(room_id);
    // getRooms(room_Id);
  };
  useEffect(() => {
    const getRooms = async () => {
      const BASE_URL = `https://100096.pythonanywhere.com/room_list1/${chatHeader}/${orgId}/`;
      setLoading(true);
      const res = await axios.get(BASE_URL);

      // console.log(`res.data from messages${chatHeader}`, res?.data?.messages);
      // console.log(`res.data from messages${chatHeader}`, res?.data);
      setRooms(res?.data);
      setLoading(false);
    };
    getRooms();
  }, [chatHeader, orgId, setLoading, setRooms]);

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
        ) : rooms?.rooms?.length <= 0 ? (
          <h1 className="text-muted fs-5">No Rooms available</h1>
        ) : (
          rooms?.rooms?.map(({ room_id, room_name }) => {
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
