/* 
  Component that renders to login page
*/

import type { NextPage } from 'next'
import Router from 'next/router'

/* React */
import React, { useEffect, useState } from 'react'

/* Redux */
import { setCurrentTab, setUsername, setDate1, setDate2, setDefectsData, setParametersType } from "../../redux/actions"
import { selectUser } from "../../redux/states/users/reducer"
import { useAppSelector, useAppDispatch } from '../../redux/hooks'

/* Components */
import Head from 'next/head'
import SideBar from '../../components/admin/SideBar'
import { TransparentInput } from '../../components/admin/Selects'
import { StyledTableRow } from '../../components/admin/StyledTableRow'
import { StyledTableCell } from '../../components/admin/StyledTableCell'

/* CSS */
import styles from '../../styles/admin/Defects.module.css'

/* Material - UI */
import { IconButton } from '@mui/material'
import { styled, alpha } from '@mui/material/styles';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Select from '@mui/material/Select';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

/* Material UI - icons */
import ArrowCircleRightRoundedIcon from '@mui/icons-material/ArrowCircleRightRounded';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import FilterAltRoundedIcon from '@mui/icons-material/FilterAltRounded';
import DateRangeRoundedIcon from '@mui/icons-material/DateRangeRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import PriorityHighRoundedIcon from '@mui/icons-material/PriorityHighRounded';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';

/* Loader Spinner */
import { InfinitySpin } from 'react-loader-spinner'


/* Defect interface */
interface Defect {
  "Issue key": string,
  "Status": string,
  "Priority": string,
  "Custom field (Severity)": string,
  "Project key": string,
  "Issue Type": string,
  "Created": string,
  "Assignee": string | null,
  "Custom field (Digital Service)": string,
  "Summary": string,
  "Description": string,
}

/* Styled menu for filter button */
const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));


