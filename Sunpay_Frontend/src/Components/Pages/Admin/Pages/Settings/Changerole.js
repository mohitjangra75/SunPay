import React from 'react'

const Changerole = () => {
  function rolechange(e){

  }
  return (
    <div className='p-4'>
      <div className='bg-gray-500 p-4 pb-6'>
          <select id="paymentmode" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option selected>Select ID</option>
            <option value="neftrtgs">Employee</option>
            <option value="cheque">Retailer</option>
            <option value="cash">Super Admin</option>
            <option value="upi">Distributor</option>
          </select>

          <select id="paymentmode" className="mt-6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option selected>Select Role</option>
            <option value="neftrtgs">Employee</option>
            <option value="cheque">Retailer</option>
            <option value="cash">Super Admin</option>
            <option value="upi">Distributor</option>
          </select>

          <button onClick={rolechange} className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded-lg text-lg tracking-wider" type="submit">Update</button>

      </div>
      
    </div>
  )
}

export default Changerole
