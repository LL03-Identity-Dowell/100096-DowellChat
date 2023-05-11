import React from "react";
import { useEffect, useState } from 'react'
import axios from 'axios';
import  './button.css'

const Buttons = () => {

  
    const [productList, setProductList] = useState([])
    

    useEffect(() =>{
        axios.get(`https://100096.pythonanywhere.com/product_list/`)
        .then( res => {
            console.log('getting products')
            // const { } = productList
            setProductList(res.data.product_list)
        })
        .catch(err => {
            console.log('error')
        })
    }, [])

  return (
    <div className="container"> 
    <div className="d-flex flex-nowrap">
      <div className="d-flex flex-nowrap gap-2 scroll text-nowrap py-3">

  {productList.map(product => <button key={product} type="button" className="btn btn-sm btn-success">{product}</button>)}

        {/* <button type="button" className="btn btn-sm btn-success">
          Login
        </button> */}
        {/* <button type="button" className=" btn btn-sm btn-danger">
          Extension
        </button>
        <button type="button" className="btn btn-success btn-sm fs-6">
          Living-Lab-Admin
        </button>
        <button
          type="button"
          className="btn btn-sm border-danger border-3 btn-block"
        >
          Sales-Agent
        </button>
        <button type="button" className="btn btn-sm btn-success">
          DoWell CSC
          <small className="bg-primary text-white px-2 py-1 rounded">
            {"99"}
          </small>
        </button> */}
      </div>
    </div>
    </div>

  )
}

//   return (
//     <div className="">
//       <div className="d-flex flex-wrap gap-2 overflow-x-auto">
//         <button type="button" className="btn btn-sm btn-success">
//           Login
//         </button>
//         <button type="button" className=" btn btn-sm btn-danger">
//           Extension
//         </button>
//         <button type="button" className="btn btn-success btn-sm fs-6">
//           Living-Lab-Admin
//         </button>
//         <button
//           type="button"
//           className="btn btn-sm border-danger border-3 btn-block"
//         >
//           Sales-Agent
//         </button>
//         <button type="button" className="btn btn-sm btn-success">
//           DoWell CSC
//           <small className="bg-primary text-white px-2 py-1 rounded">
//             {"99"}
//           </small>
//         </button>
//       </div>
//     </div>
//   );
// };

export default Buttons;
