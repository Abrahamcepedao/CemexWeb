/* 
  Component that renders to login page
*/

import type { NextPage } from 'next'
import dynamic from 'next/dynamic';
import Router from 'next/router'

/* React */
import React, { useEffect, useState } from 'react'

/* Redux */
import { setCurrentTab, setReduxUsers, setReduxCurrentUser } from "../../redux/actions"
import { selectUser } from "../../redux/states/user/reducer"
import { useAppSelector, useAppDispatch } from '../../redux/hooks'

/* Components */
import Head from 'next/head'
import SideBar from '../../components/admin/SideBar'
import { WhiteInput, TransparentInput } from '../../components/admin/Selects'
import { StyledTableRow } from '../../components/admin/StyledTableRow'
import { StyledTableCell } from '../../components/admin/StyledTableCell'
import { StyledTextField } from '../../components/admin/StyledTextField'
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
import { InputLabel } from '@mui/material'

/* Material - UI - icons */
import FilterAltRoundedIcon from '@mui/icons-material/FilterAltRounded';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import AdminPanelSettingsRoundedIcon from '@mui/icons-material/AdminPanelSettingsRounded';
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
import SupervisorAccountRoundedIcon from '@mui/icons-material/SupervisorAccountRounded';
import ApartmentRoundedIcon from '@mui/icons-material/ApartmentRounded';

/* Nivo */
import UserPie from '../../components/admin/UserPie'

/* Interfaces */
interface User {
  user: string,
  type: string,
  name: string,
  birthdate: string,
  gender: string,
  department: string,
  createdAt: string,
}

interface Message {
  message: string,
}

interface Department {
  label: string,
  value: number
}


