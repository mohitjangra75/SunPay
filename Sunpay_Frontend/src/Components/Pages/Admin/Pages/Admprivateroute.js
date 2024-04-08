import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const Admprivateroute = ({ AdmLoggedIn }) => {
    if(AdmLoggedIn)
    {
        {console.log(AdmLoggedIn)}
        return <Outlet/>  
    }
    else{
        return <Navigate to={'/admin/login'}/>
        
    }
}

export default Admprivateroute
