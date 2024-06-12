import React from 'react'
import { useParams } from 'react-router-dom'
import { Data } from './Dashboard/DashboardComponents/Data/Data'
import { VscOutput } from "react-icons/vsc";
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';


const Reports = (props) => {

  const [dataall, setDatall] = useState();  
  useEffect(() => {
    setDatall(props);
    console.log('dataall from navbar', dataall);
  }, []);

  const {category} = useParams()
  let cat = Data?.find((categ) => categ?.url === parseInt(category)) 
 
  const menus = [
    { name: "AEPS Report", link: "/member/aeps-history", icon: VscOutput }, 
    { name: "DMT Report", link: "/member/dmt-history", icon: VscOutput }, 
    { name: "Recharge & Utility", link: "/member/recharge-history", icon: VscOutput },
    { name: "Payout History", link: "/member/payoutDMT", icon: VscOutput },
    { name: "Credit Card", link: "/member/credithistory", icon: VscOutput },
    { name: "Wallet to Wallet", link: "/member/wallettowallet-history", icon: VscOutput }
  ]

  return (
    <div className='Reports'>
      <div className='flex flex-wrap gap-12 m-8 bg-neutral-200 p-6'>
        {menus?.map((menu, i) => (
          <Link to={menu?.link} key={i} className={` ${menu?.margin} group border border-black flex items-center text-2xl bg-white gap-3.5 font-medium p-6 rounded-md hover:bg-blue-700 hover:text-white`}>
            <div>{React.createElement(menu?.icon, { size: "20" })}</div>
            <h2 >
              {menu?.name}
            </h2>
          </Link>
        ))}
      </div>
     
      </div>
  )
}

export default Reports
