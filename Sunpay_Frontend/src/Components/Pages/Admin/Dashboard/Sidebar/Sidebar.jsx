import React from 'react'
import { useState } from 'react';
import { HiMenuAlt1 } from "react-icons/hi";
import { Link } from 'react-router-dom';
import { IoIosSettings } from "react-icons/io";
import { FaUserEdit } from "react-icons/fa";
import { LiaBookSolid } from "react-icons/lia";
import { FaFilePen } from "react-icons/fa6";
import { LuMessagesSquare } from "react-icons/lu";



const Sidebar = () => {
      
      const [open, setOpen] = useState(true);
      const [show, setshow] = useState(true);
    
      return (
        <div className='flex gap-6'>
        <div
       className={`bg-blue-800 min-h-screen ${open ? "w-96" : "w-16" } duration-500 text-gray-100 px-4`}>
       <div className="py-3 flex justify-end">
         <HiMenuAlt1 size={26} className="cursor-pointer" onClick={() => setOpen(!open)} />
       </div>
       
      <div className="mt-4 flex flex-col gap-4 relative">
      

      <ul>
        <li>
            <Link to='/admin/dashboard' className='group flex items-center text-lg  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md'> 
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" className={ `w-6 h-6 text-gray-100`} fill="none"  viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round"  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                </div>
                <h2  className={`whitespace-pre duration-500 ${!open && "opacity-0 translate-x-28 overflow-hidden"}`}>
                    <span className="text-gray-100">Dashboard</span>
                </h2>
            </Link>
        </li>
{/* Settings */}
        <li className='group flex items-center text-lg  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md'>
            <div>
                <IoIosSettings className='text-2xl'/>
            </div>

            <h2  className={`whitespace-pre duration-500 ${!open && "opacity-0 translate-x-28 overflow-hidden"}`}>
            <details className="dropdown">
                <summary className="m-1 appearance-none	hover:cursor-pointer">Settings</summary>

                <div  className=" bg-white divide-y divide-gray-100 rounded-lg shadow w-60 dark:bg-gray-700">
                            <ul className='list-disc p-2 shadow menu dropdown-content z-[1] text-white ml-4 '>
                                   {/* <Link to='/admin/managecompany'>
                                    <li className='text-black pb-2 hover:text-white hover:bg-gray-700 '>Manage company</li>
                                </Link> */}
                                {/* <Link to='/admin/setpackage'>
                                    <li className='text-black pb-2 hover:text-white hover:bg-gray-700 '>Package</li>
                                </Link>
                                 */}
                                {/* <Link to='/admin/addrole'>
                                    <li className='text-black pb-2 hover:text-white hover:bg-gray-700 '>Role</li>
                                </Link> */}
                                {/* <Link to='/admin/assign-package'>
                                    <li className='text-black pb-2 hover:text-white hover:bg-gray-700 '>Assign package</li>
                                </Link> */}
                                {/* <Link to='/admin/company'>
                                    <li className='text-black pb-2 hover:text-white hover:bg-gray-700 '>Company</li>
                                </Link> 
                                <Link to='/admin/companybank'>
                                    <li className='text-black pb-2 hover:text-white hover:bg-gray-700 '>Company Bank Details</li>
                                </Link>
                                <Link to='/admin/fund-request'>
                                    <li className='text-black pb-2 hover:text-white hover:bg-gray-700 '>fund-request</li>
                                </Link>
                                <Link to='/admin/permission'>
                                    <li className='text-black pb-2 hover:text-white hover:bg-gray-700 '>Permission Settings</li>
                                </Link>
                                <Link to='/admin/addbank'>
                                    <li className='text-black pb-2 hover:text-white hover:bg-gray-700 '>Add Bank</li>
                                </Link>
                                <Link to='/admin/kycmaster'>
                                    <li className='text-black pb-2 hover:text-white hover:bg-gray-700 '>KYC MAster</li>
                                </Link>*/}
                                <Link to='/admin/changerole '>
                                    <li className='text-black pb-2 hover:text-white hover:bg-gray-700 '>Change Role</li>
                                </Link>
                                <Link to='/admin/parentchange'>
                                    <li className='text-black pb-2 hover:text-white hover:bg-gray-700 '>Parent Change</li>
                                </Link>
                                <Link to='/admin/managenews'>
                                    <li className='text-black pb-2 hover:text-white hover:bg-gray-700 '>Manage News</li>
                                </Link>
                                <Link to='/admin/managenotification'>
                                    <li className='text-black pb-2 hover:text-white hover:bg-gray-700 '>Manage Notifications</li>
                                </Link>
                                {/* <Link to='/admin/assignservices '>
                                    <li className='text-black pb-2 hover:text-white hover:bg-gray-700 '>Assign services</li>
                                </Link> */}
                                {/* <Link to='/admin/masterrole'>
                                    <li className='text-black pb-2 hover:text-white hover:bg-gray-700 '>Master Role</li>
                                </Link> */}
                            </ul>
                    </div>
                </details>
            </h2>
        </li>
{/* Manage Member */}
        <li className='group flex items-center text-lg  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md'>
            <div>
                <FaUserEdit className='text-2xl'/> 
            </div>

            <h2  className={`whitespace-pre duration-500 ${!open && "opacity-0 translate-x-28 overflow-hidden"}`}>
            <details className="dropdown">
                <summary className="m-1 appearance-none	hover:cursor-pointer">Manage Member</summary>

                <div  className=" bg-white divide-y divide-gray-100 rounded-lg shadow w-60 dark:bg-gray-700">
                            <ul className='list-disc p-2 shadow menu dropdown-content z-[1] text-white ml-4 '>
                                 <Link to='/admin/balance-transfer'>
                                    <li className='text-black pb-2 hover:text-white hover:bg-gray-700 '>Balance Transfer</li>
                                </Link>
                                <Link to='/admin/staff-register'>
                                    <li className='text-black pb-2 hover:text-white hover:bg-gray-700 '>Register Staff</li>
                                </Link>
                                <Link to='/admin/staff-list'>
                                    <li className='text-black pb-2 hover:text-white hover:bg-gray-700 '>Staff List</li>
                                </Link>
                                <Link to='/admin/change-password1'>
                                    <li className='text-black pb-2 hover:text-white hover:bg-gray-700 '>Change Retailer password</li>
                                </Link>

                                <Link to='/admin/change-password2'>
                                    <li className='text-black pb-2 hover:text-white hover:bg-gray-700 '>Change Distributor password</li>
                                </Link>
                                {/* <Link to='/admin/kycdocs-list'>
                                    <li className='text-black pb-2 hover:text-white hover:bg-gray-700 '>KYC List</li>
                                </Link> */}
                                <Link to='/admin/registration'>
                                    <li className='text-black pb-2 hover:text-white hover:bg-gray-700 '>Registration</li>
                                </Link>
                                <Link to='/admin/managemember'>
                                    <li className='text-black pb-2 hover:text-white hover:bg-gray-700 '>Manage Member</li>
                                </Link>
                            </ul>
                    </div>
                </details>
            </h2>
        </li>
{/* All reports */}
        <li className='group flex items-center text-lg  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md'>
            <div>
                <LiaBookSolid className='text-2xl'/>
            </div>

            <h2  className={`whitespace-pre duration-500 ${!open && "opacity-0 translate-x-28 overflow-hidden"}`}>
            <details className="dropdown">
                <summary className="m-1 appearance-none	hover:cursor-pointer">All Reports</summary>

                <div  className=" bg-white divide-y divide-gray-100 rounded-lg shadow w-60 dark:bg-gray-700">
                            <ul className='list-disc p-2 shadow menu dropdown-content z-[1] text-white ml-4 '>
                                 <Link to='/admin/aeps-history'>
                                    <li className='text-black pb-2 hover:text-white hover:bg-gray-700 '>AEPS History</li>
                                </Link>
                                <Link to='/admin/account-lagger'>
                                    <li className='text-black pb-2 hover:text-white hover:bg-gray-700 '>Account Lagger</li>
                                </Link>
                                <Link to='/admin/payout-history'>
                                    <li className='text-black pb-2 hover:text-white hover:bg-gray-700 '>Payout History</li>
                                </Link>
                                <Link to='/admin/dmt-history'>
                                    <li className='text-black pb-2 hover:text-white hover:bg-gray-700 '>DMT History</li>
                                </Link>
                            </ul>
                    </div>    
                </details>
            </h2>
        </li>
{/* Set Surcharge */}
        <li className='group flex items-center text-lg  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md'>
            <div>
                <FaFilePen className='text-2xl'/>
            </div>

            <h2  className={`whitespace-pre duration-500 ${!open && "opacity-0 translate-x-28 overflow-hidden"}`}>
                <details className="dropdown">
                    <summary className="m-1 appearance-none	hover:cursor-pointer">Set Surcharge</summary>

                    <div  className=" bg-white divide-y divide-gray-100 rounded-lg shadow w-60 dark:bg-gray-700">
                                <ul className='list-disc p-2 shadow menu dropdown-content z-[1] text-white ml-4 '>
                                    <Link to='/admin/aadharpay-surcharge'>
                                        <li className='text-black pb-2 hover:text-white hover:bg-gray-700'>Aadhar Pay</li>
                                    </Link>
                                    <Link to='/admin/dmt-surcharge'>
                                        <li className='text-black pb-2 hover:text-white hover:bg-gray-700 '>DMT Surcharge</li>
                                    </Link>
                                    <Link to='/admin/payout-surcharge'>
                                        <li className='text-black pb-2 hover:text-white hover:bg-gray-700 '>Payout Surcharge</li>
                                    </Link>
                                    <Link to='/admin/upi-surcharge'>
                                        <li className='text-black pb-2 hover:text-white hover:bg-gray-700 '>UPI Surcharge</li>
                                    </Link>
                                    <Link to='/admin/bbps-surcharge'>
                                        <li className='text-black pb-2 hover:text-white hover:bg-gray-700 '>BBPS Surcharge</li>
                                    </Link>
                                    <Link to='/admin/custom-surcharge'>
                                        <li className='text-black pb-2 hover:text-white hover:bg-gray-700 '>Custom Surcharge</li>
                                    </Link>
                                </ul>
                    </div>
                </details>
            </h2>
        </li>
{/* Complaints */}
        <li>
            <Link to='/admin/complaints' className='group flex items-center text-lg  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md'> 
                <div>
                <LuMessagesSquare className={ `w-6 h-6 text-gray-100`} />
 
                </div>
                <h2  className={`whitespace-pre duration-500 ${!open && "opacity-0 translate-x-28 overflow-hidden"}`}>
                    <span className="text-gray-100">Complaints</span>
                </h2>
            </Link>
        </li>
    </ul>
                       
       </div> 
     </div>
    </div>
      )
}

export default Sidebar
