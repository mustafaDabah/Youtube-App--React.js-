import React from 'react'
import { useStateValue } from '../ContextAPI/globalState';
import useFetch from '../Hooks/useFetch';
import MediaCard from '../Components/Card';
import { Grid } from '@material-ui/core';
import CircularProgressLoading from '../Components/CircularProgressLoading';

function Search() {
    const {search} = useStateValue();

    // fetch videos  
    const {data , loading} =  useFetch('https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2Cstatistics&chart=mostPopular&maxResults=30')

    // filter data 
    const filter =  loading.current ? data.items.filter(video => video.snippet.title.toLowerCase().includes(search.toLowerCase())) : false 


    return (
        loading.current ? (
            <Grid container spacing={4}>
                {loading && filter.map(video => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={video.id}>
                        <MediaCard videos={video}  />
                    </Grid>))}
            </Grid>
        ) : (
            <CircularProgressLoading/>
        ) 
        
    )
}

export default Search
