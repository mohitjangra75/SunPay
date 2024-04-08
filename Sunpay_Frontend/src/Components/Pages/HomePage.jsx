import React from 'react'
import './Pages CSS/Homepage.css'
import {NavLink } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import StickyNavbar  from '../Navbar/StickyNavbar';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Footer from '../Footer/Footer'
import aeps from './Images Homepage/aeps.png'
import s1 from './Images Homepage/service-1.jpg'
import s2 from './Images Homepage/service-2.jpg'
import s3 from './Images Homepage/service-3.jpg'
import s4 from './Images Homepage/service-4.jpg'
import s5 from './Images Homepage/service-5.jpg'
import s6 from './Images Homepage/service-6.jpg'
import s7 from './Images Homepage/service-7.jpg'
import s8 from './Images Homepage/bbps.png'
import recharge from './Images Homepage/recharge.png'
import { AiTwotoneAppstore } from "react-icons/ai";
import abimgr from './Images Homepage/aboutsecimg.png'


export default function HomePage() {
  return (
    <div className='homecompcont'> 
     <StickyNavbar></StickyNavbar>
        <section className='wrapper mt-16 pb-12'>
        <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={10}
      slidesPerView={1}
      navigation
    >
      <SwiperSlide>
        <div className='swiperslide1'>
        <div className="wrapcont  w-3/4">
           <div className='itemwrap mt-5 flex w-full  bg-yellow-300 '>
           <div className="homtextcont pt-5 flex">
              <div className='hgfd text-black grid px-4 '>
                
                <span className=' w-128'> 
                <p className='text-2xl mt-4 mb-4'>AEPS</p>
                  <p className='text-4xl'>Aadhar Enabled Payment System</p>
                  <p className='w-128 text-lg mt-8 w-96'>
                Aadhaar Enabled Payment System (AEPS) is a sort of installment framework that depends on the Unique Identification Number and permits Aadhaar card holders to consistently make money related exchanges through Aadhaar-based confirmation.
                </p>
                </span>
               
              </div>
              </div>
            <div className="homimgcont ">
                  <img src={aeps} alt="" />
            </div>
           </div>
           
          </div>
        </div>
      </SwiperSlide>

      <SwiperSlide>
      <div className='swiperslide2'>
        <div className="wrapcont  w-3/4">
           <div className='itemwrap mt-5 flex w-full  bg-yellow-300 '>
           <div className="homtextcont pt-5 flex">
              <div className='hgfd text-black grid px-4 '>
                
                <span className=' w-128'> 
                <p className='text-2xl mt-4 mb-4'>BBPS</p>
                  <p className='text-4xl'>Bharat Billpay Payment System</p>
                  <p className='w-128 text-lg mt-8 w-96'>
                  Bharat Bill Payment System facilitates the installment of bills and enhances the security and speed of bill pay. The administration is accessible in different installment modes, on the web and through a system of specialists                </p>
                </span>
               
              </div>
              </div>
            <div className="homimgcont ">
                  <img src={s8} alt="" className='pb-2'/>
            </div>
           </div>
           
          </div>
        </div>
      </SwiperSlide>

      <SwiperSlide>
      <div className='swiperslide3'>
        <div className="wrapcont  w-3/4">
           <div className='itemwrap mt-5 flex w-full  bg-yellow-300 '>
           <div className="homtextcont pt-5 flex">
              <div className='hgfd text-black grid px-4 '>
                
                <span className=' w-128'> 
                <p className='text-2xl mt-4 mb-4'>Recharge</p>
                  <p className='text-4xl'>Mobile Recharge, Utility Bill <br />Payments, M-ATM!</p>
                  <p className='w-96 text-lg mt-8'>
                  SunPay includes virtually everything you need to expand upon your current service offerings or start your own Multi-services business.                </p>
                </span>
               
              </div>
              </div>
            <div className="homimgcont ">
                  <img src={recharge} alt="" />
            </div>
           </div>
           
          </div>
        </div>
      </SwiperSlide>

      {/* <SwiperSlide>
      <div className='swiperslide4'>
        <div className="wrapcont  w-3/4">
           <div className='itemwrap mt-5 flex w-full  bg-yellow-300 '>
           <div className="homtextcont pt-5 flex">
              <div className='hgfd text-black grid px-4 '>
                
                <span className=' w-128'> 
                <p className='text-2xl mt-4 mb-4'>AEPS</p>
                  <p className='text-4xl'>Aadhar Enabled Payment System</p>
                  <p className='w-128a text-lg mt-8'> </p>
                </span>
               
              </div>
              </div>
            <div className="homimgcont ">
                  <img src={aeps} alt="" />
            </div>
           </div>
           
          </div>
        </div>
      </SwiperSlide>

      <SwiperSlide>
      <div className='swiperslide5'>
        <div className="wrapcont  w-3/4">
           <div className='itemwrap mt-5 flex w-full  bg-yellow-300 '>
           <div className="homtextcont pt-5 flex">
              <div className='hgfd text-black grid px-4 '>
                
                <span className=' w-128'> 
                <p className='text-2xl mt-4 mb-4'>AEPS</p>
                  <p className='text-4xl'>Aadhar Enabled Payment System</p>
                  <p className='w-128a text-lg mt-8'>
                Aadhaar Enabled Payment System (AEPS) is a sort of installment framework that depends on the Unique Identification Number and permits Aadhaar card holders to consistently make money related exchanges through Aadhaar-based confirmation.
                </p>
                </span>
               
              </div>
              </div>
            <div className="homimgcont ">
                  <img src={aeps} alt="" />
            </div>
           </div>
           
          </div>
        </div>
      </SwiperSlide>

      <SwiperSlide>
      <div className='swiperslide6'>
        <div className="wrapcont  w-3/4">
           <div className='itemwrap mt-5 flex w-full  bg-yellow-300 '>
           <div className="homtextcont pt-5 flex">
              <div className='hgfd text-black grid px-4 '>
                
                <span className=' w-128'> 
                <p className='text-2xl mt-4 mb-4'>AEPS</p>
                  <p className='text-4xl'>Aadhar Enabled Payment System</p>
                  <p className='w-128a text-lg mt-8'>
                Aadhaar Enabled Payment System (AEPS) is a sort of installment framework that depends on the Unique Identification Number and permits Aadhaar card holders to consistently make money related exchanges through Aadhaar-based confirmation.
                </p>
                </span>
               
              </div>
              </div>
            <div className="homimgcont ">
                  <img src={aeps} alt="" />
            </div>
           </div>
           
          </div>
        </div>
      </SwiperSlide> 

      <SwiperSlide>
      <div className='swiperslide7'>
        <div className="wrapcont  w-3/4">
           <div className='itemwrap mt-5 flex w-full  bg-yellow-300 '>
           <div className="homtextcont pt-5 flex">
              <div className='hgfd text-black grid px-4 '>
                
                <span className=' w-128'> 
                <p className='text-2xl mt-4 mb-4'>AEPS</p>
                  <p className='text-4xl'>Aadhar Enabled Payment System</p>
                  <p className='w-128a text-lg mt-8'>
                Aadhaar Enabled Payment System (AEPS) is a sort of installment framework that depends on the Unique Identification Number and permits Aadhaar card holders to consistently make money related exchanges through Aadhaar-based confirmation.
                </p>
                </span>
               
              </div>
              </div>
            <div className="homimgcont ">
                  <img src={aeps} alt="" />
            </div>
           </div>
           
          </div>
        </div>
      </SwiperSlide>

      <SwiperSlide>
      <div className='swiperslide8'>
        <div className="wrapcont  w-3/4">
           <div className='itemwrap mt-5 flex w-full  bg-yellow-300 '>
           <div className="homtextcont pt-5 flex">
              <div className='hgfd text-black grid px-4 '>
                
                <span className=' w-128'> 
                <p className='text-2xl mt-4 mb-4'>AEPS</p>
                  <p className='text-4xl'>Aadhar Enabled Payment System</p>
                  <p className='w-128a text-lg mt-8'>
                Aadhaar Enabled Payment System (AEPS) is a sort of installment framework that depends on the Unique Identification Number and permits Aadhaar card holders to consistently make money related exchanges through Aadhaar-based confirmation.
                </p>
                </span>
               
              </div>
              </div>
            <div className="homimgcont ">
                  <img src={aeps} alt="" />
            </div>
           </div>
           
          </div>
        </div>
      </SwiperSlide> */}
   
    </Swiper>
         

          
        </section>
        
       
 {/* Appointment line content */}
        <div className="wrapbeltext">
      <div className="leftwrapbeltxt">
      <div className="wrpbolhead">
      Looking for a Solution for your Business? 
    </div>
    <div className="wrpbeltxt">Make an appointment today with one of our solution expert</div>
    </div>  

      <div className="rightwrapbeltxt">
        <div className="wrapbelbtn">
          <button type="submit">
             <p> MAKE AN APPOINTMENT</p>
          </button>
        </div>
      </div>
  </div>  

   {/* About Section */}
          <section className='aboutussecdiv bg-white flex pb-12'>
            <div className='w-3/5'>
            <div className='aboutussechead pt-8'>
              <h1 className=' text-7xl text-orange rounded-lg pl-20 w-100% mt-8 break-all inline-block'>
                About</h1>
                <h1 className=' text-7xl text-green-700 rounded-lg pl-4 w-100% mt-8 break-all inline-block'>us </h1>
            </div>
          
            <div className="aboutsectext ml-8 text-xl px-10 mt-6 mb-10">
            Sunpay has emerged as one of the most popular platforms for electronically transferring funds from one party to another. At Sunpay, we're revolutionizing the way you send and receive money, making it easier, faster, and more affordable than ever before. 
            <br />Our mission is to empower you to send your hard-earned money to your loved ones across the globe with the utmost confidence, security, and convenience.
                  <br />
                  <NavLink to="/about-us" > 
                      <button className='w-48 h-12 mt-7 text-white bg-gradient-to-r from-orange to-green-500 rounded-lg hover:opacity-50'>
                          Read More 
                      </button>
                   </NavLink>
              </div>
        </div>
           
           <div className='w-1/2 container'>
           <div className='aboutsecimg inline-block'>
                <img src={abimgr} alt="" className=' inline-block p-0 '/>               
              </div>
           </div>
          </section>

 {/* More about Sunpay Section */}
          <section className='moresunp bg-slate-500 pb-8'>\
           <div className="moresunp mt-12 flex">
           <div className='leftmoresunp w-2/5  ml-20 mt-16 '>
            <h1 className='text-5xl text-green-700'><b>
            We Are Here To Help You <h1 className='text-5xl text-orange'>Build Your Business</h1>
            </b></h1>

           <p className='mt-6 text-xl w-full'>
           Welcome at SunPay to join a life long business opportunity with us. SunPay is a trusted name in the fintech field. We believe in the best service to make the platform reliable. Money Transfer stands among best Online Service including all over platform.
           </p>
           <p className='mt-6 text-xl w-full'>
           Become a part of this giant in a really small investment. Start today for a better future.  Start your fintech business with us. Establishment of higher marketing standard is a key of global market structure. Every financial standard and life standard of people is always depends on marketing strategy. Impost Money brings you a standard and all new marketing plan in network marketing.
              </p>
            <br />
            <NavLink to="/about-us" > 
                      <button className='w-48 h-12 mt-7 text-white bg-gradient-to-r from-orange to-green-500 rounded-lg hover:opacity-50'>
                          Read More 
                      </button>
                   </NavLink>  
            </div>
            <div className='rightmoresunp w-1/2 ml-16 '>
              <div className='boxcontrsunp grid grid-cols-2 gap-y-8'>
                <div className="rmoresunpitem w-72 h-72 ml-4   ">
                  <div className="rmoresunpitemicon rounded-full ml-6 w-20 h-20 bg-green-700 z-40 absolute">
                  {/* <AiTwotoneAppstore className='align-middle text-center h-10 w-10 text-white hover:text-blue-600'/> */}
                </div>
                <div className='rsunpservnamecont mt-12 pt-8  w-full rounded-2xl bg-white relative '>
                        <div className='text-black pb-8'>
                          <h1 className='mt-4 text-3xl ml-6'><b>Easy Integration </b></h1>
                          <p className='mt-4 ml-6'>
                          Sign up and go with easy integration feature for your web and mobile applications.
                          </p>
                          <br />
                          <NavLink to="/services" className='mt-4 ml-6 text-lg w-fit text-violet-950 hover:bg-blue-800 hover:text-white' ><b> Read More</b></NavLink>
                          </div>      
                    </div>

                </div>

                <div className="rmoresunpitem w-72 h-72 ml-4 ">
                  <div className="rmoresunpitemicon rounded-full ml-6 w-20 h-20 bg-green-700 z-40 absolute">
                </div>
                <div className='rmoresunpservnamecont mt-12 pt-8  w-full rounded-2xl bg-white relative '>
                        <div className='text-black pb-8'>
                          <h1 className='mt-4 text-3xl ml-6'><b>Faster Response </b></h1>
                          <p className='mt-4 ml-6  mr-2 '>
                          We use RESTFul APIs which deliver fastest response over requests made from web or mobile devices.
                          </p>
                          <br />
                          <NavLink to="/services" className='mt-4 ml-6 text-lg w-fit text-violet-950 hover:bg-blue-800 hover:text-white' ><b> Read More</b></NavLink>
                          </div>      
                    </div>

                </div>

                <div className="rmoresunpitem w-72 h-72 ml-4   ">
                  <div className="rwhitemicon rounded-full ml-6 w-20 h-20 bg-green-700 z-40 absolute">
                </div>
                <div className='rmoresunpservnamecont mt-12 pt-8  w-full rounded-2xl bg-white relative '>
                        <div className='text-black pb-8'>
                          <h1 className='mt-4 text-3xl ml-6'><b>24/7 Support </b></h1>
                          <p className='mt-4 ml-6 mr-2'>
                          Our customer service is best in class and commited to serve you 24x7 for your queries and questions.
                          </p>
                          <br />
                          <NavLink to="/services" className='mt-4 ml-6 text-lg w-fit text-violet-950 hover:bg-blue-800 hover:text-white' ><b> Read More</b></NavLink>
                        </div>      
                    </div>

                </div>

                <div className="rmoresunpitem w-72 h-72 ml-4">
                  <div className="rwhitemicon rounded-full ml-6 w-20 h-20 bg-green-700 z-40 absolute">
                </div>
                <div className='rmoresunpservnamecont mt-12 pt-8  w-full rounded-2xl bg-white relative '>
                        <div className='text-black pb-8'>
                          <h1 className='mt-4 text-3xl ml-6'><b>For All Platforms </b></h1>
                          <p className='mt-4 ml-6 mr-2'>
                          No worries of technology your application is built on we support all of them.
                          </p>
                          <br />
                          <NavLink to="/services" className='mt-4 ml-6 text-lg w-fit text-violet-950 hover:bg-blue-800 hover:text-white' ><b> Read More</b></NavLink>
                          </div>      
                    </div>

                </div>

                               
              </div>
            </div>
         </div>
       </section> 
 
 {/* Service Section */}
 <section className='servicesectionhome bg-white pt-12 pb-16'>
      <div className="homservseccont w-full">
      <h1 className="inline-block text-7xl ml-12 text-white"><b>Our Services</b></h1><br />
      <h1 className="inline-block text-3xl ml-12 text-zinc-200">Take Business Services From Our Experienced Stuff</h1>

        <div className='homeservslidecont mx-4'>
        <Swiper className='w-flex mt-6 px-6 '
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={10}
      slidesPerView={3}
      navigation
    >
      <SwiperSlide>
        <div className="swiperslide1 px-8 py-4">
          <div className='swiperslide-content rounded-3xl p-6 bg-white hover:bg-blue-700 hover:text-white'>
            <img src={s1} alt=""  className='w-full'/>
            <h1 className='font-black text-4xl'>BBPS</h1>
            <br />
            <p className='text-xl'>
            Bharat Bill Payment System facilitates the installment of bills and enhances the security and speed of bill pay. The administration is accessible in different installment modes, on the web and through a system of specialists
            </p>
          </div>
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div className="swiperslide1 px-8 py-4 ">
          <div className='swiperslide-content rounded-3xl p-6 bg-white hover:bg-blue-700 hover:text-white'>
            <img src={s2} alt=""  className='w-full'/>
            <h1 className='font-black text-4xl'>AEPS</h1>
            <br />
            <p className='text-xl'>
            Aadhaar Enabled Payment System (AEPS) is a sort of installment framework that depends on the Unique Identification Number and permits Aadhaar card holders to consistently make money related exchanges through Aadhaar-based confirmation.
            </p>
          </div>
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div className="swiperslide1 px-8 py-4 ">
          <div className='swiperslide-content rounded-3xl p-6 bg-white hover:bg-blue-700 hover:text-white'>
            <img src={s3} alt=""  className='w-full'/>
            <h1 className='font-black text-4xl'>General Insurance</h1>
            <br />
            <p className='text-xl'>
            General insurance or non-life insurance policies, including automobile and homeowners policies, provide payments depending on the loss from a particular financial event. General insurance is typically defined as any insurance that is not determined.
            </p>
          </div>
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div className="swiperslide1 px-8 py-4 ">
          <div className='swiperslide-content rounded-3xl p-6 bg-white hover:bg-blue-700 hover:text-white'>
            <img src={s4} alt=""  className='w-full'/>
            <h1 className='font-black text-4xl'>Domestic Money Transfer</h1>
            <br />
            <p className='text-xl'>
            Domestic Money Transfer (DMT) benefit is an enormous market in India which got much more lift with current increment in advanced exchanges.The most vital part of a Money Transfer framework is a sheltered and secure application with perfect ongoing.
            </p>
          </div>
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div className="swiperslide1 px-8 py-4 ">
          <div className='swiperslide-content rounded-3xl p-6 bg-white hover:bg-blue-700 hover:text-white'>
            <img src={s5} alt=""  className='w-full'/>
            <h1 className='font-black text-4xl'>Mobile Recharge</h1>
            <br />
            <p className='text-xl'>
              We provides recharge service in India for the mobile networks like Vi, Airtel, BSNL,  Jio
            </p>
          </div>
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div className="swiperslide1 px-8 py-4 ">
          <div className='swiperslide-content rounded-3xl p-6 bg-white hover:bg-blue-700 hover:text-white'>
            <img src={s6} alt=""  className='w-full'/>
            <h1 className='font-black text-4xl'>Travel Booking</h1>
            <br />
            <p className='text-xl'>
              Travel API is fundamentally set of web administrations to get to the movement bargains from various travel consolidators. GDS, outsider flight APIs, inn APIs – all are utilized by fly out offices to get to the movement bargains on the web.
            </p>
          </div>
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div className="swiperslide1 px-8 py-4 ">
          <div className='swiperslide-content rounded-3xl p-6 bg-white hover:bg-blue-700 hover:text-white h-'>
            <img src={s7} alt=""  className='w-full'/>
            <h1 className='font-black text-4xl'>DTH Recharge</h1>
            <br />
            <p className='text-xl'>
              We provide online/Offline DTH recharge service provider. Our DTH service covers the service providers like Tata Sky, Dish TV, Sun Direct, Videocon D2H and Big TV.You can recharge it at the comfort of your home or office Gprs Based Recharge or simple.
            </p>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
        </div>
      </div>
 </section>

 {/* More About Section */}
 <section className='whysunp bg-slate-50'>
  <div className='whysunpcont flex pt-12 pb-12 px-24'>
    <div className='lwhysunp w-1/2'>
      <p className='text-red-600 text-xl bg'>WHY CHOOSE US ? </p><br />
      <h1 className='text-4xl font-black w-5/6'>We Offer Best Professional Services For Your Business</h1>
      <div className='leftwhysunpitemcont mt-12 '>
     
        <div className='lwhysunpitem w-3/4 mb-4 py-4 gap-4 flex'>
          <div className='itemicon'>
            
          </div>
          <div className="itemtext pr-2">
            <h1 className='text-2xl'>B2B Platform</h1>
            <p>Build your own Retailer Distributor Network with bug free mobile recharge software.</p>              
          </div>
        </div>

        <div className='lwhysunpitem w-3/4 mb-4 py-4 gap-4 flex'>
          <div className='itemicon'>
            
          </div>
          <div className="itemtext pr-2">
            <h1 className='text-2xl'>B2C Portals</h1>
            <p>Online recharge portal connected directly with mobile, DTH, data card, Post Paid bill payment, electricity and utility payment platforms.</p>
          </div>
        </div>

        <div className='lwhysunpitem w-3/4 py-4 gap-4 flex'>
          <div className='itemicon'>

          </div>
          <div className="itemtext pr-2">
            <h1 className='text-2xl'>Android</h1>
            <p>Multi recharge software includes Android application as standard feature of software. Publish your own brand name on Playstore.</p>
          </div>
        </div>
      </div>
    </div>

    <div className='rwhysunpimg mt-24 w-1/2 relative border-4 border-zinc-600'>
      <div className='text-5xl bg-white absolute text-center bottom-0 w-full'>100% Trusted Company</div>
    </div>
  </div>
 </section>

 {/* Testimonials */}
 <section className='Testimonials bg-slate-500 px-8 py-10'>
 <div className='testimonials text-center '>
         
         <div className="testheading text-5xl text-white font-extrabold pt-6">
              See What Clients Are Saying
         </div>
         <hr className="solheadingline" />

         <p className="testsubheading font-extrabold text-3xl text-gray-100">
             We are very proud of the service we provide and stand by every service we carry.
         </p>

         <p className="testsublighttext text-white mt-8 text-2xl">
           Read our testimonials from our happy customers.
         </p>


         <div className="reviewcontdiv ml-24">
           <ul className="review flex gap-4 w-full px-20 mt-12 list-none overflow-x-hidden">
               <li>
                 <div className="revcont w-4/5 pt-4 border-2 bg-white border-black hover:bg-blue-600 hover:text-white pb-4">    
                       <p className='revtxt px-2'>
                      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequuntur praesentium quaerat optio eaque doloremque asperiores architecto facilis suscipit aliquid, fuga voluptates repudiandae repellendus numquam at ducimus tempore."
                        </p>
                        <br />
                        <p className="nam text-2xl">
                         Mukul Pratap
                        </p>   
                 </div>
                 </li>
               <li>
               <div className="revcont w-4/5 pt-4 border-2 bg-white border-black hover:bg-blue-600 hover:text-white pb-4">    
                       <p className='revtxt px-2'>
                      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequuntur praesentium quaerat optio eaque doloremque asperiores architecto facilis suscipit aliquid, fuga voluptates repudiandae repellendus numquam at ducimus tempore."
                        </p>
                        <br />
                        <p className="nam text-2xl">
                         Mukul Pratap
                        </p>   
                 </div>
                 </li>
                 <li>

                 <div className="revcont w-4/5 pt-4 border-2 bg-white border-black hover:bg-blue-600 hover:text-white pb-4">    
                       <p className='revtxt px-2'>
                      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequuntur praesentium quaerat optio eaque doloremque asperiores architecto facilis suscipit aliquid, fuga voluptates repudiandae repellendus numquam at ducimus tempore."
                        </p>
                        <br />
                        <p className="nam text-2xl">
                         Mukul Pratap
                        </p>   
                 </div>
                 </li>                            
           </ul>
         </div>
</div>
 </section>

{/* Email Subscription */}
 <section className='emailsubscribe p-4 pt-8'>
 <div className='emailseccontainer flex gap-12'>
            <div className="emaisectext pl-8">
                <p className=" ml-4 emailsecfirstline text-xl font-extrabold">
                    Don't miss out on the latest updates relevant to you. 
                </p>
                <p className="emailsecsecondline ml-4 text-4xl font-black">
                    <b>Subscribe now and be a part of our community</b>
                </p>
                <p className="emailsecthirdline ml-4 text-xl mt-2">
                    Subscribing in quick and easy. Just enter your email address below and <br />
                     click <b>'Subscribe'</b> to start receiving our informative newsletter.
                </p>
            </div>

            <div className="textbox mt-12">
                <input type="text" name="emailsubscbox" id="" className="emailsubsbox rounded-md bg-white"/>
            </div>

            <div className="emailsecsubmitbtn">
                <button type="submit" className='bg-white border-2 border-black mt-7 text-2xl p-3 px-5 rounded-xl hover:bg-blue-600 hover:text-white'>
                    <b>SUBSCRIBE NOW</b>
                </button>
            </div>
    </div>
 </section>

<section className='Footer'>
<Footer/>
</section>
    </div>
  )
} 
