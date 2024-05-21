import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { NavLink } from 'react-router-dom'

const today = new Date();
const date = today.setDate(today.getDate()); 
const defaultValue = new Date(date).toISOString().split('T')[0]

const dd = String(today.getDate()).padStart(2, '0');
const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
const yy = String(today.getFullYear()).slice(-2);
const hh = String(today.getHours()).padStart(2, '0');
const min = String(today.getMinutes()).padStart(2, '0');
const ss = String(today.getSeconds()).padStart(2, '0');

const currentTime = `${dd}${mm}${yy}${hh}${min}${ss}`;

const Addbeneficiary = (props) => {

  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;
  const [dataall, setDatall] = useState(); 
  const [beneficiary_name,setbeneficiary_name] = useState();
  const [bank_account_number, setaccount_number] = useState();
  const[bank_ifsc_code, setifsc] = useState();
  const [mobile_number, setmobile_number] = useState();
  const [bank_id, set_bankid] = useState();
  const [pin_code,setpincode] = useState();
  const [address, setadd] = useState();
  const [dob, setdob] = useState();
  const [currentuser, setcurrentuser] = useState();
  const [banks, setbanks] = useState();
  const [options, setOptions] = useState([]);
  const [merchant_reference_id, setmerchantrefid] = useState('');
  
  const fetchBank = async () => {    
    try {
      
      
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchBank(); // Fetch data when the component mounts
    setmobile_number(data.number)
  }, []);

  const handleChange = (e) => {
    setaccount_number(e.target.value);
    
    
      const initial_string = "verAccNo";
    
      // Prefix string
      const prefix_string = e.target.value;
      // Concatenate prefix to initial string
      const finalmerstring = initial_string + prefix_string + currentTime
    
      setmerchantrefid(finalmerstring)
  };


    const fetchUser = async () => {
      try {
        const userResponse = await axios.get(`https://new.sunpay.co.in/api/users/${props.data.id}`);
        const response = await axios.get('https://new.sunpay.co.in/api/paysprintbanks/');
        const bankResp = response.data;
        setOptions(bankResp);
  
        const repUsername = userResponse.data.username;
        const repUserDob = userResponse.data.dob;
        const repUserPincode = userResponse.data.pin_code;
        const repUserAdd = userResponse.data.address;
        setcurrentuser(repUsername);
        setadd(repUserAdd);
        setpincode(repUserPincode);
        setdob(repUserDob);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

  useEffect(() => {
    fetchUser();
  }, []);

  const bankverify = async () => {
    try {
      const response = await fetch('https://new.sunpay.co.in/api/zpayverify/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bank_account_number, bank_ifsc_code, merchant_reference_id }),
      });
      const bankverifyresponse = await response.json();
      
      
      const respmessage = bankverifyresponse.Message;
      // console.log(respmessage);

      // const respresponse = bankverifyresponse.Response;
      // console.log('Bank response',respresponse);

      // const respresponsedata = bankverifyresponse.Response.data;
      // console.log('Bank response data',respresponsedata);

      // const respresponsename = bankverifyresponse.Response.data.name_as_per_bank;
      // console.log('Bank response data',respresponsename);

      if (respmessage === 'Bank verified successfully') {
        const respresponsename = bankverifyresponse.Response.data.name_as_per_bank;
        setbeneficiary_name(respresponsename)
        alert ('Bank details verified')
      }
      else if(respmessage === 'Details unverified'){
        alert ('Unverified Bank details. Kindly check Account Number and IFSC Code.')
      }
      else if(respmessage === 'Bad request from Zpay'){
        alert ('Something went wrong. Please try after sometime.')
      }
      else{
        alert ('Unable to process now. Kindly contact your Administration.')
      }
    } catch (error) {
      console.error('Something went wrong:', error);
    }
  };

  const handlesubmit = async (e) => {

    try {
      const response = await fetch('https://new.sunpay.co.in/api/add_beneficiary/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ beneficiary_name, bank_account_number, bank_ifsc_code, mobile_number, bank_id, pin_code, address, dob}),
      });
      const bankaddresponse = await response.json();
      // console.log(bankverifyresponse);
      
      const respmessage = bankaddresponse.message;
      console.log(bankaddresponse)
      if (respmessage === 'Beneficiary Details uploaded successfully') {
        alert ('Bank details verified')
        navigate('/member/moneytransfer');
      }
      else {
        alert ('Unable to add Bank Account Details. Please try again later.')
      }
    } catch (error) {
      alert('Something went wrong')
    }
 
  }

  return (
    <div className='addbeneficiary text-lg p-4'>
        <div className='bg-slate-300 p-2 border-2 font-black border-red-200'>
        <div className='addbeneficiaryform'>
        
        <div className='mt-4'>
          <div className='flex gap-2'>  
              <label htmlFor="Payment mode">Mobile No</label>
              <input type="text" name="accno" readOnly placeholder='Enter Mobile Number'  defaultValue={data.number} className='md:w-96 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 hover:cursor-pointer dark:focus:border-blue-500'/>
          </div>
        </div>

        <div className='mt-4'>
          <div className='flex gap-2'>  
              <label htmlFor="Payment mode">Bank Account</label>
              <select required onChange={(e) => set_bankid(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option selected>Bank List</option>
                  {options.map(option => (
                    <option key={option.bank_name} value={option.bank_code}>{option.bank_name}</option>
                  ))}
              </select>          
            </div>
        </div>
        

        <div className='mt-4'>
          <div className='flex gap-2'>  
              <label htmlFor="Payment mode">Bank Account No.</label>
              <input type="text" name="accno" placeholder='Enter Account Number' onChange={handleChange} className='md:w-96 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 hover:cursor-pointer dark:focus:border-blue-500'/>
          </div>
        </div>

        <div className='mt-4'>
          <div className='flex gap-2'>  
              <label htmlFor="Payment mode">IFSC Code</label>
              <input type="text" name="accno" placeholder='Enter IFSC Code' onChange={(e) => setifsc(e.target.value)}  className='md:w-96 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 hover:cursor-pointer dark:focus:border-blue-500'/>
          </div>
        </div>

        <button type="submit" onClick={bankverify} className='text-lg px-2 bg-yellow-500 border border-black hover:bg-slate-600 hover:text-white rounded-md'>
                    Verify
        </button>

        <div className='mt-4'>
          <div className='flex gap-2'>  
              <label htmlFor="Payment mode">Bank Name</label>
              <input type="text" name="accno" readOnly value={beneficiary_name} className='md:w-96 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 hover:cursor-pointer dark:focus:border-blue-500'/>
          </div>
        </div>

       

              {/* <NavLink to='/member/moneytransfer'>
                <input type="submit" onClick={handleverify} name="submitbtn" value='Verify' className='bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2 mt-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 hover:cursor-pointer dark:focus:border-blue-500'/>
              </NavLink>
            </div>  */}

            {/* <div className='mt-4'>
              <div className='flex gap-2'>
                <label htmlFor="Payment mode" className='mt-1'>First Name :</label>
                <input type="text" name="accno" placeholder='Enter First Name' onChange={(e) => setfirst_name(e.target.value)} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 hover:cursor-pointer dark:focus:border-blue-500'/>
              </div>
            </div>

            <div className='mt-4'>
              <div className='flex gap-2'>
                <label htmlFor="Payment mode" className='mt-1'>Last Name :</label>
                <input type="text" name="accno" placeholder='Enter Last Name' onChange={(e) => setlast_name(e.target.value)} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 hover:cursor-pointer dark:focus:border-blue-500'/>
              </div>
            </div> */}

            {/* <div className='mt-4'>
              <div className='flex gap-2'>
                <label htmlFor="Payment mode" className='mt-1'>OTP : </label>
                <input type="number" name="accno" placeholder='Enter OTP' onChange={(e) => setotp(e.target.value)} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 hover:cursor-pointer dark:focus:border-blue-500'/>
              </div>
            </div> */}


            <div className='mt-4 flex gap-2 text-white'>
                
                  
             

                
                  <button type="submit" onClick={handlesubmit} className='text-lg px-2 bg-blue-600 border border-black hover:bg-red-700 hover:text-white rounded-md'>
                    Back
                  </button>
                
              </div>
        </div>
        </div>
    </div>
  )
}


  
// return (
//   <div className='Addbeneficiary p-4'>
//       <div className='bg-slate-300 p-2 border-2 border-red-200'>
//         <h1 className=' font-bold text-2xl border-b-2 border-gray-400'>FUND REQUEST</h1>

//         <div >
//         <form  className='md:flex md:flex-wrap md:gap-8 mt-4'>
//             {/* Bank Select */}
//             <div>
//               <label htmlFor="banks" className='text-lg'>Select a Bank</label>
//               <select id="banks" required onChange={(e) => setbanks(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
//                 <option selected>Bank List</option>
//                 {/* {banks.map(option => (
//                   <option key={option.bank_name} value={option.account_no}>
//                         {option.bank_name}  {option.account_no}
//                   </option>
//                 ))} */}
//               </select>
//             </div>
            
//             {/* Account No */}
//             <div className="col-md-3">
//               <label htmlFor="Account no">Account No</label>
//               <input type="text" required onChange={(e) => setaccount_number(e.target.value)} name="Amount" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'/>
//             </div>

//             {/* IFSC code */}
//             <div className="col-md-3">
//               <label htmlFor="Account no">IFSC Code</label>
//               <input type="text" required onChange={(e) => setaccount_number(e.target.value)} name="Amount" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'/>
//             </div>

//             {/* IFSC code */}
//             <div className="col-md-3">
//               <label htmlFor="Account no">IFSC Code</label>
//               <input type="text" required onChange={(e) => setaccount_number(e.target.value)} name="Amount" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'/>
//             </div>

//             {/* Submit button */}
//             <div className="col-md-3">
//               <label htmlFor=""></label><br />
//               <button type="submit" name="submit" className='border border-gray-300 bg-blue-600 text-white text-sm rounded-lg  block w-full p-2.5 hover:cursor-pointer'>Save</button>
//             </div>
//             </form>
//       </div>
//       </div>
//   </div>

// )

export default Addbeneficiary
