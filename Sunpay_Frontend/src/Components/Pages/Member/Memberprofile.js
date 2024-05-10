import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios'
import { NavLink, useLocation } from 'react-router-dom';
import userprofile from './Dashboard/DashboardComponents/Data/imgs/userprofile.png';

const Memberprofile = (props) => {

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

  const [dataall, setDatall] = useState();  
  useEffect(() => {
    setDatall(props);
    console.log('dataall from member profile', props);
  }, []);

  return (
    <div className='p-4'>
      <div className='bg-slate-300 p-4 py-6 container mx-auto'>
        <div className='flex justify-center items-center'>
          <img
            src={props.data.pic}
            alt=''
            className='text-center w-36 h-36 p-1 rounded-full border-4 border-red-900'
          />
        </div>
        <div className='text-center mt-2'>
          <h1 className='text-3xl font-black'>{user.name}</h1>
          <h1 className='text-xl'>Role</h1>
        </div>
      </div>
      <div className=' bg-slate-300 p-4 py-6 container mx-auto '>
        <div className='flex flex-col justify-center'>
          <ul className='flex space-x-4'>
            <li>
              <NavLink
                to='#'
                onClick={() => setOpenTab(1)}
                className={` ${
                  openTab === 1 ? 'bg-purple-600 text-white' : 'bg-white'
                } inline-block px-4 py-2 text-gray-600 rounded shadow`}
              >
                Profile
              </NavLink>
            </li>
            {/* <li>
                            <NavLink to='#' onClick={() => setOpenTab(2)} className={` ${openTab === 2 ? "bg-purple-600 text-white" : "bg-white"} inline-block px-4 py-2 text-gray-600 rounded shadow`}>
                                Reset Password
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='#' onClick={() => setOpenTab(3)} className={` ${openTab === 3 ? "bg-purple-600 text-white" : "bg-white"} inline-block px-4 py-2 text-gray-600 rounded shadow`}>
                                Reset TPIN
                            </NavLink>
                        </li>
                        <li>
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
          <div className='p-3 mt-6 bg-white border'>
            <div className={openTab === 1 ? 'block' : 'hidden'}>
              <table className='w-full text-lg text-left rtl:text-right rounded-lg border-collapse '>
                <tbody>
                  <tr className='bg-white border  dark:bg-gray-800 dark:border-gray-700 '>
                    <td
                      scope='col'
                      className='px-6 py-3 text-center font-black border-r-2 border-slate-400'
                    >
                      Name
                    </td>
                    <td scope='col' className='pl-12 py-3 '>
                      {user.name}
                    </td>
                  </tr>
                  <tr className='bg-gray-200 border dark:bg-gray-800 dark:border-gray-700 '>
                    <td
                      scope='col'
                      className='px-6 py-3 text-center font-black border-r-2 border-slate-400 '
                    >
                      Address
                    </td>
                    <td scope='col' className='pl-12  py-3 ml-4'>
                      {user.address}
                    </td>
                  </tr>
                  <tr className='bg-white border dark:bg-gray-800 dark:border-gray-700 '>
                    <td
                      scope='col'
                      className='px-6 py-3 text-center font-black border-r-2 border-slate-400'
                    >
                      Mobile No.
                    </td>
                    <td scope='col' className='pl-12 py-3 ml-4'>
                    {user.mobile}
                    </td>
                  </tr>
                  <tr className='bg-gray-200 border dark:bg-gray-800 dark:border-gray-700 '>
                    <td
                      scope='col'
                      className=' py-3 text-center font-black border-r-2 border-slate-400 '
                    >
                      ShopName
                    </td>
                    <td scope='col' className='pl-12  py-3 ml-4'>
                      {user.shop_name}
                    </td>
                  </tr>
                  <tr className='bg-white border dark:bg-gray-800 dark:border-gray-700 '>
                    <td
                      scope='col'
                      className='px-6 py-3 text-center font-black border-r-2 border-slate-400 '
                    >
                      Email ID
                    </td>
                    <td scope='col' className='pl-12  py-3 ml-4'>
                      {user.email}
                    </td>
                  </tr>
                  <tr className='bg-gray-200 border dark:bg-gray-800 dark:border-gray-700 '>
                    <td
                      scope='col'
                      className='px-6 py-3 text-center font-black border-r-2 border-slate-400 '
                    >
                      Aadhaar
                    </td>
                    <td scope='col' className='pl-12  py-3 ml-4'>
                      {user.aadhar}
                    </td>
                  </tr>
                  <tr className='bg-white border dark:bg-gray-800 dark:border-gray-700 '>
                    <td
                      scope='col'
                      className=' py-3 text-center font-black border-r-2 border-slate-400 '
                    >
                      PAN Card
                    </td>
                    <td scope='col' className='pl-12  py-3 ml-4'>
                      {user.pan}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* <div className={openTab === 2 ? "block" : "hidden"}>
                            <div className='px-4 py-2'>
                              <h1 className='text-2xl font-semibold'>Reset Password</h1>
                              <div className="flex gap-8">
                                  <div className='mt-6'>
                                    <h1 className='text-xl font-medium'>Old Password</h1>
                                      <input type="password" name="oldpassword" placeholder='Enter Old Password' className='mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'/>
                                  </div>
                                  <div className='mt-6'>
                                    <h1 className='text-xl font-medium'>New Password</h1>
                                      <input type="password" name="oldpassword" placeholder='Enter New Password' className='mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'/>
                                  </div>
                                  <div className='mt-6'>
                                      <input type="submit" name="submit"  className='mt-9 bg-blue-600 border border-gray-300 text-white text-base rounded-lg focus:ring-blue-500 hover:cursor-pointer focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'/>
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
                                      <input type="password" name="oldpassword" placeholder='Enter Old TPIN' className='mt-2 w-36 bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'/>
                                  </div>
                                  <div className='mt-6'>
                                    <h1 className='text-xl font-medium'>New TPIN</h1>
                                      <input type="password" name="oldpassword" placeholder='Enter New TPIN' className='mt-2 w-36 bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'/>
                                  </div>
                                  <div className='mt-6'>
                                      <input type="submit" name="submittpin" className='mt-9 bg-blue-600 border border-gray-300 text-white text-base rounded-lg focus:ring-blue-500 hover:cursor-pointer focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'/>
                                  </div>
                              </div>
                            </div>
                        </div>
                        
                        <div className={openTab === 4 ? "block" : "hidden"}>
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
  );
};

export default Memberprofile;
