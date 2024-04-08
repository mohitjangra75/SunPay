import React, { useState } from 'react'
import { Transition } from '@headlessui/react';

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

const Staffregister = () => {

  const currentdate = getCurrentDate();    
  
  const [formData, setFormData] = useState({
    role_id : '',
    title_id : '',
    name : '',
    email : '',
    address: '',
    dob: '',
    mobile : '',
    password: '',
    package_id : '0',
    aadhar : '',
    pan : '',
    pin_code : '',
    tpin : '',  
    is_tpin_enabled : '',
    parent_id : '1',
    is_active: true,
    is_tpin_enabled: true,
    ip_address: '192.167.1.1',
    parent_id: '1'
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
    setFormData({ ...formData, [name]: value, [e.target.name]: checkbox, dob: date});
  };

  const handleSubmit = async (e) => {
    // You can perform form submission logic here
    e.preventDefault();

  console.log('Formdata submitted 1' , formData)

  const regresponse = await fetch('http://43.205.83.194/api/register_user/', {
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
        package_id : '0',
        aadhar : '',
        pan : '',
        pin_code : '',
        tpin : '',  
        is_tpin_enabled : '',
        parent_id : '',
        is_active: true,
        is_tpin_enabled: true,
        ip_address: '192.167.1.1',
        parent_id: '1'
      });
      setIsModalOpen(true);
    }
    else{
      alert('Oops! Unable to create user', regresponse.data);
    }
  };


  return (
    <div className='p-4'>
      <div className=' bg-gray-500 p-4 pb-6'>
      <h1 className='text-3xl font-black text-white border-b-4'>Staff Register</h1>
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={closeModal} />
      )}
      <form onSubmit={handleSubmit}>
        <div className='mt-4 flex gap-4'>
          <label className="mt-2 text-white w-40 text-2xl">Role</label><br/>
            <select id="role_id"
            name="role_id"
            value={formData.role_id}
            onChange={handleChange} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option selected>Select Role</option>
                <option value="4">Employee</option>
            </select>
        </div>

        <div className='mt-4 flex gap-4'>
          <label className="mt-2 text-white w-40 text-2xl">Gender</label><br/>
            <select id="title_id"
            name="title_id"
            value={formData.title_id}
            onChange={handleChange} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option selected>Select Gender</option>
                <option value="1">Male</option>
                <option value="2">Female</option>
                <option value="3">Did Not Say</option>
            </select>
        </div>

        <div className='mt-4 flex gap-4'>
          <label className="mt-2 text-white w-40 text-2xl">Name</label><br/>
          <input className=" text-xl px-4 border border-solid border-gray-300 rounded" id="name"
            name="name"
            value={formData.name}
            onChange={handleChange} type="text" placeholder="Enter Name" />
        </div>

        <div className='mt-4 flex gap-4'>
          <label className="mt-2 text-white w-40 text-2xl">Email ID</label><br/>
          <input className=" text-xl px-4 border border-solid border-gray-300 rounded" id="name"
            name="email"
            value={formData.email}
            onChange={handleChange}  type="text" placeholder="Enter Email ID" />
        </div>

        <div className='mt-4 flex gap-4'>
          <label className="mt-2 text-white w-40 text-2xl">Mobile No.</label><br/>
          <input className=" text-xl px-4 border border-solid border-gray-300 rounded" id="mobile"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}  type="number" placeholder="Enter Mobile Number" />
        </div>

        <div className="md:flex mt-4 md:flex-wrap gap-4">
              <label className='mt-2 text-white w-40 text-2xl'>DOB</label><br/>
              <input id="dob"
            name="dob"
            value={formData.dob}
            onChange={handledateChange} type='date' className='text-xl px-4 md:w-72 border border-solid border-gray-300 rounded bg-gray-50  text-gray-900 focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'/>
            </div>

        <div className='mt-4 flex gap-4'>
          <label className="mt-2 text-white w-40 text-2xl">Aadhaar</label><br/>
          <input className=" text-xl px-4 border border-solid border-gray-300 rounded" id="aadhar"
            name="aadhar"
            value={formData.aadhar}
            onChange={handleChange}  type="number" placeholder="Enter Aadhaar Number" />
        </div>

        <div className='mt-4 flex gap-4'>
          <label className="mt-2 text-white w-40 text-2xl">PAN</label><br/>
          <input className=" text-xl px-4 border border-solid border-gray-300 rounded" id="pan"
            name="pan"
            value={formData.pan}
            onChange={handleChange}  type="text" placeholder="Enter PAN" />
        </div>

        <div className='mt-4 flex gap-4'>
          <label className="mt-2 text-white w-40 text-2xl">Address</label><br/>
          <input className=" text-xl px-4 border border-solid border-gray-300 rounded" id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}  type="text" placeholder="Enter Address" />
        </div>

        <div className='mt-4 flex gap-4'>
          <label className="mt-2 text-white w-40 text-2xl">Pincode</label><br/>
          <input className=" text-xl px-4 border border-solid border-gray-300 rounded" id="pin_code"
            name="pin_code"
            value={formData.pin_code}
            onChange={handleChange}  type="number" placeholder="Enter Pincode" />
        </div>

        <div className='mt-4 flex gap-4'>
          <label className="mt-2 text-white w-40 text-2xl">Login Password</label><br/>
          <input className=" text-xl px-4 border border-solid border-gray-300 rounded" id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}  type="text" placeholder="Enter Login Password" />
        </div>

        <div className='mt-4 flex gap-4'>
          <label className="mt-2 text-white w-40 text-2xl">TPIN</label><br/>
          <input className=" text-xl px-4 border border-solid border-gray-300 rounded" id="tpin"
            name="tpin"
            value={formData.tpin}
            onChange={handleChange}  type="number" placeholder="Enter Login PIN" />
        </div>

        <div className='mt-4 flex gap-4'>
          <button className=" bg-blue-600 hover:bg-blue-700 px-6 py-3 text-white uppercase rounded text-sm tracking-wider" type="submit">Submit</button>
        </div>
      </form>
      </div>
    </div>
  )
}

export default Staffregister
