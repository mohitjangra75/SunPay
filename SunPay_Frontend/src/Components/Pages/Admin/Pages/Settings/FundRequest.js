import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';

const today = new Date();
const date = today.setDate(today.getDate()); 
const defaultValue = new Date(date).toISOString().split('T')[0]

const FundRequest = () => {

  const [Date, setDate] = useState('')
  const handleChange = (e) => {
  setDate(e.target.value);
};


  return (
    <div className='p-4'>
      <div className='p-4 bg-gray-500 pb-6'>
      <div className='mt-4'>
          <div className='datefetch md:flex md:flex-wrap gap-6'>
            {/* From Date */}
            <div className="col-md-3">
              <label htmlFor="Payment date">From Date</label>
              <input id="dateRequired" type="date" onChange={handleChange} name="dateRequired" defaultValue={defaultValue} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'/>
              {/* <input type="date" onChange={handleChange} ref={dateInputRef} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'/> */}
            </div>
            
            {/* TO Date */}
            <div className="col-md-3">
              <label htmlFor="Payment date">To Date</label>
              <input id="dateRequired" type="date" onChange={handleChange} name="dateRequired" defaultValue={defaultValue} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'/>
              {/* <input type="date" onChange={handleChange} ref={dateInputRef} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'/> */}
            </div>
          </div>

          <div className='mt-4'>
            <div className =" relative overflow-x-auto shadow-md border-black ">
                 <table className=" text-sm text-left rtl:text-right mt-2 border border-black text-gray-500 dark:text-gray-400 border-collapse ">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr className='border border-black'>
                      <th scope="col" className="px-6 py-3 border border-black">SNO</th>
                      <th scope="col" className="px-6 py-3 border border-black">Status</th>
                      <th scope="col" className="px-6 py-3 border border-black">Action</th>
                      <th scope="col" className="px-6 py-3 border border-black w-56">Company Bank Name</th>
                      <th scope="col" className="px-6 py-3 border border-black">Amount</th>
                      <th scope="col" className="px-6 py-3 border border-black">Bank Reference ID</th>
                      <th scope="col" className="px-6 py-3 border border-black">Payment Date</th>
                      <th scope="col" className="px-6 py-3 border border-black">Payment Mode</th>
                      <th scope="col" className="px-6 py-3 border border-black">Shopname, <br />ID, <br />Mobile-No.</th>
                      <th scope="col" className="px-6 py-3 border border-black">Transaction Id</th>
                      <th scope="col" className="px-6 py-3 border border-black">Remark</th>
                      <th scope="col" className="px-6 py-3 border border-black">Add Date</th>
                      <th scope="col" className="px-6 py-3 border border-black">Bond</th>
                      <th scope="col" className="px-6 py-3 border border-black">Approve Date</th>
                      <th scope="col" className="px-6 py-3 border border-black">Company Remarks</th>
                      <th scope="col" className="px-6 py-3 border border-black">Slip</th>
                      </tr>
                    </thead>
                  
                    <tbody>
                      <tr className="bg-white border border-black dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                          
                      </tr>
                    </tbody>
                 </table>
            </div>
          </div>
              
            </div>
      </div>
    </div>
  )
}

export default FundRequest
