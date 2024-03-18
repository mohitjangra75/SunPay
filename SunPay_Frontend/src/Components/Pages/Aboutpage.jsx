import React from 'react'
import { NavLink } from 'react-router-dom'
import abimgr from './Images Homepage/aboutsecimg.png'
import StickyNavbar from '../Navbar/StickyNavbar'
import Footer from '../Footer/Footer'

export default function Aboutpage() {
  return (
    <div className='aboutsection'>
       <StickyNavbar></StickyNavbar>
      <section className='aboutussecdiv mt-16 bg-white flex pb-12'>
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
          <section className='moresunp bg-amber-200 pb-8'>\
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

          {/*Footer */}
          <section>
            <Footer></Footer>
          </section>
    </div>
  )
}
