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
import { styled, alpha } from '@mui/material/styles';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Modal from '@mui/material/Modal';
//import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import TextField from '@mui/material/TextField';

/* Material - UI - icons */
import FilterAltRoundedIcon from '@mui/icons-material/FilterAltRounded';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import AdminPanelSettingsRoundedIcon from '@mui/icons-material/AdminPanelSettingsRounded';

/* Interfaces */
interface User {
  username: string,
  email: string,
  role: string,
}

/* Styled menu for filter button */
const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));

const Usuarios: NextPage = (props) => {
  /* useState - new user */
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');

  /* modal */
  const [openCreateUserModal, setOpenCreateUserModal] = useState(false);

  /* menu filter */
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  

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

  /* <----Functions----> */

  /* Menu Filter functions */
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  /* Modal functions */
  const handleCreateUserModalChange = () => {
    setOpenCreateUserModal(!openCreateUserModal);
  };

  /* Create user functions */
  const createUser = () => {
    console.log('create user');
  };

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

            {/* lista de usuarios */}
            {/* header */}
            <div className={styles.list__header}>
              {/* search input */}
              <input type="text" id="searchText" placeholder={`Type ${searchBy === 'username' ? 'username' : 'email'} here`} className={styles.input} value={searchText} onChange={(e) => setSearchText(e.target.value)} />
              
              {/* search by */}
              <select id="searchBy" value={searchBy} className={styles.select} onChange={(e) => setSearchBy(e.target.value)}>
                <option value="username">Username</option>
                <option value="email">Email</option>
              </select>

              {/* filter button */}
              <IconButton onClick={handleClick}>
                <FilterAltRoundedIcon className={styles.icon}/>
              </IconButton>

              {/* Filter menu */}
              <StyledMenu
                id="demo-customized-menu"
                MenuListProps={{
                  'aria-labelledby': 'demo-customized-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose} disableRipple>
                  <PersonRoundedIcon />
                  Username
                </MenuItem>
                <MenuItem onClick={handleClose} disableRipple>
                  <EmailRoundedIcon />
                  Email
                </MenuItem>
                <MenuItem onClick={handleClose} disableRipple>
                  <AdminPanelSettingsRoundedIcon />
                  Role
                </MenuItem>
              </StyledMenu>

              {/* Add button */}
              <IconButton onClick={handleCreateUserModalChange}>
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


          {/* <----Modals----> */}

          {/* Create user modal */}
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={styles.modal}
            open={openCreateUserModal}
            onClose={handleCreateUserModalChange}
          >
            <form className={styles.form} onSubmit={createUser}>
              <div className={styles.form__container}>
                
                <div className={styles.form__container__input}>
                  <input type="text" id="username" placeholder='username' className={styles.form__input} value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>

               
                <div className={styles.form__container__input}>
                  <input type="email" id="email" placeholder='email' className={styles.form__input} value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>

               
                <div className={styles.form__container__input}>
                  <input type="password" id="password" placeholder='password' className={styles.form__input} value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>

              
                <div className={styles.form__container__input}>
                  <select id="role" value={role} className={styles.form__input} onChange={(e) => setRole(e.target.value)}>
                    <option value="" defaultChecked>Select role</option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </select>
                </div>

                
                <div>
                  <button type="submit" className={styles.form__btn} onSubmit={createUser}>Agregar</button>
                </div>
              </div>
            </form>
          </Modal>
          
      </main>
    </div>
  )
}
                

export default Usuarios
