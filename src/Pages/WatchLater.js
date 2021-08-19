import { Grid, Typography } from '@material-ui/core';
import React from 'react'
import { useStateValue } from '../ContextAPI/globalState';
import MediaCard from '../Components/Card';

function WatchLater() {
    const {watchLater} = useStateValue();


    return (
        <Grid container spacing={4}>
            {watchLater.length === 0 ? (
                 <Grid item xs={12} >
                      <Typography variant="h5"> please shows videos </Typography>
                </Grid>
            ) : (
                watchLater.map((video , index ) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                        <MediaCard videos={video}  videoIdWatchLater={false} />
                    </Grid>
                ))
            )}
        </Grid>
    )
}

export default WatchLater
