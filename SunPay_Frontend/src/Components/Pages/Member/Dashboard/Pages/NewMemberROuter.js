import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from '../DashboardComponents/Navbar/Navbar'
import Sidebar from '../DashboardComponents/Sidebar/Sidebar'
import Main from '../DashboardComponents/Main/Main'
import poster from '../DashboardComponents/Data/imgs/poster.png'

const NewMemberROuter = () => {
  return (
    <div className='newmemberrouter'>
        
       <div className="navbar"><Navbar/></div>
     <div className='bg-red-600 max-w-[2300px] text-2xl md:mt-[90px] text-center text-black '>
        News HeadLine
      </div>
      <div className='bg-red-600 max-w-[2300px] border-2 border-black text-center text-black '>
       Small News HeadLine
      </div>
      <div className="main h-screen max-w-[2300px] flex flex-1">
        <aside class="sticky top-0"><Sidebar/></aside>

        <Routes>
        <Route path='/dashboard/main' element={<Main/>}></Route> 
        </Routes>
          
          {/* Add more routes as needed */}
          <div className={`main overflow-scroll scrollbar-hide w-[80vw] z-10`}>
            <Main></Main>
          </div>
      </div> 

       {/* Notifications  */}
      <div className='mt-4  text-center px-2 text-xl text-white bg-yellow-600'>
        Latest Notification
      </div>

      {/* Posters */}
      <div className='poster p-8 border-2 m-2 border-gray-400 mt-8'>
        <div className='border-2'>
            <img src={poster} className=' w-full' alt="" />
        </div>
      </div>
    </div>
  )
}

export default NewMemberROuter
