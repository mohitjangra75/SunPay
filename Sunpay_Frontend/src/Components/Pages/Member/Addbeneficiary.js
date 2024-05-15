import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { NavLink } from 'react-router-dom'

const Addbeneficiary = (props) => {

  const location = useLocation();
  const data = location.state;
  console.log('mobile',data.number)
  const [dataall, setDatall] = useState(); 
  const [beneficiary_name,setbeneficiary_name] = useState();
  const [account_number, setaccount_number] = useState();
  const[ifsc_code, setifsc] = useState();
  const [mobile_number, setmobile_number] = useState();
  const [bank_id, set_bankid] = useState();
  const [pin_code,setpincode] = useState();
  const [address, setadd] = useState();
  const [dob, setdob] = useState();

  const [banks, setbanks] = useState();
  const [name, setname] = useState();

  
  const fetchBank = async () => {
    
    try {
      
      const userresponse = await axios.get(`https://new.sunpay.co.in/api/users/${props.data.id}`)
      setaddress(userresponse.data.address)
      setpincode(userresponse.data.pin_code)
      setdob(userresponse.data.dob)

      const response = await axios.get('https://new.sunpay.co.in/api/get_banks/'); // Assuming '/api/options' is your backend endpoint
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
      console.log(mobile_number, first_name, last_name, address, pincode, dob, otp)
      const addresponse = await fetch('https://new.sunpay.co.in/api/register_remitter/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ mobile_number, first_name, last_name, address, pincode, dob, otp}),
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
        
        <div className='mt-4'>
          <div className='flex gap-2'>  
              <label htmlFor="Payment mode">Mobile No</label>
              <input type="text" name="accno" readOnly placeholder='Enter Mobile Number' onChange={(e) => setmobile_number(e.target.value)} defaultValue={data.number} className='md:w-96 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 hover:cursor-pointer dark:focus:border-blue-500'/>
          </div>
        </div>

              {/* <NavLink to='/member/moneytransfer'>
                <input type="submit" onClick={handleverify} name="submitbtn" value='Verify' className='bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2 mt-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 hover:cursor-pointer dark:focus:border-blue-500'/>
              </NavLink>
            </div>  */}

            <div className='mt-4'>
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
            </div>

            <div className='mt-4'>
              <div className='flex gap-2'>
                <label htmlFor="Payment mode" className='mt-1'>OTP : </label>
                <input type="number" name="accno" placeholder='Enter OTP' onChange={(e) => setotp(e.target.value)} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 hover:cursor-pointer dark:focus:border-blue-500'/>
              </div>
            </div>


            <div className='mt-4 flex gap-2 text-white'>
                <NavLink to='/member/addnewbeneficiary' >
                  <button type="submit" className='text-lg px-2 bg-blue-600 border border-black hover:bg-green-700 hover:text-white rounded-md'>
                    Add New
                  </button>
                </NavLink>

                <NavLink to='/member/addnewbeneficiary' >
                  <button type="submit" className='text-lg px-2 bg-blue-600 border border-black hover:bg-red-700 hover:text-white rounded-md'>
                    Back
                  </button>
                </NavLink>
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
