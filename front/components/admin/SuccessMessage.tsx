/* 
  Component that renders the given error message
*/

import type { NextPage } from 'next'

/* React */
import React from 'react'



/* CSS */
import styles from '../../styles/components/admin/SuccessMessage.module.css'

/* Material - UI */
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
interface Props {
    message: string
}

const SuccessMessage: NextPage<Props> = (props) => {
  const message = props.message;

  return (
    <div className={styles.container}>
      <CheckCircleOutlineRoundedIcon className={styles.icon} />
      <p>{message}</p>
    </div>
  )
}

export default SuccessMessage
