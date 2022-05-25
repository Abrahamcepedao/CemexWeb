/* 
  Component that renders to login page
*/

import type { NextPage } from 'next'
import Router from 'next/router'

/* React */
import React, { useEffect, useState } from 'react'

/* Redux */
import { setCurrentTab, setUsers } from "../../redux/actions"
import { selectUser } from "../../redux/states/user/reducer"
import { useAppSelector, useAppDispatch } from '../../redux/hooks'

/* Components */
import Head from 'next/head'
import SideBar from '../../components/admin/SideBar'
import { WhiteInput, TransparentInput } from '../../components/admin/Selects'
import { StyledTableRow } from '../../components/admin/StyledTableRow'
import { StyledTableCell } from '../../components/admin/StyledTableCell'
import ErrorMessage from '../../components/admin/ErrorMessage'
import SuccessMessage from '../../components/admin/SuccessMessage'

/* CSS */
import styles from '../../styles/admin/Usuarios.module.css'

/* Material - UI */
import { IconButton } from '@mui/material'
import { styled, alpha } from '@mui/material/styles';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Modal from '@mui/material/Modal';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Select from '@mui/material/Select';
import Tooltip from '@mui/material/Tooltip';

/* Material - UI - icons */
import FilterAltRoundedIcon from '@mui/icons-material/FilterAltRounded';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import AdminPanelSettingsRoundedIcon from '@mui/icons-material/AdminPanelSettingsRounded';
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';

/* Interfaces */
interface User {
  user: string,
  type: string,
  createdAt: string,
}

interface Message {
  message: string,
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
  const [newUser, setNewUser] = useState({
    user: '',
    type: 'user',
    password: '',
    confirmPassword: '',
  })

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  /* modal */
  const [openCreateUserModal, setOpenCreateUserModal] = useState(false);

  /* useState - menu filter */
  const [sortBy, setSortBy] = useState('user');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  

  /* useState - list of users */
  const [allUsers, setAllUsers] = useState<Array<User>>([]);
  const [usersList, setUsersList] = useState<Array<User>>([]);
  const [searchText, setSearchText] = useState('');

  /* useState - table pagination */
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(15);

  /* useState - current user */
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  /* useState - edit user */
  const [openEditUserModal, setOpenEditUserModal] = useState(false);
  const [editUser, setEditUser] = useState<null | User>(null);
  const [editUsername, setEditUsername] = useState('');
  const [editRole, setEditRole] = useState('user');

  /* useState - delete user */
  const [openDeleteUserModal, setOpenDeleteUserModal] = useState(false);
  const [deleteUser, setDeleteUser] = useState<null | User>(null);

  /* Redux */
  const dispatch = useAppDispatch(); //function that allows to trigger actions that update the redux state
  const user = useAppSelector(selectUser) //function that allows to get the current user from the redux state

