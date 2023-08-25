import React from 'react'
import img from '../../assets/images/icons8-x-48.png'
const CustomPopUp = ({isLoading,showPopup,rooms,title},) => {
    const [active,setActive] = React.useState(false)
    const [value,setValue] =  React.useState('')
    const [next,setNext] = React.useState(false)
    const handleForm = (event) => {
      event.preventDefault()
        setActive(!active)
      }
      const handleNextPopUP = () => {
        setNext(!next)
      }
  return (
      <div className={`flex overflow-auto fixed flex-col gap-10 justify-center items-center bg-gray-100 rounded-lg top-1/2 left-1/2 h-96 ${next ? "w-1/2" : 'max-w-96'} shadow-lg -translate-x-1/2 -translate-y-1/2`}>
       {
        next ? <>
        <form action="">
          <input type="text"  placeholder='product name...' className='p-2 rounded-md'/>
        </form>
        </> : (
          <>
             <div>
          <h1>{title}</h1>
        </div>
            <div className="mt-5">
                {
                    rooms?.map(({session_id
                    })=> <p key={session_id} className='mb-3' onClick={()=>setValue(session_id)}>{session_id}</p>)
                }
            </div>
            <div className="">
                <form action="" onSubmit={handleForm}>
                <input type="text" placeholder="Type here" value={value} onChange={(e)=>setValue(e.target.value)} className="p-2 rounded-md" />
                    <button className='bg-blue-600 text-white py-2 px-4 rounded-r-md' onClick={handleNextPopUP}>Next</button>
                </form>
            </div>
            <div className="flex justify-evenly items-center w-[30rem]">
              <button
                className="bg-blue-500 text-white mb-3 px-4 py-2 w-36 rounded-md shadow-md "
                onClick={showPopup}
              >
                Cancel
              </button>
            </div>
          </>
        )
       }
          </div>
  )
}

export default CustomPopUp
