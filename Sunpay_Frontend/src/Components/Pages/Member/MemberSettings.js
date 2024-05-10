import React from 'react'
import userprofile from './Dashboard/DashboardComponents/Data/imgs/userprofile.png'
import { NavLink, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Transition } from '@headlessui/react';

const Modal = ({ isOpen, onClose }) => {
  
  const [isEntering, setIsEntering] = useState(false);

  const handleClose = () => {
    setIsEntering(false);
    setTimeout(() => {
      onClose();
    }, 150);
  };

  return (
    <Transition
      show={isOpen}
      enter="transition-opacity duration-150"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
      className="fixed inset-0 z-50 overflow-auto bg-gray-900 bg-opacity-50"
    >
      <div className="flex items-center justify-center min-h-screen">
        <Transition.Child
          enter="transition-transform duration-150"
          enterFrom="transform scale-95"
          enterTo="transform scale-100"
          leave="transition-transform duration-150"
          leaveFrom="transform scale-100"
          leaveTo="transform scale-95"
        >
           <div className="bg-white rounded-lg p-8 shadow-lg">
            <div className='mt-2 flex gap-4 border-b border-black'>
            <h1 className='text-2xl font-semibold p-4 text-green-600'>User updated Succcessfully</h1>
          </div>
            
            <button
              onClick={handleClose}
              className="mt-4 px-4 py-2 bg-gray-900 text-white rounded-lg"
            >
              Close Modal
            </button>
          </div>
        </Transition.Child>
      </div>
    </Transition>
  );
};


