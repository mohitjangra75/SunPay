import React, { useEffect} from 'react'
import { useState } from 'react';
import { Transition } from '@headlessui/react';
import axios from 'axios'


const today = new Date();
const date = today.setDate(today.getDate()); 
const defaultValue = new Date(date).toISOString().split('T')[0]

const Modal = ({ isOpen, onClose }, props) => {

  const [dataall, setDatall] = useState();  
  useEffect(() => {
    setDatall(props.data);
    console.log('dataall', dataall);
  }, []);
    console.log('Data from fundrequest', dataall)
  
  const [isEntering, setIsEntering] = useState(false);

  const [name, setname] = useState()
  const [amount, setamount] =useState()
  const [mode, setmode] = useState()
  const [bank, setbank] = useState()
  const [remarks, setremarks] = useState()

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
            <div className=' p-2 mt-8 border-2 bg-slate-300 border-black'>
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
                        <div className='w-1/2 mx-6 font-light'></div>
                      </tr>

                      <tr className='flex border py-2 border-black justify-start text-2xl '>
                        <div className='w-1/2 mx-6 font-bold'>Merchant/Agent ID :</div>
                        <div className='w-1/2 mx-6 font-light'></div>
                      </tr>

                      <tr className='flex border py-2 border-black justify-start text-2xl '>
                        <div className='w-1/2 mx-6 font-bold'>Registered Mobile No :</div>
                        <div className='w-1/2 mx-6 font-light'></div>
                      </tr>

                      <tr className='flex border py-2 border-black justify-start text-2xl '>
                        <div className='w-1/2 mx-6 font-bold'>Merchant/Agent PAN :</div>
                        <div className='w-1/2 mx-6 font-light'></div>
                      </tr>

                      <tr className='flex border py-2 border-black justify-start text-2xl '>
                        <div className='w-1/2 mx-6 font-bold'>Amount :</div>
                        <div className='w-1/2 mx-6 font-light'></div>
                      </tr>

                      <tr className='flex border py-2 border-black justify-start text-2xl '>
                        <div className='w-1/2 mx-6 font-bold'>Amount In Words : </div>
                        <div className='w-1/2 mx-6 font-light'></div>
                      </tr>

                      <tr className='flex border py-2 border-black justify-start text-2xl '>
                        <div className='w-1/2 mx-6 font-bold'>Payment Mode : </div>
                        <div className='w-1/2 mx-6 font-light'></div>
                      </tr>

                      <tr className='flex border py-2 border-black justify-start text-2xl '>
                        <div className='w-1/2 mx-6 font-bold'>Bank Account : </div>
                        <div className='w-1/2 mx-6 font-light'></div>
                      </tr>

                      <tr className='flex border py-2 border-black justify-start text-2xl '>
                        <div className='w-1/2 mx-6 font-bold'>Deposit Date : </div>
                        <div className='w-1/2 mx-6 font-light'></div>
                      </tr>

                      <tr className='flex border py-2 border-black justify-start text-2xl '>
                        <div className='w-1/2 mx-6 font-bold'>Remarks : </div>
                        <div className='w-1/2 mx-6 font-light'></div>
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

                    I, <b>,</b> as a Merchant/Agent hereby undertake and explicitly agree to indemnify SunPay towards the following points:
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
                          <br />
                          (Merchant's/Agent's Name) <br />
                          <br />
                        </b>
                        </h1>
                        <h2 className='mt-6 text-lg'>
                          Digitally signed by signature not requied. <br /><br />
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
          

        </div>
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

const FundRequest = (props) => {

  const [dataall, setDatall] = useState();  
  useEffect(() => {
    setDatall(props.data);
  }, []);
    console.log('Data from fundrequest', dataall)

  const [Date, setDate] = useState('')
  const handleChange = (e) => {
  setDate(e.target.value);
};

const [isModalOpen, setIsModalOpen] = useState(false);

const openModal = () => {
  setIsModalOpen(true);
};

const closeModal = () => {
  setIsModalOpen(false);
};

const getfundrequest = async (e) => {
  e.preventDefault();
  const funreqresponse = await axios.get(`https://new.sunpay.co.in/api/get_fund_request/?is_admin=${true}`);
  const allrequest = funreqresponse.data
  setallfundrequest(allrequest)
  console.log('Allfundrequest',allfundrequest)
  console.log('user',allfundrequest.user)
  setshowrow(current => !current)



}

const [showrow, setshowrow] = useState()
const [allfundrequest,setallfundrequest] = useState();

  return (
    <div className='p-4'>
      <div className='p-4 bg-gray-500 pb-6'>
      <div className='mt-4'>
          <div className='datefetch flow-root gap-6'>
            
            <div className='float-left'>
              <div className='flex gap-8 flex-wrap'>
                         {/* From Date */}
            <div className="col-md-3">
              <label htmlFor="Payment date" className='text-white text-xl'>From Date</label>
              <input id="dateRequired" type="date" onChange={handleChange} name="dateRequired" defaultValue={defaultValue} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'/>
              {/* <input type="date" onChange={handleChange} ref={dateInputRef} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'/> */}
            </div>
            
              {/* TO Date */}
              <div className="col-md-3">
                <label htmlFor="Payment date" className='text-white text-xl'>To Date</label>
                <input id="dateRequired" type="date" onChange={handleChange} name="dateRequired" defaultValue={defaultValue} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'/>
                {/* <input type="date" onChange={handleChange} ref={dateInputRef} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'/> */}
              </div>

              <div className="col-md-3">
              <input id="dateRequired" type="submit" name="dateRequired" defaultValue='Submit' onClick={getfundrequest} className='mt-6 bg-blue-600 text-white border border-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'/>
              </div>

              </div>
          </div>

            <div className='float-right'>
            <label htmlFor="Payment date" className='text-white text-xl'>Search</label>
              <div className="col-md-3">
                <input id="dateRequired" type="search" onChange={handleChange} name="dateRequired" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'/>
                {/* <input type="date" onChange={handleChange} ref={dateInputRef} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'/> */}
              </div>
            </div>

          </div>

          <div className='mt-4'>
            <div className =" relative overflow-x-auto shadow-md border-black ">
                 <table className=" text-sm text-left rtl:text-right mt-2 border border-black text-gray-500 dark:text-gray-400 border-collapse ">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr className='border border-black'>
                        <th scope="col" className="px-6 py-3 border border-black">SNO</th>
                        <th scope="col" className="px-6 py-3 border border-black">Action</th>
                        {/* <th scope="col" className="px-6 py-3 border border-black">RequestID</th> */}
                        <th scope="col" className="px-6 py-3 border border-black">MemberID</th>
                        <th scope="col" className="px-6 py-3 border border-black">Shopname, <br />ID, <br />Mobile-No.</th>
                        <th scope="col" className="px-6 py-3 border border-black">Payment Date</th>
                        <th scope="col" className="px-6 py-3 border border-black">Payment Mode</th>
                        <th scope="col" className="px-6 py-3 border border-black w-56">Company Bank Name</th>
                        <th scope="col" className="px-6 py-3 border border-black">Amount</th>
                        <th scope="col" className="px-6 py-3 border border-black">Bank Reference ID</th>
                        <th scope="col" className="px-6 py-3 border border-black">Transaction Id</th>
                        <th scope="col" className="px-6 py-3 border border-black">Remark</th>
                        <th scope="col" className="px-6 py-3 border border-black">Add Date</th>
                        <th scope="col" className="px-6 py-3 border border-black">Update Date</th>
                        <th scope="col" className="px-6 py-3 border border-black">Bond</th>
                        <th scope="col" className="px-6 py-3 border border-black">Company Remarks</th>
                        <th scope="col" className="px-6 py-3 border border-black">Slip</th>
                        <th scope="col" className="px-6 py-3 border border-black">Status</th>
                      </tr>
                    </thead>
                  
                  {
                    showrow && (
<tbody>
                    {allfundrequest.map((item, index) => (
                        <tr key={item.id} className='bg-white'>
                          
                          <td scope="col" className="px-6 py-3 border border-black">{index+1}</td>
                          <td scope="col" className="px-6 py-3 border border-black"></td>
                          <td scope="col" className="px-6 py-3 border border-black">{item.user}</td>
                          <td scope="col" className="px-6 py-3 border border-black">shop</td>
                          <td scope="col" className="px-4 py-3 border border-black">{item.payment_date}</td>
                          <td scope="col" className="px-6 py-3 border border-black">{item.payment_mode}</td>
                          <td scope="col" className="px-6 py-3 border border-black">{item.bank_name}</td>
                          <td scope="col" className="px-6 py-3 border border-black">{item.amount}</td>
                          <td scope="col" className="px-6 py-3 border border-black">{item.bank_ref_number}</td>
                          <td scope="col" className="px-6 py-3 border border-black">{item.id}</td>
                          <td scope="col" className="px-6 py-3 border border-black">{item.remark}</td>
                          <td scope="col" className="pl-2 py-3 border border-black">{item.add_date}</td>
                          <td scope="col" className="pl-2 py-3 border border-black">{item.update_date}</td>
                          <td scope="col" className="px-6 py-3 border border-black">
                            <button onClick={openModal} className="px-4 py-2 bg-blue-500 text-white rounded-lg">Bond</button>
                            {isModalOpen && (
                                <Modal isOpen={isModalOpen} onClose={closeModal} />
                            )}
                        </td>
                        <td scope="col" className="px-6 py-3 border border-black"></td>
                          <td scope="col" className="px-6 py-3 border border-black">SLIP</td>
                          <td scope="col" className="px-6 py-3 border border-black">{item.transaction_status}</td>


                        </tr>
                      ))}
                      {/* <tr className="bg-white border border-black dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td scope="col" className="px-6 py-3 border border-black">SNO</td>
                        <td scope="col" className="px-6 py-3 border border-black">Action</td>
                        <td scope="col" className="px-6 py-3 border border-black">RequestID</td>
                        <td scope="col" className="px-6 py-3 border border-black">Member ID</td>
                        <td scope="col" className="px-6 py-3 border border-black">Name</td>
                        <td scope="col" className="px-6 py-3 border border-black">Payment Date</td>
                        <td scope="col" className="px-6 py-3 border border-black">Payment Mode</td>
                        <td scope="col" className="px-6 py-3 border border-black w-56">Company Bank Name</td>
                        <td scope="col" className="px-6 py-3 border border-black">Amount</td>
                        <td scope="col" className="px-6 py-3 border border-black">Bank Ref ID</td>
                        <td scope="col" className="px-6 py-3 border border-black">Transaction ID</td>
                        <td scope="col" className="px-6 py-3 border border-black">Remark</td>
                        <td scope="col" className="px-6 py-3 border border-black">Add Date</td>
                        <td scope="col" className="px-6 py-3 border border-black">Approve Date</td>
                       
                        <td scope="col" className="px-6 py-3 border border-black">Company Remarks</td>
                        <td scope="col" className="px-6 py-3 border border-black">                          
                          <button type="submit" className='border-2 border-zinc-500 bg-blue-500 text-white px-2 p-1 text-lg'>Slip</button>
                        </td>
                        <td scope="col" className="px-6 py-3 border border-black">
                          <button type="submit" className='border-2 border-zinc-500 bg-green-500 text-white px-2 p-1 text-lg'>Success</button>
                        </td>
                      </tr> */}
                      <tr>
                        <td>
                          
                        </td>
                      </tr>
                    </tbody>
                    )
                  }
                    
                 </table>
            </div>
          </div>
          <div>
       
    </div>
        </div>
      </div>
    </div>
  )
}

export default FundRequest
