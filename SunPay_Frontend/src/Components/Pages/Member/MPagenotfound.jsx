import React from 'react'
import { Link } from 'react-router-dom';
import Setting from "./Dashboard/DashboardComponents/Data/imgs/setting.gif"; // Import your setting icon SVG

const MPagenotfound = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
    <div className="flex flex-col items-center">
      <img src={Setting} className="h-96 w-96 animate-bounce" />
      <h1 className="text-3xl font-bold text-gray-800">Page Not Found</h1>
      <p className="text-gray-600 mt-2">The page you are looking for does not exist.</p>
      <Link to="/member/login" className="text-blue-500 mt-4 hover:underline">Go back to Login</Link>
    </div>
  </div>
  )
}

export default MPagenotfound
