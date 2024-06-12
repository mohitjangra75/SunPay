import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Transition } from '@headlessui/react';


const UpdateModel = ({ isOpen, onClose, item }) => {
  const [options, setOptions] = useState([]);
  const [bank_acc_number, setBank] = useState('');
  const [amount, setAmount] = useState(0);
  const [ref_number, setRefer] = useState('');
  const [payment_mode, setMode] = useState('');
  const [payment_date, setDate] = useState('');
  const [remark, setRemarks] = useState('');
  const [bank_name, setBankName] = useState('');

  const fetchBank = async () => {
    try {
      const response = await axios.get('http://118.139.167.172/api/companybanks/');
      setOptions(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchBank();
  }, []);

  useEffect(() => {
    if (item) {
      setBank(item.bank_acc_number || '');
      setAmount(item.amount || 0);
      setRefer(item.bank_ref_number || '');
      setMode(item.payment_mode || '');
      setDate(item.payment_date || '');
      setRemarks(item.remark || '');
      setBankName(item.bank_name || '');
    }
  }, [item]);

  const handleClose = () => {
    onClose();
  };

  const update = async (event) => {
    event.preventDefault();
    const transaction_id = item.reference_number
    const action = "UPDATE"

    const requestBody = {
      transaction_id,
      action,
      amount,
      bank_name,
      bank_acc_number,
      ref_number,
      payment_mode,
      payment_date,
      remark,
      username: 'current_user', // Assuming you have the username from your auth system
    };

    console.log('Form submitted:', requestBody);

    const response = await fetch('http://118.139.167.172/api/update_fund_request/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    const backresp = await response.json();
    const error = backresp.Error
    console.log('Response:', backresp);
    if (backresp.Message === "Updated successfully"){
        alert("Fund Request Updated Successfully");
        onClose();
    }
    else if(error){
      alert(error)
    }
    else{
      alert("Technical Error")
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
              <h1 className='text-2xl font-semibold p-4 text-green-600'>Update Model</h1>
            </div>
            <h1 className='font-bold text-2xl border-b-2 border-gray-400'>FUND REQUEST</h1>
            <div>
              <form className='md:flex md:flex-wrap md:gap-8 mt-4' onSubmit={update}>
                {/* Bank Select */}
                <div>
                  <label htmlFor="banks" className='text-lg'>Select a Bank</label>
                  <select
                    id="banks"
                    required
                    value={bank_acc_number}
                    onChange={(e) => {
                      const selectedOption = options.find(option => option.account_no === e.target.value);
                      setBank(e.target.value);
                      setBankName(selectedOption ? selectedOption.bank_name : '');
                    }}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option value="">Bank List</option>
                    {options.map(option => (
                      <option
                        key={option.bank_name}
                        value={option.account_no}
                      >
                        {option.bank_name} {option.account_no}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Amount */}
                <div className="col-md-3">
                  <label htmlFor="Amount">Amount</label>
                  <input
                    type="text"
                    required
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    name="Amount"
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  />
                </div>
                
                {/* Bank reference number */}
                <div className="col-md-3">
                  <label htmlFor="Bank reference">Bank Reference No.</label>
                  <input
                    type="text"
                    required
                    value={ref_number}
                    onChange={(e) => setRefer(e.target.value)}
                    name="Bank reference"
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  />
                </div>

                {/* Payment mode */}
                <div className="col-md-3">
                  <label htmlFor="Payment mode">Payment Mode</label>
                  <select
                    required
                    value={payment_mode}
                    onChange={(e) => setMode(e.target.value)}
                    id="paymentmode"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option value="">Select Payment Mode</option>
                    <option value="8">IMPS/RTGS/NEFT</option>
                    <option value="9">Cheque/DD</option>
                    <option value="4">Cash</option>
                    <option value="5">UPI</option>
                  </select>
                </div>

                {/* Payment Date */}
                <div className="col-md-3">
                  <label htmlFor="Payment date">Payment Date</label>
                  <input
                    id="dateRequired"
                    type="date"
                    value={payment_date}
                    onChange={(e) => setDate(e.target.value)}
                    name="dateRequired"
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    required
                  />
                </div>

                {/* Remarks */}
                <div className="col-md-3">
                  <label htmlFor="remark">Remark</label>
                  <input
                    type="text"
                    name="remarks"
                    value={remark}
                    onChange={(e) => setRemarks(e.target.value)}
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    required
                  />
                </div>

                {/* Submit button */}
                <div className="col-md-3">
                  <label htmlFor=""></label><br />
                  <button
                    type="submit"
                    name="submit"
                    className='border border-gray-300 bg-blue-600 text-white text-sm rounded-lg block w-full p-2.5 hover:cursor-pointer'
                  >
                    Save
                  </button>
                </div>
              </form>
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
const defaultValue = today.toISOString().split('T')[0];

const Fundreqreport = (props) => {
  const [fromDate, setFromDate] = useState(defaultValue);
  const [toDate, setToDate] = useState(defaultValue);
  const [allFundRequest, setAllFundRequest] = useState([]);
  const [showRow, setshowrow] = useState(false);
  const [currentuser, setCurrentUser] = useState();


  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'fromDate') {
      setFromDate(value);
    } else if (name === 'toDate') {
      setToDate(value);
    }
  };

  const isValidDate = (dateString) => {
    const date = new Date(dateString);
    return !isNaN(date.getTime());
  };


  const fetchPreDetail = async () => {
    try {
      const userResponse = await axios.get(`http://118.139.167.172/api/users/${props.data.id}/`);
      const respUser = userResponse.data;
      setCurrentUser(respUser);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const showalltrans = async () => {
    const userid = parseInt(props.data.id);
    try {
      const transresp = await axios.get(`http://118.139.167.172/api/get_fund_request/?user_id=${userid}`);
      
      // Log the entire response to understand its structure
      console.log('transresp', transresp);
  
      // Check if transresp.data exists and has the expected structure
      if (transresp.data && transresp.data.Data) {
        const resptran = transresp.data.Data;
    
        const filteredTrans = resptran.filter((item) => {
          const itemDate = new Date(item.add_date).toISOString().split('T')[0];
          return itemDate >= fromDate && itemDate <= toDate;
        });
  
        setAllFundRequest(filteredTrans);
        setshowrow(true);
      } else {
        alert('Unexpected response structure:', transresp.data);
      }
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };
  
  // const getFundRequest = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const fundReqResponse = await axios.get(`http://118.139.167.172/api/get_fund_request/?user_id=${props.data.id}`);
  //     const allRequest = fundReqResponse.data;
  //     setAllFundRequest(allRequest.Data);
  //     console.log(allFundRequest)
  //     setShowRow(true);
  //   } catch (error) {
  //     console.error('Error fetching fund requests:', error);
  //   }
  // };

  useEffect(() => {
    fetchPreDetail();
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleEditClick = (item) => {
    setSelectedItem(item); // Set the selected item
    setIsModalOpen(true);  // Open the modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
    setSelectedItem(null); // Reset the selected item
  };

  const formatDate = (dateTimeString) => {
    const dateObj = new Date(dateTimeString);
    const dd = String(dateObj.getDate()).padStart(2, '0');
    const mm = String(dateObj.getMonth() + 1).padStart(2, '0'); // January is 0!
    const yy = dateObj.getFullYear().toString().substr(-2);
    return `${dd}:${mm}:${yy}`;
  };

  // Function to format time as HH:MM:SS
  const formatTime = (dateTimeString) => {
    const dateObj = new Date(dateTimeString);
    const HH = String(dateObj.getHours()).padStart(2, '0');
    const MM = String(dateObj.getMinutes()).padStart(2, '0');
    const SS = String(dateObj.getSeconds()).padStart(2, '0');
    return `${HH}:${MM}:${SS}`;
  };

  return (
    <div>
       <UpdateModel isOpen={isModalOpen} onClose={closeModal} item={selectedItem} />
      <div className='bg-slate-300 p-2 mt-8 border-2 border-red-200'>
        <h1 className='font-bold text-2xl border-b-2 border-gray-400'>FUND REQUEST LIST</h1>

        <div className='mt-4'>
          <div className='datefetch md:flex md:flex-wrap gap-6'>
            {/* From Date */}
            <div className="col-md-3">
              <label htmlFor="fromDate">From Date</label>
              <input
                id="fromDate"
                type="date"
                onChange={handleChange}
                name="fromDate"
                defaultValue={defaultValue}
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              />
            </div>

            {/* To Date */}
            <div className="col-md-3">
              <label htmlFor="toDate">To Date</label>
              <input
                id="toDate"
                type="date"
                onChange={handleChange}
                name="toDate"
                defaultValue={defaultValue}
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              />
            </div>

            <div className="col-md-3">
              <input
                type="submit"
                value='Submit'
                onClick={showalltrans}
                className='mt-6 bg-blue-600 text-white border border-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              />
            </div>
          </div>

          <div className='mt-4'>
            <div className="relative overflow-x-auto shadow-md border-black">
              <table className="w-full text-sm text-left rtl:text-right mt-2 border border-black text-gray-500 dark:text-gray-400 border-collapse">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr className='border border-black'>
                    <th scope="col" className="px-6 py-3 border border-black">SNO</th>
                    <th scope="col" className="px-6 py-3 border border-black">Transaction Id</th>
                    <th scope="col" className="px-6 py-3 border border-black">Action</th>
                    <th scope="col" className="px-6 py-3 border border-black">Status</th>
                    <th scope="col" className="px-6 py-3 border border-black">Payment Date</th>
                    <th scope="col" className="px-6 py-3 border border-black">Payment Mode</th>
                    <th scope="col" className="px-6 py-3 border border-black w-56">Company Bank Name</th>
                    <th scope="col" className="px-6 py-3 border border-black">Amount</th>
                    <th scope="col" className="px-6 py-3 border border-black">Bank Reference ID</th>
                    <th scope="col" className="px-6 py-3 border border-black">Remark</th>
                    <th scope="col" className="px-6 py-3 border border-black">Add Date</th>
                    <th scope="col" className="px-6 py-3 border border-black">Update Date</th>
                    <th scope="col" className="px-6 py-3 border border-black">Bond</th>
                    <th scope="col" className="px-6 py-3 border border-black">Company Remarks</th>
                  </tr>
                </thead>

                {showRow && (
                  <tbody>
                    {Array.isArray(allFundRequest) && allFundRequest.length > 0 ? (
                      allFundRequest.map((item, index) => (
                        <tr key={item.id} className='bg-white'>
                          <td className="px-6 py-3 border border-black">{index + 1}</td>
                          <td className="px-6 py-3 border border-black">{item.reference_number}</td>
                          <td className="px-6 py-3 border border-black">
                              {item.transaction_status_display === 'REINITIATE' ? (
                                <button onClick={() => handleEditClick(item)} className="px-4 py-2 bg-blue-500 text-white rounded-lg">Edit</button>
                              ) : (
                                <span>-</span>
                              )}
                          </td>
                          <td className="px-6 py-3 border border-black whitespace-nowrap">{item.transaction_status_display}</td>
                          <td className="px-4 py-3 border border-black whitespace-nowrap">{item.payment_date}</td>
                          <td className="px-6 py-3 border border-black whitespace-nowrap">{item.payment_mode_display}</td>
                          <td className="px-6 py-3 border border-black whitespace-nowrap">{item.bank_name}</td>
                          <td className="px-6 py-3 border border-black whitespace-nowrap">{item.amount}</td>
                          <td className="px-6 py-3 border border-black whitespace-nowrap">{item.bank_ref_number}</td>
                          <td className="px-6 py-3 border border-black whitespace-nowrap">{item.remark}</td>
                          <td className="px-6 py-3 border border-black whitespace-nowrap">On:{formatDate(item.add_date)} <br/>At:{formatTime(item.add_date)}</td>
                          <td className="px-6 py-3 border border-black whitespace-nowrap">On:{formatDate(item.lastupdate)} <br/>At:{formatTime(item.lastupdate)}</td>
                          <td className="px-6 py-3 border border-black whitespace-nowrap">
                            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg">Bond</button>
                          </td>
                          <td className="px-6 py-3 border border-black whitespace-nowrap">{item.payment_remark}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="14" className="text-center py-3 border border-black">No Fund Requests Found</td>
                      </tr>
                    )}
                  </tbody>
                )}

              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Fundreqreport;
