import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Prepaid = (props) => {
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
          <h1 className=' font-bold text-2xl border-b-2 text-white border-gray-400'>Postpaid Bill Pay</h1>

      {!show && (<div>
            <div className='mt-4 flex gap-8 flex-wrap'>
              <div className='w-52'>
                <label className="mt-2 text-white text-2xl">Operator</label><br/>
              </div>

              <div>
                  <select id="id" onChange={setcompany} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                      <option onChange={setcompany} selected>Select Operator</option>
                      <option value="icicibnk">Airtel</option>
                      <option value="sbibnk">VI</option>
                      <option value="pnbbnk">Jio</option>
                  </select>
              </div>
            </div>

            <div className='mt-4 flex gap-8 flex-wrap'>
            <div className='w-52'>
                  <label className="mt-2 text-white  text-2xl">Circle</label><br/>
              </div>
              <div>
                  <select id="id" onChange={setcircle} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option onChange={setcircle} selected>Select Circle</option>
                        <option value="icicibnk">Delhi</option>
                        <option value="sbibnk">Haryana</option>
                        <option value="pnbbnk">Rajasthan</option>
                    </select>
              </div>
            </div>

            <div className='mt-4 flex gap-4'>
              <label className="mt-2 text-white w-52 text-2xl">Mobile No.</label><br/>
              <input className=" text-xl px-4 border border-solid border-gray-300 rounded" onChange={(e) => setno(e.target.value)} type="number" placeholder="Enter Customer No" />
            </div>

            <div className='mt-4 flex gap-4'>
              <label className="mt-2 text-white w-52 text-2xl">Search Plan</label><br/>
              <select id="id" onChange={setcompany} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option onChange={setcompany} selected>Set Plan</option>
                    <option value="icicibnk">ICICI Bank(664005500851)</option>
                    <option value="sbibnk">State Bank of India(42057935640)</option>
                    <option value="pnbbnk">Punjab National Bank(6058002100002053)</option>
                    <option value="axisbnk">Axis Bank(923020043729544)</option>
                </select>
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
                <label className="mt-2 text-white text-2xl">Operator</label><br/>
              </div>

              <div>
                <input className=" text-xl px-4 border border-solid border-gray-300 rounded" readOnly onChange={(e) => setcompany(e.target.value)} type="text" defaultValue={company}/>
              </div>
            </div>

            <div className='mt-4 flex gap-8 flex-wrap'>
              <div className='w-52'>
                  <label className="mt-2 text-white  text-2xl">Circle</label><br/>
              </div>
              <div>
                <input className=" text-xl px-4 border border-solid border-gray-300 rounded" readOnly onChange={(e) => setcircle(e.target.value)} type="text" defaultValue={circle}/>
              </div>
                
            </div>

            <div className='mt-4 flex gap-4'>
              <label className="mt-2 text-white w-52 text-2xl">Mobile No.</label><br/>
              <input className=" text-xl px-4 border border-solid border-gray-300 rounded" readOnly onChange={(e) => setno(e.target.value)} type="number" defaultValue={no}/>
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

export default Prepaid
