import React from 'react'
import { NavLink } from 'react-router-dom'
import recharge from '../Data/imgs/recharge.png'
import moneyt from '../Data/imgs/moneytransfer.png'
import aeps from '../Data/imgs/fingerprint.png'
import aadharp from '../Data/imgs/aadhar.png'
import RightSidebar from './RightSidebar'
// import dth from '../Data/imgs/dth.png'
import upi from '../Data/imgs/upi.png'
import settlement from '../Data/imgs/negotiation.png'
import post from '../Data/imgs/postpaid.png'
import payout  from '../Data/imgs/payout.png'
// import gas from '../Data/imgs/gas-cylinder.png'
import elect from '../Data/imgs/light-bulb.png'
import water from '../Data/imgs/water-tap.png'
import fastag from '../Data/imgs/fastag.png'
import insur from '../Data/imgs/insurance.png'
import loan from '../Data/imgs/loan.png'
// import net from '../Data/imgs/internet.png'
import bus from '../Data/imgs/bus.png'
import train from '../Data/imgs/rail.png'
import hotel from '../Data/imgs/hotel.png'
import flight from '../Data/imgs/plane.png'

const Main = () => {
  return (
    <div className='maindashboardcont gap-20 w-full py-4 pr-2 pl-2 '>

      <div className='md:flex gap-2'>
        <div className='servicecont text-xl md:pl-10 bg-red-200 p-4 md:flex bg-orange-200'>
          <div>  
            <div className='flex flex-wrap my-2  gap-10'>
              <NavLink to='/member/moneytransfer'>
                <div className='service bg-white border-[2px]  w-24 h-24 border-slate-950 rounded-lg hover:bg-blue-500 hover:text-white'>
                  <img src={moneyt} alt="" className='w-full h-full'/>
                  <h1 className='text-lg  text-center mt-2 font-semibold'>DMT</h1>
                </div>
              </NavLink>

              <NavLink to='/member/payoutDMT'>
                <div className='service bg-white border-[2px]  w-24 h-24 border-slate-950 rounded-lg hover:bg-blue-500 hover:text-white'>
                  <img src={payout} alt="" className='w-full h-full'/>
                  <h1 className='text-lg text-center mt-2 font-semibold'>Payout</h1>
                </div>
              </NavLink> 

              <NavLink to='/member/money-transfer'>
                <div className='service bg-white border-[2px]  w-24 h-24 border-slate-950 rounded-lg hover:bg-blue-500 hover:text-white'>
                  <img src={aeps} alt="" className='w-full h-full'/>
                  <h1 className='text-lg text-center mt-2 font-semibold'>AEPS</h1>
                </div>
              </NavLink>

              <NavLink to='/member/aeps'>
                <div className='service bg-white border-[2px]  w-24 h-24 border-slate-950 rounded-lg hover:bg-blue-500 hover:text-white'>
                  <img src={aadharp} alt="" className='w-full h-full'/>
                  <h1 className='text-lg text-center mt-2 font-semibold'>Aadhar</h1>
                </div>
              </NavLink>

              <NavLink to='/member/upi-transfer'>
                <div className='service bg-white border-[2px]  w-24 h-24 border-slate-950 rounded-lg hover:bg-blue-500 hover:text-white'>
                  <img src={upi} alt="" className='w-full h-full'/>
                  <h1 className='text-lg text-center mt-2 font-semibold'>UPI</h1>
                </div>
              </NavLink> 

              <NavLink to='/member/electricity'>
              <div className='service bg-white border-[2px]  w-24 h-24 border-slate-950 rounded-lg hover:bg-blue-500 hover:text-white'>
                <img src={elect} alt="" className='w-full h-full'/>
                <h1 className='text-lg text-center mt-2 font-semibold'>Electricity</h1>
              </div>
              </NavLink>

              <NavLink to='/member/prepaid'>
                <div className='service bg-white border-[2px]  w-24 h-24 border-slate-950 rounded-lg hover:bg-blue-500 hover:text-white'>
                  <img src={recharge} alt="" className='w-full h-full'/>
                  <h1 className='text-lg text-center mt-2 font-semibold'>Prepaid</h1>
                </div>
              </NavLink>

              <NavLink to='/member/postpaid'>
              <div className='service bg-white border-[2px]  w-24 h-24 border-slate-950 rounded-lg hover:bg-blue-500 hover:text-white'>
                <img src={post} alt="" className='w-full h-full'/>
                <h1 className='text-lg text-center mt-2 font-semibold'>Postpaid</h1>
              </div>
              </NavLink> 

              <NavLink to='/member/fastag'>
              <div className='service bg-white border-[2px]  w-24 h-24 border-slate-950 rounded-lg hover:bg-blue-500 hover:text-white'>
                <img src={fastag} alt="" className='w-full h-full'/>
                <h1 className='text-lg text-center mt-2 font-semibold'>Fastag</h1>
              </div>
              </NavLink>

              {/* <NavLink to='/member/upi'>
                <div className='service bg-white border-[2px]  w-24 h-24 border-slate-950 rounded-lg hover:bg-blue-500 hover:text-white'>
                  <img src={settlement} alt="" className='w-full h-full'/>
                  <h1 className='text-lg text-center mt-2 font-semibold'>UPI</h1>
              </div>
              </NavLink> */}

              {/* <NavLink to='/member/upi-transfer'>
              <div className='service bg-white border-[2px]  w-24 h-24 border-slate-950 rounded-lg hover:bg-blue-500 hover:text-white'>
                <img src={net} alt="" className='w-full h-full'/>
                <h1 className='text-lg text-center mt-2 font-semibold'>Internet</h1>
              </div>
              </NavLink> */}

              {/* <NavLink to='/member/bus-booking'>
              <div className='service bg-white border-[2px]  w-24 h-24 border-slate-950 rounded-lg hover:bg-blue-500 hover:text-white'>
                <img src={bus} alt="" className='w-full h-full'/>
                <h1 className='text-lg text-center mt-2 font-semibold'>Bus</h1>
              </div>
              </NavLink>

              <NavLink to='/member/flight'>
              <div className='service bg-white border-[2px]  w-24 h-24 border-slate-950 rounded-lg hover:bg-blue-500 hover:text-white'>
                <img src={flight} alt="" className='w-full h-full'/>
                <h1 className='text-lg text-center mt-2 font-semibold'>Flight</h1>
              </div>
              </NavLink>

              <NavLink to='/member/irctc'>
              <div className='service bg-white border-[2px]  w-24 h-24 border-slate-950 rounded-lg hover:bg-blue-500 hover:text-white'>
                <img src={train} alt="" className='w-full h-full'/>
                <h1 className='text-lg text-center mt-2 font-semibold'>IRCTC</h1>
              </div>
              </NavLink>

              <NavLink to='/member/hotel-booking'>
              <div className='service bg-white border-[2px]  w-24 h-24 border-slate-950 rounded-lg hover:bg-blue-500 hover:text-white'>
                <img src={hotel} alt="" className='w-full h-full'/>
                <h1 className='text-lg text-center mt-2 font-semibold'>Hotel</h1>
              </div>
              </NavLink> */}

              <NavLink to='/member/water'>
              <div className='service bg-white border-[2px]  w-24 h-24 border-slate-950 rounded-lg hover:bg-blue-500 hover:text-white'>
                <img src={water} alt="" className='w-full h-full'/>
                <h1 className='text-lg text-center mt-2 font-semibold'>Water</h1>
              </div>
              </NavLink>

              {/* <NavLink to='/member/upi-transfer'>
              <div className='service bg-white border-[2px]  w-24 h-24 border-slate-950 rounded-lg hover:bg-blue-500 hover:text-white'>
                <img src={insur} alt="" className='w-full h-full'/>
                <h1 className='text-lg text-center mt-2 font-semibold'>Insurance</h1>
              </div>
              </NavLink> */}

              {/* <NavLink to='/member/upi-transfer'>
              <div className='service bg-white border-[2px]  w-24 h-24 border-slate-950 rounded-lg hover:bg-blue-500 hover:text-white'>
                <img src={loan} alt="" className='w-full h-full'/>
                <h1 className='text-lg text-center mt-2 font-semibold'>Loan</h1>
              </div>
              </NavLink> */}
            </div> 
          </div>
        </div>
    
      <aside class="h-screen overflow-auto scrollbar-hide sticky top-0">
        <RightSidebar></RightSidebar>
      </aside>

        
      </div>

      
     

    </div>
  )
}

export default Main