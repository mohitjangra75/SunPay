import React from 'react'
import { useState } from 'react'
import { Transition } from '@headlessui/react';
import axios from 'axios';

const today = new Date();
const date = today.setDate(today.getDate()); 
const defaultValue = new Date(date).toISOString().split('T')[0]

const Modal = ({ isOpen, onClose }) => {
  
  const [isEntering, setIsEntering] = useState(false);

  const handleClose = () => {
    setIsEntering(false);
    setTimeout(() => {
      onClose();
    }, 150);
  };

  return (
    <Transition
      show={isOpen}
      enter="transition-opacity duration-150"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
      className="fixed inset-0 z-50 overflow-auto bg-gray-900 bg-opacity-50"
    >
      <div className="flex items-center justify-center min-h-screen">
        <Transition.Child
          enter="transition-transform duration-150"
          enterFrom="transform scale-95"
          enterTo="transform scale-100"
          leave="transition-transform duration-150"
          leaveFrom="transform scale-100"
          leaveTo="transform scale-95"
        >
        
          <div className="bg-white rounded-lg p-8 shadow-lg">
            <div className='mt-2 flex gap-4 border-b border-black'>
            <h1 className='text-2xl font-semibold p-4 text-green-600'>User registered Succcessfully</h1>
          </div>
            <button  onClick={handleClose} className="mt-4 px-4 py-2 bg-gray-900 text-white rounded-lg">Close</button>
          </div>
        
          
        </Transition.Child>
      </div>
    </Transition>
  );
};


const getCurrentDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  let month = today.getMonth() + 1; // Month is zero-based, so we add 1
  let day = today.getDate();

  // Pad single digit month and day with leading zeros if necessary
  month = month < 10 ? '0' + month : month;
  day = day < 10 ? '0' + day : day;

  // Combine year, month, and day to form the desired format
  return `${year}${month}${day}`;
};


