import React from 'react'
import { NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react';

const Addbeneficiary = (props) => {

  const [dataall, setDatall] = useState();  
  useEffect(() => {
    setDatall(props);
    console.log('dataall from navbar', dataall);
  }, []);
  return (
    <div className='addbeneficiary text-lg p-4'>
      <div className='bg-slate-300 p-2 border-2 font-black border-red-200'>
        <div className='addbeneficiaryform'>
          <label htmlFor="Bank">Select Bank</label>
            <select id="paymentmode" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option selected>Select Bank</option>
              <option value="neftrtgs">State Bank of India</option>
              <option value="cheque">PNB</option>
              <option value="cash">Union Bank</option>
              <option value="upi">Yes Bank</option>
            </select>

            <label htmlFor="Payment mode">Account No</label>
            <input type="text" name="accno" placeholder='Enter Account Number' className=' md:w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 hover:cursor-pointer dark:focus:border-blue-500'/>

            <label htmlFor="Payment mode">IFSC code</label>
            <input type="text" name="accno" placeholder='Enter IFSC code' className='md:w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 hover:cursor-pointer dark:focus:border-blue-500'/>

            <div className='md:flex gap-2'>
              {/* <div>
                <label htmlFor="Payment mode">Mobile No</label>
                <input type="text" name="accno" placeholder='Enter Mobile Number' className='md:w-96 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 hover:cursor-pointer dark:focus:border-blue-500'/>
              </div>               */}
              <NavLink to='/member/moneytransfer'>
                <input type="submit" name="submitbtn" value='Verify' className='bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2 mt-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 hover:cursor-pointer dark:focus:border-blue-500'/>
              </NavLink>
            </div>
            <div className='mt-4'>
              <div className='flex gap-2'>
                <label htmlFor="Payment mode" className='mt-1'>Name :</label>
                <input type="text" name="accno" placeholder='Name' readOnly className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 hover:cursor-pointer dark:focus:border-blue-500'/>
              </div>
            </div>

            <div className='mt-4'>
              {/* Palindrop API Account verify */}
              <NavLink to='/member/moneytransfer'>
                <button className='border border-gray-300 text-white text-xl rounded-lg block p-2 mt-4 bg-blue-500 ' type="submit">Submit</button>
              </NavLink>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Addbeneficiary
