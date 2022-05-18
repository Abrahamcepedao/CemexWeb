/* 
  Component that renders the given error message
*/

import type { NextPage } from 'next'

/* React */
import React from 'react'



/* CSS */
import styles from '../../styles/components/admin/WarningMessage.module.css'

/* Material - UI */
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';

interface Props {
    message: string
}

const WarningMessage: NextPage<Props> = (props) => {
  const message = props.message;

  return (
    <div className={styles.container}>
      <WarningRoundedIcon className={styles.icon} />
      <p>{message}</p>
    </div>
  )
}

export default WarningMessage