const MemberRegistration = () => {
  
  const currentdate = getCurrentDate();    
  // function handleimgchange(e) {
  //     console.log(e.target.files);
  //     setimage(URL.createObjectURL(e.target.files[0]));
  // }

  
  const [formData, setFormData] = useState({
    role_id : '',
    title_id : '',
    name : '',
    email : '',
    address: '',
    dob: '',
    mobile : '',
    password: '',
    alternative_mobile_number : '',
    package_id : '',
    aadhar : '',
    pan : '',
    shop_name : '',
    state_id : '',
    pin_code : '',
    tpin : '',
    ip_address : '',  
    is_tpin_enabled : '',
    is_distributor : false,
    distributor_name : '',
    parent_id : '',
    asm_name : '',
    is_active: false,
    is_tpin_enabled: true,
    ip_address: '192.167.1.1',
    parent_id: ''
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
 
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const [date, setDate] = useState('');

  const handledateChange = (e) => {
    let input = e.target.value;
    // Remove any non-numeric characters from input
    input = input.replace(/\D/g, '');
    
    // Format input into YYYYMMDD format
    let formattedDate = input.replace(/^(\d{4})(\d{2})(\d{2})$/, '$1-$2-$3');
    
    // Update state with formatted date
    setDate(formattedDate);
    console.log(date)
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const checkbox = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [name]: value, [e.target.name]: checkbox, password: formData.mobile, dob: date});
  };

  const fetchstate = async (e) =>  {
    const stateresponse = await axios.get('http://127.0.0.1:8000/api/companybanks/'); 
    const statearr = stateresponse.data;
    console.log('state',statearr)

  }

  fetchstate();


const getparentid = async (e) => {
    //Getting parent ID
    const response = await fetch('http://127.0.0.1:8000/api/get_users/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(),
    });
    const all_id = await response.json();
    const searchValue = formData.distributor_name;

    // Using find() method to search for the object with id matching searchValue
    const foundObject = all_id.find(item => item.username === searchValue);
    const parentid = foundObject.id
    formData.parent_id = parentid;
}

 
  const handleSubmit = async (e) => {
    // You can perform form submission logic here
    e.preventDefault();
    getparentid();

  console.log('Formdata submitted 1' , formData)

  const regresponse = await fetch('http://127.0.0.1:8000/api/register_user/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const regresp = await regresponse.json();
    const message = regresp.message
    console.log(regresp)
    
    if(message==='User created successfully'){
      setFormData({
        role_id : '',
    title_id : '',
    name : '',
    email : '',
    address: '',
    dob: '',
    mobile : '',
    password: '',
    alternative_mobile_number : '',
    package_id : '',
    aadhar : '',
    pan : '',
    shop_name : '',
    state_id : '',
    pin_code : '',
    tpin : '',
    ip_address : '',  
    is_tpin_enabled : '',
    is_distributor : false,
    distributor_name : '',
    parent_id : '',
    asm_name : '',
    is_active: false,
    is_tpin_enabled: true,
    ip_address: '192.167.1.1',
    parent_id: ''
      });
      setIsModalOpen(true);
    }
    else{
      alert('Oops! Unable to create user');
    }
  };

  return (
    <div className='p-4'>
      <div className=' bg-gray-500 p-4 pb-6 px-6'>
      <h1 className='text-3xl font-black text-white border-b-4'>Member Register</h1>
      <div className="mt-4 ">
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={closeModal} />
      )}
        <div >
        <form className='md:flex flex-wrap gap-12' onSubmit={handleSubmit}>
            <div className='flex md:flex-wrap gap-8'>
              <label className="mt-2 text-white w-40 text-2xl">Role</label><br/>
                <select  id="role_id"
            name="role_id"
            value={formData.role_id}
            onChange={handleChange} className="w-72 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option selected>Select Role</option>
                    <option value="1">Retailer</option>
                    <option value="2">Distributor</option>
                </select>
            </div>

            <div className='md:flex md:flex-wrap gap-8'>
              <label className="mt-2 text-white w-40 text-2xl">Package</label><br/>
                <select  id="package_id"
            name="package_id"
            value={formData.package_id}
            onChange={handleChange} className="w-72 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option selected>Select Package</option>
                    <option value="1">Pack 1</option>
                </select>
            </div>

            <div className='md:flex md:flex-wrap gap-8'>
              <label className="mt-2 text-white w-40 text-2xl">Title</label><br/>
                <select  id="title_id"
            name="title_id"
            value={formData.title_id}
            onChange={handleChange} className="w-72 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option selected>Select Gender</option>
                    <option value="1">Male</option>
                    <option value="2">Female</option>
                    <option value="3">Did Not Say</option>
                </select>
            </div>

            <div className='md:flex md:flex-wrap gap-8'>
              <label className="mt-2 text-white w-40 text-2xl">Name</label><br/>
              <input className=" text-xl px-4 border border-solid border-gray-300 rounded"  id="name"
            name="name"
            value={formData.name}
            onChange={handleChange} type="text" placeholder="Enter Name" />
            </div>

            {/* <div className='md:flex md:flex-wrap gap-8'>
              <label className="mt-2 text-white w-40 text-2xl">Age</label><br/>
              <input className=" text-xl px-4 border border-solid border-gray-300 rounded" id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}  type="number" placeholder="Enter Age" />
            </div> */}

            <div className="md:flex md:flex-wrap gap-8">
              <label className='mt-2 text-white w-40 text-2xl'>DOB</label><br/>
              <input id="dob"
            name="dob"
            value={formData.dob}
            onChange={handledateChange} type='date' className='text-xl px-4 md:w-72 border border-solid border-gray-300 rounded bg-gray-50  text-gray-900 focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'/>
            </div>

            <div className='md:flex md:flex-wrap gap-8'>
              <label className="mt-2 text-white w-40 text-2xl">Email ID</label><br/>
              <input className=" text-xl px-4 border mr-8 border-solid border-gray-300 rounded" id="email"
            name="email"
            value={formData.email}
            onChange={handleChange} type="text" placeholder="Enter Email ID" />
            </div>

            <div className='md:flex md:flex-wrap gap-8'>
              <label className="mt-2 text-white w-40 text-2xl">Mobile No.</label><br/>
              <input className=" text-xl px-4 border border-solid border-gray-300 rounded" id="mobile"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange} type="number" placeholder="Enter Mobile Number" />
            </div>

            <div className='md:flex md:flex-wrap gap-8'>
              <label className="mt-2 text-white w-40 text-2xl">Alt. Mobile No.</label><br/>
              <input className=" text-xl px-4 border border-solid border-gray-300 rounded" id="alternative_mobile_number"
            name="alternative_mobile_number"
            value={formData.alternative_mobile_number}
            onChange={handleChange} type="number" placeholder="Enter Mobile Number" />
            </div>

            <div className='md:flex md:flex-wrap gap-8'>
              <label className="mt-2 text-white w-40 text-2xl">Aadhaar </label><br/>
              <input className=" text-xl px-4 border border-solid border-gray-300 rounded" id="aadhar"
            name="aadhar"
            value={formData.aadhar}
            onChange={handleChange}  type="number" placeholder="Enter Aadhaar Number" />
            </div>

            <div className='md:flex md:flex-wrap gap-8'>
              <label className="mt-2 text-white w-40 text-2xl">PAN Number</label><br/>
              <input className=" text-xl px-4 border border-solid border-gray-300 rounded" id="pan"
            name="pan"
            value={formData.pan}
            onChange={handleChange} type="text" placeholder="Enter PAN Number" />
            </div>

            <div className='md:flex md:flex-wrap gap-8'>
              <label className="mt-2 text-white w-40 text-2xl">Perm. Address</label><br/>
              <input className=" text-xl px-4 border border-solid border-gray-300 rounded" id="address"
            name="address"
            value={formData.address}
            onChange={handleChange} type="text" placeholder="Enter Address" />
            </div>

            <div className='md:flex md:flex-wrap gap-8'>
                <label className="mt-2 text-white w-40 text-2xl">State</label><br/>
                <select id="state_id"
            name="state_id"
            value={formData.state_id}
            onChange={handleChange} className="w-72 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option selected>Select State</option>
                    <option value="1">Haryana</option>
                    <option value="2">Delhi</option>
                    <option value="3">Rajasthan</option>
                </select>              
            </div>

            {/* <div className='md:flex md:flex-wrap gap-8'>
              <label className="mt-2 text-white w-40 text-2xl">City</label><br/>
              <input className=" text-xl px-4 border border-solid border-gray-300 rounded" onChange={(e) => setcity(e.target.value)} type="text" placeholder="Enter City" />
            </div> */}

            <div className='md:flex md:flex-wrap gap-8'>
              <label className="mt-2 text-white w-40 text-2xl">Shopname</label><br/>
              <input id="shop_name"
            name="shop_name"
            value={formData.shop_name}
            onChange={handleChange} className=" text-xl px-4 border border-solid border-gray-300 rounded"  type="text" placeholder="Enter Address" />
            </div>

            {/* <div className='md:flex md:flex-wrap gap-8'>
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
            </div> */}

            <div className='md:flex md:flex-wrap gap-8'>
              <label className="mt-2 text-white w-40 text-2xl">Pincode</label><br/>
              <input className=" text-xl px-4 border border-solid border-gray-300 rounded" id="pin_code"
            name="pin_code"
            value={formData.pin_code}
            onChange={handleChange} type="number" placeholder="Enter Pincode" />
            </div>

            {/* <div className='md:flex md:flex-wrap gap-8'>
              <label className="mt-2 text-white w-40 text-2xl">Login Password</label><br/>
              <input className=" text-xl px-4 border border-solid border-gray-300 rounded" onChange={(e) => setpassword(e.target.value)} type="text" placeholder="Enter Login Password" />
            </div> */}

            <div className='md:flex md:flex-wrap gap-8'>
              <label className="mt-2 text-white w-40 text-2xl">Login PIN</label><br/>
              <input className=" text-xl px-4 border border-solid border-gray-300 rounded" id="tpin"
            name="tpin"
            value={formData.tpin}
            onChange={handleChange} type="number" placeholder="Enter Login PIN" />
            </div>

            <div className='md:flex md:flex-wrap gap-8'>
              <label className=" text-white w-44 text-2xl">Is Distributor</label>
              <input id="is_distributor"
            name="is_distributor"
            value={formData.is_distributor}
            onChange={handleChange} className=" text-2xl py-4 ml-4 px-4 border border-solid border-gray-300 rounded" type="checkbox"/>
            </div>   

            <div className='md:flex md:flex-wrap gap-8'>
              <label className=" text-white w-44 text-2xl">Distributor ID</label>
              <input id="distributor_name"
              name="distributor_name"
              value={formData.distributor_name}
              onChange={handleChange} className=" text-xl ml-4 px-4 border border-solid border-gray-300 rounded" placeholder="Enter Distributor Name" type="text"/>
            </div>   

            <div className='md:flex md:flex-wrap gap-8'>
              <label className="mt-2 text-white w-40 text-2xl">ASM Name</label><br/>
              <input id="asm_name"
              name="asm_name"
              value={formData.asm_name}
              onChange={handleChange} className=" text-xl px-4 border border-solid border-gray-300 rounded" type="text" placeholder="Enter ASM Name" />
            </div>
            
            {/* <div className='md:flex md:flex-wrap gap-8'>
              <label className=" text-white w-44 text-2xl">Is Active</label>
              <input className=" text-2xl ml-4 py-4 px-4 border border-solid border-gray-300 rounded" onChange={(e) => setstatus(e.target.value)} type="checkbox"/>
            </div>   */}
        
       

        {/* <div className='mt-8 '>
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

        </div> */}
        
        <div className='mt-8 flex gap-4'>
          <button className=" bg-blue-600 hover:bg-blue-700 px-6 py-3 text-white uppercase rounded text-sm tracking-wider" type="submit">Submit</button>
        </div>
        </form>
        </div>
      </div>
      
    </div>
    </div>
  )
}

export default MemberRegistration
