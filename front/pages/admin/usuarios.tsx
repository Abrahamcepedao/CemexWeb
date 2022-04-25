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
import styles from '../../styles/admin/Usuarios.module.css'

/* Material - UI */
import { IconButton } from '@mui/material'
import FilterAltRoundedIcon from '@mui/icons-material/FilterAltRounded';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

interface User {
  username: string,
  email: string,
  role: string,
}

const Usuarios: NextPage = (props) => {
  /* useState - new user */
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');

  /* useState - list of users */
  const [users, setUsers] = useState<Array<User>>([
    {
      username: 'Abraham cepedao',
      email: 'abrahamgolf@gmail.com',
      role: 'admin'
    },
    {
      username: 'Abraham cepedao',
      email: 'abrahamgolf@gmail.com',
      role: 'admin'
    },
    {
      username: 'Abraham cepedao',
      email: 'abrahamgolf@gmail.com',
      role: 'admin'
    },
    {
      username: 'Abraham cepedao',
      email: 'abrahamgolf@gmail.com',
      role: 'admin'
    },
    {
      username: 'Abraham cepedao',
      email: 'abrahamgolf@gmail.com',
      role: 'admin'
    },
    {
      username: 'Abraham cepedao',
      email: 'abrahamgolf@gmail.com',
      role: 'admin'
    },
    {
      username: 'Abraham cepedao',
      email: 'abrahamgolf@gmail.com',
      role: 'admin'
    },
    {
      username: 'Abraham cepedao',
      email: 'abrahamgolf@gmail.com',
      role: 'admin'
    },
    {
      username: 'Abraham cepedao',
      email: 'abrahamgolf@gmail.com',
      role: 'admin'
    },
    {
      username: 'Abraham cepedao',
      email: 'abrahamgolf@gmail.com',
      role: 'admin'
    },
    {
      username: 'Abraham cepedao',
      email: 'abrahamgolf@gmail.com',
      role: 'admin'
    },
    {
      username: 'Abraham cepedao',
      email: 'abrahamgolf@gmail.com',
      role: 'admin'
    },
    {
      username: 'Abraham cepedao',
      email: 'abrahamgolf@gmail.com',
      role: 'admin'
    },
    {
      username: 'Abraham cepedao',
      email: 'abrahamgolf@gmail.com',
      role: 'admin'
    },
    {
      username: 'Abraham cepedao',
      email: 'abrahamgolf@gmail.com',
      role: 'admin'
    },
    {
      username: 'Abraham cepedao',
      email: 'abrahamgolf@gmail.com',
      role: 'admin'
    },
    {
      username: 'Abraham cepedao',
      email: 'abrahamgolf@gmail.com',
      role: 'admin'
    },
    {
      username: 'Abraham cepedao',
      email: 'abrahamgolf@gmail.com',
      role: 'admin'
    },
    {
      username: 'Abraham cepedao',
      email: 'abrahamgolf@gmail.com',
      role: 'admin'
    }
]);
  const [searchText, setSearchText] = useState('');
  const [searchBy, setSearchBy] = useState('username');

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
          <div className={styles.usuarios__container}>
            <h1>Usuarios</h1>
            {/* form para agregar usuarios */}
            {/* <form className={styles.form}>
              <div className={styles.form__container}>
                
                <div className={styles.form__container__input}>
                  <input type="text" id="username" placeholder='username' className={styles.input} value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>

               
                <div className={styles.form__container__input}>
                  <input type="email" id="email" placeholder='email' className={styles.input} value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>

               
                <div className={styles.form__container__input}>
                  <input type="password" id="password" placeholder='password' className={styles.input} value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>

              
                <div className={styles.form__container__input}>
                  <select id="role" value={role} className={styles.input} onChange={(e) => setRole(e.target.value)}>
                    <option value="" defaultChecked>Select role</option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </select>
                </div>

                
                <div className={styles.form__container__submit}>
                  <button type="submit">Agregar</button>
                </div>
              </div>
            </form> */}


            {/* lista de usuarios */}
            {/* header */}
            <div className={styles.list__header}>
              {/* search input */}
              <input type="text" id="searchText" placeholder='Type info here' className={styles.input} value={searchText} onChange={(e) => setSearchText(e.target.value)} />
              
              {/* search by */}
              <select id="searchBy" value={searchBy} className={styles.select} onChange={(e) => setSearchBy(e.target.value)}>
                <option value="username">Username</option>
                <option value="email">Email</option>
              </select>

              {/* filter button */}
              <IconButton>
                <FilterAltRoundedIcon className={styles.icon}/>
              </IconButton>

              {/* Add button */}
              <IconButton>
                <AddCircleRoundedIcon className={styles.icon}/>
              </IconButton>
            </div>

            {/* lista */}
            {users.length !== 0 ? (
              <>
                {/* table header */}
                <div className={styles.table__header}>
                  <div className={styles.table__header__username}>Username</div>
                  <div className={styles.table__header__email}>Email</div>
                  <div className={styles.table__header__role}>Role</div>
                </div>

                <div className={styles.user__container}>
                  

                    {users.map((user, index) => (
                      <div className={styles.user__item} key={index}>
                        <div className={styles.user__info}>
                          <div className={styles.user__info__username}>
                            <p>{user.username}</p>
                          </div>
                          <div className={styles.user__info__email}>
                            <p>{user.email}</p>
                          </div>
                          <div className={styles.user__info__role}>
                            <p>{user.role}</p>
                          </div>
                        </div>
                        <div className={styles.user__actions}>
                          <IconButton>
                            <CreateRoundedIcon className={styles.icon}/>
                          </IconButton>
                          <IconButton>
                            <DeleteRoundedIcon className={styles.icon}/>
                          </IconButton>
                        </div>
                      </div>
                    ))}
                </div>
              </>
              
            ) : (
              <div>
                <h2>No hay usuarios</h2>
              </div>
            )}
            
          </div>
          
      </main>
    </div>
  )
}
                

export default Usuarios
