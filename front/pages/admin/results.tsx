/* 
  Component that renders to login page
*/

import type { NextPage } from 'next'
import Router from 'next/router'

/* React */
import React, { useEffect, useState } from 'react'

/* Redux */
import { setDropDepth, setInDropZone, setCurrentTab, setReportType, setNumberClusters, resetResultsDefects, resetResultsReportType } from "../../redux/actions"
import { selectDropDepth } from "../../redux/states/file/reducer"
import { selectUser } from "../../redux/states/user/reducer"
import { selectParametersType, selectUsername, selectDate1, selectDate2, selectReportType, selectNumberClusters } from '../../redux/states/historicReport/reducer'
import { selectResultsReportType } from '../../redux/states/results/reducer'
import { useAppSelector, useAppDispatch } from '../../redux/hooks'

/* Components */
import Head from 'next/head'
import SideBar from '../../components/admin/SideBar'
import { StyledTableRow } from '../../components/admin/StyledTableRow'
import { StyledTableCell } from '../../components/admin/StyledTableCell'

/* CSS */
import styles from '../../styles/admin/Results.module.css'

/* Material - UI */
import { IconButton } from '@mui/material'
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';

/* Material UI - icons */
import BugReportRoundedIcon from '@mui/icons-material/BugReportRounded';
import BookmarksRoundedIcon from '@mui/icons-material/BookmarksRounded';
import DonutSmallRoundedIcon from '@mui/icons-material/DonutSmallRounded';
import BarChartRoundedIcon from '@mui/icons-material/BarChartRounded';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import CircleRoundedIcon from '@mui/icons-material/CircleRounded';
import AnalyticsRoundedIcon from '@mui/icons-material/AnalyticsRounded';
import FileDownloadRoundedIcon from '@mui/icons-material/FileDownloadRounded';
import ReplayRoundedIcon from '@mui/icons-material/ReplayRounded';
import PestControlRoundedIcon from '@mui/icons-material/PestControlRounded';

/* Nivo */
import MyBar from '../../components/admin/MyBar'
import MyPie from '../../components/admin/MyPie'


/* Data */
import Results from "./apiResponse.json"

/* Interfaces */
interface Defect {
    "Issue key": string,
    "Status": string,
    "Priority": string,
    "Custom field (Severity)": string,
    "Project key": string,
    "Issue Type": string,
    "Created": string,
    "Assignee": string | null,
    "Custom field (Digital Service)": string,
    "Summary": string,
    "Description": string,
    "Cluster": number
}

interface Label {
    number: number,
    label: string,
    color: string,
    status: boolean,
    value: number,
    percentage: number
}


