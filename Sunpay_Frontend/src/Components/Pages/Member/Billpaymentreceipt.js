import React, { useRef }  from 'react'
import { useState, useEffect } from 'react';
import logo from './Dashboard/DashboardComponents/Data/imgs/logo.png'
import { useReactToPrint } from 'react-to-print'
import { useLocation } from 'react-router-dom';

const today = new Date();
const date = today.setDate(today.getDate()); 
const defaultValue = new Date(date).toISOString().split('T')[0]

const Billpaymentreceipt = (props) => {

    const location = useLocation();
    const data = location.state;

    const [dataall, setDatall] = useState();  
    useEffect(() => {
      setDatall(props);
      console.log('dataall from navbar', dataall);
      console.log(data)
    }, []);
    const divprint = useRef();
    const handliprint = useReactToPrint({
        content : () => divprint.current
    })

  return (
    <div className=' bg-slate-300 p-6 '>
      <div ref={divprint} className='printablediv text-center bg-white p-4 '>
       <div className='border-4 py-4 border-red-800 rounded-lg'>
            <div className='logo flow-root py-2 px-8'>
                <img src={logo} alt="" className='float-left w-60 h-28 text-center'/>

                <div className='float-right text-lg'>
                    <h1>Shopname : {data.user.shop_name}</h1>
                    <h1>Mobile No. : {data.user.mobile}</h1>
                    <h1>Payee Name : {data.user.name}</h1>
                    <h1>Date : {defaultValue}</h1>
                </div>
            </div>
            <hr className='bg-lime-900 h-1'/>
            <div className='text-center text-3xl font-bold  rounded-lg'><p className=' border-rose-950  text-black rounded-lg'>Confirmation Receipt</p></div>
            <div className=' text-xl font-semibold px-8'>
                
                
                    <div className='flow-root'>
                        <div className='float-left'>
                        <h1>Bill Type : {data.transaction.bill_type_display}</h1>
                        </div>

                        <div className='float-right'>
                        <h1>Refrence ID : {data.transaction.transaction_id}</h1>
                        </div>
                    </div>
            </div>
           { console.log('printContents')}  
            <div className='transaction text-center px-2'>
                <table className=" w-full text-left mt-4 border border-black text-gray-500 dark:text-gray-400 border-collapse ">
                    <thead className="text-lg text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr className='border text-center border-black'>
                            <th scope="col" className="px-6 py-3 border border-black">Type</th>
                            <th scope="col" className="px-6 py-3 border border-black">Transaction ID</th>
                            <th scope="col" className="px-6 py-3 border border-black">Amount Paid {"(in ₹)"}</th>
                            <th scope="col" className="px-6 py-3 border border-black">Status</th>
                        </tr>
                    </thead>
                    
                    <tbody>    
                        <tr className="bg-white border text-center border-black dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td className="px-6 py-3 border border-black whitespace-nowrap">
                                {data.transaction.bill_type_display}
                            </td>
                            <td className="px-6 py-3 border border-black whitespace-nowrap">
                                {data.transaction.transaction_id}
                            </td>
                            <td className="px-6 py-3 border border-black whitespace-nowrap">
                                {data.transaction.amount}
                            </td>
                            <td className="px-6 py-3 border border-black whitespace-nowrap">
                                {data.transaction.transaction_status_display}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className='mt-4 '>
                <div className='flow-root '>
                    <p className='float-right text-xl px-4'>&copy; 2023 All Rights Reserved</p>
                </div>
                <hr className='bg-lime-900 h-[2px] w-full'/>
                <p className='text-center mt-2 text-xl'>Note: This is a computer generated receipt and does not require physical signature. </p>
            </div>  
       </div>
      </div>
      <div className='text-center flex gap-4 mt-4'>
            <input type="submit" onClick={handliprint} value="Print" className='border text-xl py-2 px-4 rounded-xl text-center hover:text-white hover:cursor-pointer bg-yellow-400 border-gray-900' />
        </div>
    </div>
  )
}

export default Billpaymentreceipt
