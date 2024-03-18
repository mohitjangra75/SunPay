import React from 'react'
import navlogo from './NavImages/logo.png'
import './Navcss/Navbar.css'
import {NavLink, useNavigate } from 'react-router-dom'
import {BiSolidUserCircle} from 'react-icons/bi'

export default function StickyNavbar() {
  const navigate = useNavigate();

  const navigatelogin = () => {
    navigate('/member/login');
  };
  
  return (
    <div className='navbarcomp'>
  
  <nav className=" w-full top-0 left-0 fixed bg-white border-b border-gray-200 dark:border-gray-600 z-50">
    <div className="max-w-screen-xl flex flex-wrap items-center justify-between p-2 ps-16">
  
    <NavLink to=""  className="flex items-center hover:bg-slate-500 p-2"> 
      <img src={navlogo} className="h-12a " alt="Flowbite Logo"/>
    </NavLink>

  
  <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
    <ul className="flex flex-col p-2 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-16 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 text-xl">
      <li>
        <NavLink to="/" className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" aria-current="page">Home</NavLink>
      </li>
      <li>
        <NavLink to="/about-us" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">About</NavLink>
      </li>
      <li>
          <NavLink to="/services" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
          >Services</NavLink>
      </li>
      <li>
        <NavLink to="/contact-us" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Contact</NavLink>
      </li>
      <li>
        <NavLink to="/try" className="block py-2 pl-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700" >Join Us</NavLink>
        
      </li>
    </ul>
  </div>
  <div className="flex md:order-2 ">
    
      <button type="button" onClick={navigatelogin} className="text-white  bg-black focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-2xl px-2 py-1 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        <BiSolidUserCircle/>
      </button>


      <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false" >
        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>
  </div>
  </div>
</nav>
    </div>
  )
}
