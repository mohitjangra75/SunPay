import React from 'react'
import { AiFillBell } from "react-icons/ai";
import logo from '../Data/imgs/logo.png'
import bbps from '../Data/imgs/bbps.png';
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { NavLink, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

const Navbar = (props) => {  
    // const location = useLocation();
    // const data = location.state.data;
    const [dataall, setDatall] = useState();  
  useEffect(() => {
    setDatall(props);
    console.log('dataall from navbar', dataall);
  }, []);

  return (
   
    <div>
        <div className=' z-50 md:fixed top-0  px-6  bg-gray-200 w-full justify-between items-center gap-[20px] inline-flex '>
        <div className="flex  gap-8 items-center">
            
            <div className="md:py-2 flex float-left gap-8 border-[#e4e4e4]">
                <img src={logo} alt="" className='overflow-y-hidden h-[76px] w-[150px]' />
                <img src={bbps} alt="" className='overflow-y-hidden h-[76px] w-[76px]'/>
            </div>

            <div className='md:pl-12 md:flex md:gap-8'>
                <div className=" text-xl right-0 text-center border-black rounded-lg border-2 px-4 font-semibold leading-8 hover:bg-blue-500 hover:text-white">Welcome! <br/>{props.data.name}</div>
                <div className=" text-xl right-0 text-center border-black rounded-lg border-2 px-4 font-semibold leading-8 hover:bg-blue-500 hover:text-white">Wallet Balance <br/>{props.data.available_balance}</div>
                <div className=" text-xl right-0 text-center border-black rounded-lg border-2 px-4 font-semibold leading-8 hover:bg-blue-500 hover:text-white">AEPS Wallet <br/>₹12000</div>
                <div className=" text-xl right-0 text-center border-black rounded-lg border-2 px-4 font-semibold leading-8 hover:bg-blue-500 hover:text-white">ASM <br/>MR. ABC</div>
                <div className=" text-xl right-0 text-center border-black rounded-lg border-2 px-4 font-semibold leading-8 hover:bg-blue-500 hover:text-white">DIST. <br/>Mr. ABC</div>
            </div>

            <div className='flex gap-8 float-right ml-16'>
                <div>
                    <AiFillBell onClick={props.action} className='text-black mt-2 w-8 h-8 hover:cursor-pointer'/>      
                </div>

                <div>
                    {/* Profile dropdown */}
                    <Menu as="div" className="relative">
                    <div>
                        <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        <img className="h-12 w-12 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Profile"/>
                        </Menu.Button>
                    </div>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                            {({ active }) => (
                            <NavLink to='/member/profile' className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}>
                                Your Profile
                            </NavLink>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                        {({ active }) => (
                            <NavLink to='/member/settings' className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}>
                                Settings
                            </NavLink>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                           <NavLink to='/member/login' className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}>
                                Sign Out
                            </NavLink>
                            )}
                        </Menu.Item>
                        </Menu.Items>
                    </Transition>
                    </Menu>
                </div>
            </div>
        </div>

           
        </div>   
    </div>
    
    
  )
}
export default Navbar