import React from 'react'
import img from '../../assets/images/icons8-x-48.png'
const CustomPopUp = ({isLoading,showPopup,rooms},) => {
    console.log(rooms)
    const [active,setActive] = React.useState(false)
    const [value,setValue] =  React.useState('')
    console.log(value)
    const handleForm = (event) => {
      event.preventDefault()
        setActive(!active)
      }
  return (
    <div>
      <div className="flex overflow-auto fixed flex-col gap-10 justify-center items-center bg-gray-100 rounded-lg top-1/2 left-1/2 h-96 max-w-96 shadow-lg -translate-x-1/2 -translate-y-1/2">
            {/* <span className="font-bold text-3xl text-black">
              Available Ids
            </span> */}
            {/* <div className='mt-6 text-green-600'> */}
              <img src={img} alt="" />
            {/* </div> */}
            <div className="mt-5">
                {
                    rooms?.map(({session_id
                    })=> <p className='mb-3' onClick={(event)=>setValue(session_id)}>{session_id}</p>)
                }
            </div>
            <div className="">
                <form action="" onSubmit={handleForm}>
                <input type="text" placeholder="Type here" value={value} className="p-2 rounded-md" />
                    <button className='bg-blue-600 text-white py-2 px-4 rounded-r-md'>Next</button>
                </form>
            </div>
            <div className="flex justify-evenly items-center w-[30rem]">
              <button
                className="bg-blue-500 text-white px-4 py-2 w-36 rounded-md shadow-md "
                onClick={showPopup}
              >
                Cancel
              <img src={img} alt="" size={20}/>
              </button>
              {/* <button
                className="bg-red-400 text-white px-4 py-2 w-36 rounded-md shadow-md"
                // onClick={handleRoomDelete}
              >
                Delete
              </button> */}
            </div>
          </div>
    </div>
  )
}

export default CustomPopUp
