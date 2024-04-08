import { useState } from "react";
import React from 'react'

const Auth = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Function to toggle isLoggedIn
    const toggleLoggedIn = (value) => {
      setIsLoggedIn(value);
    };}

export default Auth