const MemberSettings = (props) => {

  const [isModalOpen, setIsModalOpen] = useState(false);
 
  const closeModal = () => {
    setIsModalOpen(false);
    setoldpassword('');
    setnewpassword('');
    setoldtpin('');
    setnewtpin('');
  };

  const localdata = props.data;
  const [user, setuser] = useState([]);

  const location = useLocation();
  useEffect(() => { 
    const fetchuser = async () => {
        try {
          const response = await axios.get(`https://new.sunpay.co.in/api/users/${localdata.id}`)
          setuser(response.data);
          console.log('liveuser dashboard',user) 
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchuser();
  }, [location]); 

  const [openTab, setOpenTab] = useState(1);
  
  const [oldpassword, setoldpassword] = useState();
  const [password, setnewpassword] = useState();
  const [oldtpin, setoldtpin] = useState();
  const [tpin, setnewtpin] = useState();

  const changepassword = async (e) => {

    try{
      if(oldpassword===user.password){

        if(oldpassword===password){
          alert("Old and New Password are same")
        }
        else {
          const patchresponse = await fetch(`https://new.sunpay.co.in/api/users/${user.id}/`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ password}),
          });
  
          const addresult = await patchresponse.json();
          console.log('resultadd',addresult)
          const response = await axios.get(`https://new.sunpay.co.in/api/users/${localdata.id}`)
          setuser(response.data);
          if(addresult.message=="User updated successfully")
            {
              setIsModalOpen(true);
            }
        }     
      }
      else {
        alert("Entered password doesn't match with the currrent password.")
      }
     
      }
      catch (error) {
        console.error('Something went wrong:', error);
      }
  }

  const changetpin = async (e) => {

    try{
      console.log(oldtpin, user.tpin ,tpin)
      if(oldtpin==user.tpin)
      {
        if(oldtpin===tpin){
          alert("Old and New TPIN are same")
        }
        else {
          const patchresponse = await fetch(`https://new.sunpay.co.in/api/users/${user.id}/`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({tpin}),
          });
  
          const addresult = await patchresponse.json();
          console.log('resultadd',addresult)
          const response = await axios.get(`https://new.sunpay.co.in/api/users/${localdata.id}`)
          setuser(response.data);
          if(addresult.message=="User updated successfully")
          {
            setIsModalOpen(true);
          }
        }  
      }
      else{
        alert("Old TPIN doesn't matches with current TPIN")
      }   
    }
    catch (error) {
      console.error('Something went wrong:', error);
    }
  }


  return (
    <div className='p-4'>
       {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={closeModal} />
      )}
      <div className='bg-slate-300 p-4 py-6 container mx-auto'>
     
        <div className='flex justify-center items-center'>
          <img src={userprofile} alt="" className='text-center w-36 h-36 p-1 rounded-full border-4 border-red-900'/>
        </div>
        <div className='text-center mt-2'>
          <h1 className='text-3xl font-black'>Login ID</h1>
          <h1 className='text-xl'>Role</h1>
        </div>
      </div>
       <div className=" bg-slate-300 p-4 py-6 container mx-auto ">
                <div className="flex flex-col justify-center">
                    <ul className="flex space-x-4">
                        <li>
                            <NavLink to='#' onClick={() => setOpenTab(1)} className={` ${openTab === 1 ? "bg-purple-600 text-white" : "bg-white"} inline-block px-4 py-2 text-gray-600 rounded shadow`}>
                                Profile
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='#' onClick={() => setOpenTab(2)} className={` ${openTab === 2 ? "bg-purple-600 text-white" : "bg-white"} inline-block px-4 py-2 text-gray-600 rounded shadow`}>
                                Reset Password
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='#' onClick={() => setOpenTab(3)} className={` ${openTab === 3 ? "bg-purple-600 text-white" : "bg-white"} inline-block px-4 py-2 text-gray-600 rounded shadow`}>
                                Reset TPIN
                            </NavLink>
                        </li>
                        {/* <li>
                            <NavLink to='#' onClick={() => setOpenTab(4)} className={` ${openTab === 4 ? "bg-purple-600 text-white" : "bg-white"} inline-block px-4 py-2 text-gray-600 rounded shadow`}>
                                My Services
                            </NavLink>
                        </li> */}
                        
                        {/* <li>
                            <NavLink to='#' onClick={() => setOpenTab(4)} className={` ${openTab === 4? "bg-purple-600 text-white" : "bg-white"} inline-block px-4 py-2 text-gray-600 rounded shadow`}>
                                <h1>Account Details</h1>
                            </NavLink>
                        </li> */}
                        
                    </ul>
                    <div className="p-3 mt-6 bg-white border">
                        <div className={openTab === 1 ? "block" : "hidden"}>
                          <table className="w-full text-lg text-left rtl:text-right rounded-lg border-collapse ">
                            <tbody>
                              <tr className="bg-white border  dark:bg-gray-800 dark:border-gray-700 ">                        
                                <td scope="col" className="px-6 py-3 text-center font-black border-r-2 border-slate-400">Name</td>
                                <td scope="col" className="pl-12 py-3 ">{user.name}</td>
                              </tr>
                              <tr className="bg-gray-200 border dark:bg-gray-800 dark:border-gray-700 ">                        
                                <td scope="col" className="px-6 py-3 text-center font-black border-r-2 border-slate-400 ">Address</td>
                                <td scope="col" className="pl-12  py-3 ml-4">{user.address}</td>
                              </tr>
                              <tr className="bg-white border dark:bg-gray-800 dark:border-gray-700 ">                        
                                <td scope="col" className="px-6 py-3 text-center font-black border-r-2 border-slate-400">Mobile No.</td>
                                <td scope="col" className="pl-12 py-3 ml-4">{user.mobile}</td>
                              </tr>
                              <tr className="bg-gray-200 border dark:bg-gray-800 dark:border-gray-700 ">                        
                                <td scope="col" className=" py-3 text-center font-black border-r-2 border-slate-400 ">ShopName</td>
                                <td scope="col" className="pl-12  py-3 ml-4">{user.shop_name}</td>
                              </tr>
                              <tr className="bg-white border dark:bg-gray-800 dark:border-gray-700 ">                        
                                <td scope="col" className="px-6 py-3 text-center font-black border-r-2 border-slate-400 ">Email ID</td>
                                <td scope="col" className="pl-12  py-3 ml-4">{user.email}</td>
                              </tr>
                              <tr className="bg-gray-200 border dark:bg-gray-800 dark:border-gray-700 ">                        
                                <td scope="col" className="px-6 py-3 text-center font-black border-r-2 border-slate-400 ">Aadhaar</td>
                                <td scope="col" className="pl-12  py-3 ml-4">{user.aadhar}</td>
                              </tr>
                              <tr className="bg-white border dark:bg-gray-800 dark:border-gray-700 ">                        
                                <td scope="col" className=" py-3 text-center font-black border-r-2 border-slate-400 ">PAN Card</td>
                                <td scope="col" className="pl-12  py-3 ml-4">{user.pan}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>

                        <div className={openTab === 2 ? "block" : "hidden"}>
                            <div className='px-4 py-2'>
                              <h1 className='text-2xl font-semibold'>Reset Password</h1>
                              <div className="flex gap-8">
                                  <div className='mt-6'>
                                    <h1 className='text-xl font-medium'>Old Password</h1>
                                      <input type="password" name="oldpassword" onChange={(e) => setoldpassword(e.target.value)} placeholder='Enter Old Password' className='mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'/>
                                  </div>
                                  <div className='mt-6'>
                                    <h1 className='text-xl font-medium'>New Password</h1>
                                      <input type="password" name="oldpassword" placeholder='Enter New Password' onChange={(e) => setnewpassword(e.target.value)} className='mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'/>
                                  </div>
                                  <div className='mt-6'>
                                      <input type="submit" name="submit" onClick={changepassword}  className='mt-9 bg-blue-600 border border-gray-300 text-white text-base rounded-lg focus:ring-blue-500 hover:cursor-pointer focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'/>
                                  </div>
                              </div>
                            </div>
                        </div>

                        <div className={openTab === 3 ? "block" : "hidden"}>
                            <div className='px-4 py-2'>
                              <h1 className='text-2xl font-semibold'>Reset TPIN</h1>
                              <div className="flex gap-8">
                                  <div className='mt-6'>
                                    <h1 className='text-xl font-medium'>Old TPIN</h1>
                                      <input type="password" name="oldtpin" placeholder='Enter Old TPIN' onChange={(e) => setoldtpin(e.target.value)} className='mt-2 w-36 bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'/>
                                  </div>
                                  <div className='mt-6'>
                                    <h1 className='text-xl font-medium'>New TPIN</h1>
                                      <input type="password" name="newtpin" placeholder='Enter New TPIN' onChange={(e) => setnewtpin(e.target.value)} className='mt-2 w-36 bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'/>
                                  </div>
                                  <div className='mt-6'>
                                      <input type="submit" name="submittpin" onClick={changetpin} className='mt-9 bg-blue-600 border border-gray-300 text-white text-base rounded-lg focus:ring-blue-500 hover:cursor-pointer focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'/>
                                  </div>
                              </div>
                            </div>
                        </div>
                        {/* <div className={openTab === 4 ? "block" : "hidden"}>
                            React JS with Tailwind CSS Tab 3 Content show
                        </div> */}
                        {/* <div className={openTab === 4 ? "block" : "hidden"}>
                            <div className='text-center md:px-12'>
                              <ol className='list-disc text-xl  flex gap-x-40 gap-y-8 p-6 flex-wrap services px-4 py-2'>
                                <li>Hello</li>
                                <li>Hello</li>
                                <li>Hello</li>
                                <li>Hello</li>
                                <li>Hello</li>
                                <li>Hello</li>
                                <li>Hello</li>
                                <li>Hello</li>
                                <li>Hello</li>
                                <li>Hello</li>
                              </ol>
                            </div>
                            
                        </div> */}
                    </div>
                </div>
            </div>
    </div>
  )
}

export default MemberSettings
