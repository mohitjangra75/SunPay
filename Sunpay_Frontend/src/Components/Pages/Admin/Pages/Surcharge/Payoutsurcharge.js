import React from 'react'
import { useState } from 'react';

const Payoutsurcharge = () => {
  const [pack, setpack] = useState();
  const [startvalue, setstartvalue] = useState();
  const [endvalue, setendvalue] = useState();
  const [surcharge, setsurcharge] = useState();
  const [flat, setflat] = useState();
  const [cashback, setcashback] = useState();

  return (
    <div className='p-4'>
        <div className=' bg-gray-500 p-4 pb-6 px-6'>
          <h1 className='text-3xl font-black p-0 text-white border-b-4'>Set/Update Payout Surcharge</h1>
            <div className='mt-4 flex gap-4 border-b-2 pb-4'>
            <label className="mt-2 text-white w-40 text-2xl">Member ID</label><br/>
            <select id="id" onChange={setpack} className="bg-gray-50 border border-gray-300  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option selected>Select Package</option>
                <option value="icicibnk">ICICI Bank(664005500851)</option>
                <option value="sbibnk">State Bank of India(42057935640)</option>
                <option value="pnbbnk">Punjab National Bank(6058002100002053)</option>
                <option value="axisbnk">Axis Bank(923020043729544)</option>
            </select>
            </div>

        <div className='mt-4 border-b-2 pb-4'>
              <div className =" relative overflow-x-auto shadow-md border-black ">    
                <table className=" text-sm text-left rtl:text-right mt-2 border border-black text-gray-500 dark:text-gray-400 border-collapse ">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr className='border border-black'>
                      <th scope="col" className="px-6 py-3 border border-black">S.No.</th>
                      <th scope="col" className="px-6 py-3 border border-black">Package</th>                      
                      <th scope="col" className="px-6 py-3 border border-black">Start Range</th>
                      <th scope="col" className="px-6 py-3 border border-black">End Range</th>
                      <th scope="col" className="px-6 py-3 border border-black">Surcharge</th>
                      <th scope="col" className="px-6 py-3 border border-black">Is Surcharge Flat</th>
                      <th scope="col" className="px-6 py-3 border border-black">Company</th>
                      <th scope="col" className="px-6 py-3 border border-black">Is Company Flat</th>
                      <th scope="col" className="px-6 py-3 border border-black">Distributor</th>
                      <th scope="col" className="px-6 py-3 border border-black">Is Distributor Flat</th>
                      <th scope="col" className="px-6 py-3 border border-black">Add Date</th>
                      <th scope="col" className="px-6 py-3 border border-black">Update Date</th>
                      <th scope="col" className="px-6 py-3 border border-black">Action</th>
                      </tr>
                    </thead>
                  
                    <tbody>
                      <tr className="bg-white border border-black dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                          
                      </tr>
                    </tbody>
               </table>
              </div> 
        </div>

        <div className='mt-4 flex flex-wrap gap-16 border-b-2 pb-4'>
            <div classname='flex gap-8'>
                <label className="mt-2 text-white text-2xl">Start Range</label><br />
                <input className=" text-sm px-4 border border-solid border-gray-300 rounded" onChange={(e) => setstartvalue(e.target.value)} type="number" placeholder="Enter Start Value" />
            </div>

            <div classname='flex gap-8'>
                <label className="mt-2 text-white text-2xl">End Range</label><br />
                <input className=" text-sm px-4 border border-solid border-gray-300 rounded" onChange={(e) => setendvalue(e.target.value)} type="number" placeholder="Enter End Value" />
            </div>

            <div classname='flex gap-8'>
                <label className="mt-2 text-white text-2xl">Surcharge</label><br />
                <input className=" text-sm px-4 border border-solid border-gray-300 rounded" onChange={(e) => setsurcharge(e.target.value)} type="number" placeholder="Enter Surcharge" />
            </div>

            <div classname='flex gap-8'>
                <label className="mt-2 text-white text-2xl">Is Surcharge Flat</label><br />
                <input className=" text-2xl px-4 border border-solid border-gray-300 py-4 rounded" onChange={(e) => setflat(e.target.value)} type="checkbox" placeholder="Enter Surcharge" />
            </div>

            <div classname='flex gap-8'>
                <label className="mt-2 text-white text-2xl">Company</label><br />
                <input className=" text-sm px-4 border border-solid border-gray-300 rounded" onChange={(e) => setsurcharge(e.target.value)} type="number" placeholder="Enter Surcharge" />
            </div>

            <div classname='flex gap-8'>
                <label className="mt-2 text-white text-2xl">Is Company Flat</label><br />
                <input className=" text-2xl px-4 border border-solid border-gray-300 py-4 rounded" onChange={(e) => setflat(e.target.value)} type="checkbox" placeholder="Enter Surcharge" />
            </div>

            <div classname='flex gap-8'>
                <label className="mt-2 text-white text-2xl">Distributor</label><br />
                <input className=" text-sm px-4 border border-solid border-gray-300 rounded" onChange={(e) => setsurcharge(e.target.value)} type="number" placeholder="Enter Surcharge" />
            </div>

            <div classname='flex gap-8'>
                <label className="mt-2 text-white text-2xl">Is Distributor Flat</label><br />
                <input className=" text-2xl px-4 border border-solid border-gray-300 py-4 rounded" onChange={(e) => setflat(e.target.value)} type="checkbox" placeholder="Enter Surcharge" />
            </div>

            <div classname='flex gap-8'>
                <label className="mt-2 text-white text-2xl">Cashback</label><br />
                <input className=" text-sm px-4 border border-solid border-gray-300 rounded" onChange={(e) => setcashback(e.target.value)} type="number" placeholder="Enter Surcharge" />
            </div>
            <div classname='flex gap-8'>
                <label className="mt-2 text-white text-2xl">Is Cashback Flat</label><br />
                <input className=" text-2xl px-4 border border-solid border-gray-300 py-4 rounded" onChange={(e) => setflat(e.target.value)} type="checkbox" placeholder="Enter Surcharge" />
            </div>
            <div className='mt-4'>
            <button className=" bg-blue-600 hover:bg-blue-700 px-6 py-3 border border-white text-white uppercase rounded text-xl tracking-wider" type="submit">Update</button>
          </div>
        </div>
        </div>
    </div>
  )
}

export default Payoutsurcharge
