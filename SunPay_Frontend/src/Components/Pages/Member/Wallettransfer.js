import React, { useEffect } from 'react'
import { useState } from 'react';
import { Transition } from '@headlessui/react';

const Modal = ({ isOpen, onClose }) => {
  
  const [isEntering, setIsEntering] = useState(false);

  const [mpin, setmpin] = useState();


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
                    <label className="text-black w-40 text-2xl">Enter MPIN : </label><br/>
                    <input className=" text-xl px-4 border border-solid border-gray-300 rounded" maxlength="4" onChange={(e) => setmpin(e.target.value)} type="password" required placeholder="Enter MPIN" />
                </div>
            {/* <div className=' p-2 mt-8 border-2 bg-slate-300 border-black'>
          <div className='text-3xl bg-red-400 flex p-2 justify-center  font-bold'>
            <h1 className='text-center border-2 p-2 border-gray-700'>INDEMNITY BOND</h1>
          </div>

          <div>
          <br />
            <h1 className='text-lg font-bold'>Date : {today.toLocaleString()}</h1>
          </div>

          <div>
            <h1 className='text-xl mt-2 font-bold'>From :</h1>
          </div>

          <div className='text-xl mx-4'>
              <table className='border-2 flex border-black'>
                  <tbody className='w-full'>
                      <tr className='flex border py-2 border-black justify-start text-2xl '>
                        <div className='w-1/2 mx-6 font-bold'>Merchant/Agent Name :</div>
                        <div className='w-1/2 mx-6 font-light'>{dataall.name}</div>
                      </tr>

                      <tr className='flex border py-2 border-black justify-start text-2xl '>
                        <div className='w-1/2 mx-6 font-bold'>Merchant/Agent ID :</div>
                        <div className='w-1/2 mx-6 font-light'>{dataall.username}</div>
                      </tr>

                      <tr className='flex border py-2 border-black justify-start text-2xl '>
                        <div className='w-1/2 mx-6 font-bold'>Registered Mobile No :</div>
                        <div className='w-1/2 mx-6 font-light'>{dataall.mobile}</div>
                      </tr>

                      <tr className='flex border py-2 border-black justify-start text-2xl '>
                        <div className='w-1/2 mx-6 font-bold'>Merchant/Agent PAN :</div>
                        <div className='w-1/2 mx-6 font-light'>{dataall.pan}</div>
                      </tr>

                      <tr className='flex border py-2 border-black justify-start text-2xl '>
                        <div className='w-1/2 mx-6 font-bold'>Amount :</div>
                        <div className='w-1/2 mx-6 font-light'>{amount}</div>
                      </tr>

                      <tr className='flex border py-2 border-black justify-start text-2xl '>
                        <div className='w-1/2 mx-6 font-bold'>Amount In Words : </div>
                        <div className='w-1/2 mx-6 font-light'>{}</div>
                      </tr>

                      <tr className='flex border py-2 border-black justify-start text-2xl '>
                        <div className='w-1/2 mx-6 font-bold'>Payment Mode : </div>
                        <div className='w-1/2 mx-6 font-light'>{mode}</div>
                      </tr>

                      <tr className='flex border py-2 border-black justify-start text-2xl '>
                        <div className='w-1/2 mx-6 font-bold'>Bank Account : </div>
                        <div className='w-1/2 mx-6 font-light'>{bank}</div>
                      </tr>

                      <tr className='flex border py-2 border-black justify-start text-2xl '>
                        <div className='w-1/2 mx-6 font-bold'>Deposit Date : </div>
                        <div className='w-1/2 mx-6 font-light'>{date}</div>
                      </tr>

                      <tr className='flex border py-2 border-black justify-start text-2xl '>
                        <div className='w-1/2 mx-6 font-bold'>Remarks : </div>
                        <div className='w-1/2 mx-6 font-light'>{remarks}</div>
                      </tr>
                  </tbody>
              </table>
          </div>

          <div className='text-xl mt-6 mx-4'>
              <div className='sender'>
                  <b>
                    To,<br />
                    The Board of Directors,<br />
                    SunPay <br />
                    H. No. 772, Chawri Bazar, FF Chowk Kundey Walan AjmeriGate, New Delhi, North Delhi, Delhi-110006 <br /><br />
                   
                    Dear Sir/Madam, </b><br />

                    I, <b>{dataall.name},</b> as a Merchant/Agent hereby undertake and explicitly agree to indemnify SunPay towards the following points:
                    <br />
                    <p className='ml-2 border mt-2 border-black p-4'>
                      <ul className='list-disc ml-4  '>
                          <li>SunPay is providing us with a platform as an enabler through which we can transfer/receive/top up the money through various methods likeUPI/ IMPS/ RTGS/ Payment Gateway etc. from one person to another(P2P and P2M) against a separate consideration.</li>  
                          <li>I am wholly and solely responsible for the collection of KYC/ meeting the Statutory requirements and other mandatory documents from the sender or receiver or both and also the reasons of such transactions.</li>
                          <li>I am responsible and abide to provide the KYC and other mandatory documents and reasons of each and every transactions with end customers to the at Paymine's discretion.</li>
                          <li>I am wholly and solely responsible for those transactions which was wrongly debited or credited by me to another party or any incorrect entry/entries while using the platform.</li>
                          <li>After obtaining a proper understanding of the transaction patterns of this Company, I am giving my consent to use this platform with all the terms and conditions as provided by the SunPay and also assuring that every sender or receiver or both only after giving their full consent using this platform for transfer / receive / topup the money through various methods like CASH / UPI / IMPS / NEFT / RTGS / Payment Gateway etc.</li>
                      </ul>
                    </p>
                    <br />
                    <h1>Thanking you <br /><br />
                        <b>
                          {dataall.username} <br />
                          (Merchant's/Agent's Name) <br />
                          {dataall.name} <br />
                        </b>
                        </h1>
                        <h2 className='mt-6 text-lg'>
                          Digitally signed by {dataall.name} signature not requied. <br /><br />
                          <b>
                              Timestamp : {today.toLocaleString()}
                          </b>
                        </h2>

                        <div className='my-4 flow-root gap-8'>
                            <div className='float-right'>
                              <button type="submit" className='p-2 border border-white text-white bg-green-600 ml-2'>Submit</button>
                            </div>

                            <div className='float-right'>
                              <button type="submit" className='p-2 border border-white text-white bg-red-700 ml-2'>Cancel</button>
                            </div>

                            <div className='float-right'>
                              <button type="submit" className='p-2 border border-white text-white bg-neutral-500 ml-2'>Back</button>
                            </div>

                        </div>

                    

                  
              </div>
          </div>
          

        </div> */}
            <button
              onClick={handleClose}
              className="mt-4 px-4 py-2 bg-gray-900 text-white rounded-lg"
            >
              Close Modal
            </button>
          </div>
        </Transition.Child>
      </div>
    </Transition>
  );
};

