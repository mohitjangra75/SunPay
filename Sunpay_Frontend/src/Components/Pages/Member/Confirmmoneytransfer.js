import React from 'react'
import { NavLink } from 'react-router-dom'
import { useState, useEffect } from 'react';

const Confirmmoneytransfer = (props) => {
  const [dataall, setDatall] = useState();  
  useEffect(() => {
    setDatall(props);
    console.log('dataall from navbar', dataall);
  }, []);
  return (
    <div className='p-4'>
      <div className='bg-slate-300 p-2 border-2 px-6 border-red-200'>
      {/* Heading */}
      <div className='flex flex-wrap mt-4 gap-2'>
        <h1 className='font-black md:w-42'>Money Transfer</h1>
        <div className='md:w-72 font-black'></div>
        <div className='md:w-28 font-black'>Sender</div>
        <div className='md:w-52 font-black'>Sender Mobile Number</div>
        <div className=' font-black'>Available Limit</div>
      </div>
      {/* Values */}
      <div className='flex flex-wrap gap-2'>
        <h1 className='md:w-42'>Quick Pay Beneficiary</h1>
        <div className='md:w-64'></div>
        <div className='md:w-28'>Gourav</div>
        <div className='md:w-52'>8184812024</div>
        <div className=''>Sender Mobile Number</div>
      </div>

      <br /><br />
      {/* Heading */}
      <div className='flex flex-wrap gap-2 bg-stone-600 text-white'>
        <div className='font-black md:w-36'>Beneficiary Name</div>
        <div className='md:w-40 font-black'>Account Number</div>
        <div className='md:w-40 font-black'>Bank</div>
        <div className='md:w-32 font-black'>IFSC Code</div>
        <div className='md:w-36 font-black'>Transfer Amount</div>
        <div className='md:w-40 font-black'>Transfer Type</div>
      </div>
      {/* Values */}
      <div className='flex flex-wrap gap-2 mt-2'>
        <div className='md:w-36'>Gourav Dhalwal</div>
        <div className='md:w-40 '>6584616065063565</div>
        <div className='md:w-40 '>United Bank of India</div>
        <div className='md:w-32 '>UBIN050035</div>
        <div className='md:w-36 '>₹ </div>
        <div className='md:w-40 '>IMPS</div>
      </div>
      
        <div className='md:flex md:flex-wrap mt-20 p-8 md:gap-16 justify-center border border-black'>
        <div className='border-2 p-3 border-slate-700'>
          <table className="w-full text-sm text-left rtl:text-right border border-black text-gray-500 dark:text-gray-400 border-collapse ">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>

                        </tr>
                          
                          <tr className='border text-center border-black'>
                            <th scope="col" className="px-6 py-3 font-black border border-black w-32">S.NO</th>
                            <th className='px-6 py-3 w-32 border border-black'>Amount</th>
                            <th className='px-6 py-3  border border-black w-32'>Charges</th>

                          </tr>
                        </thead>
                      
                        <tbody>
                          <tr className="bg-white border text-center border-black dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">                        
                            <td scope="col" className="px-6 py-3  border border-black">1</td>
                            <td scope="col" className="px-6 py-3  border border-black">Gourav</td>
                            <td scope="col" className="px-6 py-3  border border-black">Union</td>
                          </tr>
                        </tbody>
          </table>
        </div>

        <div className='border-2 p-3 border-slate-700'>
            <div className='text-center '> 
            <h1 className='text-white text-2xl bg-red-400'>Enter TPIN</h1>
              <div className='flex'>
                <div className='border  p-4 align-middle border-black'>
                  MPIN :
                </div>
                <div className='border p-2 border-black'>
                  <input type="password" name="" id="" className='rounded-lg text-lg'/>
                </div>
              </div>
              <div className='mt-4 flex gap-2'>
                {/* Money transfer final api */}
              <NavLink to='/member/moneytransfer'>
                <button className='border border-gray-300 text-white text-xl rounded-lg block p-2 px-6 mt-4 bg-blue-500 hover:text-red-600' type="submit">Submit</button>
              </NavLink>

              <NavLink to='/member/moneytransfer'>
                <button className='border border-gray-300 text-white text-xl rounded-lg block p-2 px-6 mt-4 bg-blue-500 hover:text-red-600' type="submit">Back</button>
              </NavLink>
              </div>
            </div>
        </div>
      </div>
    </div>
  </div>
    
  )
}

export default Confirmmoneytransfer