/* Material UI - Alert */
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Defects: NextPage = (props) => {
  /* useState - currrent user */
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  /* useState - searchBy */
  const [searchState, setSearchState] = useState({
    searchBy: 'user',
    username: '',
    date1: '',
    date2: '',
    loading: false,
    buttonsDisabled: true
  });

  /* useState - table pagination */
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(15);

  /* useState - menu filter */
  const [sortBy, setSortBy] = useState('clear');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  /* useState - error snackbar */
  const [error, setError] = useState("");
  const [snackOpen, setSnackOpen] = useState(false);

  /* useState - defects */
  const [allDefects, setAllDefects] = useState<Array<Defect>>([
    {
    "Issue key": "DCM021CX0118-22389",
    "Status": "Rejected",
    "Priority": "Medium",
    "Custom field (Severity)": "Critical",
    "Project key": "DCM021CX0118",
    "Issue Type": "Bug",
    "Created": "2020-01-10T03:36:00",
    "Assignee": "Javier Pedraza",
    "Custom field (Digital Service)": "2. Orders & Delivery Schedule",
    "Summary": "PREPROD_DS5_One Click functionality is not available on customer´s side",
    "Description": "Test user: \nPH: username [PHCXGOV2@cemexlabs.com|mailto:PHCXGOV2@cemexlabs.com], password: C3m3xgo01\\!\nEG: username [CZCXGOEG@cemexlabs.com|mailto:CZCXGOEG@cemexlabs.com], password: C3m3xgo01\\!\n\nTest environment: [https://pp.cemexgo.com/login|https://pp.cemexgo.com/login] \n\nDescription: \nOne Click Buy functionality is not available on customer´s side even though the customer has the role for One Click assigned in L0 console.  \n\nSteps to reproduce: \n1. Login to CMX Go as customer, select local language (English Philippines, English EG)\n2. Check the sidebar menu and look for option One Click Buy\n\nActual: \nIcon One Click is missing in sidebar menu\n\nExpected:\nAssuming the customer has the role of One Click assigned, he is supposed to see the One Click icon in his sidebar menu. "
  },
  {
    "Issue key": "DCM021CX0118-22390",
    "Status": "Rejected",
    "Priority": "Medium",
    "Custom field (Severity)": "Major",
    "Project key": "DCM021CX0118",
    "Issue Type": "Bug",
    "Created": "2020-01-10T03:59:00",
    "Assignee": "Javier Pedraza",
    "Custom field (Digital Service)": "5. Cross Product – User Provisioning",
    "Summary": "PREPROD EG DS5 - Old view of  \"Assign Applications And Data\" is shown in L0",
    "Description": "[https://pp-users-provisioning-console-eu.cemexgo.com|https://pp-users-provisioning-console-eu.cemexgo.com/]\n\nUsername: customer.service.EG@cemexlabs.com\nPassword: Cust0m$ervice\n\nTest steps:\n1. Log in to L0 console PreProd\n2. Look for a customer 50024110\n3. Select the first one user in the list (CZCXGOV2 User)\n4. Scroll down to \"Assign Applications And Data\"\n\n{color:#d04437}*Actual behavior:*{color} \"Access to apps\" tab is shown, switches for the apps in the old view\n\n!image-20200110-100141.png|width=1515,height=443!\n\n{color:#14892c}*Expected behavior:*{color} \"Permissions\" tab with the list of Role Profiles is shown (Defined permissions for user to perform a group task) - the new functionality for EG came with 2.2.7.0 release \n\n!image-20200110-100112.png|width=1591,height=675!\n\n"
  },
  {
    "Issue key": "DCM021CX0118-22391",
    "Status": "Closed",
    "Priority": "Medium",
    "Custom field (Severity)": "Critical",
    "Project key": "DCM021CX0118",
    "Issue Type": "Bug",
    "Created": "2020-01-16T16:17:00",
    "Assignee": "Javier Echavez",
    "Custom field (Digital Service)": "4. Credits, Invoices & Payments",
    "Summary": "REG ES DS4 Customer initial load",
    "Description": "When execution intial load customer data, we are getting error 4 in Finance Documents.\r\n !image-2020-01-16-16-08-17-846.png|thumbnail! \r\n\r\nREPRODUCTION STEPS\r\nExecute txc Z0120_CARGA_IIB in SR0 with \"Reprocess error data\" with customer 50128480 and look afterwards the customer control report in txc Z0120_INQ_CUST_IIB.\r\n\r\nEXPECTED BEHAVIOR\r\nExecution should be completed successfully.\r\n\r\nACTUAL BEHAVIOR\r\nIntegration error 4 in Cleared invoices integration and this message has no description either."
  },
  {
    "Issue key": "DCM021CX0118-22392",
    "Status": "Closed",
    "Priority": "Medium",
    "Custom field (Severity)": "Critical",
    "Project key": "DCM021CX0118",
    "Issue Type": "Bug",
    "Created": "2020-01-17T13:30:00",
    "Assignee": "Eduardo Izaguirre",
    "Custom field (Digital Service)": "4. Credits, Invoices & Payments",
    "Summary": "REG ES DS4 Balance per client report",
    "Description": "When execution balance per client report sometimes report brings 0 from azure BD\n\n!image-2020-01-17-13-20-28-312.png|width=200,height=183!\n\n \n\n*REPRODUCTION STEPS*\nExecute transaction Z0120_OI_BALANCE in SR0 with the customers:\n50128480\n50019304\n50000579\nCountry code: ES\nCompany code: 4000\n\n*EXPECTED BEHAVIOR*\nExecution should show the same data from SAP as from Azure BD\n\n*ACTUAL BEHAVIOR*\nCommunicatin error with Azure BD as sometimes it shows 0 in Azure BD fields"
  },
  {
    "Issue key": "DCM021CX0118-22393",
    "Status": "Closed",
    "Priority": "Medium",
    "Custom field (Severity)": "Critical",
    "Project key": "DCM021CX0118",
    "Issue Type": "Bug",
    "Created": "2020-01-17T13:55:00",
    "Assignee": "Gerardo Herrera Guerrero",
    "Custom field (Digital Service)": "5. Cross Product – User Provisioning",
    "Summary": "REG ES - User provision account with no roles",
    "Description": "The user account customer.service.ES@cemexlabs.com used for the L0 console does not have the roles to access the console\r\n\r\nSteps to reproduce:\r\n1.- Acess to https://qa-users-provisioning-console-eu.cemexgo.com/login\r\n2. -User: customer.service.ES@cemexlabs.com, pass: Customer$ervic3\r\n3.- Does not have permission to access \r\n\r\nTalking with [~accountid:557058:40a4ae52-977a-47f4-8df2-227170a13e11] the roles does not exist in the QA EU DB \r\n\r\n \r\n\r\n\r\n\r\n !"
  },
  {
    "Issue key": "DCM021CX0118-22395",
    "Status": "Closed",
    "Priority": "Medium",
    "Custom field (Severity)": "Critical",
    "Project key": "DCM021CX0118",
    "Issue Type": "Bug",
    "Created": "2020-01-23T11:17:00",
    "Assignee": "Javier Echavez",
    "Custom field (Digital Service)": "4. Credits, Invoices & Payments",
    "Summary": "S4 CZ Commercial Integration Data",
    "Description": "Commercial interface customer initial load ending with error for CZ.\r\n"
  },
  {
    "Issue key": "DCM021CX0118-22398",
    "Status": "Closed",
    "Priority": "Medium",
    "Custom field (Severity)": "Minor",
    "Project key": "DCM021CX0118",
    "Issue Type": "Bug",
    "Created": "2020-01-24T13:58:00",
    "Assignee": "Monica A. Salinas Flores",
    "Custom field (Digital Service)": "3. Delivery Tracking",
    "Summary": "Replication status from Driver to RMS - XRQ",
    "Description": "delivery AE - 1008240815\r\n\r\n !image-2020-01-24-13-57-13-364.png|thumbnail! \r\n"
  },
  {
    "Issue key": "DCM021CX0118-22396",
    "Status": "Closed",
    "Priority": "Medium",
    "Custom field (Severity)": "Critical",
    "Project key": "DCM021CX0118",
    "Issue Type": "Bug",
    "Created": "2020-01-27T15:41:00",
    "Assignee": "Javier Echavez",
    "Custom field (Digital Service)": "4. Credits, Invoices & Payments",
    "Summary": "S4 EG Download Documents from Pending Orders",
    "Description": "Open order / deliveries value for last 90 days is not being retrived into OLS S4.\n\n!image-20200127-214311.png|width=1508,height=360!\n\n"
  },
  {
    "Issue key": "DCM021CX0118-22397",
    "Status": "Closed",
    "Priority": "Medium",
    "Custom field (Severity)": "Major",
    "Project key": "DCM021CX0118",
    "Issue Type": "Bug",
    "Created": "2020-01-28T10:06:00",
    "Assignee": "Jesus Perez",
    "Custom field (Digital Service)": "2. Orders & Delivery Schedule",
    "Summary": "Back-end system SIMMA (QA) are not replicated to CMX Go QA",
    "Description": "The sales orders created in their back-end system SIMMA (QA) are not replicated to CMX Go QA. \r\nBelow can be found previous conversation. According to his findings, the RMX orders we created can be found in DB Error log while there´s a weird message saying that the customer doesn´t exist.\r\n\r\nMore In Deep, here is a screenshot from DB saying that the customer 50045000 doesn´t exist. So it can be assume, that it´s a misleading message because as it can be saw the customer in CMX Go and neither respective jobsites are marked for deletion or blocked. However, it looks like the problem is in DB. \r\n\r\n !image-2020-01-28-09-55-31-624.png|thumbnail! \r\n \r\nAlso, attached to the issue is an XML message which SIMMA is sending. \r\n\r\n\r\n\r\n"
  },
  {
    "Issue key": "DCM021CX0118-22399",
    "Status": "Analysis",
    "Priority": "Medium",
    "Custom field (Severity)": "Minor",
    "Project key": "DCM021CX0118",
    "Issue Type": "Bug",
    "Created": "2020-01-30T14:14:00",
    "Assignee": "Eduardo Pedraza Figueroa",
    "Custom field (Digital Service)": "4. Credits, Invoices & Payments",
    "Summary": "S4 ES Commercial Integration Data Error",
    "Description": "Commercial interface customer initial load ending with error for CZ.\r\n"
  },
  {
    "Issue key": "DCM021CX0118-22400",
    "Status": "Closed",
    "Priority": "Medium",
    "Custom field (Severity)": "Minor",
    "Project key": "DCM021CX0118",
    "Issue Type": "Bug",
    "Created": "2020-01-30T16:10:00",
    "Assignee": "DanielC",
    "Custom field (Digital Service)": "1. Customer Information & Commercial Conditions",
    "Summary": "Contract Balance Issue",
    "Description": "Having a contract with type ZCA in Egypt. \r\nWhen a order is created for for the client and material related to the contract, there is an issue when the contract is visualized:\r\n - Balance is not shown.\r\n - There is a message Error \"Invalid Status Code: 500\" (The error is thrown by Balance API)\r\n\r\nIt should discount the material included in the order from the original total value in the contract.\r\n\r\nInformation used in functional Testing:\r\n- Sold-To: 50136277\r\n- Ship-To: 65445500\r\n- Contract: 20110925110\r\n- Material: 10001680\r\n- Order: 2011092512 \r\n"
  },
  {
    "Issue key": "DCM021CX0118-22402",
    "Status": "Rejected",
    "Priority": "Medium",
    "Custom field (Severity)": "Minor",
    "Project key": "DCM021CX0118",
    "Issue Type": "Bug",
    "Created": "2020-02-28T05:25:00",
    "Assignee": "Joseph Rodiz",
    "Custom field (Digital Service)": "3. Delivery Tracking",
    "Summary": "UAT ES DS3 End of day button does not appear sometimes",
    "Description": "Driver App 1.7.0.4\r\n\r\nCase 1:\r\n\r\nDriver has completed some trips as it can be seen on the history:\r\n\r\n !image-2020-02-28-12-22-43-842.png|thumbnail! \r\n\r\nbut the End of day button does not appear in the active section:\r\n\r\n !image-2020-02-28-12-23-15-687.png|thumbnail! \r\n\r\nCase 2:\r\nIn other cases, it appears:\r\n\r\n !image-2020-02-28-12-23-34-231.png|thumbnail! \r\n !image-2020-02-28-12-23-40-275.png|thumbnail! \r\n\r\nThe end of day button has not been clicked in Case 1."
  },
  {
    "Issue key": "DCM021CX0118-22403",
    "Status": "Rejected",
    "Priority": "Medium",
    "Custom field (Severity)": "Minor",
    "Project key": "DCM021CX0118",
    "Issue Type": "Bug",
    "Created": "2020-02-28T05:50:00",
    "Assignee": "Jose Santana Santana",
    "Custom field (Digital Service)": "3. Delivery Tracking",
    "Summary": "UAT ES DS3 No pop-up for change of vehicle for same hauler",
    "Description": "Driver App 1.7.0.4\n\n# Add TicketSourceCode 19940078 for truck 7839JCS with Hauler 3031519\n# Follow the delivery process, sign it and close it.\n \n!image-2020-02-28-12-49-55-442.png|width=200,height=183!\n# Add TicketSourceCode 19940090 for truck 4433FJH with Hauler 3031519\n \n!image-2020-02-28-12-50-03-108.png|width=200,height=183!\n \n \n!image-2020-02-28-12-50-07-776.png|width=200,height=183!\n\nExpected result:\nA warning should appear saying that you are changing vehicle."
  },
  {
    "Issue key": "DCM021CX0118-22404",
    "Status": "Rejected",
    "Priority": "Medium",
    "Custom field (Severity)": "Major",
    "Project key": "DCM021CX0118",
    "Issue Type": "Bug",
    "Created": "2020-02-28T05:57:00",
    "Assignee": "Jose Santana Santana",
    "Custom field (Digital Service)": "3. Delivery Tracking",
    "Summary": "UAT ES DS3 Document 27 not available if HTC fails",
    "Description": "Driver 1.7.0.4\r\n\r\nThe file is not available in the case of tickets finished before HTC sends the document.\r\n\r\n !image-2020-02-28-12-54-11-102.png|thumbnail! \r\n\r\n !image-2020-02-28-12-53-56-098.png|thumbnail! \r\n\r\n !image-2020-02-28-12-54-02-391.png|thumbnail! \r\n\r\n"
  },
  {
    "Issue key": "DCM021CX0118-22405",
    "Status": "Rejected",
    "Priority": "Medium",
    "Custom field (Severity)": "Major",
    "Project key": "DCM021CX0118",
    "Issue Type": "Bug",
    "Created": "2020-02-28T06:06:00",
    "Assignee": "Kenny J Franco",
    "Custom field (Digital Service)": "3. Delivery Tracking",
    "Summary": "UAT ES DS3 Errors in Document 27",
    "Description": "Driver 1.7.0.4\r\n\r\nTicketCode: 1008241793\r\n\r\nAfter HTC sends the document 27, it appears with some letters missing (substituted by square signs □\r\n\r\n !image-2020-02-28-13-04-13-343.png|thumbnail! \r\nDetail:\r\n !image-2020-02-28-13-04-35-780.png|thumbnail! "
  },
  {
    "Issue key": "DCM021CX0118-22406",
    "Status": "Rejected",
    "Priority": "Medium",
    "Custom field (Severity)": "Major",
    "Project key": "DCM021CX0118",
    "Issue Type": "Bug",
    "Created": "2020-02-28T06:38:00",
    "Assignee": "Jose Santana Santana",
    "Custom field (Digital Service)": "3. Delivery Tracking",
    "Summary": "UAT ES DS3 Cannot add ticket after revoking when status is Unloading End",
    "Description": "Driver 1.7.0.4\r\n\r\nWhen all statuses have been filled in Drivers Lite but the ePOD has not been signed, the driver clicks on Revoke because he realizes it is not his ticket.\r\n\r\nThe right driver is not able to add that ticket."
  },
  {
    "Issue key": "DCM021CX0118-22407",
    "Status": "Closed",
    "Priority": "Medium",
    "Custom field (Severity)": "Major",
    "Project key": "DCM021CX0118",
    "Issue Type": "Bug",
    "Created": "2020-02-28T08:16:00",
    "Assignee": "Jose Santana Santana",
    "Custom field (Digital Service)": "3. Delivery Tracking",
    "Summary": "UAT ES DS3 Incorrect translations in Drivers",
    "Description": "Driver 1.7.0.4.\r\n\r\nThe following translations have been updated in the Translations Console, please update them to the QA version:\r\nApp: Mobile Drivers\r\nplate_value\r\ndifferent_jobsite_msg\r\ninactivity_content\r\nmessage_error204\r\nrevoke_ticket_confirmation_text\r\nrevoke_ticket_title\r\nswitch_haulers_content\r\nenter_the_hauler_number_text\r\nlocation_peromission_not granted\r\ninactivity_title\r\nspeed_alertmessage\r\nspeed_alertmessageRequest\r\nticket_already_completed\r\npermission_read_storage_rationale\r\npermission_loaction_rationale\r\npermission_camera_not_granted\r\ntime_error\r\ntime_config_text\r\nsend_now_msg\r\nselect_country\r\nrevoke_ticket_confirmation_text\r\nerr_msg_401\r\ncheck_connectivity"
  },
  {
    "Issue key": "DCM021CX0118-22408",
    "Status": "Closed",
    "Priority": "Medium",
    "Custom field (Severity)": "Major",
    "Project key": "DCM021CX0118",
    "Issue Type": "Bug",
    "Created": "2020-02-28T08:18:00",
    "Assignee": "Andrea De Hernando",
    "Custom field (Digital Service)": "5. Cross Product – User Provisioning",
    "Summary": "UAT_FR_DS5_Error message when trying to share a notification",
    "Description": "www.qa-eu.cemexgo.com\n\nUser: tison@mailinator.com / Password: Testcxg0\n\nSteps:\n1- log in cemex go\n2- click on the upper right icon (notifications)\n3- select option ‘toutes les notifications’\n4- Click on Share the notification\n5- complete email field\n6- complete the comment field\n7- click on Send button\n\nActual result: Banner of error is displayed\n\n !image-2020-02-28-15-13-47-027.png|thumbnail! "
  },
  {
    "Issue key": "DCM021CX0118-22409",
    "Status": "Closed",
    "Priority": "Medium",
    "Custom field (Severity)": "Critical",
    "Project key": "DCM021CX0118",
    "Issue Type": "Bug",
    "Created": "2020-02-28T08:20:00",
    "Assignee": "Andrea De Hernando",
    "Custom field (Digital Service)": "4. Credits, Invoices & Payments",
    "Summary": "UAT_FR_DEP_DS5_No email received after sharing a notification",
    "Description": "www.qa-eu.cemexgo.com\n\nUser: tison@mailinator.com / Password: Testcxg0\n\nSteps:\n1- log in cemex go\n2- click on the upper right icon (notifications)\n3- select option ‘toutes les notifications’\n4- Click on Share the notification\n5- complete email field without @cemex.com adress\n6- complete the comment field\n7- click on Send button\n\nActual result: no error message displayed in cemex go, no email received in selected inboxes\n"
  },
  {
    "Issue key": "DCM021CX0118-22410",
    "Status": "Open",
    "Priority": "Medium",
    "Custom field (Severity)": "Major",
    "Project key": "DCM021CX0118",
    "Issue Type": "Bug",
    "Created": "2020-02-28T08:22:00",
    "Assignee": null,
    "Custom field (Digital Service)": "4. Credits, Invoices & Payments",
    "Summary": "UAT_FR_DEP_DS4_No email received for Delivery ticket reports",
    "Description": "www.qa-eu.cemexgo.com\n\nUser: tison@mailinator.com / Password: Tesxg0\n\nSteps:\n1- log in cemex go\n2- open Invoices and Module\n3 – click on report\n4 – create a report\n\nActual result: a notification is received in cemex go but no message received in the email box despite it is a mandatory email that cannot be modified\n\n!image-20200228-142323.png|width=431,height=472!\n\n\n\n!image-20200228-142331.png|width=1242,height=210!\n\n"
  },
  {
    "Issue key": "DCM021CX0118-22411",
    "Status": "Open",
    "Priority": "Medium",
    "Custom field (Severity)": "Major",
    "Project key": "DCM021CX0118",
    "Issue Type": "Bug",
    "Created": "2020-02-28T08:25:00",
    "Assignee": null,
    "Custom field (Digital Service)": "4. Credits, Invoices & Payments",
    "Summary": "UAT_FR_DEP_DS4_No notification received for dispute creation or update",
    "Description": "www.qa-eu.cemexgo.com\n\nUser: tison@mailinator.com / Password: Tescxg0\n\nSteps:\n1- log in cemex go\n2- open Invoices and Module\n3 – click on dispute\n4- select an invoice\n5 – create a dispute\n\nActual result: no notification alert (red icon) is received in cemex go and no message received in the email box despite it should be sent in both\n\nActual result: no notification is received in cemex go and no message received in the email box despite it should be sent in both. Test done with Assigned status and Closed status with same result\n\n!image-2020-02-28-15-25-20-891.png|width=200,height=183!\n\n \n\n!image-2020-02-28-15-25-29-087.png|width=200,height=183!\n\n "
  }
  ]);
  const [defects, setDefects] = useState<Array<Defect>>([
    {
    "Issue key": "DCM021CX0118-22389",
    "Status": "Rejected",
    "Priority": "Medium",
    "Custom field (Severity)": "Critical",
    "Project key": "DCM021CX0118",
    "Issue Type": "Bug",
    "Created": "2020-01-10T03:36:00",
    "Assignee": "Javier Pedraza",
    "Custom field (Digital Service)": "2. Orders & Delivery Schedule",
    "Summary": "PREPROD_DS5_One Click functionality is not available on customer´s side",
    "Description": "Test user: \nPH: username [PHCXGOV2@cemexlabs.com|mailto:PHCXGOV2@cemexlabs.com], password: C3m3xgo01\\!\nEG: username [CZCXGOEG@cemexlabs.com|mailto:CZCXGOEG@cemexlabs.com], password: C3m3xgo01\\!\n\nTest environment: [https://pp.cemexgo.com/login|https://pp.cemexgo.com/login] \n\nDescription: \nOne Click Buy functionality is not available on customer´s side even though the customer has the role for One Click assigned in L0 console.  \n\nSteps to reproduce: \n1. Login to CMX Go as customer, select local language (English Philippines, English EG)\n2. Check the sidebar menu and look for option One Click Buy\n\nActual: \nIcon One Click is missing in sidebar menu\n\nExpected:\nAssuming the customer has the role of One Click assigned, he is supposed to see the One Click icon in his sidebar menu. "
  },
  {
    "Issue key": "DCM021CX0118-22390",
    "Status": "Rejected",
    "Priority": "Medium",
    "Custom field (Severity)": "Major",
    "Project key": "DCM021CX0118",
    "Issue Type": "Bug",
    "Created": "2020-01-10T03:59:00",
    "Assignee": "Javier Pedraza",
    "Custom field (Digital Service)": "5. Cross Product – User Provisioning",
    "Summary": "PREPROD EG DS5 - Old view of  \"Assign Applications And Data\" is shown in L0",
    "Description": "[https://pp-users-provisioning-console-eu.cemexgo.com|https://pp-users-provisioning-console-eu.cemexgo.com/]\n\nUsername: customer.service.EG@cemexlabs.com\nPassword: Cust0m$ervice\n\nTest steps:\n1. Log in to L0 console PreProd\n2. Look for a customer 50024110\n3. Select the first one user in the list (CZCXGOV2 User)\n4. Scroll down to \"Assign Applications And Data\"\n\n{color:#d04437}*Actual behavior:*{color} \"Access to apps\" tab is shown, switches for the apps in the old view\n\n!image-20200110-100141.png|width=1515,height=443!\n\n{color:#14892c}*Expected behavior:*{color} \"Permissions\" tab with the list of Role Profiles is shown (Defined permissions for user to perform a group task) - the new functionality for EG came with 2.2.7.0 release \n\n!image-20200110-100112.png|width=1591,height=675!\n\n"
  },
  {
    "Issue key": "DCM021CX0118-22391",
    "Status": "Closed",
    "Priority": "Medium",
    "Custom field (Severity)": "Critical",
    "Project key": "DCM021CX0118",
    "Issue Type": "Bug",
    "Created": "2020-01-16T16:17:00",
    "Assignee": "Javier Echavez",
    "Custom field (Digital Service)": "4. Credits, Invoices & Payments",
    "Summary": "REG ES DS4 Customer initial load",
    "Description": "When execution intial load customer data, we are getting error 4 in Finance Documents.\r\n !image-2020-01-16-16-08-17-846.png|thumbnail! \r\n\r\nREPRODUCTION STEPS\r\nExecute txc Z0120_CARGA_IIB in SR0 with \"Reprocess error data\" with customer 50128480 and look afterwards the customer control report in txc Z0120_INQ_CUST_IIB.\r\n\r\nEXPECTED BEHAVIOR\r\nExecution should be completed successfully.\r\n\r\nACTUAL BEHAVIOR\r\nIntegration error 4 in Cleared invoices integration and this message has no description either."
  },
  {
    "Issue key": "DCM021CX0118-22392",
    "Status": "Closed",
    "Priority": "Medium",
    "Custom field (Severity)": "Critical",
    "Project key": "DCM021CX0118",
    "Issue Type": "Bug",
    "Created": "2020-01-17T13:30:00",
    "Assignee": "Eduardo Izaguirre",
    "Custom field (Digital Service)": "4. Credits, Invoices & Payments",
    "Summary": "REG ES DS4 Balance per client report",
    "Description": "When execution balance per client report sometimes report brings 0 from azure BD\n\n!image-2020-01-17-13-20-28-312.png|width=200,height=183!\n\n \n\n*REPRODUCTION STEPS*\nExecute transaction Z0120_OI_BALANCE in SR0 with the customers:\n50128480\n50019304\n50000579\nCountry code: ES\nCompany code: 4000\n\n*EXPECTED BEHAVIOR*\nExecution should show the same data from SAP as from Azure BD\n\n*ACTUAL BEHAVIOR*\nCommunicatin error with Azure BD as sometimes it shows 0 in Azure BD fields"
  },
  {
    "Issue key": "DCM021CX0118-22393",
    "Status": "Closed",
    "Priority": "Medium",
    "Custom field (Severity)": "Critical",
    "Project key": "DCM021CX0118",
    "Issue Type": "Bug",
    "Created": "2020-01-17T13:55:00",
    "Assignee": "Gerardo Herrera Guerrero",
    "Custom field (Digital Service)": "5. Cross Product – User Provisioning",
    "Summary": "REG ES - User provision account with no roles",
    "Description": "The user account customer.service.ES@cemexlabs.com used for the L0 console does not have the roles to access the console\r\n\r\nSteps to reproduce:\r\n1.- Acess to https://qa-users-provisioning-console-eu.cemexgo.com/login\r\n2. -User: customer.service.ES@cemexlabs.com, pass: Customer$ervic3\r\n3.- Does not have permission to access \r\n\r\nTalking with [~accountid:557058:40a4ae52-977a-47f4-8df2-227170a13e11] the roles does not exist in the QA EU DB \r\n\r\n \r\n\r\n\r\n\r\n !"
  },
  {
    "Issue key": "DCM021CX0118-22395",
    "Status": "Closed",
    "Priority": "Medium",
    "Custom field (Severity)": "Critical",
    "Project key": "DCM021CX0118",
    "Issue Type": "Bug",
    "Created": "2020-01-23T11:17:00",
    "Assignee": "Javier Echavez",
    "Custom field (Digital Service)": "4. Credits, Invoices & Payments",
    "Summary": "S4 CZ Commercial Integration Data",
    "Description": "Commercial interface customer initial load ending with error for CZ.\r\n"
  },
  {
    "Issue key": "DCM021CX0118-22398",
    "Status": "Closed",
    "Priority": "Medium",
    "Custom field (Severity)": "Minor",
    "Project key": "DCM021CX0118",
    "Issue Type": "Bug",
    "Created": "2020-01-24T13:58:00",
    "Assignee": "Monica A. Salinas Flores",
    "Custom field (Digital Service)": "3. Delivery Tracking",
    "Summary": "Replication status from Driver to RMS - XRQ",
    "Description": "delivery AE - 1008240815\r\n\r\n !image-2020-01-24-13-57-13-364.png|thumbnail! \r\n"
  },
  {
    "Issue key": "DCM021CX0118-22396",
    "Status": "Closed",
    "Priority": "Medium",
    "Custom field (Severity)": "Critical",
    "Project key": "DCM021CX0118",
    "Issue Type": "Bug",
    "Created": "2020-01-27T15:41:00",
    "Assignee": "Javier Echavez",
    "Custom field (Digital Service)": "4. Credits, Invoices & Payments",
    "Summary": "S4 EG Download Documents from Pending Orders",
    "Description": "Open order / deliveries value for last 90 days is not being retrived into OLS S4.\n\n!image-20200127-214311.png|width=1508,height=360!\n\n"
  },
  {
    "Issue key": "DCM021CX0118-22397",
    "Status": "Closed",
    "Priority": "Medium",
    "Custom field (Severity)": "Major",
    "Project key": "DCM021CX0118",
    "Issue Type": "Bug",
    "Created": "2020-01-28T10:06:00",
    "Assignee": "Jesus Perez",
    "Custom field (Digital Service)": "2. Orders & Delivery Schedule",
    "Summary": "Back-end system SIMMA (QA) are not replicated to CMX Go QA",
    "Description": "The sales orders created in their back-end system SIMMA (QA) are not replicated to CMX Go QA. \r\nBelow can be found previous conversation. According to his findings, the RMX orders we created can be found in DB Error log while there´s a weird message saying that the customer doesn´t exist.\r\n\r\nMore In Deep, here is a screenshot from DB saying that the customer 50045000 doesn´t exist. So it can be assume, that it´s a misleading message because as it can be saw the customer in CMX Go and neither respective jobsites are marked for deletion or blocked. However, it looks like the problem is in DB. \r\n\r\n !image-2020-01-28-09-55-31-624.png|thumbnail! \r\n \r\nAlso, attached to the issue is an XML message which SIMMA is sending. \r\n\r\n\r\n\r\n"
  },
  {
    "Issue key": "DCM021CX0118-22399",
    "Status": "Analysis",
    "Priority": "Medium",
    "Custom field (Severity)": "Minor",
    "Project key": "DCM021CX0118",
    "Issue Type": "Bug",
    "Created": "2020-01-30T14:14:00",
    "Assignee": "Eduardo Pedraza Figueroa",
    "Custom field (Digital Service)": "4. Credits, Invoices & Payments",
    "Summary": "S4 ES Commercial Integration Data Error",
    "Description": "Commercial interface customer initial load ending with error for CZ.\r\n"
  },
  {
    "Issue key": "DCM021CX0118-22400",
    "Status": "Closed",
    "Priority": "Medium",
    "Custom field (Severity)": "Minor",
    "Project key": "DCM021CX0118",
    "Issue Type": "Bug",
    "Created": "2020-01-30T16:10:00",
    "Assignee": "DanielC",
    "Custom field (Digital Service)": "1. Customer Information & Commercial Conditions",
    "Summary": "Contract Balance Issue",
    "Description": "Having a contract with type ZCA in Egypt. \r\nWhen a order is created for for the client and material related to the contract, there is an issue when the contract is visualized:\r\n - Balance is not shown.\r\n - There is a message Error \"Invalid Status Code: 500\" (The error is thrown by Balance API)\r\n\r\nIt should discount the material included in the order from the original total value in the contract.\r\n\r\nInformation used in functional Testing:\r\n- Sold-To: 50136277\r\n- Ship-To: 65445500\r\n- Contract: 20110925110\r\n- Material: 10001680\r\n- Order: 2011092512 \r\n"
  },
  {
    "Issue key": "DCM021CX0118-22402",
    "Status": "Rejected",
    "Priority": "Medium",
    "Custom field (Severity)": "Minor",
    "Project key": "DCM021CX0118",
    "Issue Type": "Bug",
    "Created": "2020-02-28T05:25:00",
    "Assignee": "Joseph Rodiz",
    "Custom field (Digital Service)": "3. Delivery Tracking",
    "Summary": "UAT ES DS3 End of day button does not appear sometimes",
    "Description": "Driver App 1.7.0.4\r\n\r\nCase 1:\r\n\r\nDriver has completed some trips as it can be seen on the history:\r\n\r\n !image-2020-02-28-12-22-43-842.png|thumbnail! \r\n\r\nbut the End of day button does not appear in the active section:\r\n\r\n !image-2020-02-28-12-23-15-687.png|thumbnail! \r\n\r\nCase 2:\r\nIn other cases, it appears:\r\n\r\n !image-2020-02-28-12-23-34-231.png|thumbnail! \r\n !image-2020-02-28-12-23-40-275.png|thumbnail! \r\n\r\nThe end of day button has not been clicked in Case 1."
  },
  {
    "Issue key": "DCM021CX0118-22403",
    "Status": "Rejected",
    "Priority": "Medium",
    "Custom field (Severity)": "Minor",
    "Project key": "DCM021CX0118",
    "Issue Type": "Bug",
    "Created": "2020-02-28T05:50:00",
    "Assignee": "Jose Santana Santana",
    "Custom field (Digital Service)": "3. Delivery Tracking",
    "Summary": "UAT ES DS3 No pop-up for change of vehicle for same hauler",
    "Description": "Driver App 1.7.0.4\n\n# Add TicketSourceCode 19940078 for truck 7839JCS with Hauler 3031519\n# Follow the delivery process, sign it and close it.\n \n!image-2020-02-28-12-49-55-442.png|width=200,height=183!\n# Add TicketSourceCode 19940090 for truck 4433FJH with Hauler 3031519\n \n!image-2020-02-28-12-50-03-108.png|width=200,height=183!\n \n \n!image-2020-02-28-12-50-07-776.png|width=200,height=183!\n\nExpected result:\nA warning should appear saying that you are changing vehicle."
  },
  {
    "Issue key": "DCM021CX0118-22404",
    "Status": "Rejected",
    "Priority": "Medium",
    "Custom field (Severity)": "Major",
    "Project key": "DCM021CX0118",
    "Issue Type": "Bug",
    "Created": "2020-02-28T05:57:00",
    "Assignee": "Jose Santana Santana",
    "Custom field (Digital Service)": "3. Delivery Tracking",
    "Summary": "UAT ES DS3 Document 27 not available if HTC fails",
    "Description": "Driver 1.7.0.4\r\n\r\nThe file is not available in the case of tickets finished before HTC sends the document.\r\n\r\n !image-2020-02-28-12-54-11-102.png|thumbnail! \r\n\r\n !image-2020-02-28-12-53-56-098.png|thumbnail! \r\n\r\n !image-2020-02-28-12-54-02-391.png|thumbnail! \r\n\r\n"
  },
  {
    "Issue key": "DCM021CX0118-22405",
    "Status": "Rejected",
    "Priority": "Medium",
    "Custom field (Severity)": "Major",
    "Project key": "DCM021CX0118",
    "Issue Type": "Bug",
    "Created": "2020-02-28T06:06:00",
    "Assignee": "Kenny J Franco",
    "Custom field (Digital Service)": "3. Delivery Tracking",
    "Summary": "UAT ES DS3 Errors in Document 27",
    "Description": "Driver 1.7.0.4\r\n\r\nTicketCode: 1008241793\r\n\r\nAfter HTC sends the document 27, it appears with some letters missing (substituted by square signs □\r\n\r\n !image-2020-02-28-13-04-13-343.png|thumbnail! \r\nDetail:\r\n !image-2020-02-28-13-04-35-780.png|thumbnail! "
  },
  {
    "Issue key": "DCM021CX0118-22406",
    "Status": "Rejected",
    "Priority": "Medium",
    "Custom field (Severity)": "Major",
    "Project key": "DCM021CX0118",
    "Issue Type": "Bug",
    "Created": "2020-02-28T06:38:00",
    "Assignee": "Jose Santana Santana",
    "Custom field (Digital Service)": "3. Delivery Tracking",
    "Summary": "UAT ES DS3 Cannot add ticket after revoking when status is Unloading End",
    "Description": "Driver 1.7.0.4\r\n\r\nWhen all statuses have been filled in Drivers Lite but the ePOD has not been signed, the driver clicks on Revoke because he realizes it is not his ticket.\r\n\r\nThe right driver is not able to add that ticket."
  },
  {
    "Issue key": "DCM021CX0118-22407",
    "Status": "Closed",
    "Priority": "Medium",
    "Custom field (Severity)": "Major",
    "Project key": "DCM021CX0118",
    "Issue Type": "Bug",
    "Created": "2020-02-28T08:16:00",
    "Assignee": "Jose Santana Santana",
    "Custom field (Digital Service)": "3. Delivery Tracking",
    "Summary": "UAT ES DS3 Incorrect translations in Drivers",
    "Description": "Driver 1.7.0.4.\r\n\r\nThe following translations have been updated in the Translations Console, please update them to the QA version:\r\nApp: Mobile Drivers\r\nplate_value\r\ndifferent_jobsite_msg\r\ninactivity_content\r\nmessage_error204\r\nrevoke_ticket_confirmation_text\r\nrevoke_ticket_title\r\nswitch_haulers_content\r\nenter_the_hauler_number_text\r\nlocation_peromission_not granted\r\ninactivity_title\r\nspeed_alertmessage\r\nspeed_alertmessageRequest\r\nticket_already_completed\r\npermission_read_storage_rationale\r\npermission_loaction_rationale\r\npermission_camera_not_granted\r\ntime_error\r\ntime_config_text\r\nsend_now_msg\r\nselect_country\r\nrevoke_ticket_confirmation_text\r\nerr_msg_401\r\ncheck_connectivity"
  },
  {
    "Issue key": "DCM021CX0118-22408",
    "Status": "Closed",
    "Priority": "Medium",
    "Custom field (Severity)": "Major",
    "Project key": "DCM021CX0118",
    "Issue Type": "Bug",
    "Created": "2020-02-28T08:18:00",
    "Assignee": "Andrea De Hernando",
    "Custom field (Digital Service)": "5. Cross Product – User Provisioning",
    "Summary": "UAT_FR_DS5_Error message when trying to share a notification",
    "Description": "www.qa-eu.cemexgo.com\n\nUser: tison@mailinator.com / Password: Testcxg0\n\nSteps:\n1- log in cemex go\n2- click on the upper right icon (notifications)\n3- select option ‘toutes les notifications’\n4- Click on Share the notification\n5- complete email field\n6- complete the comment field\n7- click on Send button\n\nActual result: Banner of error is displayed\n\n !image-2020-02-28-15-13-47-027.png|thumbnail! "
  },
  {
    "Issue key": "DCM021CX0118-22409",
    "Status": "Closed",
    "Priority": "Medium",
    "Custom field (Severity)": "Critical",
    "Project key": "DCM021CX0118",
    "Issue Type": "Bug",
    "Created": "2020-02-28T08:20:00",
    "Assignee": "Andrea De Hernando",
    "Custom field (Digital Service)": "4. Credits, Invoices & Payments",
    "Summary": "UAT_FR_DEP_DS5_No email received after sharing a notification",
    "Description": "www.qa-eu.cemexgo.com\n\nUser: tison@mailinator.com / Password: Testcxg0\n\nSteps:\n1- log in cemex go\n2- click on the upper right icon (notifications)\n3- select option ‘toutes les notifications’\n4- Click on Share the notification\n5- complete email field without @cemex.com adress\n6- complete the comment field\n7- click on Send button\n\nActual result: no error message displayed in cemex go, no email received in selected inboxes\n"
  },
  {
    "Issue key": "DCM021CX0118-22410",
    "Status": "Open",
    "Priority": "Medium",
    "Custom field (Severity)": "Major",
    "Project key": "DCM021CX0118",
    "Issue Type": "Bug",
    "Created": "2020-02-28T08:22:00",
    "Assignee": null,
    "Custom field (Digital Service)": "4. Credits, Invoices & Payments",
    "Summary": "UAT_FR_DEP_DS4_No email received for Delivery ticket reports",
    "Description": "www.qa-eu.cemexgo.com\n\nUser: tison@mailinator.com / Password: Tesxg0\n\nSteps:\n1- log in cemex go\n2- open Invoices and Module\n3 – click on report\n4 – create a report\n\nActual result: a notification is received in cemex go but no message received in the email box despite it is a mandatory email that cannot be modified\n\n!image-20200228-142323.png|width=431,height=472!\n\n\n\n!image-20200228-142331.png|width=1242,height=210!\n\n"
  },
  {
    "Issue key": "DCM021CX0118-22411",
    "Status": "Open",
    "Priority": "Medium",
    "Custom field (Severity)": "Major",
    "Project key": "DCM021CX0118",
    "Issue Type": "Bug",
    "Created": "2020-02-28T08:25:00",
    "Assignee": null,
    "Custom field (Digital Service)": "4. Credits, Invoices & Payments",
    "Summary": "UAT_FR_DEP_DS4_No notification received for dispute creation or update",
    "Description": "www.qa-eu.cemexgo.com\n\nUser: tison@mailinator.com / Password: Tescxg0\n\nSteps:\n1- log in cemex go\n2- open Invoices and Module\n3 – click on dispute\n4- select an invoice\n5 – create a dispute\n\nActual result: no notification alert (red icon) is received in cemex go and no message received in the email box despite it should be sent in both\n\nActual result: no notification is received in cemex go and no message received in the email box despite it should be sent in both. Test done with Assigned status and Closed status with same result\n\n!image-2020-02-28-15-25-20-891.png|width=200,height=183!\n\n \n\n!image-2020-02-28-15-25-29-087.png|width=200,height=183!\n\n "
  }
  ]);

  /* Redux */
  const dispatch = useAppDispatch(); //function that allows to trigger actions that update the redux state
  const user = useAppSelector(selectUser) //function that allows to get the current user from the redux state

  useEffect(() => {
    /* set current tab */
    dispatch(setCurrentTab("defects"));

    /* Redirect user if needed */
    console.log(user);
    if (!user) {
      Router.push('/');
    } else {
      setIsLoggedIn(true);
    }
  }, [isLoggedIn]);

  /* Snackbar alert functions */

  const handleSnackClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackOpen(false);
  };

  /* Functions - table */
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  /* search functions */
  //handle searchBy change
  const handleSearchByChange = (value:string) => {

    //Disable or enable search button
    if(value === "all") {
      setSearchState({...searchState, searchBy: value, buttonsDisabled: false}); //enable search button
      
    } else if(value === "user") {
      setSearchState({...searchState, searchBy: value, buttonsDisabled: searchState.username.length === 0}); //disable search button if username is empty
      
    } else if(value === "date") {
      setSearchState({...searchState, searchBy: value, buttonsDisabled: searchState.date1.length === 0 || searchState.date2.length === 0}); //disable search button if date1 or date2 is empty
      
    } else if(value === "date_user") {
       setSearchState({...searchState, searchBy: value, buttonsDisabled: searchState.date1.length === 0 || searchState.date2.length === 0 || searchState.username.length === 0}); //disable search button if date1 or date2 or username is empty
      
    }
  }

  //handle username change
  const handleUsernameChange = (value:string) => {
    
    if(searchState.searchBy === "user") {
      setSearchState({...searchState, username: value, buttonsDisabled: value.length === 0}); //disable search button if username is empty
      
    } else if (searchState.searchBy === "date_user") {
      if(searchState.date1 && searchState.date2) {
        setSearchState({...searchState, username: value, buttonsDisabled: false}); //enable button if both dates are set
        
      } else {
        setSearchState({...searchState, username: value, buttonsDisabled: true}); //disable button if one of the dates is not set
        
      }
    }
  }
   //handle date1 change
  const handleDate1Change = (value:string) => {
    
    if(searchState.searchBy === "date_user") {
      if(searchState.username && searchState.date2) {
        setSearchState({...searchState, date1: value, buttonsDisabled: false}); //enable button if both dates are set
        
      } else {
        setSearchState({...searchState, date1: value, buttonsDisabled: true}); //disable button if one of the dates is not set
        
      }
    } else if (searchState.searchBy === "date") {
      if(searchState.date2) {
        if(value > searchState.date2) {
          //open alert and set error message
          setSnackOpen(true);
          setError("Initial date must be earlier than the final date");
          
          setSearchState({...searchState, date1: "", buttonsDisabled: true}); //disable button if date1 is greater than date2
        } else {
          setSearchState({...searchState, date1: value, buttonsDisabled: false}); //enable button if both dates are set
        }
        
      } else {
        setSearchState({...searchState, date1: value, buttonsDisabled: true}); //disable button if one of the dates is not set
        
      }
    }
  }

  //handle date2 change
  const handleDate2Change = (value:string) => {
    
    if(searchState.searchBy === "date_user") {
      if(searchState.username && searchState.date1) {
        setSearchState({...searchState, date2: "", buttonsDisabled: false}); //enable button if both dates are set
        
      } else {
        setSearchState({...searchState, date2: value, buttonsDisabled: true}); //disable button if one of the dates is not set
        
      }
    } else if (searchState.searchBy === "date") {
      if(searchState.date1) {
        if(searchState.date1 > value) {
          //open alert and set error message
          setSnackOpen(true);
          setError("Initial date must be earlier than the final date");

          setSearchState({...searchState, date2: "", buttonsDisabled: true}); //disable button if date1 is greater than date2
        } else {
          setSearchState({...searchState, date2: value, buttonsDisabled: false}); //enable button if both dates are set
        }
        
        
      } else {
        setSearchState({...searchState, date2: value, buttonsDisabled: true}); //disable button if one of the dates is not set
        
      }
    }
  }

  const handleSearch = () => {
    if(searchState.buttonsDisabled){
      setSnackOpen(true);
      setError("Please fill in all the fields or change the search criteria");
    } else {
      //set loading to true and error to empty
      setSearchState({...searchState, loading: true});
      setError("");

      //search defects
      if(searchState.searchBy === "all") {
        //search all defects
      } else if(searchState.searchBy === "user") {
        //search defects by user
      } else if(searchState.searchBy === "date") {
        //search defects by range date
      } else if(searchState.searchBy === "date_user") {
        //search defects by range date and user
      }

      
    }

    
  }

  /* Menu Filter functions */
  const handleFilterClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (value: string) => {
    /* Filter users by value */
    
    if (value === 'clear') {
      //clear filters
      let tempDefects = [...allDefects];
      /* Set new state */
      setDefects(tempDefects);
    } else if (value === 'date') {
      //sort by date
      let tempDefects = [...allDefects];
      tempDefects = tempDefects.sort((a, b) => {
        return a.Created.localeCompare(b.Created)
      });
      /* Set new state */
      setDefects(tempDefects);
    } else if (value === 'assignee') {
      //sort by assignee
      let tempDefects = [...allDefects];
      tempDefects = tempDefects.sort((a, b) => {
        if(a.Assignee === null) {
          return 1;
        } else if (b.Assignee === null) {
          return -1;
        }
        return a.Assignee.localeCompare(b.Assignee)
      });
      /* Set new state */
      setDefects(tempDefects);
    } else if (value === 'status') {
      //sort by status
      let tempDefects = [...allDefects];
      tempDefects = tempDefects.sort((a, b) => {
        return a.Status.localeCompare(b.Status)
      });
      /* Set new state */
      setDefects(tempDefects);
    } else if (value === 'priority') {
      //sort by priority
      let tempDefects = [...allDefects];
      tempDefects = tempDefects.sort((a, b) => {
        return a.Priority.localeCompare(b.Priority)
      });
      /* Set new state */
      setDefects(tempDefects);
    }


    /* Set new state */
    setSortBy(value);
    setAnchorEl(null);
  };

  /* Generate report functions */

  const handleGenerateReport = () => {

    if(searchState.buttonsDisabled){
      setSnackOpen(true);
      setError("Please fill in all the fields or change the search criteria");
    } else {
      //set loading to true and error to empty
      setSearchState({...searchState, loading: true});
      setError("");

      //dispatch values to generate report to redux store
      dispatch(setParametersType(searchState.searchBy));
      dispatch(setUsername(searchState.username));
      dispatch(setDate1(searchState.date1));
      dispatch(setDate2(searchState.date2));
      dispatch(setDefectsData(allDefects));

      //redirect to dashboard to continue with report generation
      Router.push('/admin/dashboard');
    }
  }

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - defects.length) : 0;

  /* Row of defects table */
  function Row(props: { row: Defect }) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    return (
      <React.Fragment>
        <StyledTableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <StyledTableCell component="th" scope="row">
            {row["Issue key"]}
          </StyledTableCell>
          <StyledTableCell align="right">{row["Created"] ? row["Created"] : "--"}</StyledTableCell>
          <StyledTableCell align="right">{row["Assignee"] ? row["Assignee"] : "--"}</StyledTableCell>
          <StyledTableCell align="right">{row["Status"] ? row["Status"] : "--"}</StyledTableCell>
          <StyledTableCell align="right">{row["Priority"] ? row["Priority"] : "--"}</StyledTableCell>
          <StyledTableCell align="right">
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
              style={{ color: 'white' }}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </StyledTableCell>
        </StyledTableRow>
        <StyledTableRow>
          <StyledTableCell style={{ paddingBottom: 0, paddingTop: 0, paddingRight: 20 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 0, paddingRight: 0 }}>
                <div>
                  <p className={styles.info__item}><b>Severity: </b>{row["Custom field (Severity)"]}</p>
                  <p className={styles.info__item}><b>Issue Type: </b>{row["Issue Type"]}</p>
                  <p className={styles.info__item}><b>Digital Service: </b>{row["Custom field (Digital Service)"]}</p>
                  <p className={styles.info__item}><b>Summary: </b>{row["Summary"]}</p>
                  <p className={styles.info__item}><b>Description: </b>{row["Description"]}</p>
                </div>
                
              </Box>
            </Collapse>
          </StyledTableCell>
        </StyledTableRow>
      </React.Fragment>
    );
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Cemex Fix - Dashboard</title>
        <meta name="description" content="Cemex Fix web application - developed by DFuture" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
          <SideBar/>
          <div className={styles.defects__container}>
            <div className={styles.defects__search__bar}>
                <p className={styles.search__title} style={{flex: searchState.searchBy === "all" ? "1" : "0"}}>Search defects</p>
                {(searchState.searchBy === "user" || searchState.searchBy === "date_user") && (
                    <input type="text" className={styles.input} placeholder="Enter username" value={searchState.username} onChange={(e) => handleUsernameChange(e.target.value)}/>
                )}

                {(searchState.searchBy === "date" || searchState.searchBy === "date_user") && (
                    <input type="date" className={styles.input} value={searchState.date1} onChange={(e) => handleDate1Change(e.target.value)}/>
                )}

                {(searchState.searchBy === "date" || searchState.searchBy === "date_user") && (
                    <input type="date" className={styles.input} value={searchState.date2} onChange={(e) => handleDate2Change(e.target.value)}/>
                )}

                {/* Search by menu */}
                <Select
                  labelId="demo-customized-select-label"
                  id="demo-customized-select"
                  value={searchState.searchBy}
                  onChange={(e) => handleSearchByChange(e.target.value)}
                  style={{width: "100% !important"}}
                  input={<TransparentInput />}
                >
                  <MenuItem value={"all"}>All defects</MenuItem>
                  <MenuItem value={"user"}>By user</MenuItem>
                  <MenuItem value={"date"}>By date range</MenuItem>
                  <MenuItem value={"date_user"}>By date range and user</MenuItem>
                </Select>

                {/* Search button */}
                <IconButton onClick={handleSearch}>
                    <ArrowCircleRightRoundedIcon className={styles.icon} />
                </IconButton>

                {/* Filter button */}
                <IconButton onClick={handleFilterClick}>
                    <FilterAltRoundedIcon className={styles.icon} />
                </IconButton>

                {/* Filter menu */}
                <StyledMenu
                  id="demo-customized-menu"
                  MenuListProps={{
                    'aria-labelledby': 'demo-customized-button',
                  }}
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                >
                  <MenuItem onClick={() => {handleClose('clear')}} disableRipple>
                    <HighlightOffRoundedIcon />
                    Clear filters
                  </MenuItem>
                  <MenuItem onClick={() => {handleClose('date')}} disableRipple>
                    <DateRangeRoundedIcon />
                    Date
                  </MenuItem>
                  <MenuItem onClick={() => {handleClose('assignee')}} disableRipple>
                    <PersonRoundedIcon />
                    Assignee
                  </MenuItem>
                  <MenuItem onClick={() => {handleClose('status')}} disableRipple>
                    <CheckCircleOutlineRoundedIcon />
                    Status
                  </MenuItem>
                  <MenuItem onClick={() => {handleClose('priority')}} disableRipple>
                    <PriorityHighRoundedIcon />
                    Priority
                  </MenuItem>
                </StyledMenu>


                {/* Generate report button */}
                <button className={styles.generate__btn} onClick={handleGenerateReport}>
                    Generate report
                </button>
            </div>

            {searchState.loading ? (
                <div className={styles.loader__container}>
                    <InfinitySpin color="white"  width='200'/>
                </div>
            ) : (
                <>
                    {/* list of defects */}
                    <div className={styles.defects__list__container}>
                        <TableContainer sx={{ maxHeight: 'calc(100vh - 350px)', minHeight: 'cacl(100vh - 350px)'}}>
                          <Table aria-label="collapsible table" >
                            <TableHead>
                              <TableRow>
                                <StyledTableCell>Issue key</StyledTableCell>
                                <StyledTableCell align="right">Date</StyledTableCell>
                                <StyledTableCell align="right">Assignee</StyledTableCell>
                                <StyledTableCell align="right">Status</StyledTableCell>
                                <StyledTableCell align="right">Priority</StyledTableCell>
                                <StyledTableCell />
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {defects.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                                <Row key={row['Issue key']} row={row} />
                              ))}
                              {emptyRows > 0 && (
                                <TableRow
                                  style={{
                                    height: (53) * emptyRows,
                                  }}
                                >
                                  <StyledTableCell colSpan={6} />
                                </TableRow>
                              )}
                            </TableBody>
                          </Table>
                        </TableContainer>
                        <TablePagination
                          rowsPerPageOptions={[15, 25, 50]}
                          component="div"
                          style={{color: 'white !important'}}
                          count={defects.length}
                          rowsPerPage={rowsPerPage}
                          page={page}
                          onPageChange={handleChangePage}
                          onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </div>
                </>
            )}
          </div>

          {/* Snackbar Alert */}
          <Snackbar open={snackOpen} autoHideDuration={6000} onClose={handleSnackClose} anchorOrigin={{vertical: 'top', horizontal: 'right'}}>
            <Alert onClose={handleSnackClose} severity="error" sx={{ width: '100%' }}>
              {error ? error : "An error occured"}
            </Alert>
          </Snackbar>
          
      </main>
    </div>
  )
}

export default Defects
