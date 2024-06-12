import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { NavLink } from 'react-router-dom'


const ConfirmPayout = (props) => {

  const location = useLocation();
  const data = location.state;
  const navigate = useNavigate();

  const [currentuser, setcuruser] = useState({});
  const [register_with, setregister_with] = useState('');

  const fetchUser = async () => {
    try {
      const userresponse = await axios.get(`http://118.139.167.172/api/users/${props.data.id}`);
      const respuser = userresponse.data;
      setcuruser(respuser);
      const repusername = userresponse.data.username;
      setregister_with(repusername);
      setpayeeDetails(data)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [props.data.id]);

  const [tpin, setpin] = useState();
  const [payeeDetails, setpayeeDetails] = useState();
  const accno = data.accno
  const ifsc = data.ifsc
  const name = data.name
  const bankname = data.bankname

  const txn_type = data.txn_type
  const mobile = data.mobile
  const emailid = data.email
  const amount = parseInt(data.amount)
 
  const sendmoney = async() => {

    console.log('Payee details',payeeDetails)

      const today = new Date();
      const date = today.setDate(today.getDate()); 
      const defaultValue = new Date(date).toISOString().split('T')[0]

      const dd = String(today.getDate()).padStart(2, '0');
      const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
      const yy = String(today.getFullYear()).slice(-2);
      const hh = String(today.getHours()).padStart(2, '0');
      const min = String(today.getMinutes()).padStart(2, '0');
      const ss = String(today.getSeconds()).padStart(2, '0');

      const currentTime = `${dd}${mm}${yy}${hh}${min}${ss}`;


      const ref_id = register_with + accno +currentTime
      console.log('curruser',currentuser.id)
      const user_id = currentuser.id

        try {
          const bank_account_number = accno
          const bank_ifsc_code = ifsc
          const name_of_account_holder = name
          const email = emailid
          const phone = mobile
          
        const response = await fetch('http://118.139.167.172/api/zpayaddbank/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({bank_account_number, bank_ifsc_code, name_of_account_holder, email, phone}),
        });
          
        const sendresponse = await response.json();
        const respmessage = sendresponse.Message;
        const respdata = sendresponse.Response.data;
          
          if(respmessage=="Please fill details"){
            alert(respmessage)
          }
          else if (respmessage=="Beneficiary found and added" || respmessage === "Beneficiary already exists"){
            const beneficiary_id = respdata.id
            const mobile = respdata.phone
            const bene_name = respdata.name_of_account_holder
            const bank_acc_number = respdata.bank_account_number
            const bank_ifsc_code = respdata.bank_ifsc_code
            const merchant_reference_id = ref_id
            const payment_mode = txn_type
            const user_id = currentuser.id

            const monsendresp = await fetch('http://118.139.167.172/api/zpaytransfer/', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({beneficiary_id, amount, bank_acc_number, bank_ifsc_code, merchant_reference_id, payment_mode, user_id, tpin, mobile, bene_name}),
              });

              const moneyresponse = await monsendresp.json();
              console.log(moneyresponse)
              const senderror = moneyresponse.error;
              const transaction = moneyresponse.transaction
              if(senderror=="Insufficient Balance"){
                alert(senderror)
              }
              
              else if (senderror=="Please provide required fields"){
                alert(senderror) 
              }
              else if (senderror=="Invalid mobile number"){
                alert(senderror) 
              }
              else if (senderror=="Invalid tpin"){
                alert(senderror) 
              }
              if(moneyresponse.message=="Funds transferred successfully" || moneyresponse.message=="Transaction id Pending"){
                alert("Transaction successful")
                navigate('/member/moneytransferreceipt', {
                  state: {shopname:currentuser.shop_name, mobile:mobile, name:currentuser.name, date: currentTime, beneficiary:name_of_account_holder,accno:bank_acc_number, bankname:bankname, ifsc:bank_ifsc_code, transaction:transaction},
              });
              }
          }
          else if (respmessage=="Beneficiary not fetched"){
            alert("Unable to proceed") 
          }
          else{
            alert("Technical error!")
          } 
        }
        catch (error) {
          console.error('Error fetching data:', error);
        }
  }

  return (
    <div className='p-4'>
      <div className='bg-slate-300 p-2 border-2 px-6 border-red-200'>
      {/* Heading */}
      <div className='flex flex-wrap mt-4 md:gap-24'>
        <h1 className='font-black md:w-42'>Money Transfer</h1>
        <div className='w-28 font-black'>Sender</div>
        <div className='w-52 font-black'>Sender Mobile Number</div>
        <div className='w-52 font-black'>Merchant Code</div>

      </div>
      {/* Values */}
      <div className='flex flex-wrap gap-2 md:gap-24'>
          <div className='w-28 '>{txn_type}</div>
          <div className='w-28'>{currentuser?.shop_name || 'Loading...'}</div>
          <div className='w-52'>{currentuser?.mobile || 'Loading...'}</div>
          <div className='w-52'>{currentuser?.username || 'Loading...'}</div>
      </div>
      <br /><br />
      {/* Heading */}
      <div className='flex flex-wrap gap-2 bg-stone-600 text-white'>
        <div className='font-black md:w-36'>Beneficiary Name</div>
        <div className='md:w-40 font-black'>Account Number</div>
        <div className='md:w-40 font-black'>Bank</div>
        <div className='md:w-32 font-black'>IFSC Code</div>
        <div className='md:w-36 font-black'>Transfer Amount</div>
        <div className='md:w-40 font-black'>Transfer Type</div>
      </div>
      {/* Values */}
      <div className='flex flex-wrap gap-2 mt-2'>
        <div className='md:w-36'>{name}</div>
        <div className='md:w-40 '>{accno}</div>
        <div className='md:w-40 '>{bankname}</div>
        <div className='md:w-32 '>{ifsc}</div>
        <div className='md:w-36 '>₹ {amount}</div>
        <div className='md:w-40 '>{txn_type}</div>
      </div>
      
        <div className='md:flex md:flex-wrap mt-20 p-8 md:gap-16 justify-center border border-black'>
        <div className='border-2 p-3 border-slate-700'>
          <table className="w-full text-sm text-left rtl:text-right border border-black text-gray-500 dark:text-gray-400 border-collapse ">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                        </tr>
                          
                          <tr className='border text-center border-black'>
                            <th scope="col" className="px-6 py-3 font-black border border-black w-32">S.NO</th>
                            <th className='px-6 py-3 w-32 border border-black'>Amount</th>
                            <th className='px-6 py-3  border border-black w-32'>Charges</th>
                          </tr>
                </thead>
                      
                <tbody>
                          <tr className="bg-white border text-center border-black dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">                        
                            <td scope="col" className="px-6 py-3  border border-black">1</td>
                            <td scope="col" className="px-6 py-3  border border-black">Gourav</td>
                            <td scope="col" className="px-6 py-3  border border-black">Union</td>
                          </tr>
                </tbody>
          </table>
        </div>

        <div className='border-2 p-3 border-slate-700'>
            <div className='text-center '> 
            <h1 className='text-white text-2xl bg-red-400'>Enter TPIN</h1>
              <div className='flex'>
                <div className='border  p-4 align-middle border-black'>
                  MPIN :
                </div>
                <div className='border p-2 border-black'>
                  <input type="password" onChange={(e) => setpin(e.target.value)} className='rounded-lg text-lg'/>
                </div>
              </div>
              <div className='mt-4 flex gap-2'>
                {/* Money transfer final api */}
             
                <button onClick={sendmoney} className='border border-gray-300 text-white text-xl rounded-lg block p-2 px-6 mt-4 bg-blue-500 hover:text-red-600' type="submit">Submit</button>

              <NavLink to='/member/payoutDMT'>
                <button className='border border-gray-300 text-white text-xl rounded-lg block p-2 px-6 mt-4 bg-blue-500 hover:text-red-600' type="submit">Back</button>
              </NavLink>
              </div>
            </div>
        </div>
      </div>
    </div>
  </div> 
  )
}

export default ConfirmPayout
