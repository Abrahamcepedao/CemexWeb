/* 
  Component that renders to login page
*/

import type { NextPage } from 'next'
import Router from 'next/router'

/* React */
import React, { useEffect, useState } from 'react'

/* Redux */
import { setCurrentUser, setCurrentTab } from "../../redux/actions"
import { selectUser } from "../../redux/states/users/reducer"
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

/* Material - UI - icons */
import FilterAltRoundedIcon from '@mui/icons-material/FilterAltRounded';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import AdminPanelSettingsRoundedIcon from '@mui/icons-material/AdminPanelSettingsRounded';

/* Interfaces */
interface User {
  username: string,
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
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('user');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  /* modal */
  const [openCreateUserModal, setOpenCreateUserModal] = useState(false);

  /* menu filter */
  const [sortBy, setSortBy] = useState('username');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  

  /* useState - list of users */
  const [allUsers, setAllUsers] = useState<Array<User>>([
      {
        username: 'LOL1234@gmail.com',
        role: 'God'
      },
      {
        username: 'abrahamgolf@gmail.com',
        role: 'user'
      },
      {
        username: 'LOL1234@gmail.com',
        role: 'God'
      },
      {
        username: 'abrahamgolf@gmail.com',
        role: 'admin'
      },
      {
        username: 'LOL1234@gmail.com',
        role: 'God'
      },
      {
        username: 'abrahamgolf@gmail.com',
        role: 'admin'
      },
      {
        username: 'LOL1234@gmail.com',
        role: 'God'
      },
      {
        username: 'abrahamgolf@gmail.com',
        role: 'admin'
      },
      {
        username: 'LOL1234@gmail.com',
        role: 'God'
      },
      {
        username: 'abrahamgolf@gmail.com',
        role: 'admin'
      }
  ]);
  const [users, setUsers] = useState<Array<User>>([
    {
      username: 'LOL1234@gmail.com',
      role: 'God'
    },
    {
      username: 'abrahamgolf@gmail.com',
      role: 'user'
    },
    {
      username: 'LOL1234@gmail.com',
      role: 'God'
    },
    {
      username: 'abrahamgolf@gmail.com',
      role: 'admin'
    },
    {
      username: 'LOL1234@gmail.com',
      role: 'God'
    },
    {
      username: 'abrahamgolf@gmail.com',
      role: 'admin'
    },
    {
      username: 'LOL1234@gmail.com',
      role: 'God'
    },
    {
      username: 'abrahamgolf@gmail.com',
      role: 'admin'
    },
    {
      username: 'LOL1234@gmail.com',
      role: 'God'
    },
    {
      username: 'abrahamgolf@gmail.com',
      role: 'admin'
    },
]);
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

  useEffect(() => {
    /* Set current tab */
    dispatch(setCurrentTab('users'));

    /* Redirect user if needed */
    console.log(user);
    if (!user) {
      Router.push('/');
    } else {
      setIsLoggedIn(true);
      if(user.role !== 'admin') {
        Router.push('/admin/dashboard');
      }
    }
  }, [isLoggedIn]);

  /* <----Functions----> */

