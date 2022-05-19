/* 
  Component that renders to login page
*/

import type { NextPage } from 'next'
import Router from 'next/router'

/* React */
import React, { useEffect, useState } from 'react'

/* Redux */
import { 
  setCurrentTab, 
  setUsername, 
  setDate1, 
  setDate2, 
  setParametersType, 
  setReduxDefects, 
  setReduxSearchType,
  setReduxUsername,
  setReduxDate1,
  setReduxDate2,
  setReduxIssue,
  setIssueType
} from "../../redux/actions"
import { selectUser } from "../../redux/states/user/reducer"
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
import Tooltip from '@mui/material/Tooltip';

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
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import FileDownloadRoundedIcon from '@mui/icons-material/FileDownloadRounded';

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


interface User {
  user: string,
  type: string,
  createdAt: string,
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
    issue: 'Bug',
    loading: false,
    buttonsDisabled: true,
  });

  /* useState - issues */
  const [issues, setIssues] = useState<Array<string>>([]);

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
  const [allDefects, setAllDefects] = useState<Array<Defect>>([]);
  const [defects, setDefects] = useState<Array<Defect>>([]);

  /* Redux */
  const dispatch = useAppDispatch(); //function that allows to trigger actions that update the redux state
  const user = useAppSelector(selectUser) //function that allows to get the current user from the redux state


  /* handle fecthing issues - api */
  async function getIssues(url: string): Promise<Array<string>> {
    return fetch(url, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin':'*'
      },

      //make sure to serialize your JSON body
      body: JSON.stringify({
        user: user.user,
        accessToken: user.accessToken
      }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText)
      }
      return response.json() as Promise<Array<string>>
    })
  }

  useEffect(() => {
    /* set current tab */
    dispatch(setCurrentTab("defects"));

    /* Redirect user if needed */
    console.log(user);
    if (!user) {
      //Router.push('/');
    } else {
      setIsLoggedIn(true);
    }

    /* set defects if in local Storage */
    if (localStorage.getItem('defects') && localStorage.getItem("searchType")) {
      //set local state
      //@ts-ignore
      setAllDefects(JSON.parse(localStorage.getItem("defects")));
      //@ts-ignore
      setDefects(JSON.parse(localStorage.getItem("defects")));
      //@ts-ignore
      setSearchState({
        ...searchState,
        searchBy: localStorage.getItem("searchType") || "all",
        username: localStorage.getItem("defectUsername") || "",
        date1: localStorage.getItem("defectDate1") || "",
        date2: localStorage.getItem("defectDate2") || "",
      })

      //set redux state
      //@ts-ignore
      dispatch(setReduxDefects(JSON.parse(localStorage.getItem("defects"))));
      //@ts-ignore
      dispatch(setReduxSearchType(localStorage.getItem("searchType") || "all"));
      //@ts-ignore
      dispatch(setReduxUsername(localStorage.getItem("defectUsername") || ""));
      //@ts-ignore
      dispatch(setReduxDate1(localStorage.getItem("defectDate1") || ""));
      //@ts-ignore
      dispatch(setReduxDate2(localStorage.getItem("defectDate2") || ""));
    }

    /* fetch issues from api */
    if(user !== null) {
      try {
        getIssues('http://localhost:5000/issues')
        .then(data => {
          console.log(data[0]);
          let temp: string[] = [];
          data.forEach(issue => {
            temp.push(issue[0]);
          })

          console.log("temp", temp);
          //set local state
          setIssues(temp);
        })
      } catch (error) {
        console.log(error);
      }
    }
    
  }, []);

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
      
    } else if(value === "issue") {
      setSearchState({...searchState, searchBy: value, buttonsDisabled: searchState.issue.length === 0}); //disable search button if issue is empty

    } else if(value === "issue_user") {
      setSearchState({...searchState, searchBy: value, buttonsDisabled: searchState.issue.length === 0 || searchState.username.length === 0}); //disable search button if issue or username is empty

    } else if(value === "issue_date") {
      setSearchState({...searchState, searchBy: value, buttonsDisabled: searchState.issue.length === 0 || searchState.date1.length === 0 || searchState.date2.length === 0}); //disable search button if issue or date1 or date2 is empty

    } else if(value === "issue_date_user") {
      setSearchState({...searchState, searchBy: value, buttonsDisabled: searchState.issue.length === 0 || searchState.date1.length === 0 || searchState.date2.length === 0 || searchState.username.length === 0}); //disable search button if issue or date1 or date2 or username is empty

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

  //handle issue change
  const handleIssueChange = (value:string) => {
    setSearchState({...searchState, issue: value});
  }

  /* <------Search defects functions------> */
  /* Handle search all defects - api */
  async function getAllDefects(url: string): Promise<Array<Defect>> {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },

      //make sure to serialize your JSON body
      body: JSON.stringify({
        usersername: user.username,
        accessToken: user.accessToken,
        analysis: "none"
      }),
    })
    console.log(response)
    if (!response.ok) {
      throw new Error(response.statusText)
    }
    return await (response.json() as Promise<Array<Defect>>)
  }

  /* Handle search defects by user - api */
  async function getUserDefects(url: string): Promise<Array<Defect>> {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },

      //make sure to serialize your JSON body
      body: JSON.stringify({
        username: user.username,
        accessToken: user.accessToken,
        user: searchState.username,
        analysis: "none"
      }),
    })
    console.log(response)
    if (!response.ok) {
      throw new Error(response.statusText)
    }
    return await (response.json() as Promise<Array<Defect>>)
  }

  /* Handle search defects by date range - api */
  async function getDateDefects(url: string): Promise<Array<Defect>> {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },

      //make sure to serialize your JSON body
      body: JSON.stringify({
        username: searchState.username,
        accessToken: user.accessToken,
        analysis: "none",
        startDate: `${searchState.date1}T00:00:00`,
        endDate: `${searchState.date2}T23:59:59`
      }),
    })
    console.log(response)
    if (!response.ok) {
      throw new Error(response.statusText)
    }
    return await (response.json() as Promise<Array<Defect>>)
  }

  /* Handle search defects by date range and user - api */
  async function getDateUserDefects(url: string): Promise<Array<Defect>> {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },

      //make sure to serialize your JSON body
      body: JSON.stringify({
        username: user.username,
        accessToken: user.accessToken,
        analysis: "none",
        user: searchState.username,
        startDate: `${searchState.date1}T00:00:00`,
        endDate: `${searchState.date2}T23:59:59`
      }),
    })
    console.log(response)
    if (!response.ok) {
      throw new Error(response.statusText)
    }
    return await (response.json() as Promise<Array<Defect>>)
  }

  /* Handle search defects by isssue - api */
  async function getIssueDefects(url: string): Promise<Array<Defect>> {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },

      //make sure to serialize your JSON body
      body: JSON.stringify({
        username: searchState.username,
        accessToken: user.accessToken,
        analysis: "none",
        issueType: searchState.issue
      }),
    })
    console.log(response)
    if (!response.ok) {
      throw new Error(response.statusText)
    }
    return await (response.json() as Promise<Array<Defect>>)
  }

  /* Handle search defects by isssue and user - api */
  async function getIssueUserDefects(url: string): Promise<Array<Defect>> {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },

      //make sure to serialize your JSON body
      body: JSON.stringify({
        username: user.username,
        accessToken: user.accessToken,
        analysis: "none",
        user: searchState.username,
        issueType: searchState.issue
      }),
    })
    console.log(response)
    if (!response.ok) {
      throw new Error(response.statusText)
    }
    return await (response.json() as Promise<Array<Defect>>)
  }

  /* Handle search defects by issue, date - api */
  async function getIssueDateDefects(url: string): Promise<Array<Defect>> {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },

      //make sure to serialize your JSON body
      body: JSON.stringify({
        username: user.username,
        accessToken: user.accessToken,
        analysis: "none",
        issueType: searchState.issue,
        startDate: `${searchState.date1}T00:00:00`,
        endDate: `${searchState.date2}T23:59:59`
      }),
    })
    console.log(response)
    if (!response.ok) {
      throw new Error(response.statusText)
    }
    return await (response.json() as Promise<Array<Defect>>)
  }

  /* Handle search defects by issue, date and user - api */
  async function getIssueDateUserDefects(url: string): Promise<Array<Defect>> {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },

      //make sure to serialize your JSON body
      body: JSON.stringify({
        username: user.username,
        accessToken: user.accessToken,
        analysis: "none",
        user: searchState.username,
        issueType: searchState.issue,
        startDate: `${searchState.date1}T00:00:00`,
        endDate: `${searchState.date2}T23:59:59`
      }),
    })
    console.log(response)
    if (!response.ok) {
      throw new Error(response.statusText)
    }
    return await (response.json() as Promise<Array<Defect>>)
  }


  //handle search button click
  const handleSearch = () => {
    if(searchState.buttonsDisabled){
      setSnackOpen(true);
      setError("Please fill in all the fields or change the search criteria");
    } else {
      //set loading to true and error to empty
      setSearchState({...searchState, loading: true});
      setError("");

      //clear defects
      setDefects([]);
      setAllDefects([]);

      //search defects
      if(searchState.searchBy === "all") {
        //search all defects
        try {
           getAllDefects('http://localhost:5000/defects')
          .then(data => {
            if (data.length > 1) {
              console.log(data);
              //set local state
              setAllDefects(data);
              setDefects(data);
              setSearchState({...searchState, loading: false});

              //set defects in redux state
              dispatch(setReduxDefects(data));
              dispatch(setReduxSearchType("all"));
            
              setError(''); //clear error
            } else {
              console.log(data);
              setError("No defects found");
              setSnackOpen(true);
            }
          })
        } catch (error) {
          console.log(error);
          setError("Error retrieving defects");
          setSnackOpen(true);
        }

        

      } else if(searchState.searchBy === "user") {
        //search defects by user
        try {
           getUserDefects('http://localhost:5000/defects/get')
          .then(data => {
            if (data.length > 1) {
              console.log(data);
              //set local state
              setAllDefects(data);
              setDefects(data);
              setSearchState({...searchState, loading: false});

              //set defects in redux state
              dispatch(setReduxDefects(data));
              dispatch(setReduxSearchType("user"));
              dispatch(setReduxUsername(searchState.username));
            
              setError(''); //clear error
            } else {
              console.log(data);
              setError("No defects found");
              setSnackOpen(true);
            }
          })
        } catch (error) {
          console.log(error);
          setError("Error retrieving defects");
          setSnackOpen(true);
        }



      } else if(searchState.searchBy === "date") {
        //search defects by range date
        try {
          getDateDefects('http://localhost:5000/defects/date')
          .then(data => {
            if (data.length > 1) {
              console.log(data);
              //set local state
              setAllDefects(data);
              setDefects(data);
              setSearchState({...searchState, loading: false});

              //set defects in redux state
              dispatch(setReduxDefects(data));
              dispatch(setReduxSearchType("date"));
              dispatch(setReduxDate1(searchState.date1));
              dispatch(setReduxDate2(searchState.date2));
            
              setError(''); //clear error
            } else {
              console.log(data);
              setError("No defects found");
              setSnackOpen(true);
            }
          })
        } catch (error) {
          console.log(error);
          setError("Error retrieving defects");
          setSnackOpen(true);
        }



      } else if(searchState.searchBy === "date_user") {
        //search defects by range date and user
        try {
          getDateUserDefects('http://localhost:5000/defects/date/get')
          .then(data => {
            if (data.length > 1) {
              console.log(data);
              //set local state
              setAllDefects(data);
              setDefects(data);
              setSearchState({...searchState, loading: false});

              //set defects in redux state
              dispatch(setReduxDefects(data));
              dispatch(setReduxSearchType("date_user"));
              dispatch(setReduxUsername(searchState.username));
              dispatch(setReduxDate1(searchState.date1));
              dispatch(setReduxDate2(searchState.date2));
            
              setError(''); //clear error
            } else {
              console.log(data);
              setError("No defects found");
              setSnackOpen(true);
            }
          })
        } catch (error) {
          console.log(error);
          setError("Error retrieving defects");
        }
          
      } else if(searchState.searchBy === "issue") {
        //search defects by issue type
        try {
          getIssueDefects('http://localhost:5000/defects/issue')
          .then(data => {
            if (data.length > 1) {
              console.log(data);
              //set local state
              setAllDefects(data);
              setDefects(data);
              setSearchState({...searchState, loading: false});

              //set defects in redux state
              dispatch(setReduxDefects(data));
              dispatch(setReduxSearchType("issue"));
              dispatch(setReduxIssue(searchState.issue));
              
              setError(''); //clear error
            } else {
              console.log(data);
              setError("No defects found");
              setSnackOpen(true);
            }
          })
        } catch (error) {
          console.log(error);
          setError("Error retrieving defects");
        }
          
      } else if(searchState.searchBy === "issue_user") {
        //search defects by issue type and user
        try {
          getIssueUserDefects('http://localhost:5000/defects/issue/get')
          .then(data => {
            if (data.length > 1) {
              console.log(data);
              //set local state
              setAllDefects(data);
              setDefects(data);
              setSearchState({...searchState, loading: false});

              //set defects in redux state
              dispatch(setReduxDefects(data));
              dispatch(setReduxSearchType("issue_user"));
              dispatch(setReduxUsername(searchState.username));
              dispatch(setReduxIssue(searchState.issue));
              
              setError(''); //clear error
            } else {
              console.log(data);
              setError("No defects found");
              setSnackOpen(true);
            }
          })
        } catch (error) {
          console.log(error);
          setError("Error retrieving defects");
        }
          
      } else if(searchState.searchBy === "issue_date") {
        //search defects by issue type and date
        try {
          getIssueDateDefects('http://localhost:5000/defects/issue/date')
          .then(data => {
            if (data.length > 1) {
              console.log(data);
              //set local state
              setAllDefects(data);
              setDefects(data);
              setSearchState({...searchState, loading: false});

              //set defects in redux state
              dispatch(setReduxDefects(data));
              dispatch(setReduxSearchType("issue_date"));
              dispatch(setReduxIssue(searchState.issue));
              dispatch(setReduxDate1(searchState.date1));
              dispatch(setReduxDate2(searchState.date2));
              
              setError(''); //clear error
            } else {
              console.log(data);
              setError("No defects found");
              setSnackOpen(true);
            }
          })
        } catch (error) {
          console.log(error);
          setError("Error retrieving defects");
        }
          
      } else if(searchState.searchBy === "issue_date_user") {
        //search defects by issue type, date and user
        try {
          getIssueDateUserDefects('http://localhost:5000/defects/issue/date/get')
          .then(data => {
            if (data.length > 1) {
              console.log(data);
              //set local state
              setAllDefects(data);
              setDefects(data);
              setSearchState({...searchState, loading: false});

              //set defects in redux state
              dispatch(setReduxDefects(data));
              dispatch(setReduxSearchType("issue_date_user"));
              dispatch(setReduxIssue(searchState.issue));
              dispatch(setReduxUsername(searchState.username));
              dispatch(setReduxDate1(searchState.date1));
              dispatch(setReduxDate2(searchState.date2));
              
              setError(''); //clear error
            } else {
              console.log(data);
              setError("No defects found");
              setSnackOpen(true);
            }
          })
        } catch (error) {
          console.log(error);
          setError("Error retrieving defects");
        }
          
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
      dispatch(setIssueType(searchState.issue));

      //redirect to dashboard to continue with report generation
      Router.push('/admin/dashboard');
    }
  }


  //function to download file
  //@ts-ignore
  const downloadFile = ({ data, fileName, fileType }) => {
      const blob = new Blob([data], { type: fileType })

      const a = document.createElement('a')
      a.download = fileName
      a.href = window.URL.createObjectURL(blob)
      const clickEvt = new MouseEvent('click', {
          view: window,
          bubbles: true,
          cancelable: true,
      })
      a.dispatchEvent(clickEvt)
      a.remove()
  }
  
  //function to export defects to csv
  //@ts-ignore
  const exportToCsv = e => {
      e.preventDefault()

      // Headers for each column
      let headers = ['Issue key,Status,Priority,Custom field (Severity),Project key,Issue Type,Created,Assignee,Custom field (Digital Service),Summary,Description']

      //@ts-ignore
      let temp = []
      defects.map((defect) => {
          //clean Custom field (Digital Service)
          let digitalService:string = defect['Custom field (Digital Service)'];
          if(digitalService !== null){
              digitalService = digitalService.replace(/,/g, " ")
          }

          //clean summary
          var summary:string = defect.Summary
          if(summary !== null){
              summary = summary.replace(/,/g, " ")
              summary = summary.replaceAll(/[\n\r\t]/g,' ')
          }

          //clean description
          var desc:string = defect.Description;
          if(desc !== null){
              desc = desc.replace(/,/g, " ")
              desc = desc.replaceAll(/[\n\r\t]/g,' ')
          }

          temp.push([defect['Issue key'], defect['Status'], defect['Priority'], defect['Custom field (Severity)'], defect['Project key'], defect['Issue Type'], defect['Created'], defect['Assignee'], digitalService, summary, desc].join(','))
          
      })

      //@ts-ignore
      downloadFile({
          //@ts-ignore
          data: [...headers, ...temp].join('\n'),
          fileName: 'defects.csv',
          fileType: 'text/csv',
      })
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
                {(searchState.searchBy === "all" || searchState.searchBy === "issue") && (
                  <p className={styles.search__title} style={{flex: "1"}}>Search defects</p>
                )}
                {(searchState.searchBy === "user" || searchState.searchBy === "date_user" || searchState.searchBy === "issue_user" || searchState.searchBy === "issue_date_user") && (
                    <input type="text" className={styles.input} placeholder="Enter username" value={searchState.username} onChange={(e) => handleUsernameChange(e.target.value)}/>
                )}

                {(searchState.searchBy === "date" || searchState.searchBy === "date_user" || searchState.searchBy === "issue_date" || searchState.searchBy === "issue_date_user") && (
                    <input type="date" className={styles.input} value={searchState.date1} onChange={(e) => handleDate1Change(e.target.value)}/>
                )}

                {(searchState.searchBy === "date" || searchState.searchBy === "date_user" || searchState.searchBy === "issue_date" || searchState.searchBy === "issue_date_user") && (
                    <input type="date" className={styles.input} value={searchState.date2} onChange={(e) => handleDate2Change(e.target.value)}/>
                )}

                {(searchState.searchBy === "issue" || searchState.searchBy === "issue_user" || searchState.searchBy === "issue_date_user") && (
                  <Select
                    labelId="demo-customized-select-label"
                    id="demo-customized-select"
                    value={searchState.issue}
                    onChange={(e) => handleIssueChange(e.target.value)}
                    style={{width: "100% !important", marginRight: "15px"}}
                    input={<TransparentInput />}
                  >
                    {issues.map((issue) => (
                      <MenuItem key={issue} value={issue}>{issue}</MenuItem>
                    ))}
                    
                  </Select>
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
                  <MenuItem value={"date"}>By date</MenuItem>
                  <MenuItem value={"date_user"}>By date and user</MenuItem>
                  <MenuItem value={"issue"}>By issue type</MenuItem>
                  <MenuItem value={"issue_user"}>By issue type and user</MenuItem>
                  <MenuItem value={"issue_date"}>By issue type and date</MenuItem>
                  <MenuItem value={"issue_date_user"}>By issue type, date and user</MenuItem>
                </Select>

                {/* Search button */}
                <Tooltip title="search">
                  <IconButton onClick={handleSearch}>
                      <ArrowCircleRightRoundedIcon className={styles.icon} />
                  </IconButton>
                </Tooltip>

                {/* Filter button */}
                <Tooltip title="Filter">
                  <IconButton onClick={handleFilterClick} disabled={defects.length === 0}>
                      <FilterAltRoundedIcon className={styles.icon} />
                  </IconButton>
                </Tooltip>

                 {/* Download csv button */}
                <Tooltip title="Download csv">
                  <IconButton onClick={exportToCsv} disabled={defects.length === 0}>
                      <FileDownloadRoundedIcon className={styles.icon} />
                  </IconButton>
                </Tooltip>

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

            {defects.length === 0 ? (
                <div className={styles.message__container}>
                    {searchState.loading ? (
                      <div className={styles.message__inner__container}>
                        <InfinitySpin color="white"  width='200'/>
                      </div>
                    ) : (
                      <div className={styles.message__inner__container}>
                          <InfoRoundedIcon className={styles.message__icon} />
                          <h3>No results yet - Make another search</h3>
                      </div>
                    )}
                    
                </div>
            ) : (
                <>
                    {/* list of defects */}
                    <div className={styles.defects__list__container}>
                        <TableContainer sx={{ maxHeight: 'calc(100vh - 290px)', minHeight: 'cacl(100vh - 290px)'}}>
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
