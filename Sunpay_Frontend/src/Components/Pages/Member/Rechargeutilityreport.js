import React from 'react'
import { useState, useEffect } from 'react';

const today = new Date();
const date = today.setDate(today.getDate()); 
const defaultValue = new Date(date).toISOString().split('T')[0]

const Rechargeutilityreport = (props) => {
    const [Date, setDate] = useState('')
    const handleChange = (e) => {
    setDate(e.target.value);
  };

  return (
    <div>
      <div className='Rechargehistory p-4'>
        <div className='bg-slate-300 p-2 border-2 border-red-200'>
          <h1 className=' font-bold text-2xl border-b-2 border-gray-400'>RECHARGE  SUMMARY</h1>
          
          <div className='md:flex md:flex-wrap md:gap-8 mt-4'>
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


            {/* Select Member ID */}
            <div>
              <label htmlFor="banks" className='text-lg'>Member ID</label>
            <select id="banks" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option selected>Select Member ID</option>
              <option value="icicibnk">ICICI Bank(664005500851)</option>
            </select>
            </div>

            {/* Submit button */}
            <div className="col-md-3">
              <label htmlFor=""></label><br />
              <input type="submit" name="submit" className='border border-gray-300 bg-blue-600 text-white text-sm rounded-lg  block w-full p-2.5 hover:cursor-pointer'/>
            </div>

          </div>
        </div>

        <div className='bg-slate-300 p-2 mt-8  border-2 border-red-200'>
        <h1 className=' font-bold text-2xl border-b-2 border-gray-400'>RECHARGE HISTORY</h1>

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
                        <th scope="col" className="px-6 py-3 border border-black">Transaction ID</th>
                        <th scope="col" className="px-6 py-3 border border-black">Customer Mobile No</th>
                        <th scope="col" className="px-6 py-3 border border-black">Reference Mobile Number</th>
                        <th scope="col" className="px-6 py-3 border border-black">Operator</th>
                        <th scope="col" className="px-6 py-3 border border-black">Operator ID</th>
                        <th scope="col" className="px-6 py-3 border border-black">Reflecting Refrence No</th>
                        <th scope="col" className="px-6 py-3 border border-black">Amount</th>
                        <th scope="col" className="px-6 py-3 border border-black">Charge</th>
                        <th scope="col" className="px-6 py-3 border border-black">Comission</th>
                        <th scope="col" className="px-6 py-3 border border-black">Transfer Date</th>
                        <th scope="col" className="px-6 py-3 border border-black">Status</th>
                        <th scope="col" className="px-6 py-3 border border-black">Receipt</th>
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
    </div>
  )
}

export default Rechargeutilityreport
