import React from 'react'
import { useState } from 'react';

const today = new Date();
const date = today.setDate(today.getDate()); 
const defaultValue = new Date(date).toISOString().split('T')[0]

const Aepsreport = () => {

  const [Date, setDate] = useState('')
  const handleChange = (e) => {
    setDate(e.target.value);
  }
  return (
    <div className='p-4'>
       <div className=' bg-gray-500 p-4 pb-6 px-6'>
          <h1 className='text-3xl font-black p-0 text-white border-b-4'>Update Member Details</h1>
      

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
                 <table className="w-full text-sm text-left rtl:text-right mt-2 border border-black text-gray-500 dark:text-gray-400 border-collapse ">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr className='border border-black'>
                      <th scope="col" className="px-6 py-3 border border-black">SNO</th>
                      <th scope="col" className="px-6 py-3 border border-black">Shop Name</th>
                      <th scope="col" className="px-6 py-3 border border-black">Transaction ID</th>
                      <th scope="col" className="px-6 py-3 border border-black">Mobile No</th>
                      <th scope="col" className="px-6 py-3 border border-black">Transaction Type</th>
                      <th scope="col" className="px-6 py-3 border border-black">UTR</th>
                      <th scope="col" className="px-6 py-3 border border-black">Amount</th>
                      <th scope="col" className="px-6 py-3 border border-black">Charge</th>
                      <th scope="col" className="px-6 py-3 border border-black">Commission</th>
                      <th scope="col" className="px-6 py-3 border border-black">Transaction Status</th>
                      <th scope="col" className="px-6 py-3 border border-black">Transaction Date</th>
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

export default Aepsreport
