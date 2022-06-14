/* 
  Component that renders to login page
*/

import type { NextPage } from 'next'
import Router from 'next/router'

/* React */
import React, { useEffect, useState, useRef } from 'react'

/* Redux */
import { 
  setDropDepth, 
  setInDropZone, 
  setCurrentTab, 
  setResultsDefects, 
  setResultsReportType, 
  setHistoricParametersType, 
  setHistoricUsername, 
  setHistoricDate1, 
  setHistoricDate2, 
  setHistoricIssueType,
  setReduxCurrentUser
} from "../../redux/actions"
import { selectDropDepth } from "../../redux/states/file/reducer"
import { selectUser } from "../../redux/states/user/reducer"
import { selectParametersType, selectUsername, selectDate1, selectDate2, selectIssueType } from '../../redux/states/historicReport/reducer'
import { useAppSelector, useAppDispatch } from '../../redux/hooks'

/* Components */
import Head from 'next/head'
import SideBar from '../../components/admin/SideBar'
import FileBtn from '../../components/admin/FileBtn'
import ErrorMessage from '../../components/admin/ErrorMessage'
import WarningMessage from '../../components/admin/WarningMessage'
import { TransparentInput } from '../../components/admin/Selects'

/* CSS */
import styles from '../../styles/admin/Dashboard.module.css'

/* Material - UI */
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

/* Material UI - icons */
import UploadFileRoundedIcon from '@mui/icons-material/UploadFileRounded';
import AssessmentRoundedIcon from '@mui/icons-material/AssessmentRounded';

/* Loader Spinner */
import { InfinitySpin } from 'react-loader-spinner'

/* Interfaces */
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
    "Cluster": number
}

interface Message {
  message: string,
}

