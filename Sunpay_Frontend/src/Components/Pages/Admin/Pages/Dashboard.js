import React from 'react'
import { Link } from 'react-router-dom'
import { useState, useRef } from 'react';

const today = new Date();
const date = today.setDate(today.getDate()); 
const defaultValue = new Date(date).toISOString().split('T')[0]

const Dashboard = () => {
  const [Date, setDate] = useState('');
  const dateInputRef = useRef(null);

const handleChange = (e) => {
  setDate(e.target.value);
};

  return (
    <div className='p-4 '>
      <div className="dashboard p-4 ">
        {/* Roles */}
        <div className='md:flex text-center flex-wrap gap-16'>

          <Link>
            <div className='p-2 text-2xl md:w-40 font-black bg-white rounded-lg hover:underline'>
              <h1 className='text-red-700'>Admin</h1>
              <h1 className='mt-0'>72 </h1>
            </div>
          </Link>

          <Link>
            <div className='p-2 text-2xl md:w-40 font-black bg-white rounded-lg hover:underline'>
              <h1 className='text-red-700'>Retailer </h1>
              <h1 className='mt-0'>72 </h1>
            </div>
          </Link>

          <Link>
            <div className='p-2 text-2xl md:w-40 font-black bg-white rounded-lg hover:underline'>
              <h1 className='text-red-700'>Distributor</h1>
              <h1 className='mt-0'>72 </h1>
            </div>
          </Link>

          <Link>
            <div className='p-2 text-2xl md:w-40 font-black bg-white rounded-lg hover:underline'>
              <h1 className='text-red-700'>Employee</h1>
              <h1 className='mt-0'>72 </h1>
            </div>
          </Link>
        </div>

        {/* Pending Count */}
        <div className='mt-8 p-4 bg-slate-400 rounded-lg'>
          <h1 className='text-3xl underline text-white font-black'>Pending Count</h1>
          <br />
          <div className='flex text-center flex-wrap gap-16'>
            <Link to='/admin/dmtreport'>
              <div className='p-2 text-2xl md:w-40 font-black bg-white rounded-lg hover:underline'>
                <h1 className='text-red-700'>DMT</h1>
                <h1 className='mt-0'>72 </h1>
              </div>
            </Link>

            <Link to='/admin/fund-request'>
              <div className='p-2 text-2xl md:w-40 font-black bg-white rounded-lg hover:underline'>
                <h1 className='text-red-700'>Fund Request</h1>
                <h1 className='mt-0'>72 </h1>
              </div>
            </Link>

            <Link>
              <div className='p-2 text-2xl md:w-40 font-black bg-white rounded-lg hover:underline'>
                <h1 className='text-red-700'>Payout</h1>
                <h1 className='mt-0'>72 </h1>
              </div>
            </Link>

            <Link>
              <div className='p-2 text-2xl md:w-40 font-black bg-white rounded-lg hover:underline'>
                <h1 className='text-rose-500'>AEPS</h1>
                <h1 className='mt-0'>72 </h1>
              </div>
            </Link>

            <Link>
              <div className='p-2 text-2xl md:w-40 font-black bg-white rounded-lg hover:underline'>
                <h1 className='text-red-700'>Recharge</h1>
                <h1 className='mt-0'>72 </h1>
              </div>
            </Link>
          </div>
        </div>

        {/* Day Report */}
        <div className='mt-8 p-4 bg-slate-400 rounded-lg'>
          <h1 className='text-3xl underline text-white font-black'>Daywise report</h1>
          <br />

          {/* Payment Date */}
            <div className="col-md-3">
              <label htmlFor="Payment date" className='text-white '>Select Date</label>
              <input id="dateRequired" type="date" onChange={handleChange} name="dateRequired" defaultValue={defaultValue} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'/>
              {/* <input type="date" onChange={handleChange} ref={dateInputRef} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'/> */}
            </div>

          <div className='flex text-center mt-4 flex-wrap gap-16'>
            <Link>
              <div className='p-2 text-2xl md:w-56 font-black bg-white rounded-lg hover:underline'>
                <h1 className='text-red-700'>Total Registration</h1>
                <h1 className='mt-0'> 72 </h1>
              </div>
            </Link>

            <Link>
              <div className='p-2 text-2xl md:w-56 font-black bg-white rounded-lg hover:underline'>
                <h1 className='text-red-700'>Money Transfer</h1>
                <h1 className='mt-0'> ₹ 72 </h1>
              </div>
            </Link>

            <Link>
              <div className='p-2 text-2xl md:w-56 font-black bg-white rounded-lg hover:underline'>
                <h1 className='text-red-700'>Fund Requests</h1>
                <h1 className='mt-0'> ₹ 72 </h1>
              </div>
            </Link>

            <Link>
              <div className='p-2 text-2xl md:w-56 font-black bg-white rounded-lg hover:underline'>
                <h1 className='text-red-700'>Aadhar Payments</h1>
                <h1 className='mt-0'>₹ 72 </h1>
              </div>
            </Link>

            <Link>
              <div className='p-2 text-2xl md:w-56 font-black bg-white rounded-lg hover:underline'>
                <h1 className='text-red-700'>Recharges</h1>
                <h1 className='mt-0'> ₹ 72 </h1>
              </div>
            </Link>

            <Link>
              <div className='p-2 text-2xl md:w-56 font-black bg-white rounded-lg hover:underline'>
                <h1 className='text-red-700'>Bill Payments</h1>
                <h1 className='mt-0'> ₹ 72 </h1>
              </div>
            </Link>

          </div>
        </div>

      </div>
    </div>
  )
}

export default Dashboard
