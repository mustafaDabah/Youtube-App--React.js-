import React from 'react'
import { makeStyles } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
    imgHeader:{
        width:'100%',
        borderRadius: theme.shape.borderRadius,
        height: '300px',
        objectFit:'cover',
        [theme.breakpoints.down('sm')]: {
            height:'150px'
          },
    }
}))

function Header({path}) {
    const classes = useStyles();

    return (
        <img className={classes.imgHeader} src={path} alt="img header"/>   
    )
}

export default Header
