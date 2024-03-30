import React from 'react'
import { useRef, useState } from 'react';
import { useEffect } from 'react';
import numberToWords from 'number-to-words';


const today = new Date();
const date = today.setDate(today.getDate()); 
const defaultValue = new Date(date).toISOString().split('T')[0]

const Fundrequest = (props) => {  

  const [dataall, setDatall] = useState();  
  useEffect(() => {
    setDatall(props.data);
    console.log('dataall', dataall);
  }, []);
    console.log('Data from fundrequest', dataall)

  const [Date, setDate] = useState();
  const [show, setshow] = useState(false)

  const Timestamp = today

    // Function to handle form submission
    const submitfundrequest = (e) => {
      e.preventDefault();
      console.log('Form submitted:', { bank, amount });
      
      setshow(current => !current)

    };


  const handleChange = (e) => {
    setDate(e.target.value);
    
  };

  

  const [bank, setbank] = useState('');
  const [amount, setamount] = useState(0);
  const [refer, setrefer] = useState('');
  const [mode, setmode] = useState('');
  const [date, setdate] = useState('');
  const [remarks, setremarks] = useState('');

  // const amountInWords = numberToWords.toWords(amount);

  return (
    <div className='Fundrequest p-4'>
      {/* Fund request part */}
      <div className='bg-slate-300 p-2 border-2 border-red-200'>
        <h1 className=' font-bold text-2xl border-b-2 border-gray-400'>FUND REQUEST</h1>
        <div >
          <form onSubmit={submitfundrequest} className='md:flex md:flex-wrap md:gap-8 mt-4'>
              {/* Bank Select */}
              <div>
                <label htmlFor="banks" className='text-lg'>Select a Bank</label>
                <select id="banks" onChange={(e) => setbank(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option selected>Bank List</option>
                  <option value="ICICI Bank(664005500851)">ICICI Bank(664005500851)</option>
                  <option value="State Bank of India(42057935640)">State Bank of India(42057935640)</option>
                  <option value="Punjab National Bank(6058002100002053)">Punjab National Bank(6058002100002053)</option>
                  <option value="Axis Bank(923020043729544)">Axis Bank(923020043729544)</option>
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
                <input type="text" onChange={(e) => setamount(e.target.value)} name="Amount" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'/>

              </div>
              {/* Bank reference number */}
              <div className="col-md-3">
                <label htmlFor="Bank reference">Bank Reference No.</label>
                <input type="text" onChange={(e) => setrefer(e.target.value)} name="Bank reference" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'/>
              </div>
              {/* Payment mode*/}
              <div className="col-md-3">
                <label htmlFor="Payment mode">Payment Mode</label>
                <select onChange={(e) => setmode(e.target.value)} id="paymentmode" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option selected>Select Payment Mode</option>
                <option value="neftrtgs">NEFT/IMPS/RTGS</option>
                <option value="cheque">Cheque/DD</option>
                <option value="cash">Cash</option>
                <option value="upi">UPI</option>
              </select>
              </div>
              {/* Payment Date */}
              <div className="col-md-3">
                  <label htmlFor="Payment date">Payment Date</label>
                  <input id="dateRequired" type="date" onChange={(e) => setdate(e.target.value)} name="dateRequired" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'/>
                  {/* <input type="date" onChange={handleChange} ref={dateInputRef} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'/> */}
                </div>
              {/* Remarks */}
                <div className="col-md-3">
                  <label htmlFor="remark">Remark</label>
                  <input type="text" name="remarks" onChange={(e) => setremarks(e.target.value)} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'/>

                </div>
              {/* Submit button */}
              <div className="col-md-3">
                <label htmlFor=""></label><br />
                <button type="submit" name="submit" className='border border-gray-300 bg-blue-600 text-white text-sm rounded-lg  block w-full p-2.5 hover:cursor-pointer'>Save</button>
              </div>
          </form>
        </div>
      </div>

      {show && (
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
                              <button type="submit" onClick={submitfundrequest} className='p-2 border border-white text-white bg-neutral-500 ml-2'>Back</button>
                            </div>

                        </div>

                    

                  
              </div>
          </div>
          

        </div>
      )

      }

      <div className='bg-slate-300 p-2 mt-8 border-2 border-red-200'>
        <h1 className=' font-bold text-2xl border-b-2 border-gray-400'>FUND REQUEST LIST</h1>

        <div className='mt-4'>
          <div className='datefetch md:flex md:flex-wrap gap-6'>
            {/* From Date */}
            <div className="col-md-3">
              <label htmlFor="Payment date">From Date</label>
              <input id="dateRequired" type="date" onChange={handleChange} name="dateRequired" defaultValue={defaultValue} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'/>
              {/* <input type="date" onChange={handleChange} ref={dateInputRef} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'/> */}
            </div>
            
            {/* TO Date */}
            <div className="col-md-3">
              <label htmlFor="Payment date">To Date</label>
              <input id="dateRequired" type="date" onChange={handleChange} name="dateRequired" defaultValue={defaultValue} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'/>
              {/* <input type="date" onChange={handleChange} ref={dateInputRef} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'/> */}
            </div>

            <div className="col-md-3">
              <input id="dateRequired" type="submit" onChange={handleChange} name="dateRequired" defaultValue='Submit' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'/>
              {/* <input type="date" onChange={handleChange} ref={dateInputRef} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'/> */}
            </div>
          </div>

          <div className='mt-4'>
              <div className =" relative overflow-x-auto shadow-md border-black">
                 <table className="w-full text-sm text-left rtl:text-right mt-2 border border-black text-gray-500 dark:text-gray-400 border-collapse ">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr className='border border-black'>
                      <th scope="col" className="px-6 py-3 border border-black">SNO</th>
                      <th scope="col" className="px-6 py-3 border border-black">Action</th>
                      <th scope="col" className="px-6 py-3 border border-black">RequestID</th>
                      <th scope="col" className="px-6 py-3 border border-black">Member ID</th>
                      <th scope="col" className="px-6 py-3 border border-black">Name</th>
                      <th scope="col" className="px-6 py-3 border border-black">Payment Date</th>
                      <th scope="col" className="px-6 py-3 border border-black">Payment Mode</th>
                      <th scope="col" className="px-6 py-3 border border-black w-56">Company Bank Name</th>
                      <th scope="col" className="px-6 py-3 border border-black">Amount</th>
                      <th scope="col" className="px-6 py-3 border border-black">Remark</th>
                      <th scope="col" className="px-6 py-3 border border-black">Bank Ref ID</th>
                      <th scope="col" className="px-6 py-3 border border-black">Add Date</th>
                      <th scope="col" className="px-6 py-3 border border-black">Approve Date</th>
                      <th scope="col" className="px-6 py-3 border border-black">Company Remarks</th>
                      <th scope="col" className="px-6 py-3 border border-black">Slip</th>
                      <th scope="col" className="px-6 py-3 border border-black">Status</th>
                      </tr>
                    </thead>
                  
                    <tbody>
                      <tr className="bg-white border border-black dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        
                      </tr>
                    </tbody>
                 </table>
              </div>
        </div>
      </div>
      </div>
    </div>
  )
}
export default Fundrequest
