import React, { useContext, useState } from "react";
import { Tooltip } from "react-tooltip";
import axios from "axios";
// import axios from "axios";
import { FaTrashAlt, FaClipboardList, FaRegEnvelope } from "react-icons/fa";
import { BsExclamationLg } from "react-icons/bs";
import { CiMail } from "react-icons/ci";
import ProductContext from "../../ContextProvider/DataContext";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-hot-toast";
import { MdMessage } from "react-icons/md";
const ChatIcons = () => {
  const { room_Id, sessionId } = useContext(ProductContext);
  const [clicked, setClicked] = useState();

  const delChatRoom = async () => {
    try {
      mutate(sessionId.session_id, room_Id);
      console.log("deleted");
    } catch (error) {
      console.log(error.status);
    }
  };
  const queryClient = useQueryClient();
  const { mutate, isSuccess, isError, error } = useMutation("message", {
    mutationFn: (data) =>
      axios.get(
        `https://100096.pythonanywhere.com/delete-customer-support-room/?session_id=${sessionId.session_id}&room_id=${room_Id}`
      ),
    onSuccess: async (res) => {
      queryClient.invalidateQueries("deleteMessage");
      console.log("mutated response", res);
    },
    onError: (error) => {
      console.log(error);
    },
  });
  if (isSuccess) {
    toast.success("Successfully deleted");
  }
  if (error) {
    // toast.error("failed to delete");
    console.log(error);
  }

  return (
    <div className="mx-3">
      <div className="d-flex gap-3 justify-content-end ">
        <button
          className="text-primary fs-6"
          style={{
            border: "none",
            background: "transparent",
          }}
          data-tooltip-id="my-tooltip"
          data-tooltip-content="Customize"
          data-tooltip-variant="light"
        >
          <FaClipboardList />
          <Tooltip id="my-tooltip" />
        </button>
        <button
          style={{
            border: "none",
            background: "transparent",
          }}
          className="text-primary fs-6"
          data-tooltip-id="my-tooltip"
          data-tooltip-content="Move to spam"
        >
          <BsExclamationLg />
          <Tooltip id="my-tooltip" />
        </button>
        <button
          className="text-primary border-none fs-6"
          type="button"
          style={{
            border: "none",
            background: "transparent",
          }}
          // class="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          data-toggle="modal"
          data-target="#exampleModal"
          data-tooltip-id="my-tooltip"
          data-tooltip-content="Delete conversation"
        >
          <FaTrashAlt />
          <Tooltip id="my-tooltip" />
        </button>

        <button
          className="text-primary fs-6"
          style={{
            border: "none",
            background: "transparent",
          }}
          data-tooltip-id="my-tooltip"
          data-tooltip-content="Mark as unread"
        >
          <FaRegEnvelope />
          <Tooltip id="my-tooltip" />
        </button>
      </div>
      {/* <button
        type="button"
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button> */}

      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content modal-center">
            <div className="modal-header">
              <h5
                className="modal-title text-black text-center"
                id="exampleModalLabel"
              >
                Delete Chat
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body text-center">
              <p className="d-flex gap-3 text-black align-items-center">
                <MdMessage size={25} />
                Are you sure that you want to delete
              </p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary d-flex align-items-center gap-3"
                onClick={delChatRoom}
                data-bs-dismiss="modal"
              >
                <FaTrashAlt />
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatIcons;

{
  /* <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
  Launch demo modal
</button> */
}
