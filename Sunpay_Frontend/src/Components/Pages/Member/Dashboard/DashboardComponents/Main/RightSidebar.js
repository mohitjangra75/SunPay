import React from 'react'
import { useLocation } from 'react-router-dom';
import axios from 'axios'
import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';

const RightSidebar = (props) => {
    const localdata = props.data;
    const [user, setuser] = useState([]);

    const location = useLocation();
    useEffect(() => { 
      const fetchuser = async () => {
          try {
            const response = await axios.get(`https://new.sunpay.co.in/api/users/${localdata.id}`)
            setuser(response.data);
            console.log('liveuser dashboard',user) 
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
        fetchuser();
    }, [location]); 
    console.log('user',user.data)

    const [open, setOpen] = useState(true);
  return (
    <div>
      <div className='recenttransaction p-2 border-2'>
          {/* Daily Transactions */}
          <div className='bg-slate-800 md:w-full text-xl  border-b-2 border-white mr-0 pr-0 text-center text-md text-white'>
            Daily Summary
          </div>
          <div className='flex flex-wrap my-2 gap-12 gap-y-16'>
            <ul className='flex flex-wrap p-2 text-center gap-4 bg-slate-800'>
                  {user.role_id === 2 ? (
                   <li className='border-2 md:w-24 px-4 font-black odd:bg-yellow-400 even:bg-green-700 even:text-white border-white'>
                   Fund Requests
                   <br /><h1 className='value text-md font-black t'>0</h1>
               </li>
              ) : (<>
              <li className='border-2 px-4  font-black odd:bg-yellow-400 even:bg-green-700 even:text-white border-white'>
                  Money transfer
                  <br /><h1 className='value text-md font-black t'>0</h1>
                </li>
                <li className='border-2 px-4  font-black odd:bg-yellow-400 even:bg-green-700 even:text-white border-white'>
                    AEPS/MATM
                    <br /><h1 className='value text-md font-black t'>0</h1>
                </li>
                <li className='border-2 px-4  font-black odd:bg-yellow-400 even:bg-green-700 even:text-white border-white'>
                    Aadhar Pay
                    <br /><h1 className='value text-md font-black t'>0</h1>
                </li>
                <li className='border-2 px-4  font-black odd:bg-yellow-400 even:bg-green-700 even:text-white border-white'>
                    Utilities Paid
                    <br /><h1 className='value text-md font-black t'>0</h1>
                </li>
                <li className='border-2 px-4  font-black odd:bg-yellow-400 even:bg-green-700 even:text-white border-white'>
                    Credit Card
                    <br /><h1 className='value text-md font-black t'>0</h1>
                </li>
              </>
                 
                )}
           
              
          </ul>
              </div>
        

          

            {/* Pending Transactions */}
            <div className='bg-slate-800 md:w-full text-xl border-b-2 border-white mr-0 pr-0 text-center text-md text-white'>
                In progress transaction
            </div>

            <ul className='flex flex-wrap p-2 text-center  gap-4 bg-slate-800'>
              <li className='border-2 px-4  font-black odd:bg-yellow-400 even:bg-green-700 even:text-white border-white'>
                  Money transfer
                  <br /><h1 className='value text-md font-black t'>0</h1>
              </li>
              <li className='border-2 px-4  font-black odd:bg-yellow-400 even:bg-green-700 even:text-white border-white'>
                  AEPS/MATM
                  <br /><h1 className='value text-md font-black t'>0</h1>
              </li>
              <li className='border-2 px-4  font-black odd:bg-yellow-400 even:bg-green-700 even:text-white border-white'>
                  Aadhar Pay
                  <br /><h1 className='value text-md font-black t'>0</h1>
              </li>
              <li className='border-2 px-4  font-black odd:bg-yellow-400 even:bg-green-700 even:text-white border-white'>
                  Utilities Paid
                  <br /><h1 className='value text-md font-black t'>0</h1>
              </li>
              <li className='border-2 px-4  font-black odd:bg-yellow-400 even:bg-green-700 even:text-white border-white'>
                  Credit Card
                  <br /><h1 className='value text-md font-black t'>0</h1>
              </li>
            </ul>

            {/* Refund Transactions */}
            <div className='bg-slate-800 md:w-full text-xl  border-b-2 border-white mr-0 pr-0 text-center text-md text-white'>
                Refund Transactions
            </div>

            <ul className='flex flex-wrap p-2 text-center  gap-4 bg-slate-800'>
              <li className='border-2 px-4  font-black odd:bg-yellow-400 even:bg-green-700 even:text-white border-white'>
                  Money transfer
                  <br /><h1 className='value text-md font-black t'>0</h1>
              </li>
              <li className='border-2 px-4  font-black odd:bg-yellow-400 even:bg-green-700 even:text-white border-white'>
                  AEPS/MATM
                  <br /><h1 className='value text-md font-black t'>0</h1>
              </li>
              <li className='border-2 px-4  font-black odd:bg-yellow-400 even:bg-green-700 even:text-white border-white'>
                  Aadhar Pay
                  <br /><h1 className='value text-md font-black t'>0</h1>
              </li>
              <li className='border-2 px-4  font-black odd:bg-yellow-400 even:bg-green-700 even:text-white border-white'>
                  Utilities Paid
                  <br /><h1 className='value text-md font-black t'>0</h1>
              </li>
              <li className='border-2 px-4  font-black odd:bg-yellow-400 even:bg-green-700 even:text-white border-white'>
                  Credit Card
                  <br /><h1 className='value text-md font-black t'>0</h1>
              </li>
            </ul>
      </div>
    </div>
  )
}

export default RightSidebar
