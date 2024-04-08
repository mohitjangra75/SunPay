import React from 'react'

const Assignpackage = () => {
  return (
    <div className='p-4'>
      <div className=' bg-gray-500 p-4 pb-6'>
          <h1 className='text-3xl font-black text-white border-b-4'>Assign Package</h1>

          <div className='mt-4'>
            <div className='ml-6 flex gap-16 flex-wrap'>
            <div>
                <label htmlFor="id" className='text-2xl text-white mb-4'>Member ID</label>
                <select id="id" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option selected>Select ID</option>
                  <option value="icicibnk">ICICI Bank(664005500851)</option>
                  <option value="sbibnk">State Bank of India(42057935640)</option>
                  <option value="pnbbnk">Punjab National Bank(6058002100002053)</option>
                  <option value="axisbnk">Axis Bank(923020043729544)</option>
              </select>
            </div>

            <div>
                <label htmlFor="package" className='text-2xl text-white mb-4'>Select Package to assign</label>
                <select id="package" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option selected>Select Package</option>
                  <option value="icicibnk">ICICI Bank(664005500851)</option>
                  <option value="sbibnk">State Bank of India(42057935640)</option>
                  <option value="pnbbnk">Punjab National Bank(6058002100002053)</option>
                  <option value="axisbnk">Axis Bank(923020043729544)</option>
              </select>
            </div>

              <div className="">
                <label htmlFor="packagename" className='text-white text-xl'></label><br />
                <input type="submit" name="submit" className='border border-gray-300 bg-lime-800  text-white text-lg rounded-lg  block w-full py-1 mt-1.5 mx-4 hover:cursor-pointer hover:bg-blue-500'/>
              </div>  

            </div>
          </div>
        </div>
    </div>
  )
}

export default Assignpackage
