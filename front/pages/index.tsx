/* 
  Component that renders to login page
*/

import type { NextPage } from 'next'
import Router from 'next/router'
/* React */
import React, { useEffect, useState } from 'react'

/* Redux */
import { setReduxCurrentUser } from "../redux/actions"
import { selectUser } from "../redux/states/user/reducer"
import { useAppSelector, useAppDispatch } from '../redux/hooks'

/* Components */
import Head from 'next/head'
import Image from 'next/image'
import Logo from '../public/logo.png'
import ErrorMessage from '../components/admin/ErrorMessage'

/* CSS */
import styles from '../styles/Home.module.css'

/* Interface */
interface Login {
  accessToken: null | string,
  message: string,
  role: null | string,
  validUntil: null | string,
  username: null | string,
  name: null | string,
  department: null | string,
  gender: null | string,
  birthdate: null | string
}

const Home: NextPage = (props) => {
  /* useState */
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  /* Redux */
  const dispatch = useAppDispatch(); //function that allows to trigger actions that update the redux state
  const user = useAppSelector(selectUser) //function that allows to get the current user from the redux state

  useEffect(() => {
    
  }, []);

  /* Functions */

  /* Handle submit */
  function handleLogin<Login>(url: string): Promise<Login> {
    return fetch(url, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin':'*'
      },

      //make sure to serialize your JSON body
      body: JSON.stringify({
        user: username,
        password: password
      }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText)
      }
      return response.json() as Promise<Login>
    })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //handle login in api
    try {
      handleLogin<{ message: string, accessToken: string, role: string, validUntil: string, name: string, department: string, gender: string, birthdate: string }>(process.env.NEXT_API_HOST+'/user/login')
      .then(data => {
        if (data.message === 'success') {
          setError(''); //clear error
          dispatch(setReduxCurrentUser({username: username, role: data.role, accessToken: data.accessToken, validUntil: data.validUntil, name: data.name, department: data.department, gender: data.gender, birthdate: data.birthdate})); //set user in redux
          Router.push('/admin/dashboard'); //redirect to dashboard
        } else {
          setError(data.message); //set error
        }
      })
    } catch (error) {
      console.log(error);
    }
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
                {/* <a href='#forgot_password' className={styles.forgot__label}>Forgot password?</a>*/}
                {/* submit */}
                <button className={styles.submit__btn} type='submit'>Login</button>

                {/* error message */}
                {error !== "" && <ErrorMessage message={error} />}
              </div>
            </form>
          </div>
      </main>
    </div>
  )
}

export default Home
