import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Fastag = (props) => {
    const [dataall, setDatall] = useState();  
    useEffect(() => {
      setDatall(props);
      console.log('postpaid', dataall);
    }, []);
  
    const navigate = useNavigate();
    const[company,setcompany] = useState();
    const[no,setno] = useState();
    const[amount,setamount] = useState();
    const[circle, setcircle] = useState();
    const[plan,setplan] = useState();
    const [show, setshow] = useState();
    const [mpin, setmpin] = useState();
  
    const handleclick = event => {
      setshow(current => !current);
    }
    
    const handlesubmit = event => {
      navigate('/member/billpayreceipt')
      
    }
  
    return (
      <div>
        <div className='Rechargehistory p-4'>
          <div className='bg-slate-400 w-full p-2 border-2 border-red-200 px-6'>
            <h1 className=' font-bold text-2xl border-b-2 text-white border-gray-400'>Fastag Recharge</h1>
  
        {!show && (<div>
              <div className='mt-4 flex gap-8 flex-wrap'>
                <div className='w-52'>
                  <label className="mt-2 text-white text-2xl">Provider</label><br/>
                </div>
  
                <div>
                    <select id="id" onChange={setcompany} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option onChange={setcompany} selected>Select Provider</option>
                        <option value="icicibnk">Airtel</option>
                        <option value="sbibnk">IDFC</option>
                        <option value="pnbbnk">Paytm</option>
                    </select>
                </div>
              </div>
  
              <div className='mt-4 flex gap-4'>
                <label className="mt-2 text-white w-52 text-2xl">Vehicle No.</label><br/>
                <input className=" text-xl px-4 border border-solid border-gray-300 rounded" onChange={(e) => setno(e.target.value)} type="text" placeholder="Enter Customer No" />
              </div>
  
              <div className='mt-4 flex gap-4'>
                <button onClick={handleclick} className=" bg-blue-600 hover:bg-blue-700 px-6 py-3 text-white uppercase rounded text-sm tracking-wider" type="submit">Confirm</button>
              </div>
          </div>
          )}
  
          {show && (
            <div>
  
  <div className='mt-4 flex gap-8 flex-wrap'>
                <div className='w-52'>
                  <label className="mt-2 text-white text-2xl">Provider</label><br/>
                </div>
  
                <div>
                  <input className=" text-xl px-4 border border-solid border-gray-300 rounded" readOnly onChange={(e) => setcompany(e.target.value)} type="text" defaultValue={company}/>
                </div>
              </div>
  
              <div className='mt-4 flex gap-4'>
                <label className="mt-2 text-white w-52 text-2xl">Vehicle No.</label><br/>
                <input className=" text-xl px-4 border border-solid border-gray-300 rounded" readOnly onChange={(e) => setno(e.target.value)} type="text" defaultValue={no}/>
              </div>
  
              <div className='mt-4 flex gap-4'>
                <label className="mt-2 text-white w-52 text-2xl">Amount</label><br/>
                <input className=" text-xl px-4 border border-solid border-gray-300 rounded" onChange={(e) => setamount(e.target.value)} type="number" defaultValue={amount}/>
              </div>
              
              <div className='mt-4 flex gap-4'>
                <label className="mt-2 text-white w-52 text-2xl">MPIN</label><br/>
                <input className=" text-xl px-4 border border-solid border-gray-300 rounded" onChange={(e) => setmpin(e.target.value)} type="password" placeholder="Enter MPIN"/>
              </div>
  
              <div className='mt-4 flex gap-4'>
                <button onClick={handlesubmit} className=" bg-blue-600 hover:bg-blue-700 px-6 py-3 text-white uppercase rounded text-sm tracking-wider" type="submit">Submit</button>
                <button onClick={handleclick} className=" bg-blue-600 hover:bg-blue-700 px-6 py-3 text-white uppercase rounded text-sm tracking-wider" type="submit">Back</button>
              </div>  
            </div>
          )}
         
          </div>
  
          
        </div>  
      </div>
    )
}

export default Fastag
