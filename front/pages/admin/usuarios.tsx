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

const Usuarios: NextPage = (props) => {
  /* useState - new user */
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');

  /* useState - list of users */

  /* useState - current user */
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
        <title>Cemex Fix - Usuarios</title>
        <meta name="description" content="Cemex Fix web application - developed by DFuture" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
          <SideBar/>
          <div className={styles.dashboard__container}>
            <h1>Usuarios</h1>
            {/* form para agregar usuarios */}
            <form className={styles.form}>
              <div className={styles.form__container}>
                {/* nombre */}
                <div className={styles.form__container__input}>
                  <input type="text" id="username" placeholder='username' className={styles.input} value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>

                {/* email */}
                <div className={styles.form__container__input}>
                  <input type="email" id="email" placeholder='email' className={styles.input} value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>

                {/* contraseña */}
                <div className={styles.form__container__input}>
                  <input type="password" id="password" placeholder='password' className={styles.input} value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>

                {/* rol */}
                <div className={styles.form__container__input}>
                  <select id="role" value={role} className={styles.input} onChange={(e) => setRole(e.target.value)}>
                    <option value="" defaultChecked>Select role</option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </select>
                </div>

                {/* submit */}
                <div className={styles.form__container__submit}>
                  <button type="submit" onClick={() => {
                    dispatch(setCurrentUser({
                      username,
                    }))
                    setIsLoggedIn(true)
                  }}>Agregar</button>
                </div>
              </div>
            </form>
          </div>
          
      </main>
    </div>
  )
}
                

export default Usuarios
