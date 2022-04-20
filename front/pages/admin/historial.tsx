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
import Image from 'next/image'
import Logo from '../public/logo.png'
import SideBar from '../../components/admin/SideBar'

/* CSS */
import styles from '../../styles/admin/Dashboard.module.css'

const Historial: NextPage = (props) => {
  /* useState */
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
        <title>Cemex Fix - Historial</title>
        <meta name="description" content="Cemex Fix web application - developed by DFuture" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
          <SideBar/>
          <div className={styles.dashboard__container}>
            <h1>Historial</h1>
          </div>
          
      </main>
    </div>
  )
}

export default Historial
