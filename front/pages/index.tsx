/* 
  Component that renders to login page
*/

import type { NextPage } from 'next'

/* React */
import React, { useEffect, useState } from 'react'

/* Redux */
import { setCurrentUser } from "../redux/actions"
import { selectUser } from "../redux/states/users/reducer"
import { useAppSelector, useAppDispatch } from '../redux/hooks'

/* Components */
import Head from 'next/head'
import Image from 'next/image'
import Logo from '../public/logo.png'

/* CSS */
import styles from '../styles/Home.module.css'

const Home: NextPage = (props) => {
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

  /* Handle submit */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoggedIn(true);
    dispatch(setCurrentUser({ username }));
  };


  return (
    <div className={styles.container}>
      <Head>
        <title>Cemex Fix</title>
        <meta name="description" content="Cemex Fix web application - developed by DFuture" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
          {/* Form */}
          <div className={styles.form__container}>
            <div className={styles.logo__container}>
              {/* logo */}
              <Image src={Logo} width={100} height={100} />
            </div>
            <h2 className={styles.title}>Welcome to Cemex Fix</h2>
            <form onSubmit={(e) => {handleSubmit(e)}}>
              <div className={styles.form}>
                {/* username */}
                <input type="text" id="username" placeholder='username' className={styles.input} value={username} onChange={(e) => {setUsername(e.target.value)}}/>
                {/* password */}
                <input type="password" id="password" placeholder='password' className={styles.input} value={password} onChange={(e) => {setPassword(e.target.value)}}/>
                {/* forgot password */}
                <a href='#forgot_password' className={styles.forgot__label}>Forgot password?</a>
                {/* submit */}
                <button className={styles.submit__btn} type='submit'>Login</button>
              </div>
            </form>
          </div>
      </main>
    </div>
  )
}

export default Home
