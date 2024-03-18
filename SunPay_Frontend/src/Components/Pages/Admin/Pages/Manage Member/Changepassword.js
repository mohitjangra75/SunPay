import React, { useState } from 'react'

const Changepassword = () => {

  const [id, setid] = useState();
  const [password, setpassword] = useState();

  return (
    <div className='p-4'>
      <div className=' bg-gray-500 p-4 pb-6 px-6'>
      <h1 className='text-3xl font-black text-white border-b-4'>Member Password Change</h1>
        <div className="mt-4 ">
            <div className='md:flex flex-wrap gap-12'>
                <div className='flex md:flex-wrap gap-8'>
                  <label className="mt-2 text-white text-2xl">Role</label><br/>
                    <select id="id" onChange={setid} className="w-72 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option selected>Select ID</option>
                        <option value="icicibnk">ICICI Bank(664005500851)</option>
                        <option value="sbibnk">State Bank of India(42057935640)</option>
                        <option value="pnbbnk">Punjab National Bank(6058002100002053)</option>
                        <option value="axisbnk">Axis Bank(923020043729544)</option>
                    </select>
                </div>

                <div className='flex md:flex-wrap gap-8'>
                  <label className="mt-2 text-white text-2xl">Enter Password</label><br/>
                  <input className=" text-xl px-4 border border-solid border-gray-300 rounded" onChange={(e) => setpassword(e.target.value)} type="password" placeholder="Enter Password" />
                </div>

                <div className='flex md:flex-wrap gap-8'>
                  <label className="mt-2 text-white text-2xl">Confirm Password</label><br/>
                  <input className=" text-xl px-4 border border-solid border-gray-300 rounded" onChange={(e) => setpassword(e.target.value)} type="password" placeholder="Re-Enter Password" />
                </div>

                <div className=''>
                  <button className="bg-blue-600 border border-white hover:bg-blue-950 px-6 py-3 text-white uppercase rounded text-sm tracking-wider" type="submit">Submit</button>
                </div>
            </div>

            
      </div>
    </div>
    </div>
  )
}

export default Changepassword
