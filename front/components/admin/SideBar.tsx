/* 
  Component that renders to login page
*/

import type { NextPage } from 'next'

/* React */
import React, { useEffect, useState } from 'react'

/* Redux */
import { setCurrentUser } from "../../redux/actions"
import { selectUser } from "../../redux/states/users/reducer"
import { selectTab } from "../../redux/states/header/reducer"
import { useAppSelector, useAppDispatch } from '../../redux/hooks'

/* Components */
import Head from 'next/head'
import Image from 'next/image'
import Logo from '../../public/logo.png'

/* CSS */
import styles from '../../styles/components/admin/SideBar.module.css'

/* Material - UI */
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import ListAltRoundedIcon from '@mui/icons-material/ListAltRounded';

const SideBar: NextPage = () => {
  /* useState */
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  /* Redux */
  const dispatch = useAppDispatch(); //function that allows to trigger actions that update the redux state
  const user = useAppSelector(selectUser) //function that allows to get the current user from the redux state
  const tab = useAppSelector(selectTab) //function that allows to get the current user from the redux state

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
        {/* logo */}
        <div className={styles.logo__container}>
        <Image src={Logo} width={50} height={50}/>
        </div>

        {/* links */}
        <div className={styles.links__container}>
        {/* usuarios */}
        <div className={styles.menu__item}>
            <a href='/admin/usuarios' className={styles.item__link}>
                {/* icono */}
                <PersonRoundedIcon className={styles.item__icon}/>
                <p style={{fontWeight: tab === "users" ? "bold": "normal", fontSize: tab === "users" ? "22px": "18px"}}>Users</p>
            </a>
        </div>

        {/* Defectos */}
        <div className={styles.menu__item}>
            <a href='/admin/defects' className={styles.item__link}>
                <ListAltRoundedIcon className={styles.item__icon}/>
                <p style={{fontWeight: tab === "defects" ? "bold": "normal", fontSize: tab === "defects" ? "22px": "18px"}}>Defects</p>
            </a>
        </div>

        {/* Dashboard */}
        <div className={styles.menu__item}>
            <a href='/admin/dashboard' className={styles.item__link}>
                <DashboardRoundedIcon className={styles.item__icon}/>
                <p style={{fontWeight: tab === "dashboard" ? "bold": "normal", fontSize: tab === "dashboard" ? "22px": "18px"}}>Dashboard</p>
            </a>
        </div>
        </div>

        {/* other actions (logout) */}
        <div className={styles.logout__container}>
          <LogoutRoundedIcon className={styles.item__icon}/>
          <p>Logout</p>
        </div>
      </main>
    </div>
  )
}

export default SideBar
