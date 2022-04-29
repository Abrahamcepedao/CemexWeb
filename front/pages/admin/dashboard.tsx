/* 
  Component that renders to login page
*/

import type { NextPage } from 'next'

/* React */
import React, { useEffect, useState, useRef } from 'react'

/* Redux */
import { setCurrentUser, setDropDepth, setInDropZone, setCurrentTab } from "../../redux/actions"
import { selectDropDepth } from "../../redux/states/file/reducer"
import { selectUser } from "../../redux/states/users/reducer"
import { useAppSelector, useAppDispatch } from '../../redux/hooks'

/* Components */
import Head from 'next/head'
import SideBar from '../../components/admin/SideBar'
import FileBtn from '../../components/admin/FileBtn'

/* CSS */
import styles from '../../styles/admin/Dashboard.module.css'

/* Material - UI */
import UploadFileRoundedIcon from '@mui/icons-material/UploadFileRounded';

/* Loader Spinner */
import { InfinitySpin } from 'react-loader-spinner'

const Dashboard: NextPage = (props) => {
  /* useState - currrent user */
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  /* useState - upload */
  const [state, setState] = useState({
    fileName: "",
    file: undefined,
    loading: false,
    error: "",
    success: false,
    isLoggedIn: false
  });

  const [file, setFile] = useState<File>();
  

  /* Redux */
  const dispatch = useAppDispatch(); //function that allows to trigger actions that update the redux state
  
  /* redux - user */
  const user = useAppSelector(selectUser) //function that allows to get the current user from the redux state
  
  /* redux - file */
  const dropDepth = useAppSelector(selectDropDepth) //function that allows to get the current user from the redux state

  /* File btn upload */
  const fileUpload = useRef(null);

  

  useEffect(() => {
    /* Set current tab */
    dispatch(setCurrentTab('dashboard'));


    console.log('user: ', user)
    if (isLoggedIn) {
      console.log('logged in');
    } else {
      console.log('not logged in');
    }
  }, [isLoggedIn]);

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

  /* functio to generate report */
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
            {state.success === false ? (
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

                  {state.fileName !== "" && (
                    <button className={styles.generate__btn} onClick={generateReport}>Generate report</button>
                  )}
                  


                </div>
              </div>
            ) : (
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
