import React from 'react';
import { NavLink, Navigate } from 'react-router-dom';
import './CSS/Login.css';
import { useState } from 'react';
import axios from 'axios';
// import DashboardRouter from './Dashboard/DashboardRouter'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import navlogo from '../../Navbar/NavImages/logo.png';
import usernavimg from '../../Navbar/NavImages/user.png';
import sunptext from './Loginpage Img/Sunpaytextlogin.png';
import logimg from './Loginpage Img/loginimg.png';
import MemberRouter from './Dashboard/Pages/MemberRouter';
import { useParams } from 'react-router-dom';

const Loginnew = () => {
  const [login_id, setlogin_id] = useState('');
  const [password, setPassword] = useState('');
  const [pin, settpin] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const [category, setcategory] = useParams();

  // const handletpin = async () => {
  // //   try {
  // //     const response = await axios.post('http://new.sunpay.co.in/api/login/', {
  // //         method: 'POST',
  // //         headers: {
  // //             'Content-Type': 'application/json',
  // //         },
  // //         body: JSON.stringify({ login_id, password, tpin }),
  // //     });

  // //     if (response.ok) {
  // //         console.log("logged in to dash")
  // //         console.log(response)
  // //     }
  // //     else {
  // //         setIsVisible(false)
  // //         alert("Invalid Credentials")
  // //     }
  // // } catch (error) {
  // //     console.error('Error during login:', error);
  // // }
  // // };

  // try {
  //     const tpin =  parseInt(pin);
  //     const response = await axios.post('http://new.sunpay.co.in/api/tpin/', {
  //       login_id,
  //       password,
  //       tpin
  //     });

  //     const resp = response.data;
  //     // Handle successful login here, e.g., store token in state or localStorage
  //     if(resp.data.message='Login Succesfull'){
  //       console.log('Login Successfully',resp.data);
  //     }
  //     else{
  //       console.log
  //       ('Invalid TPIN')
  //     }

  //     // const data = await response.json();
  //     // setItems(data);
  //   } catch (error) {
  //     // Handle login error here
  //     console.error('Invalid TPIN', error);
  //   }
  //  }
  const [backendData, setBackendData] = useState(null); // Define backendData state

  const handleLogin = async () => {
    try {
      const tpin = parseInt(pin);
      const response = await fetch('http://new.sunpay.co.in/api/tpin/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ login_id, password, tpin }),
      });
      const result = await response.json();
      if (result.message == 'Login Succesfull') {
        const data = result.data;
        console.log(data);
        navigate('/member/dashboard', {
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

  // const navigateToDashboard = () => {
  //   const [data, setData] = useState([]);

  //   useEffect(() => {
  //     // Fetch data from the backend API
  //     const fetchData = async () => {
  //       try {
  //         const response = await fetch('http://new.sunpay.co.in/api/tpin/');
  //         const result = await response.json();
  //         setData(result);
  //       } catch (error) {
  //         console.error('Error fetching data:', error);
  //       }
  //     };

  //     fetchData();
  //   }, []);

  //   // Navigate to the dashboard page with data
  //   navigate({
  //     pathname: '/member/dashboard',
  //     state: { data: data },
  //   });
  // }

  // const navigateToDashboard = () => {
  //   // Navigate to the dashboard page with data
  //   history.push({
  //     pathname: '/member/dashboard',
  //     state: { data: data },
  //   });
  // }

  return (
    <div>
      <h1>Login</h1>
      {!isVisible && (
        <div>
          <div>
            <label>login_id:</label>
            <input
              type='text'
              value={login_id}
              onChange={(e) => setlogin_id(e.target.value)}
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <label htmlFor='tpin'>Enter TPIN</label>
            <input
              type='password'
              value={pin}
              onChange={(e) => settpin(e.target.value)}
              maxLength='4'
            />
          </div>
          <div>
            {/* other components or content */}

            {category === 'dashboard' && <MemberRouter data={backendData} />}

            {/* other components or content */}
          </div>
          <button onClick={handleLogin}>Login</button>
          <h1>Items</h1>
          <ul>
            {/* {items.map(item => (
                    <li key={item.id}>{item.name}: {item.description}</li>
                ))} */}
          </ul>
        </div>
      )}

      {/* {
      isVisible && (
        <div>
          <label>Tpin:</label>
          <input type="number" value={tpin} onChange={(e) => settpin(e.target.value)} />
          <button onClick={handletpin}>Login</button>
        </div>
      )
    } */}
    </div>
  );
};

export default Loginnew;
