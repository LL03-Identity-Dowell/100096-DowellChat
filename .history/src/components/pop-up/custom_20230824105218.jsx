import React from 'react'

const CustomPopUp = ({isLoading,showPopup,rooms}) => {
    console.log(rooms)
    const [active,setActive] = React.useState(false)
    const handlePopUp = () => {
        setActive(!active)
      }
  return (
    <div>
      <div className="flex overflow-auto fixed flex-col gap-10 justify-center items-center bg-gray-100 rounded-lg top-1/2 left-1/2 h-96 max-w-96 shadow-lg -translate-x-1/2 -translate-y-1/2">
            <span className="font-bold text-3xl text-gray-500">
              Available Ids
            </span>
            <div className="mt-5">
                {
                    rooms?.map(({session_id
                    })=> <p className='mb-3'>{session_id}</p>)
                }
            </div>
            <div className="">
                <form action="">
                <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                    <button></button>
                </form>
            </div>
            <div className="flex justify-evenly items-center w-[30rem]">
              <button
                className="bg-blue-500 text-white px-4 py-2 w-36 rounded-md shadow-md "
                onClick={showPopup}
              >
                Cancel
              </button>
              <button
                className="bg-red-400 text-white px-4 py-2 w-36 rounded-md shadow-md"
                // onClick={handleRoomDelete}
              >
                Delete
              </button>
            </div>
          </div>
    </div>
  )
}

export default CustomPopUp
