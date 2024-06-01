import React from 'react'
import { useState, useEffect } from 'react';
import { NavLink, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { AiFillDelete } from "react-icons/ai";
import { AiOutlineCheckSquare } from "react-icons/ai";

const Moneytransfer = (props) => {
  const [isShown, setIsShown] = useState(false);
  const navigate = useNavigate();
 
  const handleClick = event => {
    setmobile('');
    setIsShown(current => !current);
  }

  const fetchUser = async () => {
    try {
      const userresponse = await axios.get(`http://118.139.167.172/api/users/${props.data.id}`);
      const respuser = userresponse.data
      const repusername = userresponse.data.username;
      setregister_with(repusername);
      setcuruser(respuser)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchUser(); // Fetch data when the component mounts
  }, []);
 

  const handlesearchbymob = async (e) => {
    if (mobile_number) {
        try {
            const response = await fetch('http://118.139.167.172/api/get_customer/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ mobile_number,register_with }),
            });
            const result = await response.json(); // Parse JSON response
            const resultmessage = result.message; // Extract message from parsed JSON data
            
            if (resultmessage === "Customer found" || resultmessage ==="Customer created from paysprint") {
                try {
                    const detbene = await fetch('http://118.139.167.172/api/fetch_beneficiary/', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ mobile_number }),
                    });
                    const benfetresp = await detbene.json();
                    console.log(benfetresp)
                    const custbank = benfetresp.data;
                    console.log(custbank)
                    setallfetbank(custbank)
                    if (custbank){
                      setIsShown(current => !current);
                    }
                    // if (benfetresp.message === 'Customer found') {
                    //     setIsShown(current => !current);
                    // } else {
                    //     alert("Customer not found. Register first.", benfetresp.message);
                    // }
                } catch (error) {
                  alert('Technical Error')
                }
            } 
            else {
                alert("Customer not found. Register first.");
                const paysstateresp = result.response.data.stateresp
                if (resultmessage === "Customer not found. Paysprint also doesn't have the customer.")
                  navigate('/member/addcustomer', {
                    state: { number: mobile_number,stateresp: paysstateresp},
                });
            }
        } catch (error) {
        }
    } else {
        alert('Kindly Provide Mobile Number');
    }
}

