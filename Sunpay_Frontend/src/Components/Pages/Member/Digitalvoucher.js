import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const Digitalvoucher = (props) =>  {
 
  const navdata = props.data;
  const navigate = useNavigate();

  const [company, setCompany] = useState();
  const [provider_id, setProviderId] = useState();
  const [number, setNumber] = useState();
  const [amoun, setAmount] = useState();
  const [retailer_mobile, setRetailerMobile] = useState();
  const [show, setShow] = useState(false);
  const [tpin, setMpin] = useState();

  const [providers, setProviders] = useState([]);
  const [state_list, setStates] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://118.139.167.172/api/get_providers/');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        const filteredOptions = data.filter(option => option.type === 12);
        setProviders(filteredOptions);

        const stateresponse = await fetch('http://118.139.167.172/api/get_state/');
        if (!stateresponse.ok) {
          throw new Error('Failed to fetch data');
        }
        const state = await stateresponse.json();
        setStates(state);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://118.139.167.172/api/users/${navdata.id}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUser();
  }, [navdata.id]);

  const handleClick = () => {
    if (company && number) {
      setShow(current => !current);
    }
    
    const foundValues = providers.filter(obj => obj.provider_name === company).map(obj => obj.id);
    setProviderId(foundValues[0]);
    setRetailerMobile(user.mobile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    const client_id = 'TRYCLIENTID from Frontend';
    const billcontext = 'Will be Fetched from LEVIN API';
    const user_id = user.id;
    const billtype = 12;
    const parsedMpin = parseInt(tpin);
    const amount = parseFloat(amoun)

    if (company && provider_id && number && amount && user_id && client_id && billcontext && parsedMpin && billtype) {
      if (parsedMpin === user.tpin) {
        const payload = {
          provider_id,
          number,
          amount,
          user_id,
          client_id,
          billcontext,
          mpin: parsedMpin,
          billtype
        };

        try {
          const response = await fetch('http://118.139.167.172/api/dummyrecharge/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
          });

          const result = await response.json();
          const transaction = result.transaction
          console.log('API Response:', result);
          if (result.message=="Transaction created successfully"){
            navigate('/member/billpayreceipt' , {state: {transaction:transaction, user:user},})
          }
          
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      } else {
        console.error('MPIN does not match user MPIN');
      }
    } else {
      console.error('Missing required fields');
    }
      // const getbill = await fetch('http://118.139.167.172/api/get_biller_details/', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(no,companycode, user.id, retailer_mobile, amount),
      // });
      // const billresponse = await getbill.json();
      // console.log(billresponse)
      
      // const paybill = await fetch('http://118.139.167.172/api/pay_recharge/', {
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
            <h1 className=' font-bold text-2xl border-b-2 text-white border-gray-400'>Digital Voucher Pay</h1>
  
        {!show && (<div>
              <div className='mt-4 flex gap-8 flex-wrap'>
                <div className='w-52'>
                  <label className="mt-2 text-white text-2xl">Operator</label><br/>
                </div>
  
                <div>
                    <select id="id" onChange={(e) => setCompany(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
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
                <label className="mt-2 text-white w-52 text-2xl">Enter Code</label><br/>
                <input className=" text-lg px-4 border border-solid border-gray-300 rounded" onChange={(e) => setNumber(e.target.value)} type="text" placeholder="Enter Code" />
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
                <button onClick={handleClick} className=" bg-blue-600 hover:bg-blue-700 px-6 py-3 text-white uppercase rounded text-sm tracking-wider" type="submit">Confirm</button>
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
                  <div className=" text-2xl px-4 text-amber-300 rounded">{company}  {provider_id}</div>
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
                <div className=" text-2xl px-4 text-amber-300 rounded">{number}</div>
              </div>
  
              <div className='mt-4 flex gap-4'>
                <label className="mt-2 text-white w-52 text-2xl">Amount</label><br/>
                <input className=" text-xl px-4 border border-solid border-gray-300 rounded" onChange={(e) => setAmount(e.target.value)} type="number" defaultValue={amoun}/>
              </div>
              
              <div className='mt-4 flex gap-4'>
                <label className="mt-2 text-white w-52 text-2xl">MPIN</label><br/>
                <input className=" text-xl px-4 border border-solid border-gray-300 rounded" onChange={(e) => setMpin(e.target.value)} type="password" placeholder="Enter MPIN"/>
              </div>
  
              <div className='mt-4 flex gap-4'>
                <button onClick={handleSubmit} className=" bg-blue-600 hover:bg-blue-700 px-6 py-3 text-white uppercase rounded text-sm tracking-wider" type="submit">Submit</button>
                <button onClick={handleClick} className=" bg-blue-600 hover:bg-blue-700 px-6 py-3 text-white uppercase rounded text-sm tracking-wider" type="submit">Back</button>
              </div>  
            </div>
          )}
         
          </div>
  
          
        </div>  
      </div>
    )
}


export default Digitalvoucher