/* 
  Component that renders to login page
*/

import type { NextPage } from 'next'
import Router from 'next/router'

/* React */
import React, { useEffect, useState, useRef } from 'react'

/* Redux */
import { setDropDepth, setInDropZone, setCurrentTab, setReportType, setNumberClusters } from "../../redux/actions"
import { selectDropDepth } from "../../redux/states/file/reducer"
import { selectUser } from "../../redux/states/user/reducer"
import { selectDefectsData, selectParametersType, selectUsername, selectDate1, selectDate2, selectReportType, selectNumberClusters } from '../../redux/states/historicReport/reducer'
import { useAppSelector, useAppDispatch } from '../../redux/hooks'

/* Components */
import Head from 'next/head'
import SideBar from '../../components/admin/SideBar'
import FileBtn from '../../components/admin/FileBtn'
import ErrorMessage from '../../components/admin/ErrorMessage'
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

const Dashboard: NextPage = (props) => {

  /* useState - upload */
  const [state, setState] = useState({
    fileName: "",
    file: undefined,
    loading: false,
    error: "",
    success: false,
    isLoggedIn: false,
    step: 0,
    reportType: "bert", // (BERT or LDA)
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
  const historicDefects = useAppSelector(selectDefectsData) //function that allows to get the historic defects from the redux state
  const historicParametersType = useAppSelector(selectParametersType) //function that allows to get the historic parametersType from the redux state
  const historicUsername = useAppSelector(selectUsername) //function that allows to get the historic username from the redux state
  const historicDate1 = useAppSelector(selectDate1) //function that allows to get the historic date1 from the redux state
  const historicDate2 = useAppSelector(selectDate2) //function that allows to get the historic date2 from the redux state
  const historicReportType = useAppSelector(selectReportType) //function that allows to get the historic report type from the redux state
  const historicNumClusters = useAppSelector(selectNumberClusters) //function that allows to get the historic number of clusters from the redux state

  /* File btn upload */
  //const fileUpload = useRef(null);

  

  useEffect(() => {
    /* Set current tab */
    dispatch(setCurrentTab('dashboard'));


    /* Redirect user if needed */
    //console.log(user);
    if (!user) {
      Router.push('/');
    }

    /* Check if there is a historic report */
    if (historicDefects.length > 0) {
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
    if(num === 1) {
      setState({
        ...state,
        step: num,
      });
    } else if(num === 2) {
      dispatch(setReportType(state.reportType)); //set report type in redux state
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
          dispatch(setNumberClusters(state.numClusters)); //set number of clusters in redux state
        }
      } else {
        setState({
          ...state,
          step: num,
          loading: true,
        });
      }
    } 
  }

  /* function to generate report */
  const generateReport = async () => {
    console.log('generate report');
    setState({
      ...state,
      success: true,
      loading: true,
    });
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
                      {(historicParametersType === "user" || historicParametersType === "date_user") && (
                        <p><b>Username:</b> {historicUsername}</p>
                      )}

                      {/* date */}
                      {(historicParametersType === "date" || historicParametersType === "date_user") && (
                        <p><b>Initial date:</b> {historicDate1}</p>
                      )}

                      {/* date and user */}
                      {(historicParametersType === "date" || historicParametersType === "date_user") && (
                        <p><b>Final date:</b> {historicDate2}</p>
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
                  <button className={styles.next__btn} onClick={() => {handleNextClick(2)}}>{`Generate ${state.isHistoric ? "historic" : ""} report`}</button>

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
                  <div className={styles.loader__container}>
                    <InfinitySpin color="white"  width='200'/>
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
