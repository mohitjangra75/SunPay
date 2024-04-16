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
import PrivateRoute from './Components/Pages/Member/PrivateRoute';
import Pagenotfound from './Components/Pages/Pagenotfound';
import Admprivateroute from './Components/Pages/Admin/Pages/Admprivateroute';

function App() {
  const [IsLoggedIn, setIsLoggedIn] = useState(false);
  const [AdmLoggedIn, setAdmLoggedIn] = useState(false);
  
  return (
    <div className="page-wrapper ">
      
      <BrowserRouter>
      <div className="">
      <Routes>
              <Route path='' element={<Home/>}></Route>
              <Route path='*' element={<Pagenotfound/>}></Route>
              <Route path='/about-us' element={<Aboutpage/>} ></Route>
              <Route path='/services' element={<Servicepage/>} ></Route>
              <Route path='/contact-us' element={<Contactpage/>} ></Route>
              
              <Route path='/admin/login' element={<Adminlogin setAdmLoggedIn={setAdmLoggedIn} AdmLoggedIn={AdmLoggedIn}/>} ></Route>
              <Route path='/admin' element={<Admprivateroute AdmLoggedIn={AdmLoggedIn}/>} >
                  <Route path=':category' element={<AdminDashboardRouter/>}></Route>
              </Route>

              <Route path='/member/login' element={<Login setIsLoggedIn={setIsLoggedIn} IsLoggedIn={IsLoggedIn}/>}></Route>              
              <Route path='/member' element={<PrivateRoute IsLoggedIn={IsLoggedIn}/>} >
                  <Route path=':category' element={<MemberRouter/>}></Route> 
              </Route>
              <Route path='/member/trylogin' element={<Loginnew/>}></Route> 
            </Routes>
      </div>     
      </BrowserRouter>
    </div>
  );
}

export default App;