const handleimpsbtnclick = async (index) => {

    const payeeDetails = allfetbank[index];

    const bene_id = payeeDetails.bene_id
    const txn_type = 'IMPS'
    const mobile = mobile_number
    const pipe = "bank1"
    const surcharge = 20
    const accno = payeeDetails.accno
    const bankid = payeeDetails.bankid
    const bankname = payeeDetails.bankname
    const ifsc = payeeDetails.ifsc
    const name = payeeDetails.name

    


    setpayeebank(allfetbank[index])

    console.log(payeeDetails)
    console.log(bene_id)
    console.log(txn_type)
    console.log(amount)
    console.log(pipe)
    console.log(mobile)

    if (amount){
      navigate('/member/confirmdmt', {
        state: {payeee: payeeDetails, bene_id: bene_id, accno: accno, ifsc:ifsc, name:name, bankid:bankid, bankname, txn_type:txn_type, mobile:mobile_number, amount:amount, pipe:pipe, surcharge:surcharge},
    });
    }
    else{
      alert('Kindly Enter amount')
    }
    
  
}

  const addbeneficiary = event => {
    navigate('/member/addnewbeneficiary', {
      state: { number: mobile_number },
  });
  }
  

  const handlesearchbyacc = async (e) => {
    try {
        const accountNumber = account;
        console.log(accountNumber);
        
        const response = await fetch(`http://118.139.167.172/api/get_linked_account/?account_number=${accountNumber}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
            const resp = await response.json(); // Await the promise to get the resolved data
            const respmessage = resp.Message
            console.log(respmessage);
            const custbank = resp.Response
            console.log(custbank);

        if (response.ok) {
            if (respmessage==="Account Found"){
              setallfetbank(custbank)
              setIsShown(current => !current);
            }
        }
        else {
            alert('Error fetching account:',accountNumber);
        }
    } catch (error) {
        alert('Technical Error');
        console.error('Technical Error:', error); // Log the error for debugging purposes
    }
};


  const [mobile_number,setmobile] = useState('')
  const [register_with, setregister_with]=useState()
  const [currentuser, setcuruser] = useState();
  const [account,setaccount] = useState('')
  const [allfetbank, setallfetbank] =  useState()
  const [amount, setamount] =  useState()
  const [dataall, setDatall] = useState(); 
  const [payeebankdetails, setpayeebank] = useState(); 

  return (
    <div>
      <div className='moneytransfer p-4'>  

      {!isShown && (
        <div className='bg-slate-300 flex gap-4 p-2 border-2 border-red-200'>
            <label htmlFor=''>Enter Customer Mobile Number</label>
           <div className='md:flex gap-8'>
            <input type="text" name="remarks" placeholder='Enter Mobile Number' onChange={(e) => setmobile(e.target.value)} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 hover:cursor-pointer dark:focus:border-blue-500'/>
            <input type="submit" value="Submit" onClick={handlesearchbymob} className='p-2 bg-white border border-black hover:bg-blue-700 hover:text-white rounded-lg'/>
           </div>

              <b className='text-2xl'>OR</b>

           <label htmlFor=''>Enter Account Number</label>
           <div className='md:flex gap-8'>
            <input type="text" name="remarks" placeholder='Enter Account Number' onChange={(e) => setaccount(e.target.value)} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 hover:cursor-pointer dark:focus:border-blue-500'/>
            <input type="submit" value="Submit" onClick={handlesearchbyacc}  className='p-2 bg-white border border-black hover:bg-blue-700 hover:text-white rounded-lg'/>
           </div>  
        </div>

        
      )}

      {isShown && (
        <div className='bg-slate-300 p-2 border-2 border-red-200'>
            <div className='flex flex-wrap md:ml-6'>
              <input type="submit" value="Back" onClick={handleClick}  className=' text-lg px-2 bg-white border border-black hover:bg-blue-700 hover:text-white hover:cursor-pointer rounded-md'/>
              <div className='flex gap-3 md:ml-8'>
                  <input type='number' name="accountsearch" placeholder='Enter Account Number' className='md:ml-20 max-sm: p-1 rounded-md sm:ml-10' id="" />
                  <input type="submit" value="Search" className='text-lg px-2 md:ml-2 bg-white border border-black hover:bg-blue-700 hover:text-white hover:cursor-pointer rounded-md'/>
              </div>
              <div>
                <button type="submit" onClick={addbeneficiary} className='text-lg md:ml-36 px-2 bg-white border border-black hover:bg-blue-700 hover:text-white hover:cursor-pointer rounded-md'>
                  Add New
                </button>
              </div>
            </div>

            <div className='beneficiarylist '>
              <h1 className='bg-green-800 mt-6 text-white text-2xl md:pl-4 p-1'>Beneficiary List</h1>
              <div className =" relative overflow-x-auto shadow-md border-black ">
                 {/* <table className="w-full text-sm text-left rtl:text-right border border-black text-gray-500 dark:text-gray-400 border-collapse ">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr className='border text-center border-black'>
                        <th scope="col" className="px-6 py-3 font-black border border-black">SNO</th>
                          <th className='px-6 py-3  border border-black'>Beneficiary Name</th>
                          <th className='px-6 py-3  border border-black'>Bank</th>
                          <th className='px-6 py-3  border border-black'>Account No.</th>
                          <th className='px-6 py-3  border border-black'>IFSC</th>
                          <th className='px-6 py-3  border border-black'>Amount</th>
                          <th className='px-6 py-3  border border-black'>Mode</th>
                          <th className='px-6 py-3  border border-black'>Action</th>
                      </tr>
                    </thead>
                  
                    <tbody>
                      {/* <tr className="bg-white border text-center border-black dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">                        
                        <td scope="col" className="px-6 py-3  border border-black"></td>
                        <td scope="col" className="px-6 py-3  border border-black">Gourav</td>
                        <td scope="col" className="px-6 py-3  border border-black">Union</td>
                        <td scope="col" className="px-6 py-3  border border-black">2300020213</td>
                        <td scope="col" className="px-6 py-3  border border-black">UBIN01515</td>
                        <td scope="col" className="px-6 py-3  border border-black">5000</td>
                        <td scope="col" className="px-6 py-3  border border-black"> <NavLink to='/member/confirmdmt'><button type="submit" className='border bg-blue-700 text-white border-white px-1'>IMPS</button><button type="submit" className='border ml-2 bg-blue-700 text-white border-white px-1'>NEFT</button></NavLink></td>
                        <td scope="col" className="px-6 py-3  border border-black"><div className='flex gap-2 text-2xl'><AiFillDelete className='hover:cursor-pointer'/> <AiOutlineCheckSquare className='hover:cursor-pointer'/></div></td>
                      </tr> 
                          
                    </tbody>
                 </table>*/}
                  <table className="w-full text-sm text-left rtl:text-right border border-black text-gray-500 dark:text-gray-400 border-collapse ">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr className='border text-center border-black'>
                          <th className='px-6 py-3  border border-black'>SNO</th>
                          <th className='px-6 py-3  border border-black'>Beneficiary Name</th>
                          <th className='px-6 py-3  border border-black'>Bank</th>
                          <th className='px-6 py-3  border border-black'>Account No.</th>
                          <th className='px-6 py-3  border border-black'>IFSC</th>
                          <th className='px-6 py-3  border border-black'>Amount</th>
                          <th className='px-6 py-3  border border-black'>Mode</th>
                          <th className='px-6 py-3  border border-black'>Action</th>
                      </tr>
                    </thead>

                      <tbody>
                        {allfetbank.map((item, index) => (
                          <tr key={index} className="bg-white border text-center border-black dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td scope="col" className="px-6 py-3  border border-black">{index+1}</td>
                            <td scope="col" className="px-6 py-3  border border-black">{item.beneficiary_name}</td>
                            <td scope="col" className="px-6 py-3  border border-black">{item.bank_name}</td>
                            <td scope="col" className="px-6 py-3  border border-black">{item.account_number}</td>
                            <td scope="col" className="px-6 py-3  border border-black">{item.ifsc_code}</td>
                            <td scope="col" className="px-6 py-3  border border-black">            
                                <input type="number" placeholder='Amount' onChange={(e) => setamount(e.target.value)} className=' border border-gray-300 text-gray-900 text-sm rounded-lg p-2 hover:cursor-pointer dark:focus:border-blue-500'/>
                            </td>
                            <td scope="col" className="px-6 py-3  border border-black"> <button type="submit" onClick={() => handleimpsbtnclick(index)} className='border bg-blue-700 text-white border-white px-1'>IMPS</button><button type="submit" className='border ml-2 bg-blue-700 text-white border-white px-1'>NEFT</button></td>
                            <td scope="col" className="px-6 py-3  border border-black"><div className='flex gap-2 text-2xl'><AiFillDelete className='hover:cursor-pointer'/> <AiOutlineCheckSquare className='hover:cursor-pointer'/></div></td>
                          </tr>
                        ))}
                      </tbody>
                  </table>
                
                </div>
            </div>

            <div className='confirmpayment'>
              <div className='flex'>
                
              </div>
            </div>
        </div>
      )

      }
    </div>
  </div>
  )
}

export default Moneytransfer

