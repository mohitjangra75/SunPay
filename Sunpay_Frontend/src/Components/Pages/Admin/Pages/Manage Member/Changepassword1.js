import React, { useState, useEffect } from 'react'
import { Transition } from '@headlessui/react';
import axios from 'axios';



const Changepassword1 = (props) => {
  const Modal = ({ isOpen, onClose }) => {
  
    const [isEntering, setIsEntering] = useState(false);
    const [tpin, setpin] = useState();
  
    const handleClose = () => {
      setIsEntering(false);
      setTimeout(() => {
        onClose();
      }, 150);
    };
  
    const handlesubmit = event => {
      if(tpin){
        console.log(id, password, tpin)
      }
        // const resultArray = providers.filter(option => option.provider_name === company);
        // const foundValues = allid.filter(obj => obj.id === id).map(obj => obj.id);
        // setselid(foundValues[0])
        //  const foundState = state_list.filter(obj => obj.state_name === circle).map(obj => obj.id);  
        // setcirclecode(foundState[0])
         
    }
  
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
                    <div className='flex md:flex-wrap gap-8'>
                      <label className="mt-2 text-2xl">Login Pin</label><br/>
                      <input className=" text-xl px-4 border border-solid border-gray-300 rounded" onChange={(e) => setpin(e.target.value)} type="password" placeholder="Enter Login PIN" />
                    </div>
  
  
                    <div className=''>
                      <button onClick={handlesubmit} className="mt-6 bg-blue-600 border border-white hover:bg-blue-950 px-6 py-3 text-white uppercase rounded text-sm tracking-wider" type="submit">Submit</button>
                    </div>  
            </div>
  
            <button  onClick={handleClose} className="mt-4 px-4 py-2 bg-gray-900 text-white rounded-lg">Close</button>
  
          
            
          </Transition.Child>
        </div>
      </Transition>
    );
  };

  const localuser = props.data

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from your backend API
        const response = await fetch(`http://127.0.0.1:8000/api/get_users/`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const responseid = await response.json();
        const filteredid = responseid.filter(option => option.role_id === 1);

        setallid(filteredid)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  },[]);

  const handleclick = () => {
    if(id && password ){
      setIsModalOpen(true);        
    }      
  }

  const [isModalOpen, setIsModalOpen] = useState(false);
 
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const [allid, setallid] = useState([]);
  const [id, setid] = useState();
  const [password, setpassword] = useState();
  const [show, setshow] = useState(false);

  return (
    <div className='p-4'>
      <div className=' bg-gray-500 p-4 pb-6 px-6'>
      <h1 className='text-3xl font-black text-white border-b-4'>Retailer Password Change</h1>
        <div className="mt-4 ">
        {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={closeModal} />
      )}
            <div className='md:flex flex-wrap gap-12'>
                <div className='flex md:flex-wrap gap-8'>
                  <label className="mt-2 text-white text-2xl">Role</label><br/>
                    <select id="id" onChange={(e) => setid(e.target.value)} className="w-72 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option selected>Select ID</option>
                       
                         {allid.map(option => (
                        <option key={option.id} value={option.id}>
                        {option.username}
                        </option>
                         ))}
                    </select>
                </div>

                <div className='flex md:flex-wrap gap-8'>
                  <label className="mt-2 text-white text-2xl">Enter Password</label><br/>
                  <input className=" text-xl px-4 border border-solid border-gray-300 rounded" onChange={(e) => setpassword(e.target.value)} type="password" placeholder="Enter Password" />
                </div>

                <div className='flex md:flex-wrap gap-8'>
                  <label className="mt-2 text-white text-2xl">Confirm Password</label><br/>
                  <input className=" text-xl px-4 border border-solid border-gray-300 rounded" onChange={(e) => setpassword(e.target.value)} type="password" placeholder="Re-Enter Password" />
                </div>

                <div className=''>
                  <button onClick={handleclick} className="bg-blue-600 border border-white hover:bg-blue-950 px-6 py-3 text-white uppercase rounded text-sm tracking-wider" type="submit">Submit</button>
                </div>
            </div>

           

            
      </div>
    </div>
    </div>
  )
}

export default Changepassword1
