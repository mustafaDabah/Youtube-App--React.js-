import React from 'react'
import { Box , makeStyles  ,Typography } from '@material-ui/core'
import numeral from 'numeral'
import BtnSubscribe from './BtnsSubscribe';

const useStyles = makeStyles((theme) => {
    return {
        containerAvatar:{
            paddingBottom:theme.spacing(2),
            marginTop:theme.spacing(3),
            '& img':{
                width: '150px',
                height: '150px',
                borderRadius:'100%',
                marginRight:theme.spacing(2),
            },
            [theme.breakpoints.down('sm')]: {
                '& img':{
                    width:'50px',
                    height:'50px',
                },
            },
        }
    }
})
function ChannelTitle({details}) {
    const classes = useStyles();  

    return (
        <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap">
            <Box display="flex" className={classes.containerAvatar}  alignItems="center">
                <img  src={details.snippet.thumbnails.default.url} alt="avatar " />
                <div>
                    <Typography className={classes.titleChannel} variant="h6"> {details.snippet.title} </Typography>
                    <Typography className={classes.titleChannel} color="textSecondary" variant="body1" component="p"> {numeral(details.statistics.subscriberCount).format('0.a')} subscribe </Typography>
                </div>
            </Box>
            <BtnSubscribe  details={details}/>
        </Box>
    )
}

export default ChannelTitle
