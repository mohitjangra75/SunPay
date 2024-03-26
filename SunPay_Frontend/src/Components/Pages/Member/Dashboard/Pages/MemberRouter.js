import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Navbar from '../DashboardComponents/Navbar/Navbar';
import Sidebar from '../DashboardComponents/Sidebar/Sidebar';
import Main from '../DashboardComponents/Main/Main';
import Fundrequest from '../../Fundrequest';
import Reports from '../../Reports';
import Accountlagger from '../../Accountlagger';
import Payout from '../../Payout';
import Payoutreport from '../../Payout-DMT';
import Complaint from '../../Complaint';
import AEPSreport from '../../AEPSreport';
import DMTreport from '../../DMTreport';
import Rechargeutilityreport from '../../Rechargeutilityreport';
import Moneytransfer from '../../Moneytransfer';
import Addbeneficiary from '../../Addbeneficiary';
import poster from '../DashboardComponents/Data/imgs/poster.png';
import Confirmmoneytransfer from '../../Confirmmoneytransfer';
import Moneytransferreceipt from '../../Moneytransferreceipt';
import Memberprofile from '../../Memberprofile';
import MemberSettings from '../../MemberSettings';
import Creditcard from '../../Creditcard';
import Electricity from '../../Electricity';
import Water from '../../Water';
import UPItransfer from '../../UPItransfer';
import Billpaymentreceipt from '../../Billpaymentreceipt';
import Prepaid from '../../Prepaid';
import Postpaid from '../../Postpaid';
import Fastag from '../../Fastag';

const MemberRouter = (props, {IsLoggedIn}) => {
  // const location = useLocation();
  // const [datall, setDatall] = useState(location?.state?.data);
  // console.log('Data from Member router', datall);
  
  const { category } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    // Function to fetch data from local storage or any other source
    const fetchData = () => {
      // Example: fetching from local storage
      const storedData = localStorage.getItem('apiData');
      if (storedData) {
        setData(JSON.parse(storedData));
      }
    };

    fetchData(); // Fetch data when component mounts
  }, []); // Empty dependency array means this effect runs only once after the initial render


  // useEffect(() => {
  //   setDatall(location?.state?.data);
  //   console.log('dataall', dataall);
  // }, []);



  return (
    
    <div className='bg-slate-50'>
      {console.log('Localstorage', data)
}
      <div className=''>
        <Navbar data={data}/>
      </div>
      <div className='bg-red-600 max-w-[2300px] text-2xl md:mt-[90px] text-center text-black '>
        News HeadLine
      </div>
      <div className='bg-red-600 max-w-[2300px] border-2 border-black text-center text-black '>
        Small News HeadLine
      </div>
      <div className='main h-screen w-full flex flex-1'>
        <aside className='sticky top-0'>
          <Sidebar data={data}/>
        </aside>

        <div className={`main w-full overflow-scroll scrollbar-hide z-10`}>
          {category === 'dashboard' && <Main data={data}/>}
          {category === 'profile' && <Memberprofile data={data} />}
          {category === 'fund-request' && <Fundrequest data={data} />}
          {category === 'reports' && <Reports data={data} />}
          {category === 'payoutDMT' && <Payout data={data} />}
          {category === 'accountlagger' && <Accountlagger data={data} />}
          {category === 'complaints' && <Complaint data={data} />}
          {category === 'settings' && <MemberSettings data={data} />}
          {category === 'aeps-history' && <AEPSreport data={data} />}
          {category === 'dmt-history' && <DMTreport data={data} />}
          {category === 'payout-report' && <Payoutreport data={data} />}
          {category === 'recharge-history' && <Rechargeutilityreport data={data} />}
          {category === 'moneytransfer' && <Moneytransfer data={data} />}
          {category === 'moneytransferreceipt' && (<Moneytransferreceipt data={data}/>)}
          {category === 'credithistory' && <Creditcard data={data} />}
          {category === 'addnewbeneficiary' && (<Addbeneficiary data={data}/>)}
          {category === 'electricity' && (<Electricity data={data}/>)}
          {category === 'water' && (<Water data={data}/>)}
          {category === 'upi-transfer' && <UPItransfer data={data} />}
          {category === 'confirmdmt' && <Confirmmoneytransfer data={data} />}
          {category === 'billpayreceipt' && <Billpaymentreceipt data={data} />}
          {category === 'upireceipt' && <Billpaymentreceipt data={data} />}
          {category === 'prepaid' && <Prepaid data={data} />}
          {category === 'postpaid' && <Postpaid data={data} />}
          {category === 'fastag' && <Fastag data={data} />}


        </div>
      </div>

      {/* Latest Notification */}
      <div className='mt-4  text-center px-2 text-xl text-white bg-yellow-600'>
        Latest Notification
      </div>

      {/* Posters */}
      <div className='poster p-8 border-2 m-2 border-gray-400 mt-8'>
        <div className='border-2'>
          <img src={poster} className='w-full' alt='' />
        </div>
      </div>
    </div>
  );
};

export default MemberRouter;