//consant of a 100 colors array
const colors = [
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

const commonProps = {
  theme:{
    axis: {
        fontSize: "14px",
        tickColor: "#fff",
        ticks: {
          line: {
            stroke: "#fff"
          },
          text: {
            fill:"white"
          }
        },
        legend: {
          text: {
            fill: "white"
          }
        }
      },
  },
  labelSkipWidth: 10,
  labelTextColor: "white"
};



const Dashboard: NextPage = (props) => {

    /* useState - graphs data  */
    const [graphType, setGraphType] = useState<String>('pie');
    const [barData, setBarData] = useState<any>([])
    const [pieData, setPieData] = useState<any>([])

    /* useState - defects data */
    const [defectsAll, setAllDefects] = useState<Defect[]>([])
    const [defects, setDefects] = useState<Defect[]>([])
    const [labels, setLabels] = useState<Label[]>([])

    /* useState - table pagination */
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(15);

    /* Redux */
    const dispatch = useAppDispatch(); //function that allows to trigger actions that update the redux state
    
    /* redux - user */
    const user = useAppSelector(selectUser) //function that allows to get the current user from the redux state
    
    /* redux - historic report */
    const historicParametersType = useAppSelector(selectParametersType) //function that allows to get the historic parametersType from the redux state
    const historicUsername = useAppSelector(selectUsername) //function that allows to get the historic username from the redux state
    const historicDate1 = useAppSelector(selectDate1) //function that allows to get the historic date1 from the redux state
    const historicDate2 = useAppSelector(selectDate2) //function that allows to get the historic date2 from the redux state
    const historicReportType = useAppSelector(selectReportType) //function that allows to get the historic report type from the redux state
    const historicNumClusters = useAppSelector(selectNumberClusters) //function that allows to get the historic number of clusters from the redux state

    /* redux - results report */
    const resultsReportType = useAppSelector(selectResultsReportType) //function that allows to get the results report type from the redux state
    

    useEffect(() => {
        /* Set current tab */
        dispatch(setCurrentTab('dashboard'));

        /* Redirect user if needed */
        if (!user) {
        //Router.push('/');
        } else {
        
        }

        /* set defects */
        //delete all -1 CLuster of Results
        let defectsAllTemp = Results.filter(defect => defect.Cluster !== -1)

        setAllDefects(defectsAllTemp);
        setDefects(defectsAllTemp);

    
        /* set labels */
        //@ts-ignore
        var labelsTemp = [];
        labelsTemp.push({ number: -2, label: 'All', color: '#FFEB3B', status: false, value: Results.length, percentage: 100 });
        defectsAllTemp.forEach(element => {
            //check if label already exists
            var found = false;
            //@ts-ignore
            labelsTemp.forEach((label, i) => {
                var tempLabel = 'Cluster ' + element.Cluster;
                if (label.label === tempLabel) {
                    found = true;
                    //@ts-ignore
                    labelsTemp[i].value++;
                }
            }
            );
            if (!found && element.Cluster !== -1) {
                labelsTemp.push({ number: element.Cluster, label: `Cluster ${element.Cluster}`, color: colors[element.Cluster + 1], status: false, value: 1, percentage: 0 });
            }
        });
        console.log(labelsTemp);

        //sort by number
        labelsTemp.sort(function (a, b) {
            return b.value - a.value;
        });

        //set percentages of labels
        labelsTemp.forEach((element, i) => {
            //@ts-ignore
            let per = (element.value / defectsAllTemp.length) * 100;
            //@ts-ignore
            labelsTemp[i].percentage =  per.toFixed(2);
        });

        console.log(labelsTemp);

        //set pie data and bar chart data
        //@ts-ignore
        var pieDataTemp = [];
        //@ts-ignore
        var barDataTemp = [];
        labelsTemp.forEach(element => {
            if(element.label !== 'All'){
                pieDataTemp.push({
                    "id": element.label,
                    "label": element.label,
                    "value": element.value,
                    "percentage": element.percentage,
                    "color": element.color
                });
                barDataTemp.push({
                    "cluster": element.label,
                    "value": element.value,
                    "percentage": element.percentage,
                    "color": element.color
                });
            } 
        });

        //@ts-ignore
        setPieData(pieDataTemp);
        //@ts-ignore
        setBarData(barDataTemp);
        //@ts-ignore
        setLabels(labelsTemp);
        
    }, [graphType]);

    /* Function to filter defects by label */
    const handleChipClick = (label: Label) => {
        //set status of label to true
        const newLabels = labels.map(l => {
            if (l.number === label.number) {
                l.status = true;
            } else {
                l.status = false;
            }
            return l;
        });
        setLabels(newLabels);

        //set defects to filtered defects
        if (label.number === -2) {
            setDefects(Results);
        } else {
            setDefects(Results.filter(defect => defect.Cluster === label.number));
        }
    }


    /* Table functions */
    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - defects.length) : 0;

    //function to get color label of a defect
    const getLabelColor = (cluster: number) => {
        const label = labels.find(label => label.number === cluster);
        if (label) {
            return label.color;
        } else {
            return '#000000';
        }
    }

    //function to download file
    //@ts-ignore
    const downloadFile = ({ data, fileName, fileType }) => {
        const blob = new Blob([data], { type: fileType })

        const a = document.createElement('a')
        a.download = fileName
        a.href = window.URL.createObjectURL(blob)
        const clickEvt = new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: true,
        })
        a.dispatchEvent(clickEvt)
        a.remove()
    }
    
    //function to export defects to csv
    //@ts-ignore
    const exportToCsv = e => {
        e.preventDefault()

        // Headers for each column
        let headers = ['Issue key,Status,Priority,Custom field (Severity),Project key,Issue Type,Created,Assignee,Custom field (Digital Service),Summary,Description,Data,User,Cluster']

        //@ts-ignore
        let temp = []
        Results.map((defect) => {
            //clean Custom field (Digital Service)
            let digitalService:string = defect['Custom field (Digital Service)'];
            if(digitalService !== null){
                digitalService = digitalService.replace(/,/g, " ")
            }

            //clean summary
            var summary:string = defect.Summary
            if(summary !== null){
                summary = summary.replace(/,/g, " ")
                summary = summary.replaceAll(/[\n\r\t]/g,' ')
            }

            //clean description
            var desc:string = defect.Description;
            if(desc !== null){
                desc = desc.replace(/,/g, " ")
                desc = desc.replaceAll(/[\n\r\t]/g,' ')
            }

            temp.push([defect['Issue key'], defect['Status'], defect['Priority'], defect['Custom field (Severity)'], defect['Project key'], defect['Issue Type'], defect['Created'], defect['Assignee'], digitalService, summary, desc, defect['Data'], defect['User'], defect['Cluster']].join(','))
            
        })

        //@ts-ignore
        downloadFile({
            //@ts-ignore
            data: [...headers, ...temp].join('\n'),
            fileName: 'results.csv',
            fileType: 'text/csv',
        })
    }

    //function to do another report
    const doAnotherReport = () => {
        //dispatch all elements to redux
        dispatch(resetResultsDefects());
        dispatch(resetResultsReportType());

        //redirect to dashboard
        Router.push('/admin/dashboard');

    }

    /* Row of defects table */
    function Row(props: { row: Defect }) {
        const { row } = props;
        const [open, setOpen] = React.useState(false);

        return (
        <React.Fragment>
            <StyledTableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
            <StyledTableCell component="th" scope="row">
                <div className={styles.circle} style={{background: getLabelColor(row["Cluster"])}}></div>
            </StyledTableCell>
            {/* <StyledTableCell component="th" scope="row">
                {row["Issue key"]}
            </StyledTableCell> */}
            <StyledTableCell align="right">{row["Created"] ? row["Created"] : "--"}</StyledTableCell>
            <StyledTableCell align="right">{row["Assignee"] ? row["Assignee"] : "--"}</StyledTableCell>
            <StyledTableCell align="right">{row["Priority"] ? row["Priority"] : "--"}</StyledTableCell>
            <StyledTableCell align="right">
                <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => setOpen(!open)}
                style={{ color: 'white' }}
                >
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
            </StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
            <StyledTableCell style={{ paddingBottom: 0, paddingTop: 0, paddingRight: 20 }} colSpan={6}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                <Box sx={{ margin: 0, paddingRight: 0 }}>
                    <div>
                        <p className={styles.info__item}><b>Cluster: </b>{row["Cluster"]}</p>
                        <p className={styles.info__item}><b>Issue key: </b>{row["Issue key"]}</p>
                        <p className={styles.info__item}><b>Status: </b>{row["Status"]}</p>
                        <p className={styles.info__item}><b>Severity: </b>{row["Custom field (Severity)"]}</p>
                        <p className={styles.info__item}><b>Issue Type: </b>{row["Issue Type"]}</p>
                        <p className={styles.info__item}><b>Digital Service: </b>{row["Custom field (Digital Service)"]}</p>
                        <p className={styles.info__item}><b>Summary: </b>{row["Summary"]}</p>
                        <p className={styles.info__item}><b>Description: </b>{row["Description"]}</p>
                    </div>
                    
                </Box>
                </Collapse>
            </StyledTableCell>
            </StyledTableRow>
        </React.Fragment>
        );
    }
  

    return (
        <div className={styles.container}>
        <Head>
            <title>Cemex Fix - Dashboard</title>
            <meta name="description" content="Cemex Fix web application - developed by DFuture" />
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
            <SideBar/>
            <div className={styles.results__container}>
                {/* top - header */}
                <div className={styles.facts__container}>
                    <div className={styles.fact__item}>
                        <div className={styles.fact__icon__container__bug}>
                            <BugReportRoundedIcon className={styles.fact__icon}/>
                        </div>
                        <div className={styles.fact__text__container}>
                            <p className={styles.fact__number}>
                                {defectsAll.length}
                            </p>
                            <p className={styles.fact__text}>
                                Defects
                            </p>
                        </div>
                    </div>

                    <div className={styles.fact__item}>
                        <div className={styles.fact__icon__container__bug2}>
                            <PestControlRoundedIcon className={styles.fact__icon}/>
                        </div>
                        <div className={styles.fact__text__container}>
                            <p className={styles.fact__number}>
                                {Results.length - defectsAll.length}
                            </p>
                            <p className={styles.fact__text}>
                                Unclassified
                            </p>
                        </div>
                    </div>

                    <div className={styles.fact__item}>
                        <div className={styles.fact__icon__container__defect}>
                            <BookmarksRoundedIcon className={styles.fact__icon}/>
                        </div>
                        <div className={styles.fact__text__container}>
                            <p className={styles.fact__number}>
                                {labels.length - 1}
                            </p>
                            <p className={styles.fact__text}>
                                Clusters
                            </p>
                        </div>
                    </div>
                
                    <div className={styles.fact__item}>
                        <div className={styles.fact__icon__container__report}>
                            <AnalyticsRoundedIcon className={styles.fact__icon}/>
                        </div>
                        <div className={styles.fact__text__container}>
                            <p className={styles.fact__number}>
                                {resultsReportType ? resultsReportType.toUpperCase() : "--"}
                            </p>
                            <p className={styles.fact__text}>
                                Method
                            </p>
                        </div>
                    </div>
                


                    <div className={styles.action__item}>
                        <Tooltip title="Download CSV" placement='top'>
                            <IconButton onClick={exportToCsv}>
                                <FileDownloadRoundedIcon className={styles.icon}/>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="New report">
                            <IconButton onClick={doAnotherReport}>
                                <ReplayRoundedIcon className={styles.icon}/>
                            </IconButton>
                        </Tooltip>
                    </div>
                </div>

                <div className={styles.lower__container}>
                    <div className={styles.results__left}>
                        {/* left - graph */}
                        <div className={styles.graph__container}>
                            <div className={styles.graph__header}>
                                <h2>Distribution of defects</h2>
                                <div className={styles.graph__header__icons}>
                                    <IconButton onClick={() => {setGraphType('pie')}}>
                                        <DonutSmallRoundedIcon className={styles.icon} style={{opacity: graphType === "pie" ? 1 : 0.5}}/>
                                    </IconButton>
                                    <IconButton onClick={() => {setGraphType('bar')}}>
                                        <BarChartRoundedIcon className={styles.icon} style={{opacity: graphType === "bar" ? 1 : 0.5}}/>
                                    </IconButton>
                                </div>
                            </div>

                            <div className={styles.graph__body}>
                                <div className={styles.graph}>
                                    {(graphType === "pie" && barData.length !== 0) ? (
                                        <MyPie data={pieData}/>
                                    ) : (
                                        <MyBar data={barData} commonProps={commonProps}/> 
                                    )}
                                </div>
                                <div className={styles.graph__legend}>
                                    {labels.map((label, index) => (
                                        <div key={index}>
                                            {index !== 0 && (
                                                <div className={styles.legend__container}>
                                                    <div className={styles.circle} style={{backgroundColor: label.color, marginRight: 10}}></div>
                                                    <p>{label.label}</p>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* right */}
                    <div className={styles.results__right}>

                        {/* Right lower - defects */}
                        <div className={styles.right__lower}>
                            {/* labels */}
                            <div className={styles.labels__container}>
                                <h2>Select a label</h2>
                                <div className={styles.labels__list}>
                                    {labels.map((label, index) => (
                                        <Chip
                                            key={index}
                                            label={label.label === "All" ? "All" : `${label.label} (${label.percentage}%)`}
                                            onClick={() => {handleChipClick(label)}}
                                            icon={<CircleRoundedIcon style={{color: label.color}}/>}
                                            variant="filled"
                                            style={{fontWeight: 'bold', color: 'white', marginRight: '10px', textDecoration: label.status ? 'underline': 'none', opacity: label.status ? 1 : 0.8}}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* defects data */}
                            <div className={styles.defects__container}>
                                {defects.length !== 0 && (
                                    <>
                                        {/* list of defects */}
                                        <div className={styles.defects__list__container}>
                                            <TableContainer sx={{ maxHeight: 'calc(100vh - 470px)', minHeight: 'cacl(100vh - 470px)'}}>
                                            <Table aria-label="collapsible table" >
                                                <TableHead>
                                                <TableRow>
                                                    <StyledTableCell />
                                                    <StyledTableCell align="right">Date</StyledTableCell>
                                                    <StyledTableCell align="right">Assignee</StyledTableCell>
                                                    <StyledTableCell align="right">Priority</StyledTableCell>
                                                    <StyledTableCell />
                                                </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                {defects.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                                                    <>  
                                                        <Row key={row['Issue key']} row={row} />
                                                    </>
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
                                            count={defects.length}
                                            rowsPerPage={rowsPerPage}
                                            page={page}
                                            onPageChange={handleChangePage}
                                            onRowsPerPageChange={handleChangeRowsPerPage}
                                            />
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                
            </div>
            
        </main>
        </div>
    )
}

export default Dashboard
