import React from 'react'

const Packageset = () => {
  return (
    <div>
      <div className='p-4'>
        
        {/* Set package */}
        <div className=' bg-gray-500 p-4 pb-6'>
          <h1 className='text-3xl font-black text-white border-b-4'>Create Package</h1>

          <div className='mt-4'>
            <div className='ml-6 flex gap-16 flex-wrap'>
              <div className="">
                <label htmlFor="packagename" className='text-white text-xl'>Name of Package :</label><br />
                <input type="text" name="packagename" className=' bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-white focus:border-blue-500 block w-full py-1 mt-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'/>
              </div>

              <div className="">
                <label htmlFor="packagename" className='text-white text-xl'>Set Surcharge :</label><br />
                <input type="text" name="surcharge" className=' bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-white focus:border-blue-500 block w-full py-1 mt-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'/>
              </div>

              <div className="">
                <label htmlFor="packagename" className='text-white text-xl'></label><br />
                <input type="submit" name="submit" className='border border-gray-300 bg-lime-800  text-white text-lg rounded-lg  block w-full py-1 mt-1.5 mx-4 hover:cursor-pointer hover:bg-blue-500'/>
              </div>  

            </div>
          </div>
        </div>

        {/* Update/Delete package */}
        <div className=' bg-gray-500 mt-8 p-4 pb-6'>
          <h1 className='text-3xl font-black text-white border-b-4'>Modify Package</h1>

          <div className='mt-4'>
          <div className =" relative overflow-x-auto shadow-md border-black">
                 <table className="w-full text-sm text-left rtl:text-right mt-2 border border-black text-gray-500 dark:text-gray-400 border-collapse ">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr className='border text-lg border-black'>
                      <th scope="col" className="px-6 py-3 border border-black">S.No</th>
                      <th scope="col" className="px-6 py-3 border border-black">Package Name</th>
                      <th scope="col" className="px-6 py-3 border border-black">Update Surcharge</th>
                      <th scope="col" className="px-6 py-3 border border-black">Delete Package</th>
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

export default Packageset
