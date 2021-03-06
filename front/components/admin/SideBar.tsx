/* 
  Component that renders to login page
*/

import type { NextPage } from 'next'
import Link from 'next/link'
import Router from 'next/router'

/* React */
import React from 'react'

/* Redux */
import { logoutUser } from "../../redux/actions"
import { selectUser } from "../../redux/states/user/reducer"
import { selectTab } from "../../redux/states/header/reducer"
import { useAppSelector, useAppDispatch } from '../../redux/hooks'

/* Components */
import Head from 'next/head'
import Image from 'next/image'
import Logo from '../../public/logo.png'

/* CSS */
import styles from '../../styles/components/admin/SideBar.module.css'

/* Material - UI */
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import ListAltRoundedIcon from '@mui/icons-material/ListAltRounded';


/* Interfaces */
interface User {
  user: string,
  type: string,
  createdAt: string,
}

interface Message {
  message: string,
}

const SideBar: NextPage = () => {
  /* Redux */
  const dispatch = useAppDispatch(); //function that allows to trigger actions that update the redux state
  const user = useAppSelector(selectUser) //function that allows to get the current user from the redux state
  const tab = useAppSelector(selectTab) //function that allows to get the current user from the redux state

  /* Functions */
  const handleLogout = () => {
    dispatch(logoutUser());
    Router.push('/');
  }

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
        <Image src={Logo} width={95} height={95}/>
        </div>

        {/* links */}
        <div className={styles.links__container}>
          {/* usuarios */}
          {user !== null && user.role === "admin" && (
              <div className={styles.menu__item}>
                <Link href="/admin/usuarios">
                  <a className={styles.item__link}>
                      {/* icono */}
                      <PeopleRoundedIcon className={styles.item__icon}/>
                      <p style={{fontWeight: tab === "users" ? "bold": "normal", fontSize: tab === "users" ? "22px": "18px"}}>Users</p>
                  </a>
                </Link>
              </div>
          )}
          

          {/* Defectos */}
          <div className={styles.menu__item}>
            <Link href="/admin/defects">
              <a className={styles.item__link}>
                  {/* icono */}
                  <ListAltRoundedIcon className={styles.item__icon}/>
                  <p style={{fontWeight: tab === "defects" ? "bold": "normal", fontSize: tab === "defects" ? "22px": "18px"}}>Defects</p>
              </a>
            </Link>
          </div>

          {/* Dashboard */}
          <div className={styles.menu__item}>
            <Link href="/admin/dashboard">
              <a className={styles.item__link}>
                  {/* icono */}
                  <DashboardRoundedIcon className={styles.item__icon}/>
                  <p style={{fontWeight: tab === "dashboard" ? "bold": "normal", fontSize: tab === "dashboard" ? "22px": "18px"}}>Dashboard</p>
              </a>
            </Link>
          </div>
          
        
        </div>

        {/* other actions (logout) */}
        <div className={styles.logout__container} onClick={handleLogout}>
          <LogoutRoundedIcon className={styles.item__icon}/>
          <p>Logout</p>
        </div>
        
      </main>
    </div>
  )
}

export default SideBar
