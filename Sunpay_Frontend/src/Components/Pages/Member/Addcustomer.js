import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { NavLink } from 'react-router-dom'

const Addcustomer = (props) => {

  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;
  console.log('mobile',data.number)
  const [dataall, setDatall] = useState();  
  const [mobile_number, setmobile_number] = useState();
  const [first_name, setfirst_name] = useState();
  const [last_name, setlast_name] = useState();
  const [address, setaddress] = useState();
  const [otp, setotp] = useState();
  const [pin_code, setpincode] = useState();
  const [stateresp, setstateresp] = useState();
  const [dob, setdob] = useState();
  const [registered_with, setregister_with] = useState();
  
  const fetchuser = async () => {
    
    try {
      
      const userresponse = await axios.get(`https://new.sunpay.co.in/api/users/${props.data.id}`);
      setaddress(userresponse.data.address)
      setpincode(userresponse.data.pin_code)
      setdob(userresponse.data.dob) 
      
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const [options, setOptions] = useState([]);

  useEffect(() => {
    fetchuser(); // Fetch data when the component mounts
    setmobile_number(data.number);
    setstateresp(data.stateresp);
    console.log(stateresp)
  }, []);

  useEffect(() => {
    setDatall(props);
  }, []);

  const handleverify = () => {

  }

  const handlesubmit = async (e) => {
    try{
      console.log(mobile_number, first_name, last_name, address, pin_code, dob, otp, stateresp)
      const addresponse = await fetch('https://new.sunpay.co.in/api/register_remitter/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ mobile_number, first_name, last_name, address, pin_code, dob, otp, stateresp}),
        });
        const addresult = await addresponse.json();
        console.log('resultadd',addresult)
        const addrespmessage = addresult.message;
        console.log(addrespmessage)
        
        if (addrespmessage==="Customer registered successfully."){
          alert(addrespmessage)
          navigate('/member/moneytransfer')  
        }
        else if (addrespmessage==="Customer already registered."){
          alert(addrespmessage)
        }
        else if (addrespmessage==="Invalid OTP"){
          alert(addrespmessage)
        }
        else if (addrespmessage==="Entered Mobile NUmber is not allowed to register"){
          alert(addrespmessage)
        }
        else {
          alert('Something went wrong. Please try again later.')
        }
      
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
              <input type="text" name="accno" placeholder='Enter Mobile Number'   className='md:w-96 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 hover:cursor-pointer dark:focus:border-blue-500'/>
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
                  <button type="submit" onClick={handlesubmit} className='text-lg px-2 bg-blue-600 border border-black hover:bg-green-700 hover:text-white rounded-md'>
                    Add New
                  </button>
             

                <NavLink to='/member/moneytransfer' >
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

export default Addcustomer
