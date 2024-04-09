import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const STV = (props) =>  {
  const navdata = props.data;
 // const location = useLocation();
  
    const navigate = useNavigate();
    const[company,setcompany] = useState();

    const[companycode,setcompanycode] = useState();
    const[no,setno] = useState();
     const[amount,setamount] = useState();
//    const[circle, setcircle] = useState();
 //   const[circlecode, setcirclecode] = useState();
    const[retailer_mobile,setretailer_mobile] = useState();
    const [show, setshow] = useState();
    const [mpin, setmpin] = useState();


    const [providers, setproviders] = useState([]);
    const [state_list, setstates] = useState([]);


    useEffect(() => {
      const fetchData = async () => {
        try {
          // Fetch data from your backend API
          const response = await fetch(`https://new.sunpay.co.in/api/get_providers/`);
          if (!response.ok) {
            throw new Error('Failed to fetch data');
          }
          const data = await response.json();
          
          const filteredOptions = data.filter(option => option.type === 18);
          setproviders(filteredOptions);
          
          const stateresponse = await fetch(`https://new.sunpay.co.in/api/get_state/`);
          if (!stateresponse.ok) {
            throw new Error('Failed to fetch data');
          }
          const state = await stateresponse.json();
          setstates(state);
          
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    },[]);


    const [user, setuser] = useState([]);

    useEffect(() => { 
      const fetchuser = async () => {
          try {
            const response = await axios.get(`https://new.sunpay.co.in/api/users/${navdata.id}`)
            setuser(response.data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
        fetchuser();
    },[]); 
    
    const handleclick = event => {
      if(company && 
        no ){
          setshow(current => !current);          
        }
        // const resultArray = providers.filter(option => option.provider_name === company);
        const foundValues = providers.filter(obj => obj.provider_name === company).map(obj => obj.id);
        setcompanycode(foundValues[0])
       //  const foundState = state_list.filter(obj => obj.state_name === circle).map(obj => obj.id);  
        // setcirclecode(foundState[0])
        setretailer_mobile(user.mobile)   
    }
    
    const handlesubmit = async (e) => {   
      console.log(no,companycode, user.id,amount, mpin, retailer_mobile)  
      if(company &&  
      no &&
      user.id &&
      amount &&
      mpin &&
      retailer_mobile
    ){
        if (mpin === user.tpin){
          navigate('/member/billpayreceipt')
        }
      }    
      

      // const getbill = await fetch('https://new.sunpay.co.in/api/get_biller_details/', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(no,companycode, user.id, retailer_mobile, amount),
      // });
      // const billresponse = await getbill.json();
      // console.log(billresponse)
      
      // const paybill = await fetch('https://new.sunpay.co.in/api/pay_recharge/', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(no, companycode, user.id, amount, billcontext),
      // });
      // const payresponse = await paybill.json();
      // console.log(payresponse)

    }
  
    return (
      <div>
        <div className='Rechargehistory p-4'>
          <div className='bg-slate-400 w-full p-2 border-2 border-red-200 px-6'>
            <h1 className=' font-bold text-2xl border-b-2 text-white border-gray-400'>STV BillPay</h1>
  
        {!show && (<div>
              <div className='mt-4 flex gap-8 flex-wrap'>
                <div className='w-52'>
                  <label className="mt-2 text-white text-2xl">Operator</label><br/>
                </div>
  
                <div>
                    <select id="id" onChange={(e) => setcompany(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option selected>Select Operator</option>
                        {providers.map(option => (
                        <option key={option.id} value={option.value}>
                        {option.provider_name}
                        </option>
                         ))}
                    </select>
                </div>
              </div>
  
              {/* <div className='mt-4 flex gap-8 flex-wrap'>
              <div className='w-52'>
                    <label className="mt-2 text-white  text-2xl">Circle</label><br/>
                </div>
                <div>
                    <select id="id" onChange={(e) => setcircle(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option selected>Select Operator</option>
                        {state_list.map(option => (
                    <option key={option.state_id} value={option.state_name}>
                          {option.state_name}
                    </option>
                  ))}
                      </select>
                </div>
              </div> */}
  
              <div className='mt-4 flex gap-4'>
                <label className="mt-2 text-white w-52 text-2xl">Customer No</label><br/>
                <input className=" text-lg px-4 border border-solid border-gray-300 rounded" onChange={(e) => setno(e.target.value)} type="text" placeholder="Enter Customer No" />
              </div>
  
              {/* <div className='mt-4 flex gap-4'>
                <label className="mt-2 text-white w-52 text-2xl">Search Plan</label><br/>
                <select id="id" onChange={setcompany} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                      <option onChange={setcompany} selected>Set Plan</option>
                      <option value="icicibnk">ICICI Bank(664005500851)</option>
                      <option value="sbibnk">State Bank of India(42057935640)</option>
                      <option value="pnbbnk">Punjab National Bank(6058002100002053)</option>
                      <option value="axisbnk">Axis Bank(923020043729544)</option>
                  </select>
              </div> */}
  
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
                  <div className=" text-2xl px-4 text-amber-300 rounded">{company}  {companycode}</div>
                </div>
              </div>
  
              {/* <div className='mt-4 flex gap-8 flex-wrap'>
                <div className='w-52'>
                    <label className="mt-2 text-white  text-2xl">Circle</label><br/>
                </div>
                <div>
                <div className=" text-2xl px-4 text-amber-300 rounded">{circle}  {circlecode}</div>
               </div>
                  
              </div> */}
  
              <div className='mt-4 flex gap-4'>
                <label className="mt-2 text-white w-52 text-2xl">Mobile No.</label><br/>
                <div className=" text-2xl px-4 text-amber-300 rounded">{no}</div>
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


export default STV
