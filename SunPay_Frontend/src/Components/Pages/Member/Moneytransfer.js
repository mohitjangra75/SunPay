import React from 'react'
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { AiFillDelete } from "react-icons/ai";
import { AiOutlineCheckSquare } from "react-icons/ai";

const Moneytransfer = (props) => {
  const [isShown, setIsShown] = useState(false);

  const handleClick = event => {
    // 👇️ toggle shown state
    setIsShown(current => !current);
  }

  const [dataall, setDatall] = useState();  
  useEffect(() => {
    setDatall(props);
    console.log('dataall from navbar', dataall);
  }, []);
  return (
    <div>
      <div className='moneytransfer p-4'>  

      {!isShown && (
        <div className='bg-slate-300 p-2 border-2 border-red-200'>
            <label htmlFor=''>Enter Customer Mobile Number</label>
           <div className='md:flex gap-8'>
            <input type="text" name="remarks" placeholder='Enter Mobile Number' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 hover:cursor-pointer dark:focus:border-blue-500'/>
            <input type="submit" value="Submit" onClick={handleClick}  className='p-2 bg-white border border-black hover:bg-blue-700 hover:text-white rounded-lg'/>
           </div>
        </div>
      )}

      {isShown && (
        <div className='bg-slate-300 p-2 border-2 border-red-200'>
            <div className='flex flex-wrap md:ml-6'>
              <input type="submit" value="Back" onClick={handleClick}  className=' text-lg px-2 bg-white border border-black hover:bg-blue-700 hover:text-white hover:cursor-pointer rounded-md'/>
              <div className='flex gap-3 md:ml-8'>
                  <input type='number' name="accountsearch" placeholder='Enter Account Number' className='md:ml-20 max-sm: p-1 rounded-md sm:ml-10' id="" />
                  <input type="submit" value="Search" className='text-lg px-2 md:ml-2 bg-white border border-black hover:bg-blue-700 hover:text-white hover:cursor-pointer rounded-md'/>
              </div>
              <NavLink to='/member/addnewbeneficiary' >
                <button type="submit" className='text-lg md:ml-36 px-2 bg-white border border-black hover:bg-blue-700 hover:text-white hover:cursor-pointer rounded-md'>
                  Add New
                </button>
              </NavLink>
            </div>

            <div className='beneficiarylist '>
              <h1 className='bg-green-800 mt-6 text-white text-2xl md:pl-4 p-1'>Beneficiary List</h1>
              <div className =" relative overflow-x-auto shadow-md border-black ">
                 <table className="w-full text-sm text-left rtl:text-right border border-black text-gray-500 dark:text-gray-400 border-collapse ">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr className='border text-center border-black'>
                        <th scope="col" className="px-6 py-3 font-black border border-black">SNO</th>
                          <th className='px-6 py-3  border border-black'>Beneficiary Name</th>
                          <th className='px-6 py-3  border border-black'>Bank</th>
                          <th className='px-6 py-3  border border-black'>Account No.</th>
                          <th className='px-6 py-3  border border-black'>IFSC</th>
                          <th className='px-6 py-3  border border-black'>Amount</th>
                          <th className='px-6 py-3  border border-black'>Mode</th>
                          <th className='px-6 py-3  border border-black'>Action</th>
                      </tr>
                    </thead>
                  
                    <tbody>
                      <tr className="bg-white border text-center border-black dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">                        
                        <td scope="col" className="px-6 py-3  border border-black">1</td>
                        <td scope="col" className="px-6 py-3  border border-black">Gourav</td>
                        <td scope="col" className="px-6 py-3  border border-black">Union</td>
                        <td scope="col" className="px-6 py-3  border border-black">2300020213</td>
                        <td scope="col" className="px-6 py-3  border border-black">UBIN01515</td>
                        <td scope="col" className="px-6 py-3  border border-black">5000</td>
                        <td scope="col" className="px-6 py-3  border border-black"> <NavLink to='/member/confirmdmt'><button type="submit" className='border bg-blue-700 text-white border-white px-1'>IMPS</button><button type="submit" className='border ml-2 bg-blue-700 text-white border-white px-1'>NEFT</button></NavLink></td>
                        <td scope="col" className="px-6 py-3  border border-black"><div className='flex gap-2 text-2xl'><AiFillDelete className='hover:cursor-pointer'/> <AiOutlineCheckSquare className='hover:cursor-pointer'/></div></td>
                      </tr>
                    </tbody>
                 </table>
                </div>
            </div>

            <div className='confirmpayment'>
              <div className='flex'>
                
              </div>
            </div>
        </div>
      )

      }
    </div>
  </div>
  )
}

export default Moneytransfer

