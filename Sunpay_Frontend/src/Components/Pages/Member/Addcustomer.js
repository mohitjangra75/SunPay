import React from 'react'
import { useState } from 'react'

const Addcustomer = () => {

    const [name,setname] = useState();
    const [mobile, setmobile] = useState();

    const handleclick = event => {
        
      }

  return (
    <div className='addbeneficiary text-lg p-4'>
        <div className='bg-slate-300 p-2 border-2 font-black border-red-200'>
            <div className='mt-4 flex gap-4'>
                <label className="mt-2 text-white w-40 text-2xl">Customer Name</label><br/>
                <input className=" text-xl px-4 border border-solid border-gray-300 rounded" onChange={(e) => setname(e.target.value)} type="number" placeholder="Enter Customer NO" />
            </div>

            <div className='mt-4 flex gap-4'>
                <label className="mt-2 text-white w-40 text-2xl">Customer Mobile No.</label><br/>
                <input className=" text-xl px-4 border border-solid border-gray-300 rounded" onChange={(e) => setmobile(e.target.value)} type="number" placeholder="Enter Customer NO" />
            </div>

            <div className='mt-4'>
              {/* Palindrop API Account verify */}
                <button onClick={handlesubmit} className='border border-gray-300 text-white text-xl rounded-lg block p-2 mt-4 bg-blue-500 ' type="submit">Submit</button>
            </div>
        </div>
    </div>
  )
}

export default Addcustomer
