import React from 'react'
import { useState } from 'react'

const today = new Date();
const date = today.setDate(today.getDate()); 
const defaultValue = new Date(date).toISOString().split('T')[0]

const MemberRegistration = () => {
  
  const [Date, setDate] = useState('')
  const handleChange = (e) => {
  setDate(e.target.value);
};

  const [image, setimage] = useState('');
    
  function handleimgchange(e) {
      console.log(e.target.files);
      setimage(URL.createObjectURL(e.target.files[0]));
  }

  const [name,setname] = useState()
  const [role,setrole] = useState()
  const [pack,setpack] = useState()
  const [age,setage] = useState()
  const [email,setemail] = useState()
  const [mobile,setmobile] = useState()
  const [altmobile,setaltmobile] = useState()
  const [address,setaddress] = useState()
  const [pincode,setpincode] = useState()
  const [password,setpassword] = useState()
  const [tpin,settpin] = useState()
  const [status,setstatus] = useState()
  const [shopname,setshopname] = useState()
  const [shopadd,setshopadd] = useState()
  const [gender,setgender] = useState()
  const [state,setstate] = useState()
  const [asm,setasm] = useState()
  const [city,setcity] = useState()
  const [aadhar,setaadhar] = useState()
  const [pan,setpan] = useState()





  return (
    <div className='p-4'>
      <div className=' bg-gray-500 p-4 pb-6 px-6'>
      <h1 className='text-3xl font-black text-white border-b-4'>Member Register</h1>
      <div className="mt-4 ">
        <div className='md:flex flex-wrap gap-12'>
            <div className='flex md:flex-wrap gap-8'>
              <label className="mt-2 text-white w-40 text-2xl">Role</label><br/>
                <select id="id" onChange={setrole} className="w-72 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option selected>Select Role</option>
                    <option value="icicibnk">ICICI Bank(664005500851)</option>
                    <option value="sbibnk">State Bank of India(42057935640)</option>
                    <option value="pnbbnk">Punjab National Bank(6058002100002053)</option>
                    <option value="axisbnk">Axis Bank(923020043729544)</option>
                </select>
            </div>

            <div className='md:flex md:flex-wrap gap-8'>
              <label className="mt-2 text-white w-40 text-2xl">Package</label><br/>
                <select id="id" onChange={setpack} className="w-72 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option selected>Select Package</option>
                    <option value="icicibnk">ICICI Bank(664005500851)</option>
                    <option value="sbibnk">State Bank of India(42057935640)</option>
                </select>
            </div>

            <div className='md:flex md:flex-wrap gap-8'>
              <label className="mt-2 text-white w-40 text-2xl">Title</label><br/>
                <select id="id" onChange={setgender} className="w-72 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option selected>Select Gender</option>
                    <option value="icicibnk">Male</option>
                    <option value="sbibnk">Female</option>
                    <option value="sbibnk">Did Not Say</option>
                </select>
            </div>

            <div className='md:flex md:flex-wrap gap-8'>
              <label className="mt-2 text-white w-40 text-2xl">Name</label><br/>
              <input className=" text-xl px-4 border border-solid border-gray-300 rounded" onChange={(e) => setname(e.target.value)} type="text" placeholder="Enter Name" />
            </div>

            <div className='md:flex md:flex-wrap gap-8'>
              <label className="mt-2 text-white w-40 text-2xl">Age</label><br/>
              <input className=" text-xl px-4 border border-solid border-gray-300 rounded" onChange={(e) => setage(e.target.value)} type="number" placeholder="Enter Age" />
            </div>

            <div className="md:flex md:flex-wrap gap-8">
              <label className='mt-2 text-white w-40 text-2xl'>DOB</label><br/>
              <input id="dateRequired" type="date" onChange={handleChange} name="dateRequired" defaultValue={defaultValue} className='text-xl px-4 border border-solid border-gray-300 rounded bg-gray-50  text-gray-900 focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'/>
            </div>

            <div className='md:flex md:flex-wrap gap-8'>
              <label className="mt-2 text-white w-40 text-2xl">Email ID</label><br/>
              <input className=" text-xl px-4 border border-solid border-gray-300 rounded" onChange={(e) => setemail(e.target.value)} type="text" placeholder="Enter Email ID" />
            </div>

            <div className='md:flex md:flex-wrap gap-8'>
              <label className="mt-2 text-white w-40 text-2xl">Mobile No.</label><br/>
              <input className=" text-xl px-4 border border-solid border-gray-300 rounded" onChange={(e) => setmobile(e.target.value)} type="number" placeholder="Enter Mobile Number" />
            </div>

            <div className='md:flex md:flex-wrap gap-8'>
              <label className="mt-2 text-white w-40 text-2xl">Alt. Mobile No.</label><br/>
              <input className=" text-xl px-4 border border-solid border-gray-300 rounded" onChange={(e) => setaltmobile(e.target.value)} type="number" placeholder="Enter Mobile Number" />
            </div>

            <div className='md:flex md:flex-wrap gap-8'>
              <label className="mt-2 text-white w-40 text-2xl">Aadhaar </label><br/>
              <input className=" text-xl px-4 border border-solid border-gray-300 rounded" onChange={(e) => setaadhar(e.target.value)} type="number" placeholder="Enter Aadhaar Number" />
            </div>

            <div className='md:flex md:flex-wrap gap-8'>
              <label className="mt-2 text-white w-40 text-2xl">PAN Number</label><br/>
              <input className=" text-xl px-4 border border-solid border-gray-300 rounded" onChange={(e) => setpan(e.target.value)} type="text" placeholder="Enter PAN Number" />
            </div>

            <div className='md:flex md:flex-wrap gap-8'>
              <label className="mt-2 text-white w-40 text-2xl">Perm. Address</label><br/>
              <input className=" text-xl px-4 border border-solid border-gray-300 rounded" onChange={(e) => setaddress(e.target.value)} type="text" placeholder="Enter Address" />
            </div>

            <div className='md:flex md:flex-wrap gap-8'>
                <label className="mt-2 text-white w-40 text-2xl">State</label><br/>
                <select id="id" onChange={setstate} className="w-72 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option selected>Select State</option>
                    <option value="icicibnk">Male</option>
                    <option value="sbibnk">Female</option>
                    <option value="sbibnk">Did Not Say</option>
                </select>              
            </div>

            <div className='md:flex md:flex-wrap gap-8'>
              <label className="mt-2 text-white w-40 text-2xl">City</label><br/>
              <input className=" text-xl px-4 border border-solid border-gray-300 rounded" onChange={(e) => setcity(e.target.value)} type="text" placeholder="Enter City" />
            </div>

            <div className='md:flex md:flex-wrap gap-8'>
              <label className="mt-2 text-white w-40 text-2xl">Shopname</label><br/>
              <input className=" text-xl px-4 border border-solid border-gray-300 rounded" onChange={(e) => setshopname(e.target.value)} type="text" placeholder="Enter Address" />
            </div>

            <div className='md:flex md:flex-wrap gap-8'>
              <label className="mt-2 text-white w-40 text-2xl">Shop Address</label><br/>
              <input className=" text-xl px-4 border border-solid border-gray-300 rounded" onChange={(e) => setshopadd(e.target.value)} type="text" placeholder="Enter Address" />
            </div>

            <div className='md:flex md:flex-wrap gap-8'>
                <label className="mt-2 text-white w-40 text-2xl">State</label><br/>
                <select id="id" onChange={setstate} className="w-72 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option selected>Select State</option>
                    <option value="icicibnk">Male</option>
                    <option value="sbibnk">Female</option>
                    <option value="sbibnk">Did Not Say</option>
                </select>              
            </div>

            <div className='md:flex md:flex-wrap gap-8'>
              <label className="mt-2 text-white w-40 text-2xl">City</label><br/>
              <input className=" text-xl px-4 border border-solid border-gray-300 rounded" onChange={(e) => setcity(e.target.value)} type="text" placeholder="Enter City" />
            </div>

            <div className='md:flex md:flex-wrap gap-8'>
              <label className="mt-2 text-white w-40 text-2xl">Pincode</label><br/>
              <input className=" text-xl px-4 border border-solid border-gray-300 rounded" onChange={(e) => setpincode(e.target.value)} type="number" placeholder="Enter Pincode" />
            </div>

            <div className='md:flex md:flex-wrap gap-8'>
              <label className="mt-2 text-white w-40 text-2xl">Login Password</label><br/>
              <input className=" text-xl px-4 border border-solid border-gray-300 rounded" onChange={(e) => setpassword(e.target.value)} type="text" placeholder="Enter Login Password" />
            </div>

            <div className='md:flex md:flex-wrap gap-8'>
              <label className="mt-2 text-white w-40 text-2xl">Login PIN</label><br/>
              <input className=" text-xl px-4 border border-solid border-gray-300 rounded" onChange={(e) => settpin(e.target.value)} type="number" placeholder="Enter Login PIN" />
            </div>

            <div className='md:flex md:flex-wrap gap-8'>
              <label className="mt-2 text-white w-40 text-2xl">ASM Name</label><br/>
              <input className=" text-xl px-4 border border-solid border-gray-300 rounded" onChange={(e) => settpin(e.target.value)} type="text" placeholder="Enter ASM Name" />
            </div>
            
            <div className='md:flex md:flex-wrap gap-8'>
              <label className=" text-white w-44 text-2xl">Is Active</label>
              <input className=" text-2xl ml-4 py-4 px-4 border border-solid border-gray-300 rounded" onChange={(e) => setstatus(e.target.value)} type="checkbox"/>
            </div>
            
        </div>

        <div className='mt-8 '>
           <h1 className='text-3xl font-bold text-white'>KYC Documents</h1>
           <div className=' flex flex-wrap'>
              <div className='mt-8 md:flex md:flex-wrap gap-8'>
                <label className='mt-2 text-white w-40 text-2xl'>Self Photo :</label>
                <input type="file"  onChange={handleimgchange} className='bg-white md:mr-20 text-black file:bg-white file:text-black' placeholder="Logo"/>
              </div>

              <div className='mt-8 md:flex md:flex-wrap gap-8'>
                <label className='mt-2 text-white w-40 text-2xl'>Signature :</label>
                <input type="file"  onChange={handleimgchange} className=' bg-white md:mr-20 text-black file:bg-white file:text-black' placeholder="Logo"/>
              </div>

              <div className='mt-8 md:flex md:flex-wrap gap-8'>
                <label className='mt-2 text-white w-40 text-2xl'>Aadhaar Front :</label>
                <input type="file"  onChange={handleimgchange} className=' bg-white md:mr-20 text-black file:bg-white file:text-black' placeholder="Logo"/>
              </div>

              <div className='mt-8 md:flex md:flex-wrap gap-8'>
                <label className='mt-2 text-white w-40 text-2xl'>Aadhaar Back:</label>
                <input type="file"  onChange={handleimgchange} className=' bg-white md:mr-20 text-black file:bg-white file:text-black' placeholder="Logo"/>
              </div>

              <div className='mt-8 md:flex md:flex-wrap gap-8'>
                <label className='mt-2 text-white w-40 text-2xl'>Pan Card :</label>
                <input type="file"  onChange={handleimgchange} className='bg-white md:mr-20 text-black file:bg-white file:text-black' placeholder="Logo"/>
              </div>

              <div className='mt-8 md:flex md:flex-wrap gap-8'>
                <label className='mt-2 text-white w-40 text-2xl'>Shop Photo :</label>
                <input type="file"  onChange={handleimgchange} className=' bg-white md:mr-20 text-black file:bg-white file:text-black' placeholder="Logo"/>
              </div>

              <div className='mt-8 border px-2'>
                  <h1 className='text-lg text-white'><b>Note: </b>All images uploaded should be clear and below 2mb.</h1>
              </div>
           </div>

        </div>
        
        <div className='mt-8 flex gap-4'>
          <button className=" bg-blue-600 hover:bg-blue-700 px-6 py-3 text-white uppercase rounded text-sm tracking-wider" type="submit">Submit</button>
        </div>
      </div>
      
    </div>
    </div>
  )
}

export default MemberRegistration
