/* 
  Component that renders to login page
*/

import type { NextPage } from 'next'

/* React */
import React, { useEffect, useState } from 'react'

/* Redux */
import { setCurrentUser } from "../../redux/actions"
import { selectUser } from "../../redux/states/users/reducer"
import { useAppSelector, useAppDispatch } from '../../redux/hooks'

/* Components */
import Head from 'next/head'
import SideBar from '../../components/admin/SideBar'

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
  const [file, setFile] = useState("");
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(true);

  /* Redux */
  const dispatch = useAppDispatch(); //function that allows to trigger actions that update the redux state
  const user = useAppSelector(selectUser) //function that allows to get the current user from the redux state

  useEffect(() => {
    console.log('user: ', user)
    if (isLoggedIn) {
      console.log('logged in');
    } else {
      console.log('not logged in');
    }
  }, [isLoggedIn]);

  /* Functions */


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
            {file === "" ? (
              <div className={styles.upload__container}>
                <div className={styles.upload__drop}>
                  <UploadFileRoundedIcon className={styles.upload__icon} />
                  <p className={styles.drag__text}>Drag and drop file (.csv)</p>
                  <p className={styles.or__text}>or</p>
                  <button className={styles.browse__btn}>BROWSE FILES</button>
                </div>
              </div>
            ) : (
              <>
                {loading ? (
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
