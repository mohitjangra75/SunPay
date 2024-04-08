import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './CSS/Login.css';
// import DashboardRouter from './Dashboard/DashboardRouter'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import navlogo from '../../Navbar/NavImages/logo.png';
import usernavimg from '../../Navbar/NavImages/user.png';
import sunptext from './Loginpage Img/Sunpaytextlogin.png';
import logimg from './Loginpage Img/loginimg.png';

const Login = ({ setIsLoggedIn }, { IsLoggedIn }) => {
  const [login_id, setlogin_id] = useState('');
  const [password, setPassword] = useState('');
  const [pin, settpin] = useState('');
  const [auth, setisauth] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null); 

  const handleLogin = async () => {
    setError(null);
    setLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:8000/api/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({ login_id, password }),
      });

      if (response.ok) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
        alert('Invalid Credentials');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const handletpin = async () => {
    try {
      const tpin = parseInt(pin);
      const response = await fetch('http://127.0.0.1:8000/api/tpin/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ login_id, password, tpin }),
      });
      const result = await response.json();
      if (result.message === 'Login Successful') {
        const apidata = result.data;
        setisauth(true);
          setIsLoggedIn(true);
          setisauth(true)
          if(apidata.role_id===1 || apidata.role_id===2){
            navigate('/member/dashboard', {
              state: { data: apidata, IsLoggedIn: IsLoggedIn  },
            });
            localStorage.setItem('apiData', JSON.stringify(apidata));           
        } 
      } 
      else {
        alert('Invalid Credentials');
      }
    } catch (error) {
      console.error('Invalid TPIN:', error);
    }
  };

  const handleback = async () => {
    setIsVisible(false);
  };

  return (
    <div className='loginpage w-full pt-24 pb-6'>
      <nav className=' w-full top-0 left-0 fixed bg-white border-b border-gray-200 dark:border-gray-600 z-50'>
        <div className='max-w-screen-xl flex flex-wrap items-center justify-between p-2 ps-16'>
          <NavLink to='' className='flex items-center hover:bg-slate-500 p-2'>
            <img src={navlogo} className='h-10 ' alt='Flowbite Logo' />
          </NavLink>

          <div
            className='items-center justify-between hidden w-full md:flex md:w-auto md:order-1'
            id='navbar-sticky'
          >
            <ul className='flex flex-col p-2 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-16 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 text-xl'>
              <li>
                <NavLink
                  to='/'
                  className='block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500'
                  aria-current='page'
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to='/about'
                  className='block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  to='/services'
                  className='block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'
                >
                  Services
                </NavLink>
              </li>
              <li>
                <NavLink
                  to='/blog'
                  className='block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'
                >
                  Contact
                </NavLink>
              </li>
              <li>
                <NavLink
                  to='/try'
                  className='block py-2 pl-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'
                >
                  Join Us
                </NavLink>
              </li>
            </ul>
          </div>
          <div className='flex md:order-2 '>
            <button
              type='button'
              className='text-white   focus:outline-none focus:ring-blue-300 h-9 font-medium rounded-lg text-sm px-2 py-1 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
            >
              <img src={usernavimg} alt='login' className='h-9' />
            </button>

            <button
              data-collapse-toggle='navbar-sticky'
              type='button'
              className='inline-flex items-center justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
              aria-controls='navbar-sticky'
              aria-expanded='false'
            >
              <svg
                className='w-5 h-5'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 17 14'
              >
                <path
                  stroke='currentColor'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  stroke-width='2'
                  d='M1 1h15M1 7h15M1 13h15'
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      <section className='loginsection'>
        <div className='headingline justify-center flex '>
          `
          <p className='text-4xl text-white font-bold text-center  mr-6'>
            <img src={sunptext} className='inline-block h-24' alt='' />
          </p>
          <p className='text-3xl text-white font-bold text-center mt-8  '>
            Bharosa Har..... Bhartiya Ka.....
          </p>
        </div>

        <div className='loginflexcont  md:w-full md:py-4 md:flex px-12  md:space-x-16'>
          <div className='loginingcont md:w-5/6 bg-inherit'>
            <img src={logimg} className='w-full h-full' alt='' />
          </div>

          <div className='md:w-1/2 h-min md:mt-8 bg-white rounded-xl justify-center md:p-8'>
            {!isVisible && (
              <div>
                <p className='text-4xl font-bold text-center mb-6'>
                  Sign in to Continue
                </p>
                <input
                  type='text'
                  value={login_id}
                  onChange={(e) => setlogin_id(e.target.value)}
                  className='text-lg w-full leading-10 px-4 py-2 border border-solid border-gray-300 rounded'
                  placeholder='Enter Your Agent ID'
                />
                <input
                  type='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className='text-lg w-full leading-10 px-4 py-2 border border-solid border-gray-300 rounded mt-4'
                  placeholder='Enter Your Password'
                />
                <div className='mt-4 flex justify-between font-semibold text-sm'>
                  <label className='flex text-slate-500 hover:text-slate-600 cursor-pointer'>
                    <input className='mr-1' type='checkbox' />
                    <span>Remember Me</span>
                  </label>
                  {/* <a className="text-blue-600 hover:text-blue-700 hover:underline hover:underline-offset-4" href="#">Forgot Password?</a> */}
                </div>
                <div className='text-center justify-center w-full md:flex gap-4  md:text-left'>
                  <button
                    className='mt-4 text-center flex justify-center bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-sm tracking-wider'
                    onClick={handleLogin}
                    type='submit'
                  >
                    Retailer Login
                  </button>
                  <button
                    className='mt-4 text-center flex justify-center bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-sm tracking-wider'
                    onClick={handleLogin}
                    type='submit'
                  >
                    Distributor Login
                  </button>
                </div>
              </div>
            )}

            {isVisible && (
              <div className='block'>
                <label className='font-semibold text-2xl'>Tpin:</label>
                <input
                  type='password'
                  value={pin}
                  onChange={(e) => settpin(e.target.value)}
                  className=' ml-2 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                  maxlength='4'
                  id='pin'
                  pattern='^0[1-9]|[1-9]\d$'
                  required
                />
                <br />
                <button
                  onClick={handletpin}
                  className='mt-4 ml-1 p-2 px-3 border border-white bg-blue-700 text-white rounded-lg'
                >
                  Submit
                </button>
                <button
                  onClick={handleback}
                  className='mt-4 ml-4 p-2 px-4 border border-white bg-blue-700 text-white rounded-lg'
                >
                  Back
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;