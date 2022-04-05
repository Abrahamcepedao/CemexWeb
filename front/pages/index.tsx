import type { NextPage } from 'next'

/* React */
import React, { useEffect, useState } from 'react'

/* Redux */
import { connect } from "react-redux"
import { setCurrentUser } from "../redux/actions"
import { selectUser } from "../redux/states/users/reducer"
import { useAppSelector, useAppDispatch } from '../redux/hooks'
import { useSelector, useDispatch } from 'react-redux';
/* Components */
import Head from 'next/head'

/* CSS */
import styles from '../styles/Home.module.css'

const Home: NextPage = (props) => {
  /* useState */
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  /* Redux */
  const dispatch = useAppDispatch()
  //const user = useSelector(state => state.userState.user);
  const user = useAppSelector(selectUser)
  //const { user, setCurrentUser } = props

  useEffect(() => {
    console.log('user: ', user)
    if (isLoggedIn) {
      console.log('logged in');
    } else {
      console.log('not logged in');
    }
  }, [isLoggedIn]);

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
        <div className={styles.form__container}>
          <h2 className={styles.title}>Welcome to Cemex Fix</h2>
          <form onSubmit={(e) => {handleSubmit(e)}}>
            <div className={styles.form}>
              <input type="text" id="username" placeholder='username' className={styles.input} onChange={(e) => {setUsername(e.target.value)}}/>
              <input type="password" id="password" placeholder='password' className={styles.input} onChange={(e) => {setPassword(e.target.value)}}/>
              <a href='#forgot_password' className={styles.forgot__label}>Forgot password?</a>
              <button className={styles.submit__btn} type='submit'>Login</button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}

export default Home
