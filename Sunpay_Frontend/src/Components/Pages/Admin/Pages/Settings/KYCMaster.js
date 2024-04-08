import React, { useState } from 'react'

const KYCMaster = () => {

  const [docname, setdocname] = useState();
  function addkycdoc(){

  }
  return (
    <div className='p-4'>
      <div className='bg-gray-500 p-4 pb-6'>
        <h1 className='text-3xl font-black text-white border-b-4'>KYC Documents List</h1>
        <div className='mt-4'>
            <table className=" text-sm text-left rtl:text-right mt-2 border border-black text-gray-500 dark:text-gray-400 border-collapse ">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr className='border border-black'>
                        <th scope="col" className="px-6 py-3 border border-black">S.No</th>
                        <th scope="col" className="px-6 py-3 border border-black">Status</th>
                        <th scope="col" className="px-6 py-3 border border-black">Name</th>
                        <th scope="col" className="px-6 py-3 border border-black">Add Date</th>  
                        <th scope="col" className="px-6 py-3 border border-black">Delete</th>                      
                      </tr>
                    </thead>
                  
                    <tbody>
                      <tr className="bg-white border border-black dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                          
                      </tr>
                    </tbody>
            </table>
        </div>

        <div className='mt-4'>
            <h1 className='text-3xl font-black text-white border-b-4'>Add KYC Documents</h1>
            <div>
              <div className='mt-4 flex gap-4'>
                <label className="mt-2 text-white text-2xl">Name :</label>
                <input className=" border border-solid border-gray-300 rounded" onChange={(e) => setdocname(e.target.value)} type="text" placeholder="Enter KYC Doc. Name" />
                <button onClick={addkycdoc} className=" bg-blue-600 hover:bg-blue-700 px-6 py-3 text-white uppercase rounded text-xl tracking-wider" type="submit">Add</button>
              </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default KYCMaster
