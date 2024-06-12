import React from 'react'
import { useState, useEffect } from 'react';
import { HiMenuAlt1 } from "react-icons/hi";
import {MdOutlineDashboard } from "react-icons/md"
import {RiSettings4Line} from 'react-icons/ri'
import {TbReportAnalytics} from 'react-icons/tb'
import { GiReceiveMoney } from "react-icons/gi";
import { AiFillCopy, AiFillDatabase } from "react-icons/ai"
import { BsChatLeftDotsFill } from "react-icons/bs";
import { Link } from 'react-router-dom';

const Sidebar = (props) => {

const menus = [
    { name: "dashboard", link: "/member/dashboard", icon: MdOutlineDashboard },
    { name: "Fund Request", link: "/member/fund-request", icon: GiReceiveMoney },
    { name: "Fund Report", link: "/member/fundreport", icon: GiReceiveMoney },
    { name: "Reports", link: "/member/reports", icon: AiFillDatabase },
    { name: "Account Lagger", link: "/member/accountlagger", icon: TbReportAnalytics, margin: true },
    { name: "Complaint", link: "/member/complaints", icon: BsChatLeftDotsFill },
    { name: "Setting", link: "/member/settings", icon: RiSettings4Line },
  ];

  const [open, setOpen] = useState(true);
  
  const [dataall, setdatall] = useState();  
  
  useEffect(() => {
    setdatall(props);
    console.log('dataall from sidebar', dataall);
  }, []);

  return (
    <div className='flex gap-6'>
    <div
   className={`bg-blue-600 min-h-screen ${
     open ? "w-72" : "w-16"
   } duration-500 text-gray-100 px-4`}
 >
   <div className="py-3 flex justify-end">
     <HiMenuAlt1
       size={26}
       className="cursor-pointer"
       onClick={() => setOpen(!open)}
     />
   </div>
   <div className="mt-4 flex flex-col gap-4 relative">
     {menus?.map((menu, i) => (
       <Link to={menu?.link} key={i} className={` ${menu?.margin} group flex items-center text-xl  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`}>
         <div>{React.createElement(menu?.icon, { size: "20" })}</div>
         <h2 style={ {transitionDelay: `${i + 3}00ms`,}} className={`whitespace-pre duration-500 ${!open && "opacity-0 translate-x-28 overflow-hidden"}`}>
           {menu?.name}
         </h2>
         <h2 className={`${ open && "hidden" } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `} >
           {menu?.name}
         </h2>
       </Link>
     ))}
   </div>
 </div>
</div>
  )
}

export default Sidebar