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
  const [role, setRole] = useState('user');

  /* modal */
  const [openCreateUserModal, setOpenCreateUserModal] = useState(false);

  /* menu filter */
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  

  /* useState - list of users */
  const [users, setUsers] = useState<Array<User>>([
    {
      username: 'Andres Limon',
      email: 'LOL1234@gmail.com',
      role: 'God'
    },
    {
      username: 'Abraham cepedao',
      email: 'abrahamgolf@gmail.com',
      role: 'admin'
    },
    {
      username: 'Abrahdsam cepedao',
      email: 'abrahamgolf@gmail.com',
      role: 'admin'
    },
    {
      username: 'Abrahavfrm cepedao',
      email: 'abrahamgolf@gmail.com',
      role: 'admin'
    },
    {
      username: 'Abrahrgeram cepedao',
      email: 'abrahamgolf@gmail.com',
      role: 'admin'
    },
    {
      username: 'Abragfham cepedao',
      email: 'abrahamgolf@gmail.com',
      role: 'admin'
    },
    {
      username: 'Abraham fdsdcepedao',
      email: 'abrahamgolf@gmail.com',
      role: 'admin'
    },
    {
      username: 'Abraham cepdfedao',
      email: 'abrahamgolf@gmail.com',
      role: 'admin'
    },
    {
      username: 'Abrdfaham cepedao',
      email: 'abrahamgolf@gmail.com',
      role: 'admin'
    },
    {
      username: 'Abraham cepefedao',
      email: 'abrahamgolf@gmail.com',
      role: 'admin'
    },
    {
      username: 'Abrwfeaham cepedao',
      email: 'abrahamgoweflf@gmail.com',
      role: 'admin'
    },
    {
      username: 'Abrahafewm cefepedao',
      email: 'abrahamgolf@gmail.com',
      role: 'admin'
    },
    {
      username: 'Abrfwaham cepedao',
      email: 'abrahafwemgolf@gmail.com',
      role: 'admin'
    },
    {
      username: 'Abraefwham cepedao',
      email: 'abrahamgolf@gmail.com',
      role: 'admin'
    },
    {
      username: 'Abrahaewm cepffeedao',
      email: 'abrahamgolf@gmail.com',
      role: 'admin'
    },
    {
      username: 'Abrafeeham cepedao',
      email: 'abrahamgolf@gmail.com',
      role: 'admin'
    },
    {
      username: 'Abrahamef ceefpedao',
      email: 'abrahamgolf@gmail.com',
      role: 'admin'
    },
    {
      username: 'Abraefeham cfepedao',
      email: 'abrahamgolf@gmail.com',
      role: 'admin'
    },
    {
      username: 'Abferaham cepedfao',
      email: 'abraheeamgolf@gmail.com',
      role: 'admin'
    }
]);
  const [searchText, setSearchText] = useState('');
  const [searchBy, setSearchBy] = useState('username');

  /* useState - table pagination */
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(15);

  /* useState - current user */
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

  /* table functions */
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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
          <StyledTableCell align="left">{row.email ? row.email : "--"}</StyledTableCell>
          <StyledTableCell align="left">{row.role ? row.role : "--"}</StyledTableCell>
          <StyledTableCell align="right">
            <IconButton
              aria-label="expand row"
              size="small"
              style={{ color: 'white' }}
            >
              <CreateRoundedIcon/>
            </IconButton>
            <IconButton
              aria-label="expand row"
              size="small"
              style={{ color: 'white' }}
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

            {/* lista de usuarios */}
            {/* header */}
            <div className={styles.list__header}>
              {/* search input */}
              <input type="text" id="searchText" placeholder={`Type ${searchBy === 'username' ? 'username' : 'email'} here`} className={styles.input} value={searchText} onChange={(e) => setSearchText(e.target.value)} />
              
              {/* search by */}
              <Select
                labelId="demo-customized-select-label"
                id="demo-customized-select"
                value={searchBy}
                onChange={(e) => setSearchBy(e.target.value)}
                input={<TransparentInput />}
              >
                <MenuItem value={"username"}>Username</MenuItem>
                <MenuItem value={"email"}>Email</MenuItem>
              </Select>

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
                <div className={styles.user__container}>
                    <TableContainer sx={{ maxHeight: 'calc(100vh - 350px)', minHeight: 'cacl(100vh - 350px)' }}>
                      <Table aria-label="collapsible table" >
                        <TableHead>
                          <TableRow>
                            <StyledTableCell>Username</StyledTableCell>
                            <StyledTableCell align="left">Email</StyledTableCell>
                            <StyledTableCell align="left">Role</StyledTableCell>
                            <StyledTableCell align="right"/>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                            <Row key={row.username} row={row} />
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
              <form className={styles.form} onSubmit={createUser} autoComplete="off">
                <div className={styles.form__container}>
                  <div className={styles.form__head}>
                    <h4>Create User</h4>
                    <PersonRoundedIcon/>
                  </div>
                  <div className={styles.form__container__input}>
                    <input type="text" id="username" autoComplete='off' placeholder='username' className={styles.form__input} value={username} onChange={(e) => setUsername(e.target.value)} />
                  </div>

                
                  <div className={styles.form__container__input}>
                    <input type="email" id="email" autoComplete='email' placeholder='email' className={styles.form__input} value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>

                
                  <div className={styles.form__container__input}>
                    <input type="password" id="password" autoComplete='new-password' placeholder='password' className={styles.form__input} value={password} onChange={(e) => setPassword(e.target.value)} />
                  </div>

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
                  
                  <div>
                    <button type="submit" className={styles.form__btn} onSubmit={createUser}>Agregar</button>
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
