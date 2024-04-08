import React from 'react'
import { useState, useEffect } from 'react'

const Complaint = (props) => {
  const [dataall, setDatall] = useState();  
  useEffect(() => {
    setDatall(props);
    console.log('dataall from complaint', dataall);
  }, []);
  return (
    <div>
      
    </div>
  )
}

export default Complaint
