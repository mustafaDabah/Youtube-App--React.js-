import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
import {makeStyles} from '@material-ui/core'

const useStyles = makeStyles((theme) => {
    return {
        circularProgress:{
            position: 'absolute',
            top: '50%',
            left: '50%',
            color:'#ff0000'
        }
    }
})
function CircularProgressLoading() {
    const classes = useStyles();

    return (
        <CircularProgress className={classes.circularProgress}/>
    )
}

export default CircularProgressLoading
