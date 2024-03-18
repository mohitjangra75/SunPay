import React from 'react'
import { useParams } from 'react-router-dom'
import Navbar from './Navbar/Navbar'
import Sidebar from './Sidebar/Sidebar'
import { Data } from '../../Member/Dashboard/DashboardComponents/Data/Data'
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
import Changepassword from '../Pages/Manage Member/Changepassword'
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
 
  return (
    <div className='bg-slate-50'>

      <div className=""><Navbar /></div>

      <div className="main max-w-[2300px] mt-[90px] flex flex-1 justify-between">
      <aside class="h-full sticky top-0">
      <Sidebar />
      </aside>
       
        <div className={`main h-screen overflow-scroll scrollbar-hide w-full z-10 bg-gradient-to-br from-amber-200 to-purple-900`}>
          {
            category === 'dashboard' && <Dashboard/>
          }
          {
            category === 'complaints' && <Adcomplaints/>
          }
          {
            category==='setpackage' && <Packageset/>
          }
          {
            category==='addrole' && <AddRole/>
          }
          {
            category==='assign-package' && <Assignpackage/>
          }
          {
            category==='companybank' && <CompanyBank/>
          }
          {
            category==='company' && <CompanyDetails/>
          }
          {
            category==='fund-request' && <FundRequest/>
          }
          {
            category==='permission' && <PermissionSetting/>
          }
          {
            category==='addbank' && <Addbank/>
          }
          {
            category==='kycmaster' && <KYCMaster/>
          }
          {
            category==='changerole' && <Changerole/>
          }
          {
            category==='parentchange' && <Parentchange/>
          }
          {
            category==='managenews' && <Managenews/>
          }
          {
            category==='assignservices' && <Assignservice/>
          }
          {
            category==='masterrole' && <Masterrole/>
          }
          {
            category==='staff-register' && <Staffregister/>
          }
          {
            category==='managenotification' && <ManageNotification/>
          }

          {/* Manage member */}
          {
            category==='balance-transfer' && <Balancetransfer/>
          }
          {/* {
            category==='register-staff' && <Staffregister/>
          } */}
          {
            category==='staff-list' && <Stafflist/>
          }
          {
            category==='change-password' && <Changepassword/>
          }
          {
            category==='kycdocs-list' && <KYCdoclist/>
          }
          {
            category==='registration' && <MemberRegistraton/>
          }
          {
            category==='managemember' && <Managemember/>
          }

          {/* Reports */}
          {
            category==='account-lagger' && <Accountlagger/>
          }
          {
            category==='aeps-history' && <Aepsreport/>
          }
          {
            category==='payout-history' && <Payout/>
          }
          {
            category==='dmt-history' && <DMThistory/>
          }

          {/* All reports */}
          {
            category==='dmt-surcharge' && <DMTsurcharge/>
          }
          {
            category==='aadharpay-surcharge' && <Aadharpaycharge/>
          }
          {
            category==='custom-surcharge' && <CustomSurcharge/>
          }
          {
            category==='payout-surcharge' && <Payoutsurcharge/>
          }
          {
            category==='upi-surcharge' && <UpiSurcharge/>
          }
          {
            category==='bbps-surcharge' && <BBPSsurcharge/>
          }
        </div>
      </div>
    </div>
  )
}

export default AdminDashboardRouter