  /* Menu Filter functions */
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (value: string) => {
    /* Filter users by value */
    
    if (value === 'username') {
      //filter by username
      let tempUsers = [...users];
      tempUsers = tempUsers.sort((a, b) =>
        a.username.localeCompare(b.username),
      );
      /* Set new state */
      setUsers(tempUsers);
    } else if (value === 'role') {
      //filter by role
      let tempUsers = [...users];
      tempUsers = tempUsers.sort((a, b) =>
        a.role.localeCompare(b.role),
      );
      /* Set new state */
      setUsers(tempUsers);
    } else if (value === 'clear') {
      //clear filter
      let tempUsers = [...allUsers];
      /* Set new state */
      setUsers(tempUsers);
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
    if (username.length === 0) {
      setError('Enter a username');
      return false;
    }
    if (password.length === 0) {
      setError('Enter a password');
      return false;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    return true;
  };

  const createUser = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('creating user');
    if (validateCreateUser()) {
      //add user to database

      //set state of users
      let tempUsers = [...users];
      tempUsers.push({
        username: username,
        role: role,
      });
      setUsers(tempUsers); 

      //reset new user state
      setError('');
      setUsername('');
      setPassword('');
      setConfirmPassword('');

      //set success message
      setSuccess('User created successfully');
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
    if(user) {
      //set edit state
      console.log(user);
      setEditUser(user);
      setEditUsername(user.username);
      setEditRole(user.role);
    }
  };

  const validateEditUser = () => {
    if (editUsername.length === 0) {
      setError('Enter a username');
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
    let tempUsers = [...users];
    tempUsers.push({
      username: editUsername,
      role: editRole,
    });
    setUsers(tempUsers);
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
      tempUsers = tempUsers.filter((user) => user.username !== deleteUser?.username);
      setAllUsers(tempUsers); //set new state of all users
      setUsers(tempUsers); //set new state of users
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
      user.username.toLowerCase().includes(value.toLowerCase()),
    );
    setUsers(tempUsers);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;

  /* Row of defects table */
  function Row(props: { row: User }) {
    const { row } = props;

    return (
      <React.Fragment>
        <StyledTableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <StyledTableCell component="th" scope="row">
            {row.username}
          </StyledTableCell>
          <StyledTableCell align="left">{row.role ? row.role : "--"}</StyledTableCell>
          <StyledTableCell align="right">
            <IconButton
              size="small"
              style={{ color: 'white' }}
              onClick={() => handleEditUserModalChange(row)}
            >
              <CreateRoundedIcon/>
            </IconButton>
            <IconButton
              aria-label="expand row"
              size="small"
              style={{ color: 'white' }}
              onClick={() => handleDeleteUserModalChange(row)}
            >
              <DeleteRoundedIcon/>
            </IconButton>
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
              <input type="text" id="searchText" placeholder="Type username here" className={styles.input} value={searchText} onChange={(e) => handleSearchTextChange(e.target.value)} />
              
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
                <MenuItem onClick={() => {handleClose('clear')}} disableRipple>
                  <HighlightOffRoundedIcon />
                  Clear filters
                </MenuItem>
                <MenuItem onClick={() => {handleClose('username')}} disableRipple>
                  <PersonRoundedIcon />
                  Username
                </MenuItem>
                <MenuItem onClick={() => {handleClose('role')}} disableRipple>
                  <AdminPanelSettingsRoundedIcon />
                  Role
                </MenuItem>
              </StyledMenu>

              {/* Add button */}
              <IconButton onClick={handleCreateUserModalChange}>
                <AddCircleRoundedIcon className={styles.icon}/>
              </IconButton>
            </div>

            {/* lista de usuarios */}
            {users.length !== 0 ? (
              <>
                <div className={styles.user__container}>
                    <TableContainer sx={{ maxHeight: 'calc(100vh - 350px)', minHeight: 'cacl(100vh - 350px)' }}>
                      <Table aria-label="collapsible table" >
                        <TableHead>
                          <TableRow>
                            <StyledTableCell>Username</StyledTableCell>
                            <StyledTableCell align="left">Role</StyledTableCell>
                            <StyledTableCell align="right"/>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, i) => (
                            <Row key={`${row.username}__${i}`} row={row} />
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
                      count={users.length}
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

                  {/* username */}
                  <div className={styles.form__container__input}>
                    <input type="text" id="username" autoComplete='off' placeholder='username' className={styles.form__input} value={username} onChange={(e) => setUsername(e.target.value)} />
                  </div>

                  {/* password */}
                  <div className={styles.form__container__input}>
                    <input type="password" id="password" autoComplete='new-password' placeholder='password' className={styles.form__input} value={password} onChange={(e) => setPassword(e.target.value)} />
                  </div>

                  {/* confirm password */}
                  <div className={styles.form__container__input}>
                    <input type="password" id="password" autoComplete='new-password' placeholder='confirm password' className={styles.form__input} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                  </div>

                  {/* role */}
                  <Select
                    labelId="demo-customized-select-label"
                    id="demo-customized-select"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
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

                  {/* username */}
                  <div className={styles.form__container__input}>
                    <input type="text" id="username" autoComplete='off' placeholder='username' className={styles.form__input} value={editUsername} onChange={(e) => setEditUsername(e.target.value)} />
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
                    <h4>Delete User: {deleteUser?.username}</h4>
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
