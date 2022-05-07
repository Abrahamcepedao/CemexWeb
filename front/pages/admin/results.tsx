/* 
  Component that renders to login page
*/

import type { NextPage } from 'next'
import Router from 'next/router'

/* React */
import React, { useEffect, useState } from 'react'

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
import styles from '../../styles/admin/Results.module.css'

/* Material - UI */
import { IconButton } from '@mui/material'
import Chip from '@mui/material/Chip';

/* Material UI - icons */
import UploadFileRoundedIcon from '@mui/icons-material/UploadFileRounded';
import AssessmentRoundedIcon from '@mui/icons-material/AssessmentRounded';
import BugReportRoundedIcon from '@mui/icons-material/BugReportRounded';
import BookmarksRoundedIcon from '@mui/icons-material/BookmarksRounded';
import DonutSmallRoundedIcon from '@mui/icons-material/DonutSmallRounded';
import BarChartRoundedIcon from '@mui/icons-material/BarChartRounded';
import ArrowDropUpRoundedIcon from '@mui/icons-material/ArrowDropUpRounded';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import CircleRoundedIcon from '@mui/icons-material/CircleRounded';

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


  

  useEffect(() => {
    /* Set current tab */
    dispatch(setCurrentTab('dashboard'));


    /* Redirect user if needed */
    //console.log(user);
    if (!user) {
      //Router.push('/');
    } else {
      
    }


    
  }, []);

  
  

  return (
    <div className={styles.container}>
      <Head>
        <title>Cemex Fix - Dashboard</title>
        <meta name="description" content="Cemex Fix web application - developed by DFuture" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <SideBar/>
        <div className={styles.results__container}>
            <div className={styles.results__left}>
                {/* left upper - facts */}
                <div className={styles.facts__container}>
                    <div className={styles.fact__item} style={{marginRight: '25px'}}>
                        <div className={styles.fact__icon__container}>
                            <BugReportRoundedIcon className={styles.fact__icon}/>
                        </div>
                        <div className={styles.fact__text__container}>
                            <p className={styles.fact__number}>
                                1,466
                            </p>
                            <p className={styles.fact__text}>
                                Defects
                            </p>
                        </div>
                    </div>

                    <div className={styles.fact__item}>
                        <div className={styles.fact__icon__container}>
                            <BookmarksRoundedIcon className={styles.fact__icon}/>
                        </div>
                        <div className={styles.fact__text__container}>
                            <p className={styles.fact__number}>
                                1,466
                            </p>
                            <p className={styles.fact__text}>
                                Defects
                            </p>
                        </div>
                    </div>
                </div>

                {/* left lower - graph */}
                <div className={styles.graph__container}>
                    <div className={styles.graph__header}>
                        <h2>Distribution of defects</h2>
                        <div className={styles.graph__header__icons}>
                            <IconButton>
                                <DonutSmallRoundedIcon className={styles.graph__header__icon}/>
                            </IconButton>
                            <IconButton>
                                <BarChartRoundedIcon className={styles.graph__header__icon}/>
                            </IconButton>
                        </div>
                    </div>

                    <div className={styles.graph__body}>
                        <h2>graph goes here</h2>
                    </div>
                </div>


            </div>

            {/* right */}
            <div className={styles.results__right}>
                {/* actions */}
                <div className={styles.actions__container}>
                    <h2>Actions go here</h2>
                </div>

                {/* labels */}
                <div className={styles.labels__container}>
                    <h2>Select a label</h2>
                    <div className={styles.labels__list}>
                        <Chip
                            label="With icon"
                            onClick={() => {}}
                            icon={<CircleRoundedIcon style={{color: "#0bbfa4"}}/>}
                            variant="filled"
                            style={{fontWeight: 'bold', color: 'white', marginRight: '10px'}}
                        />
                        <Chip
                            label="With icon"
                            onClick={() => {}}
                            icon={<CircleRoundedIcon style={{color: "#0bbfa4"}}/>}
                            variant="filled"
                            style={{fontWeight: 'bold', color: 'white', marginRight: '10px'}}
                        />
                        <Chip
                            label="With icon"
                            onClick={() => {}}
                            icon={<CircleRoundedIcon style={{color: "#0bbfa4"}}/>}
                            variant="filled"
                            style={{fontWeight: 'bold', color: 'white', marginRight: '10px'}}
                        />
                        <Chip
                            label="With icon"
                            onClick={() => {}}
                            icon={<CircleRoundedIcon style={{color: "#0bbfa4"}}/>}
                            variant="filled"
                            style={{fontWeight: 'bold', color: 'white', marginRight: '10px'}}
                        />
                        <Chip
                            label="With icon"
                            onClick={() => {}}
                            icon={<CircleRoundedIcon style={{color: "#0bbfa4"}}/>}
                            variant="filled"
                            style={{fontWeight: 'bold', color: 'white', marginRight: '10px'}}
                        />
                        <Chip
                            label="With icon"
                            onClick={() => {}}
                            icon={<CircleRoundedIcon style={{color: "#0bbfa4"}}/>}
                            variant="filled"
                            style={{fontWeight: 'bold', color: 'white', marginRight: '10px'}}
                        />
                        <Chip
                            label="With icon"
                            onClick={() => {}}
                            icon={<CircleRoundedIcon style={{color: "#0bbfa4"}}/>}
                            variant="filled"
                            style={{fontWeight: 'bold', color: 'white', marginRight: '10px'}}
                        />
                        <Chip
                            label="With icon"
                            onClick={() => {}}
                            icon={<CircleRoundedIcon style={{color: "#0bbfa4"}}/>}
                            variant="filled"
                            style={{fontWeight: 'bold', color: 'white', marginRight: '10px'}}
                        />
                        <Chip
                            label="With icon"
                            onClick={() => {}}
                            icon={<CircleRoundedIcon style={{color: "#0bbfa4"}}/>}
                            variant="filled"
                            style={{fontWeight: 'bold', color: 'white', marginRight: '10px'}}
                        />
                       
                    </div>
                </div>

                {/* defects data */}
                <div className={styles.defects__container}>
                    <h2>Defects go here</h2>
                </div>
            </div>
        </div>
          
      </main>
    </div>
  )
}

export default Dashboard
