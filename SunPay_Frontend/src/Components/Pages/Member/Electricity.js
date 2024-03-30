import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Electricity = (props) => {

  const [dataall, setDatall] = useState();  
  useEffect(() => {
    setDatall(props);
    console.log('electricity', dataall);
  }, []);

  const navigate = useNavigate();
  const[company,setcompany] = useState();
  const[no,setno] = useState();
  const[cycle,setcycle] = useState();
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
          <h1 className=' font-bold text-2xl border-b-2 text-white border-gray-400'>Electricity Bil Pay</h1>

      {!show && (<div>
            <div className='mt-4'>
              <label className="mt-2 text-white w-40 text-2xl">Providers</label><br/>
                <select id="id" onChange={setcompany} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option onChange={setcompany} selected>All Providers</option>
                    <option value="icicibnk">ICICI Bank(664005500851)</option>
                    <option value="sbibnk">State Bank of India(42057935640)</option>
                    <option value="pnbbnk">Punjab National Bank(6058002100002053)</option>
                    <option value="axisbnk">Axis Bank(923020043729544)</option>
                </select>
            </div>

            <div className='mt-4 flex gap-4'>
              <label className="mt-2 text-white w-40 text-2xl">Customer No.</label><br/>
              <input className=" text-xl px-4 border border-solid border-gray-300 rounded" onChange={(e) => setno(e.target.value)} type="number" placeholder="Enter Customer No" />
            </div>

            <div className='mt-4 flex gap-4'>
              <label className="mt-2 text-white w-40 text-2xl">Cycle No.</label><br/>
              <input className=" text-xl px-4 border border-solid border-gray-300 rounded" onChange={(e) => setcycle(e.target.value)} type="number" placeholder="Enter Cycle No" />
            </div>

            <div className='mt-4 flex gap-4'>
              <button onClick={handleclick} className=" bg-blue-600 hover:bg-blue-700 px-6 py-3 text-white uppercase rounded text-sm tracking-wider" type="submit">Confirm</button>
            </div>
        </div>
        )}

        {show && (
          <div>

            <div className='mt-4 flex gap-4'>
                <label className="mt-2 text-white w-40 text-2xl">Providers</label><br/>
                <select id="id" onChange={setcompany} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option onChange={setcompany} selected>All Providers</option>
                    <option value="icicibnk">ICICI Bank(664005500851)</option>
                    <option value="sbibnk">State Bank of India(42057935640)</option>
                    <option value="pnbbnk">Punjab National Bank(6058002100002053)</option>
                    <option value="axisbnk">Axis Bank(923020043729544)</option>
                </select>
             </div>

            <div className='mt-4 flex gap-4'>
              <label className="mt-2 text-white w-40 text-2xl">Customer No.</label><br/>
              <input className=" text-xl px-4 border border-solid border-gray-300 rounded" defaultValue={no} onChange={(e) => setno(e.target.value)} type="number" placeholder="Enter Customer No" readOnly/>
             </div>

            <div className='mt-4 flex gap-4'>
              <label className="mt-2 text-white w-40 text-2xl">Cycle No.</label><br/>
              <input className=" text-xl px-4 border border-solid border-gray-300 rounded" defaultValue={cycle} onChange={(e) => setcycle(e.target.value)} type="number" placeholder="Enter Cycle No" readOnly/>
            </div>

            <div className='mt-4 flex gap-4'>
              <label className="mt-2 text-white w-40 text-2xl">Amount</label><br/>
              <input className=" text-xl px-4 border border-solid border-gray-300 rounded" onChange={(e) => setcycle(e.target.value)} type="number" placeholder="Enter Amount"/>
            </div>
            
            <div className='mt-4 flex gap-4'>
              <label className="mt-2 text-white w-40 text-2xl">MPIN</label><br/>
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

export default Electricity
