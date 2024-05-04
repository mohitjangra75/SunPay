import React from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import recharge from '../Data/imgs/recharge.png'
import moneyt from '../Data/imgs/moneytransfer.png'
import aeps from '../Data/imgs/fingerprint.png'
import poster from '../Data/imgs/poster.png'
import aadharp from '../Data/imgs/aadhar.png'
import RightSidebar from './RightSidebar'
import dth from '../Data/imgs/dth.png'
import upi from '../Data/imgs/upi.png'
import settlement from '../Data/imgs/negotiation.png'
import post from '../Data/imgs/postpaid.png'
import payout  from '../Data/imgs/payout.png'
import gas from '../Data/imgs/gas-cylinder.png'
import elect from '../Data/imgs/light-bulb.png'
import water from '../Data/imgs/water-tap.png'
import fastag from '../Data/imgs/fastag.png'
import lic from '../Data/imgs/lic.png'
import insur from '../Data/imgs/insurance.png'
import loan from '../Data/imgs/loan.png'
import education from '../Data/imgs/education.png'
import broadband from '../Data/imgs/broadband.png'
import telephone from '../Data/imgs/telephone.png'
import voucher from '../Data/imgs/voucher.png'
import cable from '../Data/imgs/cable.png'
import stv from '../Data/imgs/stv.png'
import mcd from '../Data/imgs/mcd.png'
import traffic from '../Data/imgs/traffic.png'
import datacard from '../Data/imgs/datacard.png'

// import net from '../Data/imgs/internet.png'
import bus from '../Data/imgs/bus.png'
import train from '../Data/imgs/rail.png'
import hotel from '../Data/imgs/hotel.png'
import flight from '../Data/imgs/plane.png'
import wallet from '../Data/imgs/wallettowallet.png'

