import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import StickyNavbar from '../Navbar/StickyNavbar';
import Footer from '../Footer/Footer'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import s1 from './Images Homepage/service-1.jpg'
import s2 from './Images Homepage/service-2.jpg'
import s3 from './Images Homepage/service-3.jpg'
import s4 from './Images Homepage/service-4.jpg'
import s5 from './Images Homepage/service-5.jpg'
import s6 from './Images Homepage/service-6.jpg'
import s7 from './Images Homepage/service-7.jpg'

const Servicepage = () => {
  return (
    <div>
        <StickyNavbar></StickyNavbar>
       {/* Service Section */}
 <section className='servicesectionhome mt-16 bg-white pt-12 pb-16'>
      <div className="homservseccont pt-4 w-full">
      <h1 className="inline-block text-5xl ml-12 text-white"><b>Our Services</b></h1><br />
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
            <img src={s1} alt=""  className='w-full h-52'/>
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
            <img src={s2} alt=""  className='w-full h-52'/>
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
            <img src={s3} alt=""  className='w-full h-52'/>
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
            <img src={s4} alt=""  className='w-full h-52'/>
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
            <img src={s5} alt=""  className='w-full h-52'/>
            <h1 className='font-black text-4xl'>Mobile Recharge</h1>
            <br />
            <p className='text-xl'>
              We provides recharge service in India for the mobile networks like Vi, Airtel, BSNL,  Jio. With Freecharge, you can quickly and easily recharge your mobile with just a few clicks. The platform offers a user-friendly interface that allows you to select your operator, enter your mobile number, and choose the desired recharge plan.
            </p>
          </div>
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div className="swiperslide1 px-8 py-4 ">
          <div className='swiperslide-content rounded-3xl p-6 bg-white hover:bg-blue-700 hover:text-white'>
            <img src={s6} alt=""  className='w-full h-52'/>
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
          <div className='swiperslide-content rounded-3xl p-6 bg-white hover:bg-blue-700 hover:text-white'>
            <img src={s7} alt=""  className='w-full h-52'/>
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
 <section className='whysunp bg-red-100'>
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

 <section>
            <Footer></Footer>
          </section>
    </div>
  )
}

export default Servicepage
