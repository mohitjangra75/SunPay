import React, { useState } from 'react'

const Addbank = () => {

  const[bank, setbank] = useState();
  const[isactive, setisactive] = useState();

  function addbank(e){
    
  }

  return (
    <div className='p-4'>
      <div className=' bg-gray-500 p-4 pb-6'>
        <h1 className='text-3xl font-black text-white border-b-4'>Add Bank</h1>
        <div className='mt-4 flex gap-4'>
          <label className="mt-2 text-white text-2xl">Bank Name :</label>
          <input className=" text-xl px-4 border border-solid border-gray-300 rounded" onChange={(e) => setbank(e.target.value)} type="text" placeholder="Enter Bank Name" />
        </div>
        <div className='mt-4 flex gap-4'>
          <label className="mt-2 text-white text-2xl">IFSC Code :</label>
          <input className=" text-xl px-4 border border-solid border-gray-300 rounded" onChange={(e) => setbank(e.target.value)} type="text" placeholder="Enter Bank Name" />
        </div>
        <div className='mt-4 flex gap-4'>
          <label className="mt-2 text-white text-2xl">IS Active : </label>
          <input className="mt-4 text-2xl" onChange={(e) => setisactive(e.target.value)} type="checkbox" />
        </div>
        <div className='mt-4 flex gap-4'>
          <button onClick={addbank} className=" bg-blue-600 hover:bg-blue-700 px-6 py-3 text-white uppercase rounded text-xl tracking-wider" type="submit">Add</button>
        </div>
      </div>
    </div>
  )
}

export default Addbank
