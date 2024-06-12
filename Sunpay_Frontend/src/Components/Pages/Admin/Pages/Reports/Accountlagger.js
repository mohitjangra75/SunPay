import React, { useState, useEffect } from 'react';
import axios from 'axios';

const today = new Date();
const date = today.setDate(today.getDate());
const defaultValue = new Date(date).toISOString().split('T')[0];

const Accountlagger = (props) => {
  const [fromDate, setFromDate] = useState(defaultValue);
  const [toDate, setToDate] = useState(defaultValue);
  const [allwalltrans, setallwalltrans] = useState([]);
  const [showrow, setshowrow] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'fromDate') {
      setFromDate(value);
    } else if (name === 'toDate') {
      setToDate(value);
    }
  };

  const fetchpredetail = async () => {
    try {
      const userresponse = await axios.get(`http://118.139.167.172/api/users/${props.data.id}/`);
      const respuser = userresponse.data;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchpredetail(); // Fetch data when the component mounts
  }, []);

  const showalltrans = async () => {
    try {
      const transresp = await axios.get(`http://118.139.167.172/api/wallettransaction/6/`);
      const resptran = transresp.data.data;

      const filteredTrans = resptran.filter((item) => {
        const itemDate = new Date(item.add_date).toISOString().split('T')[0];
        return itemDate >= fromDate && itemDate <= toDate;
      });

      setallwalltrans(filteredTrans);
      setshowrow(true);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  return (
    <div>
      <div className='Accountlagger p-4'>
        <div className='bg-slate-300 p-2 mt-8 border-2 border-red-200'>
          <h1 className='font-bold text-2xl border-b-2 border-gray-400'>E-WALLET TRANSACTIONS</h1>
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
                  value={fromDate}
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
                  value={toDate}
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                />
              </div>
              {/* Submit button */}
              <div className="col-md-3">
                <label htmlFor=""></label><br />
                <input
                  type="submit"
                  name="submit"
                  onClick={showalltrans}
                  className='border border-gray-300 bg-blue-600 text-white text-sm rounded-lg block w-full p-2.5 hover:cursor-pointer'
                />
              </div>
            </div>
            <div className='mt-4'>
              <div className="relative overflow-x-auto shadow-md border-black">
                <table className="w-full text-sm text-left rtl:text-right mt-2 border border-black text-gray-500 dark:text-gray-400 border-collapse">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr className='border border-black'>
                      <th scope="col" className="px-6 py-3 border border-black" style={{ minWidth: '50px' }}>S.NO</th>
                      <th scope="col" className="px-6 py-3 border border-black" style={{ minWidth: '120px' }}>Date</th>
                      <th scope="col" className="px-6 py-3 border border-black" style={{ minWidth: '150px' }}>Transaction ID</th>
                      <th scope="col" className="px-6 py-3 border border-black" style={{ minWidth: '200px' }}>Narration</th>
                      <th scope="col" className="px-6 py-3 border border-black" style={{ minWidth: '100px' }}>Amount</th>
                      <th scope="col" className="px-6 py-3 border border-black" style={{ minWidth: '100px' }}>Charges</th>
                      <th scope="col" className="px-6 py-3 border border-black" style={{ minWidth: '100px' }}>Commission</th>
                      <th scope="col" className="px-6 py-3 border border-black" style={{ minWidth: '100px' }}>TDS</th>
                      <th scope="col" className="px-6 py-3 border border-black" style={{ minWidth: '150px' }}>Closing Balance</th>
                    </tr>
                  </thead>
                  {showrow && (
                    <tbody>
                      {allwalltrans.map((item, index) => (
                        <tr key={item.id} className='bg-white'>
                          <td className="px-6 py-3 border border-black">{index + 1}</td>
                          <td className="px-6 py-3 border border-black whitespace-nowrap">{item.add_date}</td>
                          <td className="px-6 py-3 border border-black whitespace-nowrap">{item.ref_id}</td>
                          <td className="px-6 py-3 border border-black whitespace-nowrap">{item.remark}</td>
                          <td className={`px-6 py-3 border border-black whitespace-nowrap ${item.transaction_direction_display === 'CREDIT' ? 'text-green-600' : item.transaction_direction_display === 'DEBIT' ? 'text-red-600' : ''}`}>₹{item.amount}</td>
                          <td className="px-6 py-3 border border-black whitespace-nowrap">₹{item.charge}</td>
                          <td className="px-6 py-3 border border-black whitespace-nowrap">₹{item.comission}</td>
                          <td className="px-6 py-3 border border-black whitespace-nowrap">₹{item.tds}</td>
                          <td className="px-6 py-3 border border-black whitespace-nowrap">₹{item.closing_balance}</td>
                        </tr>
                      ))}
                    </tbody>
                  )}
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accountlagger;
