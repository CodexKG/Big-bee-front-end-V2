import classes from './Corset.module.scss'
import React from 'react'
const Corset:React.FC<any> = ({children,...props}) => {
  return (
    <div className={classes.corset} {...props}>
        {children}
    </div>
  )
}

export default Corset