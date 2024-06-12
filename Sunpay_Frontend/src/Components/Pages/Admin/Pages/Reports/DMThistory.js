import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios'

const today = new Date();
const date = today.setDate(today.getDate()); 
const defaultValue = new Date(date).toISOString().split('T')[0]

const DMThistory = (props) => {

  const [Date, setDate] = useState('')
  const handleChange = (e) => {
  setDate(e.target.value);
};

const [currentuser, setcuruser] = useState({});

const fetchUser = async () => {
  try {
    const userresponse = await axios.get(`http://118.139.167.172/api/users/${props.data.id}`);
    const respuser = userresponse.data;
    setcuruser(respuser);
  } catch (error) {
    console.error('Error fetching data:', error); 
  }
};

const getdmttrans = async() => {
  try {
    console.log(currentuser)
    const response = await axios.get(`http://118.139.167.172/api/dmttransaction/`);
    const respuser = response.data.Data;
    console.log(respuser)
    setalldmttrans(respuser)
    setshowrow(current => !current)
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}


const [alldmttrans,setalldmttrans] = useState()
const [showrow, setshowrow] = useState(false)

useEffect(() => {
  fetchUser();
}, [props.data.id]);



return (
  <div>
    <div className='DMTreport p-4'>

      <div className='bg-slate-300 p-2 mt-4 border-2 border-red-200'>
      <h1 className=' font-bold text-2xl border-b-2 border-gray-400'>DMT TRANSACTIONS</h1>

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

          {/* Submit button */}
          <div className="col-md-3">
            <label htmlFor=""></label><br />
            <input type="submit" name="submit" onClick={getdmttrans} className='border border-gray-300 bg-blue-600 text-white text-sm rounded-lg  block w-full p-2.5 hover:cursor-pointer'/>
          </div>
        </div>

        <div className='mt-4'>
          <div className =" relative overflow-x-auto shadow-md border-black ">
               <table className=" text-sm text-left rtl:text-right mt-2 border border-black text-gray-500 dark:text-gray-400 border-collapse ">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr className='border border-black'>
                    {/* <th scope="col" className="px-6 py-3 border border-black">SNO</th>
                    <th scope="col" className="px-6 py-3 border border-black">Transaction ID</th>
                    <th scope="col" className="px-6 py-3 border border-black">Mobile No</th>
                    <th scope="col" className="px-6 py-3 border border-black">Beneficiary Name</th>
                    <th scope="col" className="px-6 py-3 border border-black">Amount</th>
                    <th scope="col" className="px-6 py-3 border border-black">Charge</th>
                    {/* <th scope="col" className="px-6 py-3 border border-black">Commission</th> 
                    <th scope="col" className="px-6 py-3 border border-black">Transaction Type</th>
                    <th scope="col" className="px-6 py-3 border border-black">UTR</th>
                    <th scope="col" className="px-6 py-3 border border-black">Transaction Status</th>
                    <th scope="col" className="px-6 py-3 border border-black">Transaction Date</th>
                    <th scope="col" className="px-6 py-3 border border-black">Receipt</th> */}

                      <th scope="col" className="px-6 py-3 border border-black">SNO</th>
                      <th scope="col" className="px-6 py-3 border border-black">Action</th>
                      <th scope="col" className="px-6 py-3 border border-black">Transaction ID</th>
                      <th scope="col" className="px-6 py-3 border border-black">Mobile No</th>
                      <th scope="col" className="px-6 py-3 border border-black">Beneficiary Name</th>
                      <th scope="col" className="px-6 py-3 border border-black">ShopName</th>
                      <th scope="col" className="px-6 py-3 border border-black">Login ID</th>
                      <th scope="col" className="px-6 py-3 border border-black">Amount</th>
                      <th scope="col" className="px-6 py-3 border border-black">Charge</th>
                      {/* <th scope="col" className="px-6 py-3 border border-black">Commission</th> */}
                      <th scope="col" className="px-6 py-3 border border-black">Transaction Type</th>
                      <th scope="col" className="px-6 py-3 border border-black">UTR</th>
                      <th scope="col" className="px-6 py-3 border border-black">Transaction Status</th>
                      <th scope="col" className="px-6 py-3 border border-black">Transaction Date</th>
                      <th scope="col" className="px-6 py-3 border border-black">Receipt</th>
                    </tr>
                  </thead>
                
                  {showrow && (
                  <tbody>
                  {alldmttrans.map((item, index) => (
                      <tr key={item.id} className='bg-white'>
                        
                        <td scope="col" className="px-6 py-3 border border-black whitespace-nowrap">{index+1}</td>
                        <td scope="col" className="px-6 py-3 border border-black whitespace-nowrap"></td>
                        <td scope="col" className="px-6 py-3 border border-black whitespace-nowrap">{item.ref_id}</td>
                        <td scope="col" className="px-6 py-3 border border-black whitespace-nowrap">{item.mobile}</td>
                        <td scope="col" className="px-6 py-3 border border-black whitespace-nowrap">{item.bene_name}</td>
                        <td scope="col" className="px-6 py-3 border border-black whitespace-nowrap">{item.shopname}</td>
                        <td scope="col" className="px-6 py-3 border border-black whitespace-nowrap">{item.user_display}</td>
                        <td scope="col" className="px-6 py-3 border border-black whitespace-nowrap">{item.amount}</td>
                        <td scope="col" className="px-6 py-3 border border-black whitespace-nowrap">{item.charge}</td>
                        {/* <td scope="col" className="px-6 py-3 border border-black">{item.created_at}</td> */}
                        <td scope="col" className="px-6 py-3 border border-black whitespace-nowrap">{item.transaction_type_display}</td>
                        <td scope="col" className="px-6 py-3 border border-black whitespace-nowrap">{item.ref_id}</td>
                        <td scope="col" className="px-6 py-3 border border-black whitespace-nowrap">{item.transaction_status_display}</td>
                        <td scope="col" className="px-6 py-3 border border-black whitespace-nowrap">{item.created_at}</td>
                        <td scope="col" className="px-6 py-3 border border-black whitespace-nowrap">
                            <input type="submit" name="Receipt" className='border border-gray-300 bg-blue-600 text-white text-sm rounded-lg  block w-full p-2.5 hover:cursor-pointer'/>
                        </td>

                      </tr>
                    ))}
                  </tbody>
                )}
               </table>
          </div>
        </div>
            
          </div>
        </div>
    </div> 
     
  </div>
)
}

export default DMThistory
