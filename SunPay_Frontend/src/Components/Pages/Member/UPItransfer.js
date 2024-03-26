import React from 'react'
import { useState } from 'react';

const UPItransfer = (props) => {

    const[company,setcompany] = useState();
    const[no,setno] = useState();
    const[upi,setupi] = useState();
    const[amount,setamount] = useState();
    const [show, setshow] = useState();

    const handleclick = event => {
        setshow(current => !current);
      }

    const mobilesrch = event => {
        setshow(current => !current);
    }

    const accsrch = event => {
        setshow(current => !current);
    }

  return (
    <div>
      <div className='Water p-4'>
      <div className='bg-slate-400 w-full p-2 border-2 border-red-200'>
          <h1 className=' font-bold text-2xl border-b-2 border-gray-400'>UPI Transfer</h1>

    {!show && (    
        <div>
             <div className='bg-slate-300 flex gap-4 p-2 border-2 border-red-200'>
            <label htmlFor='' className='mt-2'>Enter Customer Mobile Number</label>
           <div className='md:flex gap-8'>
            <input type="text" name="remarks" placeholder='Enter Mobile Number' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 hover:cursor-pointer dark:focus:border-blue-500'/>
            <input type="submit" value="Submit" onClick={mobilesrch}  className='p-2 bg-white border border-black hover:bg-blue-700 hover:text-white rounded-lg'/>
           </div>

              <b className='mt-1 text-2xl'>OR</b>

           <label htmlFor='' className='mt-2'>Enter UPI ID</label>
           <div className='md:flex gap-8'>
            <input type="text" name="remarks" placeholder='Enter UPI ID' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 hover:cursor-pointer dark:focus:border-blue-500'/>
            <input type="submit" value="Submit" onClick={accsrch}  className='p-2 bg-white border border-black hover:bg-blue-700 hover:text-white rounded-lg'/>
           </div>
        </div>
        </div>
    )}

    {show && ( 
        <div>
        <div className='mt-4 flex gap-4'>
          <label className="mt-2 text-white w-48 text-2xl">UPI ID</label><br/>
          <input className=" text-xl px-4 border border-solid border-gray-300 rounded" onChange={(e) => setupi(e.target.value)} type="text" placeholder="Enter UPI ID" />
            <div className='flex gap-4'>
                <button onClick={handleclick} className=" bg-blue-600 hover:bg-blue-700 px-6 py-3 text-white uppercase rounded text-sm tracking-wider" type="submit">Search</button>
            </div>
        </div>
  
        <div className='mt-4 flex gap-4'>
          <label className="mt-2 text-white w-48 text-2xl">Enter Mobile No</label><br/>
          <input className=" text-xl px-4 border border-solid border-gray-300 rounded" onChange={(e) => setno(e.target.value)} type="mobile" placeholder="Enter Mobile No" />
        </div>

        <div className='mt-4 flex gap-4'>
          <label className="mt-2 text-white w-48 text-2xl">Enter Amount</label><br/>
          <input className=" text-xl px-4 border border-solid border-gray-300 rounded" onChange={(e) => setamount(e.target.value)} type="mobile" placeholder="Enter Amount" />
        </div>

        <div className='mt-4 flex gap-4'>
            <label className="mt-2 text-white w-48 text-2xl">Enter TPIN</label><br/>
            <input className=" text-xl px-4 border border-solid border-gray-300 rounded" onChange={(e) => setno(e.target.value)} type="mobile" placeholder="Enter TPIN" />
            </div>

            <div className='mt-4 flex gap-4'>
            <button onClick={handleclick} className=" bg-blue-600 hover:bg-blue-700 px-6 py-3 text-white uppercase rounded text-sm tracking-wider" type="submit"> </button>
            </div>
        </div>
    )}
        </div>
    </div>
    </div>
  )
}

export default UPItransfer