const Wallettransfer = (props) => {

  const [isModalOpen, setIsModalOpen] = useState(false);

const openModal = () => {
  setIsModalOpen(true);
};

const closeModal = () => {
  setIsModalOpen(false);
};

    const [dataall, setDatall] = useState();  
    useEffect(() => {
      setDatall(props.data);
      console.log('dataall', dataall);
    }, []);
      console.log('Data from fundrequest', dataall)
  

    const [isShown, setIsShown] = useState(false);

  const handleClick = event => {
    setIsShown(current => !current);
  }


  const handlesubmit = event => {
    setIsShown(current => !current);
  }

  const [amount, setamount] = useState();
  const [remark, setremark] = useState();
  const [mobile, setmobile] = useState();


  return (
    <div className='p-4 walletsystem'>
      {!isShown && (
        <div className='bg-slate-300 flex gap-4 p-2 border-2 border-red-200'>
            <label htmlFor='' className='mt-2 text-xl font-bold'>Enter Sender Mobile Number</label>
           <div className='md:flex gap-8'>
            <input type="text" name="remarks" placeholder='Enter Mobile Number' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 hover:cursor-pointer dark:focus:border-blue-500'/>
            <input type="submit" value="Submit" onClick={handleClick}  className='p-2 bg-white border border-black hover:bg-blue-700 hover:text-white rounded-lg'/>
           </div>
        </div>
      )}

      {
        isShown && (
            <div className='bg-slate-300 p-4'>
        <form action="" className='flex justify-center'>
            <div className='border p-4 border-black'>            
                <div className='mt-2 flex gap-4 border-b border-black'>
                    <label className="text-black w-40 text-2xl">Name : </label><br/>
                    <div className=" text-xl px-4 border border-solid border-gray-300 rounded"> {dataall.name}</div>
                </div>

                <div className='mt-2 flex gap-4 border-b border-black'>
                    <label className="text-black w-40 text-2xl">Shopname :</label><br/>
                    <div className=" text-xl px-4 border border-solid border-gray-300 rounded"> {dataall.shopname}</div>
                </div>

                <div className='mt-2 flex gap-4 border-b border-black'>
                    <label className="text-black w-40 text-2xl">Member ID :</label><br/>
                    <div className=" text-xl px-4 border border-solid border-gray-300 rounded">
                        {dataall.username}
                    </div>
                </div>

                <div className='mt-2 flex gap-4 border-b border-black'>
                    <label className="text-black w-40 text-2xl">Mobile : </label><br/>
                    <div className=" text-xl px-4 border border-solid border-gray-300 rounded"> {mobile}</div>
                </div>

                <div className='mt-2 flex gap-4 border-b border-black'>
                    <label className="text-black w-40 text-2xl">Email ID :</label><br/>
                    <div className=" text-xl px-4 border border-solid border-gray-300 rounded"> {dataall.email}</div>
                </div>

                <div className='mt-2 flex gap-4 border-b border-black'>
                    <label className="text-black w-40 text-2xl">Add Amount :</label><br/>
                    <input className=" text-xl px-4 border border-solid border-gray-300 rounded" onChange={(e) => setamount(e.target.value)} type="number" required placeholder="Enter Amount" />
                </div>

                <div className='mt-2 flex gap-4 border-b border-black'>
                    <label className="text-black w-40 text-2xl">Remark : </label><br/>
                    <input className=" text-xl px-4 border border-solid border-gray-300 rounded" onChange={(e) => setremark(e.target.value)} type="text" placeholder="Enter Remarks" />
                </div>

                

                <div className='mt-2 flex gap-4 '>
                <button onClick={openModal} className="px-4 py-2 bg-blue-500 text-white rounded-lg">
      Submit
      </button>
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={closeModal} />
      )}
                </div>

            </div>
        </form>
        </div>
        )
      }



    </div>
  )
}

export default Wallettransfer
