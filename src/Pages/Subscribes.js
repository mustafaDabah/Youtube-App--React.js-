import React from 'react';
import { Box , makeStyles  ,Typography, Button, Grid } from '@material-ui/core'
import { useStateValue } from '../ContextAPI/globalState';
import numeral from 'numeral'
import {Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => {
    return {
        containerAvatar:{
            '& img':{
                width: '150px',
                height: '150px',
                borderRadius:'100%',
                marginBottom:theme.spacing(3),
            },
            [theme.breakpoints.down('sm')]: {
                '& img':{
                    width:'50px',
                    height:'50px',
                },
            },
        },
        btnUnSubscribe:{
            padding:theme.spacing(2),
            color:'#ff0000',
            marginBottom:theme.spacing(2)
        }
    }
})

function Subscribes() {
    const classes = useStyles();
    const { subscribes , untSubscribes } = useStateValue();

    return (
        <Grid container>
            {subscribes.length === 0 ? ( 
                <Grid item xs={12} >
                    <Typography variant="h5">please makes subscribes </Typography>
                 </Grid>)
            : (
                subscribes?.map(channel => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={channel.id}>
                        <Box display="flex" flexDirection="column" className={classes.containerAvatar}  alignItems="center">
                            <Link to={`/channel/${channel.id}`}>
                                <img  src={channel.snippet.thumbnails.default.url} alt="avatar" />
                            </Link>
                            <div>
                                <Typography align="center" gutterBottom className={classes.titleChannel} variant="h6">  {channel.snippet.title}</Typography>
                                <Typography align="center" gutterBottom className={classes.titleChannel} color="textSecondary" variant="body1" component="p">  {numeral(channel.statistics.subscriberCount).format('0.a')} subscribes </Typography>
                                <Button className={classes.btnUnSubscribe} onClick={() => untSubscribes(channel.id)}>unsubscribe</Button>
                            </div>
                        </Box>
                    </Grid>
                ))
            )}
            
        </Grid>
    )
}

export default Subscribes
