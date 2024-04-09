import React from 'react'
import { NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react';
import axios from 'axios';


const Addbeneficiary = (props) => {

  const [dataall, setDatall] = useState();  
  const [mobile_number, setmobile_number] = useState();
  const [bank, setbank] = useState();
  const [bene_name, setbene_name] = useState();
  const [number, setnumber] = useState();
  const [bank_name, setbank_name] = useState();
  const [bank_account, setbank_account] = useState();
  const [ifsc, setifsc] = useState();
  const [user_id, setuser_id] = useState();
  const [partnerSubId, setpartnerSubId] = useState();

  const fetchBank = async () => {
    try {
      
      const userresponse = await axios.get(`https://new.sunpay.co.in/api/users/${props.data.id}`)
      setnumber(userresponse.data.id)
      setpartnerSubId("9311395921")
      setuser_id(userresponse.data.username)

      const response = await axios.get('https://new.sunpay.co.in/api/allbanks/'); // Assuming '/api/options' is your backend endpoint
      setOptions(response.data);       
      
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const [options, setOptions] = useState([]);

  useEffect(() => {
    
    fetchBank(); // Fetch data when the component mounts
  }, []);

  useEffect(() => {
    setDatall(props);
  }, []);

  const handleverify = () => {

  }

 

  const handlesubmit = async (e) => {
    try{
      console.log(mobile_number, bene_name, number, bank_account, bank_name, ifsc, user_id, partnerSubId)
      const addresponse = await fetch('https://new.sunpay.co.in/api/add_beneficiary/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ mobile_number, bene_name, number, bank_account, bank_name, ifsc, user_id, partnerSubId}),
        });
        const addresult = await addresponse.json();
        console.log('resultadd',addresult)
    }
    catch (error) {
      console.error('Something went wrong:', error);
    }
 
  }

  return (
    <div className='addbeneficiary text-lg p-4'>
      <div className='bg-slate-300 p-2 border-2 font-black border-red-200'>
        <div className='addbeneficiaryform'>
          <label htmlFor="Bank">Select Bank</label>
            <select id="paymentmode" onChange={(e) => setbank_name(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option selected>Select Bank</option>
              {options.map(option => (
          <option key={option.bank_code} value={option.bank_name}>
            {option.bank_name}
          </option>
        ))}
            </select>

            <label htmlFor="Payment mode">Account No</label>
            <input type="text" name="accno" placeholder='Enter Account Number' onChange={(e) => setbank_account(e.target.value)} className=' md:w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 hover:cursor-pointer dark:focus:border-blue-500'/>

            <label htmlFor="Payment mode">IFSC code</label>
            <input type="text" name="accno" placeholder='Enter IFSC code' onChange={(e) => setifsc(e.target.value)} className='md:w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 hover:cursor-pointer dark:focus:border-blue-500'/>

               
            <label htmlFor="Payment mode">Mobile No</label>
            <input type="number" name="accno" placeholder='Enter Mobile Number' onChange={(e) => setmobile_number(e.target.value)} className='md:w-96 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 hover:cursor-pointer dark:focus:border-blue-500'/>
                            
              {/* <NavLink to='/member/moneytransfer'>
                <input type="submit" onClick={handleverify} name="submitbtn" value='Verify' className='bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2 mt-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 hover:cursor-pointer dark:focus:border-blue-500'/>
              </NavLink>
            </div>  */}

            <div className='mt-4'>
              <div className='flex gap-2'>
                <label htmlFor="Payment mode" className='mt-1'>Name :</label>
                <input type="text" name="accno" placeholder='Name' onChange={(e) => setbene_name(e.target.value)} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 hover:cursor-pointer dark:focus:border-blue-500'/>
              </div>
            </div>

            <div className='mt-4'>
              {/* Palindrop API Account verify */}
                <button onClick={handlesubmit} className='border border-gray-300 text-white text-xl rounded-lg block p-2 mt-4 bg-blue-500 ' type="submit">Submit</button>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Addbeneficiary
