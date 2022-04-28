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
import styles from '../../styles/admin/Defects.module.css'

/* Material - UI */
import { IconButton } from '@mui/material'
import ArrowCircleRightRoundedIcon from '@mui/icons-material/ArrowCircleRightRounded';

/* Loader Spinner */
import { InfinitySpin } from 'react-loader-spinner'

const Defects: NextPage = (props) => {
  /* useState - currrent user */
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  /* useState - searchBy */
  const [searchBy, setSearchBy] = useState("user");
  const [username, setUsername] = useState("");
  const [date1, setDate1] = useState("");
  const [date2, setDate2] = useState("");
  const [loading, setLoading] = useState(false);

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
          <div className={styles.defects__container}>
            <div className={styles.defects__search__bar}>
                <p className={styles.search__title} style={{flex: searchBy === "all" ? "1" : "0"}}>Search defects</p>
                {(searchBy === "user" || searchBy === "date_user") && (
                    <input type="text" className={styles.input} placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                )}

                {(searchBy === "date" || searchBy === "date_user") && (
                    <input type="date" className={styles.input} value={date1} onChange={(e) => setDate1(e.target.value)}/>
                )}

                {(searchBy === "date" || searchBy === "date_user") && (
                    <input type="date" className={styles.input} value={date2} onChange={(e) => setDate2(e.target.value)}/>
                )}
                
                
                <select className={styles.select__input} value={searchBy} onChange={(e) => setSearchBy(e.target.value)}>
                    <option value="all">All defects</option>
                    <option value="user">By user</option>
                    <option value="date">By date range</option>
                    <option value="date_user">By date range and user</option>
                </select>

                <IconButton>
                    <ArrowCircleRightRoundedIcon className={styles.icon} />
                </IconButton>
            </div>

            {loading ? (
                <div className={styles.loader__container}>
                    <InfinitySpin color="white"  width='200'/>
                </div>
            ) : (
                <>
                    
                </>
            )}
          </div>
          
      </main>
    </div>
  )
}

export default Defects
