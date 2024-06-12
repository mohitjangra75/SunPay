import React from 'react'
import { useRef, useState } from 'react';
import { useEffect } from 'react';
import ReactToPrint, { useReactToPrint } from 'react-to-print'
import axios from 'axios';
import { Transition } from '@headlessui/react';

const Modal = ({ isOpen, onClose, setshow }) => {
  
  const [isEntering, setIsEntering] = useState(false);

  const handleClose = () => {
    setIsEntering(false);
    setshow(current => !current)
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
            <h1 className='text-2xl font-semibold p-4 text-green-600'>Fund Request Added Succcessfully</h1>
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

const today = new Date();
const date = today.setDate(today.getDate()); 
const defaultValue = new Date(date).toISOString().split('T')[0]

const Fundrequest = (props) => {  

  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const [options, setOptions] = useState([]);

  const fetchBank = async () => {
    try {
      
      const response = await axios.get('http://118.139.167.172/api/companybanks/'); // Assuming '/api/options' is your backend endpoint
      setOptions(response.data);       
      
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {

    fetchBank(); // Fetch data when the component mounts
  }, []);

  const divprint = useRef();
  const handliprint = useReactToPrint({
      content : () => divprint.current
  })

  const [dataall, setDatall] = useState();  
  useEffect(() => {
    setDatall(props.data);
  }, []);
  

  const [Date, setDate] = useState();
  const [show, setshow] = useState(false)
  const [showrow, setshowrow] = useState(false)



    const submitfundrequest = async (e) => {
      try {

       

        e.preventDefault();
        const add_date = defaultValue
        const amount = parseFloat(amoun); 
        const userresponse = await axios.get(`http://118.139.167.172/api/users/${props.data.id}`);
        const username = userresponse.data.username;
    
        const requestBody = {
          amount,
          bank_name,
          bank_acc_number,
          ref_number,
          payment_mode,
          payment_date,
          remark,
          username,
          add_date,
        };
    
        console.log('Form submitted:', requestBody);
    
        const response = await fetch('http://118.139.167.172/api/fund_request/', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(requestBody),
            });
           
            const backresp = await response.json();
            console.log(backresp);
            if(backresp.message==="Successfully initiated fund request"){
              setIsModalOpen(true);
            }
            else{
              alert('Something went wrong. Please try agein later.')
            }
    
        console.log('Response:', response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    
    const getfundrequest = async (e) => {
      e.preventDefault();
      const funreqresponse = await axios.get(`http://118.139.167.172/api/get_fund_request/?user_id=${props.data.id}`);
      const allrequest = funreqresponse.data
      setallfundrequest(allrequest)
      console.log(allfundrequest)
        setshowrow(current => !current)
    }

    // const handlecancel = (e) => {
    //   e.preventDefault();
    //   setdate(""),setbank(""),setamount(""),setrefer(""),setremarks("")
    // }
  
    const savefundrequest = (e) => {
      const filteredArray = options.find(item => item.account_no === bank_acc_number);
      setbank_name(filteredArray.bank_name)

      e.preventDefault();
      if(
        bank_acc_number && 
        amoun && 
        ref_number && 
        payment_mode &&
        payment_date &&
        remark &&
        bank_name
      ){
        setshow(current => !current)
      }
      else{
        alert('Kindly Fill all required details')
      }

    }

  const handledateChange = (e) => {
    setDate(e.target.value);
  };

  const [bank_acc_number, setbank] = useState('');
  const [amoun, setamount] = useState(0);
  const [ref_number, setrefer] = useState('');
  const [payment_mode, setmode] = useState('');
  const [payment_date, setdate] = useState('');
  const [remark, setremarks] = useState('');
  const [allfundrequest, setallfundrequest] = useState();
  const [bank_name, setbank_name] = useState();

  return (
    <div className='Fundrequest p-4'>
      {/* Fund request part */}
      <div className='bg-slate-300 p-2 border-2 border-red-200'>
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={closeModal} setshow={setshow} />
      )}
        <h1 className=' font-bold text-2xl border-b-2 border-gray-400'>FUND REQUEST</h1>
        <div >
          <form onSubmit={submitfundrequest} className='md:flex md:flex-wrap md:gap-8 mt-4'>
              {/* Bank Select */}
              <div>
                <label htmlFor="banks" className='text-lg'>Select a Bank</label>
                <select id="banks" required onChange={(e) => setbank(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option selected>Bank List</option>
                  {options.map(option => (
                    <option key={option.bank_name} value={option.account_no}>
                          {option.bank_name}  {option.account_no}
                    </option>
                  ))}
                 
                </select>
              </div>
              {/* Balance
              <div className="col-md-3">
                <label htmlFor="Balance">Balance</label><br />
                <input type="text" name="balance" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'/>
              </div> */}
              {/* Amount */}
              <div className="col-md-3">
                <label htmlFor="Amount">Amount</label>
                <input type="text" required onChange={(e) => setamount(e.target.value)} name="Amount" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'/>

              </div>
              {/* Bank reference number */}
              <div className="col-md-3">
                <label htmlFor="Bank reference">Bank Reference No.</label>
                <input type="text" required onChange={(e) => setrefer(e.target.value)} name="Bank reference" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'/>
              </div>
              {/* Payment mode*/}
              <div className="col-md-3">
                <label htmlFor="Payment mode">Payment Mode</label>
                <select required onChange={(e) => setmode(e.target.value)} id="paymentmode" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option selected>Select Payment Mode</option>
                <option value="8">NEFT/IMPS/RTGS</option>
                <option value="9">Cheque/DD</option>
                <option value="">Cash</option>
                <option value="5">UPI</option>
              </select>
              </div>
              {/* Payment Date */}
              <div className="col-md-3">
                  <label htmlFor="Payment date">Payment Date</label>
                  <input id="dateRequired" type="date" onChange={(e) => setdate(e.target.value)} name="dateRequired" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' required/>
                  {/* <input type="date" onChange={handleChange} ref={dateInputRef} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'/> */}
                </div>
              {/* Remarks */}
                <div className="col-md-3">
                  <label htmlFor="remark">Remark</label>
                  <input type="text" name="remarks" onChange={(e) => setremarks(e.target.value)} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' required/>

                </div>
              {/* Submit button */}
              <div className="col-md-3">
                <label htmlFor=""></label><br />
                <button onClick={savefundrequest} type="submit" name="submit" className='border border-gray-300 bg-blue-600 text-white text-sm rounded-lg  block w-full p-2.5 hover:cursor-pointer'>Save</button>
              </div>
              </form>
        </div>
      </div>
      {
      show && (
        <div className='mt-8 '>
          <div ref={divprint} className=' p-2 border-2 bg-slate-300 border-black'>
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
                        <div className='w-1/2 mx-6 font-light'>{amoun}</div>
                      </tr>

                      <tr className='flex border py-2 border-black justify-start text-2xl '>
                        <div className='w-1/2 mx-6 font-bold'>Bank Reference Number :</div>
                        <div className='w-1/2 mx-6 font-light'>{ref_number}</div>
                      </tr>

                      {/* <tr className='flex border py-2 border-black justify-start text-2xl '>
                        <div className='w-1/2 mx-6 font-bold'>Amount In Words : </div>
                        <div className='w-1/2 mx-6 font-light'>{}</div>
                      </tr> */}

                      <tr className='flex border py-2 border-black justify-start text-2xl '>
                        <div className='w-1/2 mx-6 font-bold'>Payment Mode : </div>
                        <div className='w-1/2 mx-6 font-light'>{payment_mode}</div>
                      </tr>

                      <tr className='flex border py-2 border-black justify-start text-2xl '>
                        <div className='w-1/2 mx-6 font-bold'>Bank Account : </div>
                        <div className='w-1/2 mx-6 font-light'>{bank_acc_number}</div>
                      </tr>

                      <tr className='flex border py-2 border-black justify-start text-2xl '>
                        <div className='w-1/2 mx-6 font-bold'>Deposit Date : </div>
                        <div className='w-1/2 mx-6 font-light'>{payment_date}</div>
                      </tr>

                      <tr className='flex border py-2 border-black justify-start text-2xl '>
                        <div className='w-1/2 mx-6 font-bold'>Remarks : </div>
                        <div className='w-1/2 mx-6 font-light'>{remark}</div>
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

                       
              </div>
              
          </div>
         

        </div>
        <div className='my-4 flow-root gap-8'>
                            <div className='float-right'>
                              <button type="submit" onClick={submitfundrequest} className='p-2 border border-white text-white bg-green-600 ml-2'>Submit</button>
                            </div>

                            <div className='float-right'>
                              <button type="submit"  className='p-2 border border-white text-white bg-red-700 ml-2'>Cancel</button>
                            </div>

                            <div className='float-right'>
                            <input type="submit" onClick={handliprint} value="Print" className='p-2 border border-white text-white bg-yellow-400 ml-2' />
                            </div>

                            <div className='float-right'>
                              <button type="submit"  className='p-2 border border-white text-white bg-neutral-500 ml-2'>Back</button>
                            </div>

                        </div>
        </div>
        
      )

      }

    </div>
  )
}
export default Fundrequest