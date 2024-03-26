import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

let loggedin = false;


const PrivateRoute = ({ IsLoggedIn }) => {


    if(IsLoggedIn){
        {console.log(IsLoggedIn)}
        return <Outlet/>
    }else{
        return <Navigate to={'/member/login'}/>
        
    }
  
}

export default PrivateRoute

