import React, { useEffect, useState } from 'react'
import logo from '../../../Member/Dashboard/DashboardComponents/Data/imgs/logo.png'
import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = (props) => {
    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    const [user,setuser] = useState()
    useEffect(() => {
        const fetchData = async () => {
          try {
            // Fetch data from your backend API
            const response = await fetch(`https://new.sunpay.co.in/api/get_users/${props.data.id}`);
            if (!response.ok) {
              throw new Error('Failed to fetch data');
            }
            const responseid = await response.json();
            console.log('navbar id',responseid)
            const filteredid = responseid.filter(option => option.role_id === 2);
            console.log('filteredid',filteredid)
    
            setuser(responseid)
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      },[]);
  return (
    
    <div>
        {console.log(props.data)}
   { console.log(user)}
       <div className=' z-50 md:fixed top-0 px-20 bg-gradient-to-r from-slate-700 from-10% via-sky-200 via-40% to-emerald-500 to-90% w-full justify-between items-center gap-[20px] inline-flex'>
        <div className=" flex gap-14 items-center">
            
            <div className="md:py-2  border-[#e4e4e4]">
                <img src={logo} alt="" className='overflow-y-hidden h-[76px] w-[150px]' />
            </div>

            <div className='md:pl-4 md:flex md:gap-12'>
                <div className=" md:text-xl right-0 text-center border-black rounded-lg border-2 md:px-4 font-semibold md:leading-8 hover:bg-blue-500 hover:text-white">Main Wallet <br/>₹5000</div>
                <div className=" md:text-xl right-0 text-center border-black rounded-lg border-2 px-4 font-semibold leading-8 hover:bg-blue-500 hover:text-white">AEPS Wallet <br/>₹12000</div>
            </div>
        </div>
        <div className='flex gap-8'>
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
                           <NavLink to='/admin/login' className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}>
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
  )
}

export default Navbar
