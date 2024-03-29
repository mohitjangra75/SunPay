import React from 'react'
import { useRef, useState } from 'react';
import { useEffect } from 'react';

const today = new Date();
const date = today.setDate(today.getDate()); 
const defaultValue = new Date(date).toISOString().split('T')[0]

const Fundrequest = (props) => {  

  const [dataall, setDatall] = useState();  
  useEffect(() => {
    setDatall(props);
    console.log('dataall', dataall);
  }, []);

    console.log('Data from fundrequest', dataall)

  const [Date, setDate] = useState('');
  const dateInputRef = useRef(null);

  const submitfundrequest = (e) => {
    
  };

  const handleChange = (e) => {
    setDate(e.target.value);
  };

  return (
    <div className='Fundrequest p-4'>
      {/* Fund request part */}
      <div className='bg-slate-300 p-2 border-2 border-red-200'>
        <h1 className=' font-bold text-2xl border-b-2 border-gray-400'>FUND REQUEST</h1>
        <div></div>
        <div className='md:flex md:flex-wrap md:gap-8 mt-4'>
           {/* Bank Select */}
          <div>
            <label htmlFor="banks" className='text-lg'>Select a Bank</label>
          <select id="banks" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option selected>Bank List</option>
            <option value="icicibnk">ICICI Bank(664005500851)</option>
            <option value="sbibnk">State Bank of India(42057935640)</option>
            <option value="pnbbnk">Punjab National Bank(6058002100002053)</option>
            <option value="axisbnk">Axis Bank(923020043729544)</option>
          </select>
          </div>
          {/* Balance
          <div className="col-md-3">
             <label htmlFor="Balance">Balance</label><br />
             <input type="text" name="balance" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'/>
          </div> */}
           {/* Amount */}
          <div className="col-md-3">
             <label htmlFor="Amount">Amount</label>
             <input type="text" name="Amount" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'/>

          </div>
           {/* Bank reference number */}
          <div className="col-md-3">
             <label htmlFor="Bank reference">Bank Referance No.</label>
             <input type="text" name="Bank reference" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'/>
          </div>
           {/* Payment mode*/}
          <div className="col-md-3">
             <label htmlFor="Payment mode">Payment Mode</label>
             <select id="paymentmode" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option selected>Select Payment Mode</option>
            <option value="neftrtgs">NEFT/IMPS/RTGS</option>
            <option value="cheque">Cheque/DD</option>
            <option value="cash">Cash</option>
            <option value="upi">UPI</option>
          </select>
          </div>
           {/* Payment Date */}
           <div className="col-md-3">
              <label htmlFor="Payment date">Payment Date</label>
              <input id="dateRequired" type="date" onChange={handleChange} name="dateRequired" defaultValue={defaultValue} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'/>
              {/* <input type="date" onChange={handleChange} ref={dateInputRef} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'/> */}
            </div>
           {/* Remarks */}
            <div className="col-md-3">
              <label htmlFor="remark">Remark</label>
              <input type="text" name="remarks" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'/>

            </div>
          {/* Submit button */}
          <div className="col-md-3">
            <label htmlFor=""></label><br />
            <input type="submit" name="submit" onClick={submitfundrequest} className='border border-gray-300 bg-blue-600 text-white text-sm rounded-lg  block w-full p-2.5 hover:cursor-pointer'/>
          </div>
        </div>
      </div>

      <div className='bg-slate-300 p-2 mt-8 border-2 border-red-200'>
        <h1 className=' font-bold text-2xl border-b-2 border-gray-400'>FUND REQUEST LIST</h1>

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
              <div className =" relative overflow-x-auto shadow-md border-black">
                 <table className="w-full text-sm text-left rtl:text-right mt-2 border border-black text-gray-500 dark:text-gray-400 border-collapse ">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr className='border border-black'>
                      <th scope="col" className="px-6 py-3 border border-black">SNO</th>
                      <th scope="col" className="px-6 py-3 border border-black">Action</th>
                      <th scope="col" className="px-6 py-3 border border-black">RequestID</th>
                      <th scope="col" className="px-6 py-3 border border-black">Member ID</th>
                      <th scope="col" className="px-6 py-3 border border-black">Name</th>
                      <th scope="col" className="px-6 py-3 border border-black">Payment Date</th>
                      <th scope="col" className="px-6 py-3 border border-black">Payment Mode</th>
                      <th scope="col" className="px-6 py-3 border border-black w-56">Company Bank Name</th>
                      <th scope="col" className="px-6 py-3 border border-black">Amount</th>
                      <th scope="col" className="px-6 py-3 border border-black">Remark</th>
                      <th scope="col" className="px-6 py-3 border border-black">Bank Ref ID</th>
                      <th scope="col" className="px-6 py-3 border border-black">Add Date</th>
                      <th scope="col" className="px-6 py-3 border border-black">Approve Date</th>
                      <th scope="col" className="px-6 py-3 border border-black">Company Remarks</th>
                      <th scope="col" className="px-6 py-3 border border-black">Slip</th>
                      <th scope="col" className="px-6 py-3 border border-black">Status</th>
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
export default Fundrequest
