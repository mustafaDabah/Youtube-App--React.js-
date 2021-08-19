import { Grid } from '@material-ui/core'
import React from 'react'
import ChannelTitle from '../Components/ChannelTitle';
import Header from '../Components/Header';
import MediaCard from '../Components/Card';
import useFetch from '../Hooks/useFetch';
import CircularProgressLoading from '../Components/CircularProgressLoading';
import { Fragment } from 'react';



function Channel({match}) {
    // fetch channel data   
    const {data:channelDetails , loading:loadingChannelDetails} = useFetch(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${match.params.id}`);

    // fetch videos related to his channel 
    const {data:videos , loading:loadingVideos } = useFetch(`https://www.googleapis.com/youtube/v3/search?&channelId=${match.params.id}&part=snippet&order=date&maxResults=100`);

    return (
        <Grid container spacing={1}>
            {loadingChannelDetails.current && loadingVideos.current  ? (
                <>
                    {channelDetails?.items?.map(details => (
                        <Fragment key={details.id}>
                            <Grid item xs={12}>
                                <Header path={details.snippet.thumbnails.medium.url} />
                            </Grid>
                            <Grid item xs={12}>
                                <ChannelTitle  details={details} />
                            </Grid>
                        </Fragment>
                    ))}
                    {videos?.items?.map(video => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={video.id.videoId}>
                            <MediaCard videos={video}  videoId={true} />
                            {console.log(video.id.videoId)}
                        </Grid>
                    ))}
                </>
            ) : (<CircularProgressLoading/>)}
        </Grid>
    )
}

export default Channel
