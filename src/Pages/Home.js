import { Grid } from '@material-ui/core';
import MediaCard from '../Components/Card';
import Header from '../Components/Header';
import useFetch from '../Hooks/useFetch';
import CircularProgressLoading from '../Components/CircularProgressLoading';

function Home() {
    // fetch videos 
    const {data:videos , loading} = useFetch('https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&part=player&maxHeight=100&maxResults=100&maxWidth=100');

    return (
      loading.current ? (
        <Grid container alignItems="center" justifyContent="center"  spacing={3}>  
            {/*--top image--*/}
            <Grid item xs={12} >
                <Header path="./images/channel.png" />
            </Grid>
            {videos?.items?.map(video => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={video.id} >
                    <MediaCard loading={true} videos={video}  />
                </Grid>
            ))}
        </Grid>
      ) : (
          <CircularProgressLoading/>
      )  
    )
}

export default Home
