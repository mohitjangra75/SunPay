import React from 'react'
import StickyNavbar from '../Navbar/StickyNavbar'
import Footer from '../Footer/Footer'
import { ImLocation } from "react-icons/im";
import { IoIosMailOpen } from "react-icons/io";
import { MdAddIcCall } from "react-icons/md";

const Contactpage = () => {
  return (
    <div>
        <section>
          <StickyNavbar></StickyNavbar>
        </section>

        <section>
          <div className='contactpage p-8 mt-16 bg-yellow-700 pt-12 pb-16'>
            <div className="homservseccont pt-4 w-full">
                <h1 className="inline-block text-5xl ml-12 text-white"><b>Contact Us</b></h1><br />
                <h1 className="inline-block text-3xl ml-12 text-zinc-200">Feel free to reach out to us.</h1>

                <div className='mt-6 text-center'>
                    <div className='flex flex-wrap justify-center text-white gap-8'>
                      <div className='bg-gradient-to-br from-yellow-400 align-middle to-blue-400 p-4 rounded-lg text-center flex border border-black'>
                        <div>
                          <ImLocation className='text-white mt-6 h-24 w-24'/>
                        </div>
                        <div> 
                              <b className='text-3xl'>Our Location</b> <br />
                              <p className='text-xl w-60 mt-2'>H. No. 772, Chawri Bazar, FF Chowk Kundey Walan AjmeriGate, New Delhi, North Delhi, Delhi-110006</p>
                        </div>
                      </div>
                      
                      <div className='bg-gradient-to-br from-yellow-400 align-middle pt-10 to-blue-400 p-4 rounded-lg text-center flex border border-black'>
                        <div>
                          <IoIosMailOpen className='text-white h-24 w-24'/>
                        </div>
                        <div className='mt-4'> <b className='text-3xl '>Email</b> <br />
                              <p className='text-xl w-60 mt-2'>support@sunpay.co.in</p>
                        </div>
                      </div>

                      <div className='bg-gradient-to-br from-yellow-400 align-middle pt-10 to-blue-400 p-4 rounded-lg text-center flex border border-black'>
                        <div>
                          <MdAddIcCall className='text-white h-24 w-24'/>
                        </div>
                        <div className='mt-4'> <b className='text-3xl '>Mobile</b> <br />
                              <p className='text-xl w-60 mt-2'>+91 9403891008</p>
                        </div>
                      </div>
                    </div>

                    <div className='mt-8 flex flex-wrap justify-center'>
                    <iframe className='text-center w-full h-96' src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3501.4497958338834!2d77.22323227550132!3d28.64624787565725!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjjCsDM4JzQ2LjUiTiA3N8KwMTMnMzIuOSJF!5e0!3m2!1sen!2sin!4v1712563259468!5m2!1sen!2sin"></iframe>
                    </div>
                    
                </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <section>
            <Footer/>
        </section>
      
    </div>
  )
}

export default Contactpage