const Dashboard: NextPage = (props) => {

  /* useState - upload */
  const [state, setState] = useState({
    fileName: "",
    loading: false,
    error: "",
    success: false,
    isLoggedIn: false,
    step: 0,
    reportType: "bert", // (bert or lda)
    numClusters: 0,
    isHistoric: false,
  });

  const [file, setFile] = useState<File>();
  

  /* Redux */
  const dispatch = useAppDispatch(); //function that allows to trigger actions that update the redux state
  
  /* redux - user */
  const user = useAppSelector(selectUser) //function that allows to get the current user from the redux state
  
  /* redux - file */
  const dropDepth = useAppSelector(selectDropDepth) //function that allows to get the dropDepth from the redux state

  /* redux - historic report */
  const historicParametersType = useAppSelector(selectParametersType) //function that allows to get the historic parametersType from the redux state
  const historicUsername = useAppSelector(selectUsername) //function that allows to get the historic username from the redux state
  const historicDate1 = useAppSelector(selectDate1) //function that allows to get the historic date1 from the redux state
  const historicDate2 = useAppSelector(selectDate2) //function that allows to get the historic date2 from the redux state
  const historicIssueType  = useAppSelector(selectIssueType) //function that allows to get the historic issueType from the redux state

  /* Function to validate user */
  async function validateUser(url: string, username:string, accessToken:string): Promise<Message> {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin':'*'
      },

      //make sure to serialize your JSON body
      body: JSON.stringify({
        username: username,
        accessToken: accessToken,
      }),
    })
    console.log(response)
    if (!response.ok) {
      throw new Error(response.statusText)
    }
    return response.json() as Promise<Message>
  }

  useEffect(() => {
    /* Set current tab */
    dispatch(setCurrentTab('dashboard'));

    /* Handle set or redirect user */
    console.log(user);
    if (user === null) {
      //get user from local storage
      //@ts-ignore
      const tempUser = JSON.parse(localStorage.getItem('user'));
      console.log(tempUser)

      if (tempUser) {
          //set tempUser
          //validate if user session is still valid
          try {
            validateUser(process.env.NEXT_API_HOST+'/test-token', tempUser.username, tempUser.accessToken)
            .then(data => {
              console.log(data)
              if (data.message === 'success') {
                //set user state in redux
                console.log('success')

                //set current user in redux state
                dispatch(setReduxCurrentUser({username: tempUser.username, role: tempUser.role, accessToken: tempUser.accessToken, validUntil: tempUser.validUntil}));
              } else {
                //redirect to login page
                console.log('invalid')
                Router.push('/')
              }
            })
        } catch (error) {
          //redirect to login page
          console.log('invalid')
          Router.push('/')
        }

      } else {
        Router.push('/')
      }
    } 

    /* Check if there is a historic report */
    if (historicParametersType !== "") {
      setState({ ...state, isHistoric: true, step: 1 });
    }

  }, []);

  /* Functions - handle drag and drop */
  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    dispatch(setDropDepth(dropDepth + 1)); //increase drop depth
  };
  
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    dispatch(setDropDepth(dropDepth - 1)); //decrease drop depth
    if(dropDepth > 0) return //if drop depth is greater than 0, do nothing
    dispatch(setInDropZone(false)); //set in drop zone to false
  };
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    e.dataTransfer.dropEffect = 'copy'; //allows drop
    dispatch(setInDropZone(true)); //set in drop zone to true
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    let files = e.dataTransfer.files; //get files
  
    if (files && files.length > 0) {
      //const existingFiles = data.fileList.map(f => f.name)
      //files = files.filter(f => !existingFiles.includes(f.name))
      
      var file = files[0];
      console.log('file: ', file);

      //validate file
      if(file.type !== 'text/csv') {
        setState({
          ...state,
          error: 'Only CSV files are allowed',
          loading: false
        });
        console.log('error: ', 'Only CSV files are allowed');
        return;
      } else if(files.length > 1) {
        setState({
          ...state,
          error: 'Only one file is allowed',
          loading: false
        });
        console.log('error: ', 'Only one file is allowed');
        return;
      } else {
        e.dataTransfer.clearData(); //clear data
        dispatch(setDropDepth(0)); //reset drop depth to 0
        dispatch(setInDropZone(false)); //reset in drop zone to false

        setState({
          ...state,
          fileName: file.name,
          error: "",
          loading: true,
        });
        setFile(file);
      }
    }
  };


  /* Functions - handle file upload */
  const uploadFile = (e:any) => {
    console.log(e.target.files[0]);

    let files = e.target.files; //get files
    var file = files[0];

    //validate file
    if(file.type !== 'text/csv') {
      setState({
        ...state,
        error: 'Only CSV files are allowed',
        loading: false
      });
      console.log('error: ', 'Only CSV files are allowed');
      return;
    } else {

      setState({
        ...state,
        fileName: file.name,
        error: "",
        loading: true,
      });
      setFile(file); //set file
    }
  };

  /* Function to go to next step */
  const handleNextClick = (num: number) => {
    if (num === 0) {
      //clear historic data
      dispatch(setHistoricParametersType(""));
      dispatch(setHistoricUsername(""));
      dispatch(setHistoricDate1(""));
      dispatch(setHistoricDate2(""));
      dispatch(setHistoricIssueType(""));
      
      setState({ ...state, step: 0, isHistoric: false });
    } else if(num === 1) {
      setState({
        ...state,
        step: num,
      });
    } else if(num === 2) {
      if(state.reportType === "lda") {
        if(state.numClusters <= 1) {
          setState({
            ...state,
            error: 'You must select at least 2 clusters',
            loading: false
          });
        } else {
          setState({
            ...state,
            step: num,
            loading: true,
          });

          //trigger action to get the report
          generateReport();
        }
      } else {
        //trigger action to get the report
        setState({
          ...state,
          step: num,
          loading: true,
        });
        generateReport();
      }
    } 
  }

  /* <--------funtions to generate report---------> */
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
        user: user.user,
        accessToken: user.accessToken,
        analysis: state.reportType === "lda" ? state.numClusters : "default",
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
        user: historicUsername,
        analysis: state.reportType === "lda" ? state.numClusters : "default",
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
        username: user.username,
        accessToken: user.accessToken,
        analysis: state.reportType === "lda" ? state.numClusters : "default",
        startDate: `${historicDate1}T00:00:00`,
        endDate: `${historicDate2}T23:59:59`
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
        analysis: state.reportType === "lda" ? state.numClusters : "default",
        user: historicUsername,
        startDate: `${historicDate1}T00:00:00`,
        endDate: `${historicDate2}T23:59:59`
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
        user: user.username,
        accessToken: user.accessToken,
        analysis: state.reportType === "lda" ? state.numClusters : "default",
        issueType: historicIssueType
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
        analysis: state.reportType === "lda" ? state.numClusters : "default",
        user: historicUsername,
        issueType: historicIssueType
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
        user: user.username,
        accessToken: user.accessToken,
        analysis: state.reportType === "lda" ? state.numClusters : "default",
        issueType: historicIssueType,
        startDate: `${historicDate1}T00:00:00`,
        endDate: `${historicDate2}T23:59:59`
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
        analysis: state.reportType === "lda" ? state.numClusters : "default",
        user: historicUsername,
        issueType: historicIssueType,
        startDate: `${historicDate1}T00:00:00`,
        endDate: `${historicDate2}T23:59:59`
      }),
    })
    console.log(response)
    if (!response.ok) {
      throw new Error(response.statusText)
    }
    return await (response.json() as Promise<Array<Defect>>)
  }

  /* Clusterize using BERT */
  async function clusterizeBERT(url:string): Promise<Array<Defect>> {

    let data = new FormData();
    //@ts-ignore
    data.append("file", file);
    
    data.append("data", JSON.stringify({"user": user.username, "accessToken": user.accessToken}));

    const response = await fetch(url, {
      method: "POST",
      headers: {
        //'Accept': 'application/json',
        //'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },

      //make sure to serialize your JSON body
      body: data
    })
    console.log(response)
    if (!response.ok) {
      throw new Error(response.statusText)
    }
    return await (response.json() as Promise<Array<Defect>>)
  }

  /* Clusterize using LDA */
  async function clusterizeLDA(url:string): Promise<Array<Defect>> {
    
    let data = new FormData();
    //@ts-ignore
    data.append("file", file);
    
    data.append("data", JSON.stringify({"user": user.username, "accessToken": user.accessToken}));
    /* fetch(target, {
        method: "POST",
        body: data
    }); */

    const response = await fetch(url, {
      method: "POST",
      headers: {
        //'Accept': 'application/json',
        //'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: data,

      //make sure to serialize your JSON body
      
      /* body: JSON.stringify({
        user: user.username,
        accessToken: user.accessToken,
        file: file
      }), */
    })
    console.log(response)
    if (!response.ok) {
      throw new Error(response.statusText)
    }
    return await (response.json() as Promise<Array<Defect>>)
  }

  /* function to generate report */
  const setData = (data: Array<Defect>) => {
    console.log(data)
    //set redux state
    dispatch(setResultsDefects(data));
    dispatch(setResultsReportType(state.reportType));

    //redirect to admin results
    Router.push('/admin/results');
  }

  const generateReport = () => {
    console.log('generate report');
    
    if(state.isHistoric) {
      //generate historic report

      if(historicParametersType === "all") {
        //search all defects
        try {
           getAllDefects(process.env.NEXT_API_HOST+'/defects')
          .then(data => {
            if (data.length > 1) {
              console.log(data);
              //set local state
              
              setData(data);
              
            } else {
              console.log('error: ', data);
              setState({...state, error: "An error occured generating the report", loading: false, step: 1});
            }
          })
        } catch (error) {
          console.log(error);
          //@ts-ignore
          setState({...state, error: error, loading: false, step: 1})
        }

        

      } else if(historicParametersType === "user") {
        //search defects by user
        try {
           getUserDefects(process.env.NEXT_API_HOST+'/defects/get')
          .then(data => {
            if (data.length > 1) {
              console.log(data);
              
              setData(data);

            } else {
                console.log('error: ', data);
                setState({...state, error: "An error occured generating the report", loading: false, step: 1});
            }
          })
        } catch (error) {
          console.log(error);
          //@ts-ignore
          setState({...state, error: error, loading: false, step: 1})
        }



      } else if(historicParametersType === "date") {
        //search defects by range date
        try {
          getDateDefects(process.env.NEXT_API_HOST+'/defects/date')
          .then(data => {
            if (data.length > 1) {
              console.log(data);
              
              setData(data);

            } else {
              console.log('error: ', data);
              setState({...state, error: "An error occured generating the report", loading: false, step: 1});
            }
          })
        } catch (error) {
          console.log(error);
          //@ts-ignore
          setState({...state, error: error, loading: false, step: 1})
        }



      } else if(historicParametersType === "date_user") {
        //search defects by range date and user
        try {
          getDateUserDefects(process.env.NEXT_API_HOST+'/defects/date/get')
          .then(data => {
            if (data.length > 1) {
              console.log(data);
              
              setData(data);

            } else {
              console.log('error: ', data);
              setState({...state, error: "An error occured generating the report", loading: false, step: 1});
            }
          })
        } catch (error) {
          console.log(error);
          //@ts-ignore
          setState({...state, error: error, loading: false, step: 1})
        }
          
      } else if(historicParametersType === "issue") {
        //search defects by issue type
        try {
          getIssueDefects(process.env.NEXT_API_HOST+'/defects/issue')
          .then(data => {
            if (data.length > 1) {
              console.log(data);
              
              setData(data);
              
            } else {
              console.log('error: ', data);
              setState({...state, error: "An error occured generating the report", loading: false, step: 1});
            }
          })
        } catch (error) {
          console.log(error);
          //@ts-ignore
          setState({...state, error: error, loading: false, step: 1})
        }
          
      } else if(historicParametersType === "issue_user") {
        //search defects by issue type and user
        try {
          getIssueUserDefects(process.env.NEXT_API_HOST+'/defects/issue/get')
          .then(data => {
            if (data.length > 1) {
              console.log(data);
              
              setData(data);
              
            } else {
              console.log('error: ', data);
              setState({...state, error: "An error occured generating the report", loading: false, step: 1});
            }
          })
        } catch (error) {
          console.log(error);
          //@ts-ignore
          setState({...state, error: error, loading: false, step: 1})
        }
          
      } else if(historicParametersType === "issue_date") {
        //search defects by issue type and date
        try {
          getIssueDateDefects(process.env.NEXT_API_HOST+'/defects/issue/date')
          .then(data => {
            if (data.length > 1) {
              console.log(data);
              
              setData(data);
              
            } else {
              console.log('error: ', data);
              setState({...state, error: "An error occured generating the report", loading: false, step: 1});
            }
          })
        } catch (error) {
          console.log(error);
          //@ts-ignore
          setState({...state, error: error, loading: false, step: 1})
        }
          
      } else if(historicParametersType === "issue_date_user") {
        //search defects by issue type, date and user
        try {
          getIssueDateUserDefects(process.env.NEXT_API_HOST+'/defects/issue/date/get')
          .then(data => {
            if (data.length > 1) {
              console.log(data);
              //set local state
              setData(data);
            } else {
              console.log('error: ', data);
              setState({...state, error: "An error occured generating the report", loading: false, step: 1});
            }
          })
        } catch (error) {
          console.log(error);
          //@ts-ignore
          setState({...state, error: error, loading: false, step: 1})
        }
          
      }
    


    } else {
      //generate report by file

      if(state.reportType === "lda") {
        //generate report with lda
        try {
          clusterizeLDA(`process.env.NEXT_API_HOST/clusterize/${state.numClusters}`)
          .then(data => {
            if (data.length > 1) {
              console.log('data: ', data);

              setData(data);
            } else {
              console.log('error: ', data);
              setState({...state, error: "An error occured generating the report", loading: false, step: 1});
            }
          })
        } catch (error) {
          console.log(error);
          //@ts-ignore
          setState({...state, error: error, loading: false, step: 1})
          //setError("Error generating report");
        }
        
      } else {
        //generate report with bert
        try {
          clusterizeBERT(process.env.NEXT_API_HOST+'/clusterize')
          .then(data => {
            if (data.length > 1) {
              console.log('data: ', data);

              setData(data);
            } else {
              console.log('error: ', data);
              setState({...state, error: "An error occured generating the report", loading: false, step: 1});
            }
          })
        } catch (error) {
          console.log(error);
          //@ts-ignore
          setState({...state, error: error, loading: false, step: 1})
        }
      }
    }

  };

  

  return (
    <div className={styles.container}>
      <Head>
        <title>Cemex Fix - Dashboard</title>
        <meta name="description" content="Cemex Fix web application - developed by DFuture" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
          <SideBar/>
          <div className={styles.dashboard__container}>

            {/* Upload file - step 0 */}
            {state.step === 0 && (
              <div className={styles.upload__container}>
                <div className={styles.upload__drop}
                  onDrop={e => handleDrop(e)}
                  onDragOver={e => handleDragOver(e)}
                  onDragEnter={e => handleDragEnter(e)}
                  onDragLeave={e => handleDragLeave(e)}
                >
                  <UploadFileRoundedIcon className={styles.upload__icon} />
                  <p className={styles.drag__text}>Drag and drop file (.csv)</p>
                  <p className={styles.or__text}>or</p>
                  
                  {/* upload btnn */}
                  <FileBtn uploadFile={uploadFile}/>
                
                  {/* file name */}
                  {state.fileName !== "" && (
                    <p>{state.fileName}</p>
                  )}

                  {/* Error message */}
                  {state.error !== "" && (
                    <ErrorMessage message={state.error}/>
                  )}

                  {state.fileName !== "" && (
                    <button className={styles.next__btn} onClick={() => {handleNextClick(1)}}>Next</button>
                  )}
                  


                </div>
              </div>
            )}

            {/* Select type of report - step 1 */}
            {state.step === 1 && (
              <div className={styles.report__container}>
                <div className={styles.report__inner__container}>
                  <div className={styles.report__header}>
                    <h3 className={styles.report__title}>Select type of report</h3>
                    <AssessmentRoundedIcon className={styles.report__icon} />
                  </div>

                  {/* data for historic report */}
                  {state.isHistoric && (
                    <div className={styles.historical__container}>
                      <h4>Data for historical report:</h4>
                      {/* user */}
                      {(historicParametersType === "user" || historicParametersType === "date_user" || historicParametersType === "issue_user" || historicParametersType === "issue_date_user") && (
                        <p><b>Username:</b> {historicUsername}</p>
                      )}

                      {/* date */}
                      {(historicParametersType === "date" || historicParametersType === "date_user" || historicParametersType === "issue_date" || historicParametersType === "issue_date_user") && (
                        <>
                          <p><b>Initial date:</b> {historicDate1}</p>
                          <p><b>Final date:</b> {historicDate2}</p>
                        </>
                      )}

                      {/* issue */}
                      {(historicParametersType === "isse" || historicParametersType === "issue_user" || historicParametersType === "issue_date" || historicParametersType === "issue_date_user") && (
                        <p><b>Issue type:</b> {historicIssueType}</p>
                      )}


                    </div>
                  )}

                  {/* Select type of report */}
                  <div className={styles.select__container}>
                    <Select
                      labelId="demo-customized-select-label"
                      id="demo-customized-select"
                      value={state.reportType}
                      onChange={(e) => setState({...state, reportType: e.target.value})}
                      input={<TransparentInput />}
                      style={{width: '100%'}}
                    >
                      <MenuItem value={"bert"}>Recommend clusters</MenuItem>
                      <MenuItem value={"lda"}>Select number of clusters</MenuItem>
                    </Select>
                  </div>

                  {/* number of clusters if lda selected */}
                  {state.reportType === "lda" && (
                    <div className={styles.select__container}>
                      <p>Enter the number of clusters (min 2)</p>
                      <input type="number" className={styles.input} value={state.numClusters} onChange={(e) => {setState({...state, numClusters: Number(e.target.value)})}}/>
                    </div>
                  )}

                  {/* next btn */}
                  <button className={styles.next__btn} style={{marginBottom: state.isHistoric ? "20px": "0px"}} onClick={() => {handleNextClick(2)}}>{`Generate ${state.isHistoric ? "historic" : ""} report`}</button>
                  {state.isHistoric && (
                    <button className={styles.next__btn} style={{background: "#D24244"}} onClick={() => {handleNextClick(0)}}>Clear historic data</button>
                  )}
                  

                  {/* Error message */}
                  {state.error !== "" && (
                    <ErrorMessage message={state.error}/>
                  )}
                </div>
              </div>
            )}

            {/* Loading - step 2 */}
            {state.step === 2 && (
              <>
                {state.loading ? (
                  <div className={styles.loader}>
                    <div className={styles.loader__container}>
                      <div className={styles.loader__inner__container}>
                        <InfinitySpin color="white"  width='200'/>
                      </div>
                      <WarningMessage message="Generating report... (please do not close the window)"/>
                    </div>
                  </div>
                ) : (
                  <>
                    
                  </>
                )}
              </>
            )}
          </div>
          
      </main>
    </div>
  )
}

export default Dashboard
