import React, { useState } from 'react'

const Balancetransfer = () => {

  const [amount, setamount] = useState();
  const [isVisible, setIsVisible] = useState(false);
  const [pin, settpin] = useState('');

  function isopen(){
    setIsVisible(true);
  }

  function isclose(){
    setIsVisible(false);
  }

  return (
    <div className='p-4'>
      <div className=' bg-gray-500 p-4 pb-6'>
      <h1 className='text-3xl font-black text-white border-b-4'>Balance Transfer </h1>
     {!isVisible && ( 
      <div>
          <div className='mt-4 flex gap-12'>
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
                <label className="mt-2 text-white text-2xl">Amount</label><br />
                <input className=" text-sm px-4 border border-solid border-gray-300 rounded" onChange={(e) => setamount(e.target.value)} type="number" placeholder="Enter Amount" />
              </div>
          </div>

          <div className='mt-4'>
            <button onClick={isopen} className=" bg-blue-600 hover:bg-blue-700 px-6 py-3 text-white uppercase rounded text-xl tracking-wider" type="submit">Send</button>
          </div>
          
      </div>  
     )}     
      
        

        {isVisible && (
          <div className="md:w-1/2 mt-4 bg-white rounded-xl max-w-sm shadow-lg shadow-white">
            <p className='text-xl text-center mb-4 font-bold'>Submit TPIN</p>
            <input onChange={(e) => settpin(e.target.value)} className="w-full text-xl px-4 py-2 border border-solid border-gray-300 rounded " type="password" placeholder="Enter TPIN" />
            
            <div className="justify-center gap-4 flex md:text-center">
              <button className="mt-4 bg-blue-600 hover:bg-blue-700 px-6 py-3 text-white uppercase rounded text-sm tracking-wider" type="submit">Submit</button>
              <button onClick={isclose} className="mt-4 bg-blue-600 hover:bg-blue-700 px-6 py-3 text-white uppercase rounded text-sm tracking-wider" type="submit">Cancel</button>
            </div>
          </div>
        )}
          
      
      </div>

    </div>
  )
}

export default Balancetransfer