const Main = (props) => {

  const navigate = useNavigate();
  const localdata = props.data;
  const [user, setuser] = useState([]);

  const location = useLocation();
  useEffect(() => { 
    const fetchuser = async () => {
        try {
          const response = await axios.get(`http://127.0.0.1:8000/api/users/${localdata.id}`)
          setuser(response.data);
          console.log('liveuser dashboard',user) 
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchuser();
  }, [location]); 

  return (
    <div className='maindashboardcont gap-20 w-full py-4 pr-2 pl-2 '>

      <div className='md:flex gap-2'>
        <div className='servicecont text-xl md:pl-10 bg-red-200 p-4 md:w-[1900px] md:flex bg-orange-200'>
          <div>  
             
            <div className='flex flex-wrap my-2 gap-12 gap-y-16'>

              {user.role_id === 1 ? (
                <div className='flex flex-wrap my-2 gap-12 gap-y-16'>
                   <NavLink to='/member/wallet-to-wallet'>
                      <div className='service bg-white border-[2px]  w-24 h-24 border-slate-950 rounded-lg hover:bg-blue-500 hover:text-white'>
                        <img src={wallet} alt="" className='w-full h-full'/>
                        <h1 className='text-lg text-center mt-2 font-semibold'>Wallet to Wallet</h1>
                      </div>
                   </NavLink>

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

                  <NavLink to='/member/gas'>
                  <div className='service bg-white border-[2px]  w-24 h-24 border-slate-950 rounded-lg hover:bg-blue-500 hover:text-white'>
                    <img src={gas} alt="" className='w-full h-full'/>
                    <h1 className='text-lg text-center mt-2 font-semibold'>Gas</h1>
                  </div>
                  </NavLink> 

                  <NavLink to='/member/lic'>
                  <div className='service bg-white border-[2px]  w-24 h-24 border-slate-950 rounded-lg hover:bg-blue-500 hover:text-white'>
                    <img src={lic} alt="" className='w-full h-full'/>
                    <h1 className='text-lg text-center mt-2 font-semibold'>LIC</h1>
                  </div>
                  </NavLink> 

                  <NavLink to='/member/broadband'>
                  <div className='service bg-white border-[2px]  w-24 h-24 border-slate-950 rounded-lg hover:bg-blue-500 hover:text-white'>
                    <img src={broadband} alt="" className='w-full h-full'/>
                    <h1 className='text-lg text-center mt-2 font-semibold'>Broadband</h1>
                  </div>
                  </NavLink> 

                  <NavLink to='/member/dth'>
                  <div className='service bg-white border-[2px]  w-24 h-24 border-slate-950 rounded-lg hover:bg-blue-500 hover:text-white'>
                    <img src={dth} alt="" className='w-full h-full'/>
                    <h1 className='text-lg text-center mt-2 font-semibold'>DTH</h1>
                  </div>
                  </NavLink> 

                  <NavLink to='/member/fee'>
                  <div className='service bg-white border-[2px]  w-24 h-24 border-slate-950 rounded-lg hover:bg-blue-500 hover:text-white'>
                    <img src={education} alt="" className='w-full h-full'/>
                    <h1 className='text-lg text-center mt-2 font-semibold'>Education Fees Pay</h1>
                  </div>
                  </NavLink> 

                  <NavLink to='/member/telephone'>
                  <div className='service bg-white border-[2px]  w-24 h-24 border-slate-950 rounded-lg hover:bg-blue-500 hover:text-white'>
                    <img src={telephone} alt="" className='w-full h-full'/>
                    <h1 className='text-lg text-center mt-2 font-semibold'>Telephone</h1>
                  </div>
                  </NavLink> 

                  <NavLink to='/member/stv'>
                  <div className='service bg-white border-[2px]  w-24 h-24 border-slate-950 rounded-lg hover:bg-blue-500 hover:text-white'>
                    <img src={stv} alt="" className='w-full h-full'/>
                    <h1 className='text-lg text-center mt-2 font-semibold'>STV</h1>
                  </div>
                  </NavLink> 

                  <NavLink to='/member/traffic_challan'>
                  <div className='service bg-white border-[2px]  w-24 h-24 border-slate-950 rounded-lg hover:bg-blue-500 hover:text-white'>
                    <img src={traffic} alt="" className='w-full h-full'/>
                    <h1 className='text-lg text-center mt-2 font-semibold'>Traffic Challan</h1>
                  </div>
                  </NavLink> 

                  <NavLink to='/member/voucher'>
                  <div className='service bg-white border-[2px]  w-24 h-24 border-slate-950 rounded-lg hover:bg-blue-500 hover:text-white'>
                    <img src={voucher} alt="" className='w-full h-full'/>
                    <h1 className='text-lg text-center mt-2 font-semibold'>Digital Voucher</h1>
                  </div>
                  </NavLink> 

                  <NavLink to='/member/cable'>
                  <div className='service bg-white border-[2px]  w-24 h-24 border-slate-950 rounded-lg hover:bg-blue-500 hover:text-white'>
                    <img src={cable} alt="" className='w-full h-full'/>
                    <h1 className='text-lg text-center mt-2 font-semibold'>Cable</h1>
                  </div>
                  </NavLink> 

                  <NavLink to='/member/datacard'>
                  <div className='service bg-white border-[2px]  w-24 h-24 border-slate-950 rounded-lg hover:bg-blue-500 hover:text-white'>
                    <img src={datacard} alt="" className='w-full h-full'/>
                    <h1 className='text-lg text-center mt-2 font-semibold'>Datacard</h1>
                  </div>
                  </NavLink> 

                  <NavLink to='/member/loanrepayment'>
                  <div className='service bg-white border-[2px]  w-24 h-24 border-slate-950 rounded-lg hover:bg-blue-500 hover:text-white'>
                    <img src={loan} alt="" className='w-full h-full'/>
                    <h1 className='text-lg text-center mt-2 font-semibold'>Loan Payment</h1>
                  </div>
                  </NavLink> 

                  <NavLink to='/member/mcdtax'>
                  <div className='service bg-white border-[2px]  w-24 h-24 border-slate-950 rounded-lg hover:bg-blue-500 hover:text-white'>
                    <img src={mcd} alt="" className='w-full h-full'/>
                    <h1 className='text-lg text-center mt-2 font-semibold'>MCD Tax & Services</h1>
                  </div>
                  </NavLink> 

                  <NavLink to='/member/insurance'>
                  <div className='service bg-white border-[2px]  w-24 h-24 border-slate-950 rounded-lg hover:bg-blue-500 hover:text-white'>
                    <img src={insur} alt="" className='w-full h-full'/>
                    <h1 className='text-lg text-center mt-2 font-semibold'>Insurance</h1>
                  </div>
                  </NavLink> 

                {/* 
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
                  </NavLink>  */}   
                
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
              ) : (
                    <div> 
                      <NavLink to='/member/wallet-to-wallet'>
                        <div className='service bg-white border-[2px]  w-24 h-24 border-slate-950 rounded-lg hover:bg-blue-500 hover:text-white'>
                          <img src={wallet} alt="" className='w-full h-full'/>
                          <h1 className='text-lg text-center mt-2 font-semibold'>Wallet to Wallet</h1>
                        </div>
                      </NavLink>
                    </div>
                )}
            
              

                



                  

                
            </div> 
          </div>
        </div>
    
        <aside class="h-screen bg-slate-400 overflow-auto scrollbar-hide sticky top-0">
          <RightSidebar></RightSidebar>
        </aside>

        
      </div>

      {/* Latest Notification */}
      <div className='mt-4  text-center px-2 text-xl text-white bg-yellow-600'>
        Latest Notification
      </div>

      {/* Posters */}
      <div className='poster p-8 border-2 m-2 border-gray-400 mt-8'>
        <div className='border-2'>
          <img src={poster} className='w-full' alt='' />
        </div>
      </div>

      
     

    </div>
  )
}

export default Main