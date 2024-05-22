import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import './NewsTicker.css';
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
import Confirmmoneytransfer from '../../Confirmmoneytransfer';
import Moneytransferreceipt from '../../Moneytransferreceipt';
import Memberprofile from '../../Memberprofile';
import MemberSettings from '../../MemberSettings';
import Creditcard from '../../Creditcard';
import Electricity from '../../Electricity';
import Gas from '../../Gas';
import Broadband from '../../Broadband';
import Water from '../../Water';
import UPItransfer from '../../UPItransfer';
import Billpaymentreceipt from '../../Billpaymentreceipt';
import Prepaid from '../../Prepaid';
import Postpaid from '../../Postpaid';
import Fastag from '../../Fastag';
import Wallettransfer from '../../Wallettransfer';
import LIC from '../../LIC';
import DTH from '../../DTH'
import Educationfee from '../../Educationfee'
import Telephone from '../../Telephone'
import STV from '../../STV'
import Trafficchallan from '../../Trafficchallan'
import Digitalvoucher from '../../Digitalvoucher'
import Cable from '../../Cable'
import Datacard from '../../Datacard'
import Loanpayment from '../../Loanpayment'
import Mcdtollservics from '../../Mcdtollservics'
import Insurance from '../../Insurance'
import AddCustomer from '../../Addcustomer';
import Retailerregister from '../../Retailerregister';
import ConfirmPayout from '../../ConfirmPayout';

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
     <div className='flex w-full gap-1 overflow-visible bg-black'>
        <div className='bg-red-600 w-1/2 text-2xl md:mt-[90px] text-center text-black '>
            News HeadLine
          </div>
          <div className='bg-red-600 w-1/2 text-2xl md:mt-[90px] text-center text-black news-ticker '>
            <p className='animate-scroll-left-to-right news-ticker-content'> Small News HeadLine</p>
          </div>
     </div>
      <div className='main h-screen w-full gap-2 flex flex-1'>
        <aside className='sticky top-0'>
          <Sidebar data={data}/>
        </aside>

        <div className={`main w-full overflow-scroll scrollbar-hide z-10`}>
          {category === 'dashboard' && <Main data={data}/>}
          {category === 'createretailer' && (<Retailerregister data={data}/>)}
          {category === 'profile' && <Memberprofile data={data} />}
          {category === 'fund-request' && <Fundrequest data={data} />}
          {category === 'reports' && <Reports data={data} />}
          {category === 'payoutDMT' && <Payout data={data} />}
          {category === 'confirmpayout' && <ConfirmPayout data={data} />}
          {category === 'accountlagger' && <Accountlagger data={data} />}
          {category === 'complaints' && <Complaint data={data} />}
          {category === 'settings' && <MemberSettings data={data} />}
          {category === 'aeps-history' && <AEPSreport data={data} />}
          {category === 'dmt-history' && <DMTreport data={data} />}
          {category === 'payout-report' && <Payoutreport data={data} />}
          {category === 'recharge-history' && <Rechargeutilityreport data={data} />}
          {category === 'moneytransfer' && <Moneytransfer data={data} />}
          {category === 'wallet-to-wallet' && <Wallettransfer data={data} />}
          {category === 'moneytransferreceipt' && (<Moneytransferreceipt data={data}/>)}
          {category === 'credithistory' && <Creditcard data={data} />}
          {category === 'addcustomer' && (<AddCustomer data={data}/>)}
          {category === 'addnewbeneficiary' && (<Addbeneficiary data={data}/>)}
          {category === 'electricity' && (<Electricity data={data}/>)}
          {category === 'water' && (<Water data={data}/>)}
          {category === 'lic' && (<LIC data={data}/>)}
          {category === 'gas' && (<Gas data={data}/>)}          
          {category === 'broadband' && (<Broadband data={data}/>)}
          {category === 'dth' && (<DTH data={data}/>)}
          {category === 'voucher' && (<Digitalvoucher data={data}/>)}
          {category === 'telephone' && (<Telephone data={data}/>)}
          {category === 'fee' && (<Educationfee data={data}/>)}
          {category === 'stv' && (<STV data={data}/>)}
          {category === 'traffic_challan' && (<Trafficchallan data={data}/>)}
          {category === 'cable' && (<Cable data={data}/>)}
          {category === 'datacard' && (<Datacard data={data}/>)}
          {category === 'loanrepayment' && (<Loanpayment data={data}/>)}
          {category === 'mcdtax' && (<Mcdtollservics data={data}/>)}
          {category === 'insurance' && (<Insurance data={data}/>)}
          {category === 'upi-transfer' && <UPItransfer data={data} />}
          {category === 'confirmdmt' && <Confirmmoneytransfer data={data} />}
          {category === 'billpayreceipt' && <Billpaymentreceipt data={data} />}
          {category === 'upireceipt' && <Billpaymentreceipt data={data} />}
          {category === 'prepaid' && <Prepaid data={data} />}
          {category === 'postpaid' && <Postpaid data={data} />}
          {category === 'fastag' && <Fastag data={data} />}
        </div>
      </div>

      
    </div>
  );
};

export default MemberRouter;
