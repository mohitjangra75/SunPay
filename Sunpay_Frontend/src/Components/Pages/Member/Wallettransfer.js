import React, { useEffect, useState } from 'react';
import { Transition } from '@headlessui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Modal = ({ isOpen, onClose, filtereduser, current, money, show}) => {
  const [isEntering, setIsEntering] = useState(false);
  const [tpin, settpin] = useState('');
  const navigate = useNavigate(); // Get the navigate function from react-router-dom

  console.log('modelfilter', filtereduser);
  console.log('amount', money);

  const handleClose = (e) => {
    setIsEntering(false);
    onClose();
  };

  const handlesend = async (e) => {
    e.preventDefault(); 
    try {
      const username = current.username;
      const mobile = filtereduser.mobile;
      const amount = parseInt(money);

      const response = await fetch('http://118.139.167.172/api/wallettowallet/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({username, mobile, amount,tpin}),
    });

      const sendresponse = await response.json();
      console.log('api response', sendresponse);
      const respmessage = sendresponse.Message;
      console.log('api response message', respmessage);
      const error = sendresponse.error;
      console.log('error', error);

      if (respmessage === "Wallet Traansferred Successfully") {
        alert("Amount Transferred Successfully");
        setIsEntering(false);
        handleClose();
        onClose();
        show();
      } 
      if (error) {
        alert(error);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
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
              <label className="text-black w-40 text-2xl">Enter MPIN :</label><br />
              <input type="password" required className="text-xl px-4 border border-solid border-gray-300 rounded" onChange={(e) => settpin(e.target.value)} placeholder="Enter MPIN" />
            </div>

            <div className='flex gap-4'>
              <button onClick={handlesend} className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg">
                Submit
              </button>
              <button onClick={handleClose} className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg">
                Cancel
              </button>
            </div>
          </div>
        </Transition.Child>
      </div>
    </Transition>
  );
};

const Wallettransfer = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isShown, setIsShown] = useState(false);
  const [money, setamount] = useState('');
  const [mobile, setmobile] = useState('');
  const [users, setUsers] = useState([]);
  const [currentuser, setcuruser] = useState();
  const [filteredUsers, setFilteredUsers] = useState([]);

  const openModal = (e) => {
    e.preventDefault();
    console.log(currentuser)
    if(money==0){
      alert("Please enter amount")
    }
    else{
      if (currentuser.mobile == mobile) {
        setIsModalOpen(false);
      alert("Unable to send to same Account")
    }
    else{
      setIsModalOpen(true);
    }
  }  
};

  const fetchpredetail = async () => {
    try {
      const curruserresponse = await axios.get(`http://118.139.167.172/api/users/${props.data.id}`);
      const curuser = curruserresponse.data;
      setcuruser(curuser)
      const userresponse = await axios.get(`http://118.139.167.172/api/get_users/`);
      const respuser = userresponse.data;
      setUsers(respuser);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchpredetail(); // Fetch data when the component mounts
  }, []);

  const handlesearch = event => {
    const mobileNumber = mobile;
    const filtered = users.filter(user => user.mobile === mobileNumber);
    setFilteredUsers(filtered[0]);
    if (filtered.length > 0) {
      console.log(filtered);
      setIsShown(true);
    } else {
      setIsShown(false);
      alert("Mobile Number doesn't exists.")
    }
  };

  const handlesubmit = event => {
    setIsShown(current => !current);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className='p-4 walletsystem'>
      {!isShown && (
        <div className='bg-slate-300 flex gap-4 p-2 border-2 border-red-200'>
          <label htmlFor='' className='mt-2 text-xl font-bold'>Enter Sender Mobile Number</label>
          <div className='md:flex gap-8'>
            <input type="text" name="remarks" placeholder='Enter Mobile Number' onChange={(e) => setmobile(e.target.value)} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 hover:cursor-pointer dark:focus:border-blue-500' />
            <input type="submit" value="Submit" onClick={handlesearch} className='p-2 bg-white border border-black hover:bg-blue-700 hover:text-white rounded-lg' />
          </div>
        </div>
      )}

      {isShown && (
        <div className='bg-slate-300 p-4'>
          <form action="" className='flex justify-center'>
            <div className='border p-4 border-black'>
              <div className='mt-2 flex gap-4 border-b border-black'>
                <label className="text-black w-40 text-2xl">Name :</label><br />
                <div className="text-xl px-4 border border-solid border-gray-300 rounded"> {filteredUsers.name} </div>
              </div>

              <div className='mt-2 flex gap-4 border-b border-black'>
                <label className="text-black w-40 text-2xl">Shopname :</label><br />
                <div className="text-xl px-4 border border-solid border-gray-300 rounded"> {filteredUsers.shop_name}</div>
              </div>

              <div className='mt-2 flex gap-4 border-b border-black'>
                <label className="text-black w-40 text-2xl">Member ID :</label><br />
                <div className="text-xl px-4 border border-solid border-gray-300 rounded">{filteredUsers.username}</div>
              </div>

              <div className='mt-2 flex gap-4 border-b border-black'>
                <label className="text-black w-40 text-2xl">Mobile :</label><br />
                <div className="text-xl px-4 border border-solid border-gray-300 rounded">{filteredUsers.mobile}</div>
              </div>

              <div className='mt-2 flex gap-4 border-b border-black'>
                <label className="text-black w-40 text-2xl">Email ID :</label><br />
                <div className="text-xl px-4 border border-solid border-gray-300 rounded">{filteredUsers.email}</div>
              </div>

              <div className='mt-2 flex gap-4 border-b border-black'>
                <label className="text-black w-40 text-2xl">Add Amount :</label><br />
                <input className="text-xl px-4 border border-solid border-gray-300 rounded" onChange={(e) => setamount(e.target.value)} type="number" required placeholder="Enter Amount" />
              </div>

              <div className='mt-2 flex gap-4 '>
                <button onClick={openModal} className="px-4 py-2 bg-blue-500 text-white rounded-lg">
                  Submit
                </button>
                {isModalOpen && (
                  <Modal isOpen={isModalOpen} onClose={closeModal} filtereduser={filteredUsers} current={currentuser} money={money} show={handlesubmit}/>
                )}
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Wallettransfer;
