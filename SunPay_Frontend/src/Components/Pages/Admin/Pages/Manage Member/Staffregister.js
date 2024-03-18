import React, { useState } from 'react'

const Staffregister = () => {

  const [name,setname] = useState()
  const [role,setrole] = useState()
  const [age,setage] = useState()
  const [email,setemail] = useState()
  const [mobile,setmobile] = useState()
  const [address,setaddress] = useState()
  const [pincode,setpincode] = useState()
  const [password,setpassword] = useState()
  const [tpin,settpin] = useState()
  const [statuse,setstatus] = useState()



  return (
    <div className='p-4'>
      <div className=' bg-gray-500 p-4 pb-6'>
      <h1 className='text-3xl font-black text-white border-b-4'>Staff Register</h1>
        <div className='mt-4 flex gap-4'>
          <label className="mt-2 text-white w-40 text-2xl">Role</label><br/>
            <select id="id" onChange={setrole} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option selected>Select Role</option>
                <option value="icicibnk">ICICI Bank(664005500851)</option>
                <option value="sbibnk">State Bank of India(42057935640)</option>
                <option value="pnbbnk">Punjab National Bank(6058002100002053)</option>
                <option value="axisbnk">Axis Bank(923020043729544)</option>
            </select>
        </div>

        <div className='mt-4 flex gap-4'>
          <label className="mt-2 text-white w-40 text-2xl">Name</label><br/>
          <input className=" text-xl px-4 border border-solid border-gray-300 rounded" onChange={(e) => setname(e.target.value)} type="text" placeholder="Enter Name" />
        </div>

        <div className='mt-4 flex gap-4'>
          <label className="mt-2 text-white w-40 text-2xl">Age</label><br/>
          <input className=" text-xl px-4 border border-solid border-gray-300 rounded" onChange={(e) => setage(e.target.value)} type="number" placeholder="Enter Age" />
        </div>

        <div className='mt-4 flex gap-4'>
          <label className="mt-2 text-white w-40 text-2xl">Email ID</label><br/>
          <input className=" text-xl px-4 border border-solid border-gray-300 rounded" onChange={(e) => setemail(e.target.value)} type="text" placeholder="Enter Email ID" />
        </div>

        <div className='mt-4 flex gap-4'>
          <label className="mt-2 text-white w-40 text-2xl">Mobile No.</label><br/>
          <input className=" text-xl px-4 border border-solid border-gray-300 rounded" onChange={(e) => setmobile(e.target.value)} type="number" placeholder="Enter Mobile Number" />
        </div>

        <div className='mt-4 flex gap-4'>
          <label className="mt-2 text-white w-40 text-2xl">Address</label><br/>
          <input className=" text-xl px-4 border border-solid border-gray-300 rounded" onChange={(e) => setaddress(e.target.value)} type="text" placeholder="Enter Address" />
        </div>

        <div className='mt-4 flex gap-4'>
          <label className="mt-2 text-white w-40 text-2xl">Pincode</label><br/>
          <input className=" text-xl px-4 border border-solid border-gray-300 rounded" onChange={(e) => setpincode(e.target.value)} type="number" placeholder="Enter Pincode" />
        </div>

        <div className='mt-4 flex gap-4'>
          <label className="mt-2 text-white w-40 text-2xl">Login Password</label><br/>
          <input className=" text-xl px-4 border border-solid border-gray-300 rounded" onChange={(e) => setpassword(e.target.value)} type="text" placeholder="Enter Login Password" />
        </div>

        <div className='mt-4 flex gap-4'>
          <label className="mt-2 text-white w-40 text-2xl">Login PIN</label><br/>
          <input className=" text-xl px-4 border border-solid border-gray-300 rounded" onChange={(e) => settpin(e.target.value)} type="number" placeholder="Enter Login PIN" />
        </div>

        <div className='mt-4 flex gap-4'>
          <label className="mt-2 text-white w-40 text-2xl">Login PIN</label>
          <input className=" text-2xl mt-2 ml-4 py-4 px-4 border border-solid border-gray-300 rounded" onChange={(e) => setstatus(e.target.value)} type="checkbox"/>
        </div>

        <div className='mt-4 flex gap-4'>
          <button className=" bg-blue-600 hover:bg-blue-700 px-6 py-3 text-white uppercase rounded text-sm tracking-wider" type="submit">Submit</button>
        </div>

      </div>
    </div>
  )
}

export default Staffregister
