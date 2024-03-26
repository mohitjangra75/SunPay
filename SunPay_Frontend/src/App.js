 import './App.css';
 import { useState } from 'react';
import { BrowserRouter,Route,Routes} from 'react-router-dom';
import Home from './Components/Pages/HomePage';
import Servicepage from './Components/Pages/Servicepage';
import Contactpage from './Components/Pages/Contactpage';
import Login from './Components/Pages/Member/login';
import Adminlogin from './Components/Pages/Admin/Adminlogin';
import Aboutpage from './Components/Pages/Aboutpage';
import MemberRouter from './Components/Pages/Member/Dashboard/Pages/MemberRouter';
import AdminDashboardRouter from './Components/Pages/Admin/Dashboard/AdminDashboardRouter';
import Loginnew from './Components/Pages/Member/Loginnew';
import NewMemberROuter from './Components/Pages/Member/Dashboard/Pages/NewMemberROuter';
import PrivateRoute from './Components/Pages/Member/PrivateRoute';
import Auth from './Components/Pages/Member/Auth';

function App() {
  const [IsLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="page-wrapper ">
      
      <BrowserRouter>
      <div className="">
      <Routes>
              <Route path='' element={<Home/>}></Route>
              <Route path='/about-us' element={<Aboutpage/>} ></Route>
              <Route path='/services' element={<Servicepage/>} ></Route>
              <Route path='/contact-us' element={<Contactpage/>} ></Route>
              <Route path='/member/login' element={<Login setIsLoggedIn={setIsLoggedIn} IsLoggedIn={IsLoggedIn}/>}></Route>
              <Route path='/admin/:category' element={<AdminDashboardRouter/>}></Route>
              <Route path='/admin/login' element={<Adminlogin/>} ></Route>
              <Route path='/member' element={<PrivateRoute IsLoggedIn={IsLoggedIn}/>} >
                  <Route path=':category' element={<MemberRouter/>}></Route> 
              </Route>
              <Route path="/dashboard" element={<NewMemberROuter/>}></Route>
              <Route path='/member/trylogin' element={<Loginnew/>}></Route> 
            </Routes>
      </div>     
      </BrowserRouter>
    </div>
  );
}

export default App;
