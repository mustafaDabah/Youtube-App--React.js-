import { Grid } from '@material-ui/core';
import useFetch from '../Hooks/useFetch';
import SmallCard from '../Components/SmallCard';
import WatchScreen from '../Components/WatchScreen';
import CircularProgressLoading from '../Components/CircularProgressLoading';



function WatchVideo({match}) {
    // fetch data to return video iframe 
    const {data  , loading} = useFetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&part=player&id=${match.params.id}`);

    // to return recommend videos
    const {data:recommendVideos , loading:loadingRecommend} = useFetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&part=player&maxHeight=100&maxResults=100&maxWidth=100`);


    return (

        <Grid container spacing={5}>
                {loading.current && loadingRecommend.current ? (
                   <>
                        <Grid item xs={12} md={8} >    
                            {data?.items?.map(video => (
                                <WatchScreen video={video} key={video.id} />
                            ))}
                        </Grid>
                        <Grid item xs={12} md={4}>
                                {recommendVideos?.items?.map(video => (
                                    <SmallCard videos={video} key={video.id} />
                                ))}
                        </Grid> 
                   </>  

                ) : (
                    <CircularProgressLoading/>
                )}
            
        </Grid>
    )
}


export default WatchVideo
