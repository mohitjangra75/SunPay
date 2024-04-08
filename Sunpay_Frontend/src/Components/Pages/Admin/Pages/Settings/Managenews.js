import React from 'react'

const Managenews = () => {

  function updatenews(e){

  }
  return (
    <div className='p-4'>
      <div className='bg-gray-500 p-4 pb-6'>
      <h1 className='text-3xl font-black text-white border-b-4'>Present News Details</h1>
            <div className='mt-4'>
                <table className=" text-sm text-left rtl:text-right mt-2 border border-black text-gray-500 dark:text-gray-400 border-collapse ">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr className='border border-black'>
                        <th scope="col" className="px-6 py-3 border border-black">Sr.No</th>
                        <th scope="col" className="px-6 py-3 border border-black">Level</th>
                        <th scope="col" className="px-6 py-3 border border-black">Description</th>
                        <th scope="col" className="px-6 py-3 border border-black">Status</th>
                        <th scope="col" className="px-6 py-3 border border-black">Add Date</th>
                      </tr>
                    </thead>
                  
                    <tbody>
                      <tr className="bg-white border border-black dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                          
                      </tr>
                    </tbody>
                 </table>
            </div>

            <div className='mt-4'>
            <h1 className='text-3xl font-black text-white border-b-4'>Update News Details</h1>
                <div className='mt-4 flex gap-4 flex-wrap'>
                  <label className="mt-2 text-white text-2xl">Enter News 1</label>
                  <textarea id="w3review" name="w3review" rows="4" cols="100"/>
                  <button onClick={updatenews} className=" bg-blue-600 hover:bg-blue-700 px-6 text-white uppercase rounded text-xl tracking-wider" type="submit">Add</button>

                </div>
                <div className='mt-4 flex gap-4 flex-wrap'>
                  <label className="mt-2 text-white text-2xl">Enter News 2</label>
                  <textarea id="w3review" name="w3review" rows="4" cols="100"/>
                  <button onClick={updatenews} className=" bg-blue-600 hover:bg-blue-700 px-6 text-white uppercase rounded text-xl tracking-wider" type="submit">Add</button>
                </div>
            </div>
      </div>
    </div>
  )
}

export default Managenews
