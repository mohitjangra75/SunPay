import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Navbar from '../DashboardComponents/Navbar/Navbar';
import Sidebar from '../DashboardComponents/Sidebar/Sidebar';
import Main from '../DashboardComponents/Main/Main';
import Fundrequest from '../../Fundrequest';
import Reports from '../../Reports';
import Accountlagger from '../../Accountlagger';
import Payout from '../../Payout-DMT';
import Complaint from '../../Complaint';
import AEPSreport from '../../AEPSreport';
import DMTreport from '../../DMTreport';
import Recharge from '../../Recharge';
import Moneytransfer from '../../Moneytransfer';
import Addbeneficiary from '../../Addbeneficiary';
import poster from '../DashboardComponents/Data/imgs/poster.png';
import Confirmmoneytransfer from '../../Confirmmoneytransfer';
import Moneytransferreceipt from '../../Moneytransferreceipt';
import Memberprofile from '../../Memberprofile';
import MemberSettings from '../../MemberSettings';

const MemberRouter = (props) => {
  const location = useLocation();
  const [dataall, setDatall] = useState(location?.state?.data);
  console.log('Data from Member router', dataall);
  const { category } = useParams();

  useEffect(() => {
    setDatall(location?.state?.data);
    console.log('dataall', dataall);
  }, []);

  return (
    <div className='bg-slate-50'>
      <div className=''>
        <Navbar data={dataall}/>
      </div>
      <div className='bg-red-600 max-w-[2300px] text-2xl md:mt-[90px] text-center text-black '>
        News HeadLine
      </div>
      <div className='bg-red-600 max-w-[2300px] border-2 border-black text-center text-black '>
        Small News HeadLine
      </div>
      <div className='main h-screen max-w-[2300px] flex flex-1'>
        <aside className='sticky top-0'>
          <Sidebar data={dataall}/>
        </aside>

        <div className={`main overflow-scroll scrollbar-hide z-10`}>
          {category === 'dashboard' && <Main data={dataall}/>}
          {category === 'profile' && <Memberprofile data={dataall} />}
          {category === 'fund-request' && <Fundrequest data={dataall} />}
          {category === 'reports' && <Reports data={dataall} />}
          {category === 'payoutDMT' && <Payout data={dataall} />}
          {category === 'accountlagger' && <Accountlagger data={dataall} />}
          {category === 'complaints' && <Complaint data={dataall} />}
          {category === 'settings' && <MemberSettings data={dataall} />}
          {category === 'aeps-history' && <AEPSreport data={dataall} />}
          {category === 'dmt-history' && <DMTreport data={dataall} />}
          {category === 'payout-report' && <Payout data={dataall} />}
          {category === 'recharge-history' && <Recharge data={dataall} />}
          {category === 'moneytransfer' && <Moneytransfer data={dataall} />}
          {category === 'moneytransferreceipt' && (
            <Moneytransferreceipt/>
          )}
          {category === 'addnewbeneficiary' && (
            <Addbeneficiary data={dataall} />
          )}
          {category === 'confirmdmt' && <Confirmmoneytransfer data={dataall} />}
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
