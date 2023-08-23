import React from "react";
export const Header = ({rooms}) => {
  const [active,setActive] = React.useState(false)
  const handlePopSubmit = (e) =>  {
    e.preventDefault()
    setActive(!active)
  }
  return (
    <div className="flex h-fit justify-between p-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-[#0D7832] font-bold lg:text-2xl md:text-2xl sm:text-xl">
          Chat Response
        </h1>
        <span>Respond to messages, set up automations and more</span>
      </div>
      <div className="flex gap-3">
        <button
          className="flex gap-1 bg-[#E9EFF3] p-2 items-center justify-center rounded-md h-12 w-32 btn"
          onClick={() => window.my_modal_3.showModal()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Available
        </button>
        <button className="flex gap-1 bg-[#E9EFF3] p-2 items-center justify-center rounded-md h-12">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z"
            />
          </svg>
        </button>
      </div>
      <dialog id="my_modal_3" className="modal">
        <form method="dialog" className="modal-box">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
          <h3 className="font-bold text-lg mb-2">Available RoomIds !</h3>
          <span className="">
            {rooms?.map  (({session_id,id})=>
            <p key={session_id} className="bg-gray-100 mb-2 px-2 py-4 rounded font-bold">
              {session_id}
            </p>
          )}
          </span>
         <div className={`mt-5  ${active ?  null : "flex justify-end" }`}>
          {
            active ? (
              <form>
                <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                <button className="btn btn-md ml-2 btn-primary" onClick={handlePopSubmit}>Add</button>
              </form>
            ) :  <a className="px-6 py-2 cursor-pointer rounded-lg text-white text-center bg-primary" onClick={()=>setActive(!active)}>Add</a>
          }
         </div>
        </form>
      </dialog>
    </div>
  );
};
