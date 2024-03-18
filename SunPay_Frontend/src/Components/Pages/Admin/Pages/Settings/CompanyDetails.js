import React from 'react'
import { useState } from 'react';

const CompanyDetails = () => {
    const [login_id, setlogin_id] = useState('');
    const [image, setimage] = useState('');
    
    function handleimgchange(e) {
        console.log(e.target.files);
        setimage(URL.createObjectURL(e.target.files[0]));
    }

    function handleupdate(e) {

    }

  return (
    <div className='p-4'>
       <div className=' bg-gray-500 p-4 pb-6'>
            <h1 className='text-3xl font-black text-white border-b-4'>Current Company Details</h1>
            <div className='mt-4'>
                <table className=" text-sm text-left rtl:text-right mt-2 border border-black text-gray-500 dark:text-gray-400 border-collapse ">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr className='border border-black'>
                      <th scope="col" className="px-6 py-3 border border-black">Status</th>
                      <th scope="col" className="px-6 py-3 border border-black">Company Name</th>
                      <th scope="col" className="px-6 py-3 border border-black">Owner Name</th>
                      <th scope="col" className="px-6 py-3 border border-black">Email ID</th>
                      <th scope="col" className="px-6 py-3 border border-black">Mobile</th>
                      <th scope="col" className="px-6 py-3 border border-black">Website URL</th>
                      <th scope="col" className="px-6 py-3 border border-black">Address</th>
                      <th scope="col" className="px-6 py-3 border border-black">Logo</th>
                      <th scope="col" className="px-6 py-3 border border-black">Add Date</th>
                      <th scope="col" className="px-6 py-3 border border-black">Update Date</th>
                      </tr>
                    </thead>
                  
                    <tbody>
                      <tr className="bg-white border border-black dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                          
                      </tr>
                    </tbody>
                 </table>
            </div>

            <h1 className='text-3xl font-black mt-6 text-white border-b-4'>Update Company Details</h1>
            <div className='mt-4'>
            
                <div className='ml-6 flex gap-16 flex-wrap'>
                    <input className=" text-xl px-4 py-2 border border-solid border-gray-300 rounded" onChange={(e) => setlogin_id(e.target.value)} type="text" placeholder="Name of Company" />
                    <input className=" text-xl px-4 py-2 border border-solid border-gray-300 rounded" onChange={(e) => setlogin_id(e.target.value)} type="text" placeholder="Owner Name" />
                    <input className=" text-xl px-4 py-2 border border-solid border-gray-300 rounded" onChange={(e) => setlogin_id(e.target.value)} type="text" placeholder="Email ID" />
                    <input className=" text-xl px-4 py-2 border border-solid border-gray-300 rounded" onChange={(e) => setlogin_id(e.target.value)} type="tel" placeholder="Mobile No" />
                    <input className=" text-xl px-4 py-2 border border-solid border-gray-300 rounded" onChange={(e) => setlogin_id(e.target.value)} type="tel" placeholder="Website URL" />
                    <input className=" text-xl px-4 py-2 border border-solid border-gray-300 rounded" onChange={(e) => setlogin_id(e.target.value)} type="tel" placeholder="Address" />
                    <input type="file" onChange={handleimgchange} className='text-white'/>
                    <button onClick={handleupdate} className=" bg-blue-600 hover:bg-blue-700 px-6 py-3 text-white uppercase rounded text-xl tracking-wider" type="submit">Update</button>

                </div>
            </div>

            
       </div>
    </div>
  )
}

export default CompanyDetails