const colors = [
    "#225fe2",
    "#E91E63",
    "#25c4b9",
    "#fca1a1",
    "#ed1010",
    "#ed2d2d",
    "#ea4141",
    "#ed5555",
    "#ed6a6a",
    "#ff7200",
    "#fc8320",
    "#f9913b",
    "#f9a159",
    "#f9ba86",
    "#ffe500",
    "#fce620",
    "#fcea4b",
    "#fced6a",
    "#fcf085",
    "#F44336",
    "#E91E63",
    "#9C27B0",
    "#673AB7",
    "#3F51B5",
    "#2196F3",
    "#03A9F4",
    "#00BCD4",
    "#009688",
    "#4CAF50",
    "#FF9800",
    "#FF5722",
    "#795548",
    "#607D8B",
    "#3F51B5",
    "#2196F3",
    "#03A9F4",
    "#00BCD4",
    "#009688",
    "#4CAF50",
    "#FF9800",
    "#FF5722",
    "#795548",
    "#607D8B",
    "#3F51B5",
    "#2196F3",
    "#03A9F4",
    "#00BCD4",
    "#009688",
    "#4CAF50",
    "#FF9800",
    "#FF5722",
    "#795548",
    "#607D8B",
    "#3F51B5",
    "#2196F3",
    "#03A9F4",
    "#00BCD4",
    "#009688",
    "#4CAF50",
    "#FF9800",
    "#FF5722",
    "#795548",
    "#607D8B"
]

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
    name: '',
    type: 'user',
    password: '',
    confirmPassword: '',
    gender: '',
    birthdate: '',
    department: ''
  })

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [admins, setAdmins] = useState(0);
  const [users, setUsers] = useState(0);

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

  /* useState - edit user */
  const [openEditUserModal, setOpenEditUserModal] = useState(false);
  const [editUser, setEditUser] = useState<null | User>(null);
  const [editUsername, setEditUsername] = useState('');
  const [editName, setEditName] = useState('');
  const [editRole, setEditRole] = useState('user');
  const [editDepartment, setEditDepartment] = useState('');
  const [editBirthdate, setEditBirthdate] = useState('');
  const [editGender, setEditGender] = useState('');

  /* useState - delete user */
  const [openDeleteUserModal, setOpenDeleteUserModal] = useState(false);
  const [deleteUser, setDeleteUser] = useState<null | User>(null);

  /* useState - pie data */
  const [genderPieData, setGenderPieData] = useState<any>([]);
  const [departmentPieData, setDepartmentPieData] = useState<any>([]);

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

  /* Function to validate user */
  async function validateUser(url: string, username:string, accessToken:string): Promise<Message> {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin':'*'
      },

      //make sure to serialize your JSON body
      body: JSON.stringify({
        username: username,
        accessToken: accessToken,
      }),
    })
    console.log(response)
    if (!response.ok) {
      throw new Error(response.statusText)
    }
    return response.json() as Promise<Message>
  }

  async function handleUserValidation() {
    //get user from local storage
    //@ts-ignore
    const tempUser = JSON.parse(localStorage.getItem('user'));
    console.log(tempUser)

    if (tempUser) {
        //set tempUser
        //validate if user session is still valid
        try {
          validateUser('http://localhost:5000/test-token', tempUser.username, tempUser.accessToken)
          .then(data => {
            console.log(data)
            if (data.message === 'success') {
              //set user state in redux
              console.log('success')

              //set current user in redux state
              dispatch(setReduxCurrentUser({username: tempUser.username, role: tempUser.role, accessToken: tempUser.accessToken, validUntil: tempUser.validUntil, department: tempUser.department, name: tempUser.name, birthdate: tempUser.birthdate, gender: tempUser.gender}));
            } else {
              //redirect to login page
              console.log('invalid')
              Router.push('/')
            }
          })
      } catch (error) {
        //redirect to login page
        console.log('invalid')
        Router.push('/')
      }

    } else {
      Router.push('/')
    }
  }

  /* useEffect */
  useEffect(() => {
    /* Set current tab */
    dispatch(setCurrentTab('users'));

    /* Handle set or redirect user */
    console.log(user);
    if (user === null) {
      handleUserValidation();
    } 

    console.log(localStorage.getItem("users"))

    /* Get all users */
    if(localStorage.getItem('users') === undefined || localStorage.getItem('users') === null && user !== null) {
      try {
        getAllUsers('http://localhost:5000/users/get')
        .then(data => {
          if (data.length > 1) {
            
            //set local state
            setAllUsers(data);
            setUsersList(data);

            
            let admins = 0;
            let users = 0;
            let women = 0
            let men = 0
            let other = 0
            let departments: Department[] = []
            data.forEach(user => {
              //calculate admins and users
              if (user.type === 'admin') {
                admins++;
              } else {
                users++;
              }

              //calculate pie data for gender
              if(user.gender == "man"){
                men++;
              } else if(user.gender == "woman"){
                women++;
              } else {
                other++;
              }

              //calculate pie data for department
              //find user department in departments
              let flag = false;
              departments.forEach(department => {
                if(department.label === user.department){
                  department.value++;
                  flag = true;
                }
              })
              if(!flag){
                departments.push({label: user.department ? user.department : "Other", value: 1})
              }
            })

              
            //set local state
            setAdmins(admins);
            setUsers(users);

            //set gender pie data
            setGenderPieData([
              { "id": 'Men', 
                "label": 'Men',
                "value": men,
                "color": colors[0]
              },
              { "id": 'Women', 
                "label": 'Women',
                "value": women,
                "color": colors[1]
              },
              { "id": 'Other', 
                "label": 'Other',
                "value": other,
                "color": colors[2]
              },
            ])

            //set department pie data
            let tempDepartments: any[] = []
            departments.forEach((department, i) => {
              tempDepartments.push({
                "id": department.label,
                "label": department.label,
                "value": department.value,
                "color": colors[i]
              })
            })
            setDepartmentPieData(tempDepartments)

            //set local storage
            localStorage.setItem('users', JSON.stringify(data));

            //set users in redux state
            //@ts-ignore
            dispatch(setReduxUsers(data));
          
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
      const data = JSON.parse(localStorage.getItem('users'));

      //calculate admins and users
      let admins = 0;
      let users = 0;
      let women = 0
      let men = 0
      let other = 0
      let departments: Department[] = []
      //@ts-ignore
      data.forEach(user => {
        //calculate admins and users
        if (user.type === 'admin') {
          admins++;
        } else {
          users++;
        }

        //calculate pie data for gender
        if(user.gender == "man"){
          men++;
        } else if(user.gender == "woman"){
          women++;
        } else {
          other++;
        }

        //calculate pie data for department
        //find user department in departments
        let flag = false;
        departments.forEach(department => {
          if(department.label === user.department){
            department.value++;
            flag = true;
          }
        })
        if(!flag){
          if(!user.department){
            let flag2 = false;
            departments.forEach(department => {
              if(department.label === "Other"){
                department.value++;
                flag2 = true;
              }
            })
            if(!flag2){
              departments.push({label: "Other", value: 1})
            } 
          } else {
            departments.push({label: user.department, value: 1})
          }
        }
      })

        
      //set local state
      setAdmins(admins);
      setUsers(users);

      //set gender pie data
      setGenderPieData([
        { "id": 'Men', 
          "label": 'Men',
          "value": men,
          "color": colors[0]
        },
        { "id": 'Women', 
          "label": 'Women',
          "value": women,
          "color": colors[1]
        },
        { "id": 'Other', 
          "label": 'Other',
          "value": other,
          "color": colors[2]
        },
      ])

      //set department pie data
      let tempDepartments: any[] = []
      departments.forEach((department, i) => {
        tempDepartments.push({
          "id": department.label,
          "label": department.label,
          "value": department.value,
          "color": colors[i]
        })
      })
      setDepartmentPieData(tempDepartments)

      //@ts-ignore
      dispatch(setReduxUsers(data));
    }
  }, [usersList]);

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
      setNewUser({
        user: '',
        password: '',
        confirmPassword: '',
        type: 'user',
        department: '',
        birthdate: '',
        name: '',
        gender: '',
      })
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
        department: newUser.department,
        birthdate: newUser.birthdate,
        name: newUser.name,
        gender: newUser.gender
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
              createdAt: new Date().toLocaleString(),
              name: newUser.name,
              birthdate: newUser.birthdate,
              gender: newUser.gender,
              department: newUser.department
            });
            setUsersList(tempUsers); 
            setAllUsers(tempUsers)

            //reset new user state
            setError('');

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
      setEditName('');
      setEditBirthdate('');
      setEditDepartment('');
      setOpenEditUserModal(!openEditUserModal);
    } else {
      setOpenEditUserModal(!openEditUserModal);
      if(user) {
        //set edit state
        console.log(user);
        setEditUser(user);
        setEditUsername(user.user);
        setEditRole(user.type);
        setEditName(user.name);
        setEditBirthdate(user.birthdate);
        setEditDepartment(user.department);
        setEditGender(user.gender)
        setError('')
        setSuccess('')
      }
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

  /* Function update user - api */
  async function handleUpdateUser(url: string): Promise<Message> {
    return fetch(url, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin':'*'
      },

      //make sure to serialize your JSON body
      body: JSON.stringify({
        username: user.username,
        accessToken: user.accessToken,
        user: editUsername,
        type: editRole,
        name: editName,
        gender: editGender,
        birthdate: editBirthdate,
        department: editDepartment
      }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText)
      }
      return response.json() as Promise<Message>
    })
  }

  const handleEditUser = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('editing user');
    if (validateEditUser()) {
      //edit user in database
      try {
        handleUpdateUser('http://localhost:5000/user/update')
        .then(data => {
          if (data.message === 'success') {
            //set state of users
            
            setSuccess('User updated successfully');
          } else {
            //set error message
            setError(data.message);
          }
        })
      } catch (error) {
        console.log(error);
      }

    }
    //update user in users list
    let tempUsers = [...usersList];
    tempUsers.forEach(user => {
      //@ts-ignore
      if (user.user === editUser.user) {
        user.user = editUsername;
        user.type = editRole;
        user.name = editName;
        user.birthdate = editBirthdate;
        user.department = editDepartment;
        user.gender = editGender
      }
    })
    
    setUsersList(tempUsers);
    setAllUsers(tempUsers);
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
          dispatch(setReduxUsers(data));
        
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
          <StyledTableCell align="left">{row.department ? row.department : "--"}</StyledTableCell>
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

            {/* <---------Left--------> */}
            <div className={styles.left}>
              
              {/* Left top - facts */}
              <div className={styles.facts__container}>
                <div className={styles.fact__item}>
                    <div className={styles.fact__icon__container__admin}>
                        <SupervisorAccountRoundedIcon className={styles.fact__icon}/>
                    </div>
                    <div className={styles.fact__text__container}>
                        <p className={styles.fact__number}>
                            {admins ? admins : 0}
                        </p>
                        <p className={styles.fact__text}>
                            Admins
                        </p>
                    </div>
                </div>

                <div className={styles.fact__item}>
                    <div className={styles.fact__icon__container__user}>
                        <PersonRoundedIcon className={styles.fact__icon}/>
                    </div>
                    <div className={styles.fact__text__container}>
                        <p className={styles.fact__number}>
                            {users ? users : 0}
                        </p>
                        <p className={styles.fact__text}>
                            Users
                        </p>
                    </div>
                </div>

                <div className={styles.fact__item} style={{marginRight: '0px'}}>
                    <div className={styles.fact__icon__container__dept}>
                        <ApartmentRoundedIcon className={styles.fact__icon}/>
                    </div>
                    <div className={styles.fact__text__container}>
                        <p className={styles.fact__number}>
                            {departmentPieData.length}
                        </p>
                        <p className={styles.fact__text}>
                            Departments
                        </p>
                    </div>
                </div>
              </div>

              {/* Left bottom - table */}
              <div className={styles.table__container}>
                  {/* header */}
                  <div className={styles.list__header}>
                    {/* search input */}
                    <StyledTextField size='small' type="text" className={styles.input} id="searchText" label="Type user here"  value={searchText} onChange={(e) => handleSearchTextChange(e.target.value)} />
                    
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
                          <TableContainer sx={{ maxHeight: 'calc(100vh - 380px)', minHeight: 'cacl(100vh - 380px)', paddingRight: '15px' }}>
                            <Table aria-label="collapsible table" >
                              <TableHead>
                                <TableRow style={{borderBottom: '1px solid rgba(255,255,255,0.19)'}}>
                                  <StyledTableCell>User</StyledTableCell>
                                  <StyledTableCell align="left">Role</StyledTableCell>
                                  <StyledTableCell align="left">Department</StyledTableCell>
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
              </div>

              {/* <---------Right--------> */}
              <div className={styles.right}>
                {/* Top Right - chart gender */}
                <div className={styles.chart__container} style={{marginBottom: 20}}>
                  <h4 className={styles.pie__title}>Users by gender</h4>
                  <UserPie data={genderPieData}/>
                </div>
                
                
                {/* Bottom right - chart departments */}
                <div className={styles.chart__container}>
                  <h4 className={styles.pie__title}>Users by department</h4>
                  <UserPie data={departmentPieData}/>
                </div>

              </div>

            </div>  


          {/* <----Modals----> */}

          {/* Create user modal */}
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={openCreateUserModal}
            onClose={handleCreateUserModalChange}
          >
            <>
              <form className={styles.form} onSubmit={(e) => {createUser(e)}} autoComplete="off">
                <div className={styles.form__container}>
                  {/* header */}
                  <div className={styles.form__head}>
                    <h4>Create User</h4>
                    <PersonRoundedIcon/>
                  </div>

                  {/* user */}
                  <div className={styles.form__container__input}>
                    <StyledTextField size='small' type="mail" id="user" autoComplete='off' label='user' className={styles.form__input} value={newUser.user} onChange={(e) => {setNewUser({...newUser, user: e.target.value})}} />
                  </div>

                  {/* name */}
                  <div className={styles.form__container__input}>
                    <StyledTextField size='small' type="text" id="user" autoComplete='off' label='Complete name' className={styles.form__input} value={newUser.name} onChange={(e) => {setNewUser({...newUser, name: e.target.value})}} />
                  </div>

                  {/* password */}
                  <div className={styles.form__container__input}>
                    <StyledTextField size='small' type="password" id="password" autoComplete='new-password' label='password' className={styles.form__input} value={newUser.password} onChange={(e) => {setNewUser({...newUser, password: e.target.value})}} />
                  </div>

                  {/* confirm password */}
                  <div className={styles.form__container__input}>
                    <StyledTextField size='small' type="password" id="password" autoComplete='new-password' label='confirm password' className={styles.form__input} value={newUser.confirmPassword} onChange={(e) => {setNewUser({...newUser, confirmPassword: e.target.value})}} />
                  </div>

                  {/* birthdate */}
                  <div className={styles.form__container__input}>
                    <StyledTextField size='small' type="date" id="password" autoComplete='new-password' label='birthdate' focused className={styles.form__input} value={newUser.birthdate} onChange={(e) => {setNewUser({...newUser, birthdate: e.target.value})}} />
                  </div>

                  {/* gender */}
                  <InputLabel id="demo-customized-select-label" style={{color: 'rgba(255,255,255,0.5)', marginBottom: '-20px', fontSize: '14px'}}>Select Gender</InputLabel>
                  <Select
                    labelId="demo-customized-select-label"
                    id="demo-customized-select"
                    value={newUser.gender}
                    onChange={(e) => {setNewUser({...newUser, gender: e.target.value})}}
                    input={<TransparentInput />}
                    style={{ width: '100%', marginBottom: '20px' }}
                  >
                    <MenuItem value={""} defaultChecked>Select Gender</MenuItem>
                    <MenuItem value={"man"}>Man</MenuItem>
                    <MenuItem value={"woman"}>Woman</MenuItem>
                    <MenuItem value={"other"}>Other</MenuItem>
                  </Select>

                  {/* role */}
                  <InputLabel id="demo-customized-select-label" style={{color: 'rgba(255,255,255,0.5)', marginBottom: '-20px', fontSize: '14px'}}>Select Role</InputLabel>
                  <Select
                    labelId="demo-customized-select-label"
                    id="demo-customized-select"
                    value={newUser.type}
                    onChange={(e) => {setNewUser({...newUser, type: e.target.value})}}
                    input={<TransparentInput />}
                    style={{ width: '100%', marginBottom: '20px' }}
                  >
                    <MenuItem value={""} defaultChecked>Select Role</MenuItem>
                    <MenuItem value={"admin"} defaultChecked>Admin</MenuItem>
                    <MenuItem value={"user"}>User</MenuItem>
                  </Select>

                  {/* department */}
                  <div className={styles.form__container__input}>
                    <StyledTextField size='small' type="text" id="department" label='department' className={styles.form__input} value={newUser.department} onChange={(e) => {setNewUser({...newUser, department: e.target.value})}} />
                  </div>
                  
                  {/* submit */}
                  <div>
                    <button type="submit" className={styles.form__btn}>Create user</button>
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
                    <h4>Edit User: <span style={{color: 'white', fontSize: '15px'}}>{editUsername}</span></h4>
                    <PersonRoundedIcon/>
                  </div>

                  {/* user */}
                  <div className={styles.form__container__input}>
                    <StyledTextField size="small" type="text" id="user" autoComplete='off' label='Complete name' className={styles.form__input} value={editName} onChange={(e) => setEditName(e.target.value)} />
                  </div>

                  {/* birthdate */}
                  <div className={styles.form__container__input}>
                    <StyledTextField size='small' type="date" id="password" autoComplete='new-password' label='birthdate' focused className={styles.form__input} value={editBirthdate} onChange={(e) => {setEditBirthdate(e.target.value)}} />
                  </div>

                  {/* gender */}
                  <InputLabel id="demo-customized-select-label" style={{color: 'rgba(255,255,255,0.5)', marginBottom: '-20px', fontSize: '14px'}}>Select Gender</InputLabel>
                  <Select
                    labelId="demo-customized-select-label"
                    id="demo-customized-select"
                    value={editGender}
                    onChange={(e) => {setEditGender(e.target.value)}}
                    input={<TransparentInput />}
                    style={{ width: '100%', marginBottom: '20px' }}
                  >
                    <MenuItem value={""} defaultChecked>Select Gender</MenuItem>
                    <MenuItem value={"man"}>Man</MenuItem>
                    <MenuItem value={"woman"}>Woman</MenuItem>
                    <MenuItem value={"other"}>Other</MenuItem>
                  </Select>

                  {/* role */}
                  <InputLabel id="demo-customized-select-label" style={{color: 'rgba(255,255,255,0.5)', marginBottom: '-20px'}}>Select Role</InputLabel>
                  <Select
                    labelId="demo-customized-select-label"
                    id="demo-customized-select"
                    value={editRole}
                    onChange={(e) => setEditRole(e.target.value)}
                    input={<TransparentInput />}
                    style={{ width: '100%', marginBottom: '20px' }}
                  >
                    <MenuItem value={"admin"} defaultChecked>Admin</MenuItem>
                    <MenuItem value={"user"}>User</MenuItem>
                  </Select>

                  {/* department */}
                  <div className={styles.form__container__input}>
                    <StyledTextField size='small' type="text" id="department" label='department' className={styles.form__input} value={editDepartment} onChange={(e) => {setEditDepartment(e.target.value)}} />
                  </div>
                  
                  {/* submit */}
                  <div>
                    <button type="submit" className={styles.form__btn}>Save changes</button>
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
                    <h4>Delete User: <span style={{color: 'white', fontSize: '15px'}}>{deleteUser?.user}</span></h4>
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