  /* Function get all users - api */
  async function getAllUsers(url: string): Promise<Array<User>> {
    return fetch(url, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin':'*'
      },

      //make sure to serialize your JSON body
      body: JSON.stringify({
        user: user.user,
        accessToken: user.accessToken
      }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText)
      }
      return response.json() as Promise<Array<User>>
    })
  }

  useEffect(() => {
    /* Set current tab */
    dispatch(setCurrentTab('users'));

    /* Get all users */
    if(!localStorage.getItem('users')) {
      try {
        getAllUsers('http://localhost:5000/users/get')
        .then(data => {
          if (data.length > 1) {
            
            //set local state
            setAllUsers(data);
            setUsersList(data);

            //set users in redux state
            //@ts-ignore
            dispatch(setUsers(data));
          
            setError(''); //clear error
          } else {
            //setError(data.message); //set error
          }
        })
      } catch (error) {
        console.log(error);
      }
    } else {
      //@ts-ignore
      setAllUsers(JSON.parse(localStorage.getItem('users')));
      //@ts-ignore
      setUsersList(JSON.parse(localStorage.getItem('users')));

      //set users in redux state
      //@ts-ignore
      dispatch(setUsers(JSON.parse(localStorage.getItem('users'))));
    }
  }, []);

  /* <----Functions----> */

  /* Menu Filter functions */
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (value: string) => {
    /* Filter users by value */
    
    if (value === 'user') {
      //filter by user
      let tempUsers = [...usersList];
      tempUsers = tempUsers.sort((a, b) =>
        a.user.localeCompare(b.user),
      );
      /* Set new state */
      setUsersList(tempUsers);
    } else if (value === 'role') {
      //filter by role
      let tempUsers = [...usersList];
      tempUsers = tempUsers.sort((a, b) =>
        a.type.localeCompare(b.type),
      );
      /* Set new state */
      setUsersList(tempUsers);
    } else if (value === 'clear') {
      //clear filter
      let tempUsers = [...allUsers];
      /* Set new state */
      setUsersList(tempUsers);
    }

    /* Set new state */
    setSortBy(value);
    setAnchorEl(null);
  };

  /* Modal functions */
  const handleCreateUserModalChange = () => {
    if(openCreateUserModal)  {
      setError(''); //clear error message on close
      setSuccess(''); //clear success message on close
    }
    
    setOpenCreateUserModal(!openCreateUserModal);
  };

  /* Create user functions */
  const validateCreateUser = () => {
    if (newUser.user.length === 0) {
      setError('Enter a user');
      return false;
    }
    if (newUser.password.length === 0) {
      setError('Enter a password');
      return false;
    }
    if (newUser.password !== newUser.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    return true;
  };

  /* Function create new user - api */
  async function handleCreateUser(url: string): Promise<Message> {
    return fetch(url, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin':'*'
      },

      //make sure to serialize your JSON body
      body: JSON.stringify({
        user: newUser.user,
        password: newUser.password,
        type: newUser.type,
      }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText)
      }
      return response.json() as Promise<Message>
    })
  }
  
  /* Create user function */
  const createUser = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('creating user');
    if (validateCreateUser()) {
        //add user to database
        try {
        handleCreateUser('http://localhost:5000/user/create')
        .then(data => {
          if (data.message === 'success') {
            //set state of users
            let tempUsers = [...usersList];
            tempUsers.push({
              user: newUser.user,
              type: newUser.type,
              createdAt: new Date().toLocaleString()
            });
            setUsersList(tempUsers); 

            //reset new user state
            setError('');
            setNewUser({
              ...newUser,
              user: '',
              password: '',
              confirmPassword: ''
            });

            //set success message
            setSuccess('User created successfully');
          } else {
            //set error message
            setError(data.message);
          }
        })
      } catch (error) {
        console.log(error);
      }
    }
  };

  /* table functions */
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  /* Edit user functions */
  const handleEditUserModalChange = (user: User) => {
    if(openCreateUserModal) {
      setError('')
      setSuccess('')
      setEditUser(null);
      setEditUsername('');
      setEditRole('');
    };
    setOpenEditUserModal(!openEditUserModal);
    if(editUser) {
      //set edit state
      console.log(editUser);
      setEditUser(editUser);
      setEditUsername(editUser.user);
      setEditRole(editUser.type);
    }
  };

  const validateEditUser = () => {
    if (editUsername.length === 0) {
      setError('Enter a user');
      return false;
    }
    if (editRole.length === 0) {
      setError('Enter a role');
      return false;
    }
    return true;
  };

  const handleEditUser = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('editing user');
    if (validateEditUser()) {
      //edit user in database
    }
    //set state of users
    let tempUsers = [...usersList];
    tempUsers.push({
      user: editUsername,
      type: editRole,
      createdAt: new Date().toLocaleString()
    });
    setUsersList(tempUsers);
  }

  /* Delete user functions */
  const handleDeleteUserModalChange = (user: User) => {
    if(openCreateUserModal) {
      setError('')
      setDeleteUser(null);
    };
    setOpenDeleteUserModal(!openDeleteUserModal);
    if(user) {
      //set delete state
      console.log(user);
      setDeleteUser(user);
    }
  };

  const handleCancelDelete = () => { 
    setOpenDeleteUserModal(false); //close modal
    setDeleteUser(null); //clear delete user state
  };

  const handleDeleteUser = () => {
    //delete user from database
    //set state of users
    if(deleteUser !== null) {
      let tempUsers = [...allUsers];
      tempUsers = tempUsers.filter((user) => user.user !== deleteUser?.user);
      setAllUsers(tempUsers); //set new state of all users
      setUsersList(tempUsers); //set new state of users
      setOpenDeleteUserModal(false); //close modal
      setDeleteUser(null); //clear delete user state
    }
    
  };


  /* Handle search function */
  const handleSearchTextChange = (value: string) => {
    setSearchText(value);

    //filter users by search text
    let tempUsers = [...allUsers];
    tempUsers = tempUsers.filter((user) =>
      user.user.toLowerCase().includes(value.toLowerCase()),
    );
    setUsersList(tempUsers);
  };

  /* Handle Refresh function */
  const handleRefresh = () => {
    try {
      getAllUsers('http://localhost:5000/users/get')
      .then(data => {
        if (data.length > 1) {
          console.log(data);
          //set local state
          setAllUsers(data);
          setUsersList(data);

          //set users in redux state
          //@ts-ignore
          dispatch(setUsers(data));
        
          setError(''); //clear error
        } else {
          setError('Error retrieving users');
          //setError(data.message); //set error
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - usersList.length) : 0;

  /* Row of defects table */
  function Row(props: { row: User }) {
    const { row } = props;

    return (
      <React.Fragment>
        <StyledTableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <StyledTableCell component="th" scope="row">
            {row.user}
          </StyledTableCell>
          <StyledTableCell align="left">{row.type ? row.type : "--"}</StyledTableCell>
          <StyledTableCell align="right">
            <Tooltip title="Edit user">
              <IconButton
                size="small"
                style={{ color: 'white' }}
                onClick={() => handleEditUserModalChange(row)}
              >
                <CreateRoundedIcon/>
              </IconButton>
            </Tooltip>

            <Tooltip title="Delete user">
              <IconButton
                aria-label="expand row"
                size="small"
                style={{ color: 'white' }}
                onClick={() => handleDeleteUserModalChange(row)}
              >
                <DeleteRoundedIcon/>
              </IconButton>
            </Tooltip>
          </StyledTableCell>
        </StyledTableRow>
      </React.Fragment>
    );
  }


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

            {/* header */}
            <div className={styles.list__header}>
              {/* search input */}
              <input type="text" id="searchText" placeholder="Type user here" className={styles.input} value={searchText} onChange={(e) => handleSearchTextChange(e.target.value)} />
              
              {/* filter button */}
              <Tooltip title="Filter">
                <IconButton onClick={handleClick}>
                  <FilterAltRoundedIcon className={styles.icon}/>
                </IconButton>
              </Tooltip>

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
                <MenuItem onClick={() => {handleClose('clear')}} disableRipple>
                  <HighlightOffRoundedIcon />
                  Clear filters
                </MenuItem>
                <MenuItem onClick={() => {handleClose('user')}} disableRipple>
                  <PersonRoundedIcon />
                  user
                </MenuItem>
                <MenuItem onClick={() => {handleClose('role')}} disableRipple>
                  <AdminPanelSettingsRoundedIcon />
                  Role
                </MenuItem>
              </StyledMenu>

              {/* Add button */}
              <Tooltip title="Add user">
                <IconButton onClick={handleCreateUserModalChange}>
                  <AddCircleRoundedIcon className={styles.icon}/>
                </IconButton>
              </Tooltip>

              {/* Refresh icon */}
              <Tooltip title="Refresh">
                <IconButton onClick={handleRefresh}>
                  <RefreshRoundedIcon className={styles.icon}/>
                </IconButton>
              </Tooltip>
            </div>

            {/* lista de usuarios */}
            {usersList.length !== 0 ? (
              <>
                <div className={styles.user__container}>
                    <TableContainer sx={{ maxHeight: 'calc(100vh - 290px)', minHeight: 'cacl(100vh - 290px)' }}>
                      <Table aria-label="collapsible table" >
                        <TableHead>
                          <TableRow>
                            <StyledTableCell>user</StyledTableCell>
                            <StyledTableCell align="left">Role</StyledTableCell>
                            <StyledTableCell align="right"/>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {usersList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, i) => (
                            <Row key={`${row.user}__${i}`} row={row} />
                          ))}
                          {emptyRows > 0 && (
                            <TableRow
                              style={{
                                height: (53) * emptyRows,
                              }}
                            >
                              <StyledTableCell colSpan={6} />
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    <TablePagination
                      rowsPerPageOptions={[15, 25, 50]}
                      component="div"
                      style={{color: 'white !important'}}
                      count={usersList.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                    />
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
            <>
              <input type="hidden" value="something"/>
              <form className={styles.form} onSubmit={(e) => {createUser(e)}} autoComplete="off">
                <div className={styles.form__container}>
                  {/* header */}
                  <div className={styles.form__head}>
                    <h4>Create User</h4>
                    <PersonRoundedIcon/>
                  </div>

                  {/* user */}
                  <div className={styles.form__container__input}>
                    <input type="text" id="user" autoComplete='off' placeholder='user' className={styles.form__input} value={newUser.user} onChange={(e) => {setNewUser({...newUser, user: e.target.value})}} />
                  </div>

                  {/* password */}
                  <div className={styles.form__container__input}>
                    <input type="password" id="password" autoComplete='new-password' placeholder='password' className={styles.form__input} value={newUser.password} onChange={(e) => {setNewUser({...newUser, password: e.target.value})}} />
                  </div>

                  {/* confirm password */}
                  <div className={styles.form__container__input}>
                    <input type="password" id="password" autoComplete='new-password' placeholder='confirm password' className={styles.form__input} value={newUser.confirmPassword} onChange={(e) => {setNewUser({...newUser, confirmPassword: e.target.value})}} />
                  </div>

                  {/* role */}
                  <Select
                    labelId="demo-customized-select-label"
                    id="demo-customized-select"
                    value={newUser.type}
                    onChange={(e) => {setNewUser({...newUser, type: e.target.value})}}
                    input={<WhiteInput />}
                    style={{ width: '100%', marginBottom: '20px' }}
                  >
                    <MenuItem value={"admin"} defaultChecked>Admin</MenuItem>
                    <MenuItem value={"user"}>User</MenuItem>
                  </Select>
                  
                  {/* submit */}
                  <div>
                    <button type="submit" className={styles.form__btn}>Agregar</button>
                  </div>

                  {/* Error message */}
                  {error !== "" && (
                    <ErrorMessage message={error}/>
                  )}

                  {/* Success message */}
                  {success !== "" && (
                    <SuccessMessage message={success}/>
                  )}
                </div>
              </form>
            </>
          </Modal>


          {/* Edit user modal */}
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={styles.modal}
            open={openEditUserModal}
            onClose={handleEditUserModalChange}
          >
            <>
              <input type="hidden" value="something"/>
              <form className={styles.form} onSubmit={(e) => {handleEditUser(e)}} autoComplete="off">
                <div className={styles.form__container}>
                  {/* header */}
                  <div className={styles.form__head}>
                    <h4>Edit User</h4>
                    <PersonRoundedIcon/>
                  </div>

                  {/* user */}
                  <div className={styles.form__container__input}>
                    <input type="text" id="user" autoComplete='off' placeholder='user' className={styles.form__input} value={editUsername} onChange={(e) => setEditUsername(e.target.value)} />
                  </div>

                  {/* role */}
                  <Select
                    labelId="demo-customized-select-label"
                    id="demo-customized-select"
                    value={editRole}
                    onChange={(e) => setEditRole(e.target.value)}
                    input={<WhiteInput />}
                    style={{ width: '100%', marginBottom: '20px' }}
                  >
                    <MenuItem value={"admin"} defaultChecked>Admin</MenuItem>
                    <MenuItem value={"user"}>User</MenuItem>
                  </Select>
                  
                  {/* submit */}
                  <div>
                    <button type="submit" className={styles.form__btn}>Guardar cambios</button>
                  </div>

                  {/* Error message */}
                  {error !== "" && (
                    <ErrorMessage message={error}/>
                  )}

                  {/* Success message */}
                  {success !== "" && (
                    <SuccessMessage message={success}/>
                  )}
                </div>
              </form>
            </>
          </Modal>
          

          {/* Delete user modal */}
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={styles.modal}
            open={openDeleteUserModal}
            onClose={handleDeleteUserModalChange}
          >
            <>
              <input type="hidden" value="something"/>
              <form className={styles.form} onSubmit={(e) => {handleEditUser(e)}} autoComplete="off">
                <div className={styles.form__container}>
                  {/* header */}
                  <div className={styles.form__head}>
                    <h4>Delete User: {deleteUser?.user}</h4>
                    <PersonRoundedIcon/>
                  </div>

                  <div>
                    <div className={styles.delete__btn__container}>
                      <button className={styles.cancel__btn} onClick={handleCancelDelete}>Cancel</button>
                      <button className={styles.delete__btn} onClick={handleDeleteUser}>Delete</button>
                    </div>
                  </div>
                </div>
              </form>
            </>
          </Modal>
      </main>
    </div>
  )
}

export default Usuarios
