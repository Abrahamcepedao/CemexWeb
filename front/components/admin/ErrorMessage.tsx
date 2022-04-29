/* 
  Component that renders the given error message
*/

import type { NextPage } from 'next'

/* React */
import React from 'react'



/* CSS */
import styles from '../../styles/components/admin/ErrorMessage.module.css'

/* Material - UI */
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';

interface Props {
    message: string
}

const ErrorMessage: NextPage<Props> = (props) => {
  const message = props.message;

  return (
    <div className={styles.container}>
      <ErrorOutlineRoundedIcon className={styles.icon} />
      <p>{message}</p>
    </div>
  )
}

export default ErrorMessage
