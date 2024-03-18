import React from 'react'
import './Admin Css/login.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Adminlogin() {
  const [login_id, setlogin_id] = useState('');
  const [password, setPassword] = useState('');
  const [pin, settpin] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isLoggedin, setIsLoggedin] = useState(false);

  const handleLogin = async () => {
    setError(null);
    setLoading(true);
    try {
      const response = await fetch('http://43.205.83.194/api/login/', {
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
      const response = await fetch('http://43.205.83.194/api/tpin/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ login_id, password, tpin }),
      });
      const result = await response.json();
      if (result.message === 'Login Succesfull') {
        const data = result.data;
        console.log(data);
        navigate('/admin/dashboard/', {
          state: { data: data },
        });
      } else {
        setIsVisible(false);
        alert('Invalid Credentials');
      }
    } catch (error) {
      console.error('Invalid TPIN:', error);
    }
  };

  const handleback = async () => {
    setIsVisible(false);
  };

  const navigateToAdminDashboard = () => {
    // 👇️ navigate to /member
    navigate('/admin/dashboard');
  };

  return (
    <div className='adminlogin'>
       <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 items-center my-2 mx-5 md:mx-0 md:my-0">
       {!isVisible && (
      <div className="md:w-1/2 border-4 border-red-900 bg-white p-16 rounded-xl max-w-sm shadow-lg shadow-white">
        <p className='text-4xl text-center mb-8 font-bold'>Sign In Here</p>
        <input className="w-full text-xl px-4 py-2 border border-solid border-gray-300 rounded" onChange={(e) => setlogin_id(e.target.value)} type="text" placeholder="Enter User ID" />
        <input className="w-full text-xl  px-4 py-2 border border-solid border-gray-300 rounded mt-4" onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Enter Password" />
        <div className="mt-4 flex justify-between font-semibold text-sm">
          <label className="flex text-slate-500 hover:text-slate-600 cursor-pointer">
            <input className="mr-1" type="checkbox" />
            <span>Remember Me</span>
          </label>
          <a className="text-blue-600 hover:text-blue-700 hover:underline hover:underline-offset-4" href="#">Forgot Password?</a>
        </div>

        <div className="text-center md:text-center md:mt-4">
          <button onClick={handleLogin} className="mt-4 bg-blue-600 hover:bg-blue-700 px-6 py-3 text-white uppercase rounded text-xl tracking-wider" type="submit">Login</button>
        </div>
      </div>
       )}

       {isVisible && (
      <div className="md:w-1/2 border-4 border-red-900 bg-white p-16 rounded-xl max-w-sm shadow-lg shadow-white">
        <p className='text-4xl text-center mb-8 font-bold'>Enter OTP</p>
        <input onChange={(e) => settpin(e.target.value)} className="w-full text-xl  px-4 py-2 border border-solid border-gray-300 rounded mt-4" type="password" placeholder="Enter OTP" />
        

        <div className="text-center md:text-center md:mt-4">
          <button onClick={handletpin} className="mt-4 bg-blue-600 hover:bg-blue-700 px-6 py-3 text-white uppercase rounded text-xl tracking-wider" type="submit">Login</button>
        </div>
      </div>
       )}
    </section>
    </div>
  )
}
