import React, { useEffect, useState } from 'react'

const Addbeneficiary = (props) => {
  
  const [dataall, setDatall] = useState(); 
  const [beneficiary_name,setbeneficiary_name] = useState();
  const [account_number, setaccount_number] = useState();
  const[ifsc_code, setifsc] = useState();
  const [mobile_number, setmobile_number] = useState();
  const [bank_id, set_bankid] = useState();
  const [pin_code,setpincode] = useState();
  const [address, setadd] = useState();
  const [dob, setdob] = useState();

  const [banks, setbanks] = useState();
  const [name, setname] = useState();
  
    useEffect(() => {
      setDatall(props.data);
      const fetchData = async () => {
        try {
          // Fetch data from your backend API
          const response = await fetch(`https://new.sunpay.co.in/api/get_banks/`);
          if (!response.ok) {
            throw new Error('Failed to fetch data');
          }
          const data = await response.json();
          
          setbanks(data.banks);
          console.log(banks)
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchData();
    },[]);

  return (
    <div className='Addbeneficiary p-4'>
        <div className='bg-slate-300 p-2 border-2 border-red-200'>
          <h1 className=' font-bold text-2xl border-b-2 border-gray-400'>FUND REQUEST</h1>

          <div >
          <form  className='md:flex md:flex-wrap md:gap-8 mt-4'>
              {/* Bank Select */}
              <div>
                <label htmlFor="banks" className='text-lg'>Select a Bank</label>
                <select id="banks" required onChange={(e) => setbanks(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option selected>Bank List</option>
                  {banks.map(option => (
                    <option key={option.bank_name} value={option.account_no}>
                          {option.bank_name}  {option.account_no}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Account No */}
              <div className="col-md-3">
                <label htmlFor="Account no">Account No</label>
                <input type="text" required onChange={(e) => setaccount_number(e.target.value)} name="Amount" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'/>
              </div>

              {/* IFSC code */}
              <div className="col-md-3">
                <label htmlFor="Account no">IFSC Code</label>
                <input type="text" required onChange={(e) => setaccount_number(e.target.value)} name="Amount" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'/>
              </div>

              {/* IFSC code */}
              <div className="col-md-3">
                <label htmlFor="Account no">IFSC Code</label>
                <input type="text" required onChange={(e) => setaccount_number(e.target.value)} name="Amount" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'/>
              </div>

              {/* Submit button */}
              <div className="col-md-3">
                <label htmlFor=""></label><br />
                <button type="submit" name="submit" className='border border-gray-300 bg-blue-600 text-white text-sm rounded-lg  block w-full p-2.5 hover:cursor-pointer'>Save</button>
              </div>
              </form>
        </div>
        </div>
    </div>

  )
}

export default Addbeneficiary
