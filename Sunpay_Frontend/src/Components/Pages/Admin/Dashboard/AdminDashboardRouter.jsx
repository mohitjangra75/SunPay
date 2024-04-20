import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from './Navbar/Navbar'
import Sidebar from './Sidebar/Sidebar'
import { Data } from '../../Member/Dashboard/DashboardComponents/Data/Data'
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
//Settings 
import Adcomplaints from '../Pages/Complaints/Adcomplaints'
import Dashboard from '../Pages/Dashboard'
import Packageset from '../Pages/Settings/Packageset'
import AddRole from '../Pages/Settings/AddRole'
import Assignpackage from '../Pages/Settings/Assignpackage'
import CompanyBank from '../Pages/Settings/CompanyBank'
import FundRequest from '../Pages/Settings/FundRequest'
import PermissionSetting from '../Pages/Settings/PermissionSettings'
import Addbank from '../Pages/Settings/Addbank'
import KYCMaster from '../Pages/Settings/KYCMaster'
import Changerole from '../Pages/Settings/Changerole'
import Parentchange from '../Pages/Settings/Parentchange'
import Managenews from '../Pages/Settings/Managenews'
import Assignservice from '../Pages/Settings/Assignservice'
import Masterrole from '../Pages/Settings/Masterrole'
//Manage Member
import Balancetransfer from '../Pages/Manage Member/Balancetransfer'
import Changepassword1 from '../Pages/Manage Member/Changepassword1'
import Changepassword2 from '../Pages/Manage Member/Changepassword2'
import KYCdoclist from '../Pages/Manage Member/KYCdoclist'
import Managemember from '../Pages/Manage Member/Managemember'
import MemberRegistraton from '../Pages/Manage Member/MemberRegistration'
import Stafflist from '../Pages/Manage Member/Stafflist'
import Staffregister from '../Pages/Manage Member/Staffregister'
// Reports
import Accountlagger from '../Pages/Reports/Accountlagger'
import Aepsreport from '../Pages/Reports/Aepsreport'
import DMThistory from  '../Pages/Reports/DMThistory'
import Payout from '../Pages/Reports/Payout'
//Surcharges
import Aadharpaycharge from '../Pages/Surcharge/Aadharpaycharge'
import CustomSurcharge from '../Pages/Surcharge/CustomSurcharge'
import DMTsurcharge from '../Pages/Surcharge/DMTsurcharge'
import Payoutsurcharge from '../Pages/Surcharge/Payoutsurcharge'
import CompanyDetails from '../Pages/Settings/CompanyDetails'
import ManageNotification from '../Pages/Settings/ManageNotification'
import UpiSurcharge from '../Pages/Surcharge/UpiSurcharge'
import BBPSsurcharge from '../Pages/Surcharge/BBPSsurcharge'

const AdminDashboardRouter = () => {

  const {category} = useParams()
  let cat = Data?.find((categ) => categ?.url === parseInt(category)) 

  const [localuser, setlocaluser] = useState([]);
  const [liveuser, setliveuser] = useState([]);

  useEffect(() => {
    // Function to fetch data from local storage or any other source
    const fetchData = () => {
      // Example: fetching from local storage
      const storedData = localStorage.getItem('apiData');
      if (storedData) {
        setlocaluser(JSON.parse(storedData));
      }
    };

    
    fetchData(); // Fetch data when component mounts
  }, []);
 

  return (
    <div className='bg-slate-50'>

      <div className=""><Navbar /></div>

      <div className="main max-w-[2300px] mt-[90px] flex flex-1 justify-between">
      <aside class="h-full sticky top-0">
      <Sidebar />
      </aside>
       
        <div className={`main h-screen overflow-scroll scrollbar-hide w-full z-10 bg-gradient-to-br from-amber-200 to-purple-900`}>
          {
            category === 'dashboard' && <Dashboard data={localuser}/>
          }
          {
            category === 'complaints' && <Adcomplaints data={localuser}/>
          }
          {
            category==='setpackage' && <Packageset data={localuser}/>
          }
          {
            category==='addrole' && <AddRole data={localuser}/>
          }
          {
            category==='assign-package' && <Assignpackage data={localuser}/>
          }
          {
            category==='companybank' && <CompanyBank data={localuser}/>
          }
          {
            category==='company' && <CompanyDetails data={localuser}/>
          }
          {
            category==='fund-request' && <FundRequest data={localuser}/>
          }
          {
            category==='permission' && <PermissionSetting data={localuser}/>
          }
          {
            category==='addbank' && <Addbank data={localuser}/>
          }
          {
            category==='kycmaster' && <KYCMaster data={localuser}/>
          }
          {
            category==='changerole' && <Changerole data={localuser}/>
          }
          {
            category==='parentchange' && <Parentchange data={localuser}/>
          }
          {
            category==='managenews' && <Managenews data={localuser}/>
          }
          {
            category==='assignservices' && <Assignservice data={localuser}/>
          }
          {
            category==='masterrole' && <Masterrole data={localuser}/>
          }
          {
            category==='staff-register' && <Staffregister data={localuser}/>
          }
          {
            category==='managenotification' && <ManageNotification data={localuser}/>
          }

          {/* Manage member */}
          {
            category==='balance-transfer' && <Balancetransfer data={localuser}/>
          }
          {/* {
            category==='register-staff' && <Staffregister/>
          } */}
          {
            category==='staff-list' && <Stafflist data={localuser}/>
          }
          {
            category==='change-password1' && <Changepassword1 data={localuser}/>
          }
           {
            category==='change-password2' && <Changepassword2 data={localuser}/>
          }
          {
            category==='kycdocs-list' && <KYCdoclist data={localuser}/>
          }
          {
            category==='registration' && <MemberRegistraton data={localuser}/>
          }
          {
            category==='managemember' && <Managemember data={localuser}/>
          }

          {/* Reports */}
          {
            category==='account-lagger' && <Accountlagger data={localuser}/>
          }
          {
            category==='aeps-history' && <Aepsreport data={localuser}/>
          }
          {
            category==='payout-history' && <Payout data={localuser}/>
          }
          {
            category==='dmt-history' && <DMThistory data={localuser}/>
          }

          {/* All reports */}
          {
            category==='dmt-surcharge' && <DMTsurcharge data={localuser}/>
          }
          {
            category==='aadharpay-surcharge' && <Aadharpaycharge data={localuser}/>
          }
          {
            category==='custom-surcharge' && <CustomSurcharge data={localuser}/>
          }
          {
            category==='payout-surcharge' && <Payoutsurcharge data={localuser}/>
          }
          {
            category==='upi-surcharge' && <UpiSurcharge data={localuser}/>
          }
          {
            category==='bbps-surcharge' && <BBPSsurcharge data={localuser}/>
          }
        </div>
      </div>
    </div>
  )
}

export default AdminDashboardRouter
