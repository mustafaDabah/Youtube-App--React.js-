import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Box } from '@material-ui/core';
import numeral from 'numeral'
import { useHistory } from 'react-router-dom';
import { useStateValue } from '../ContextAPI/globalState';


const useStyles = makeStyles((theme) => {
    return {
      root: {
          width: '100%',
          borderRadius:theme.shape.borderRadius,
          backgroundColor: theme.palette.primary.main,
          height:150,
          marginBottom:theme.spacing(2)
        },
        actionCard:{
            height:150,
        },
        media: {
            height: '150px',
            width: '50%',
        },
        content:{
            width: '50%',
        },
        channelTitle:{
            fontSize:theme.spacing(1.7)
        },
        titleVideo:{
            fontSize:theme.spacing(1.4)
        }
    }
})

function SmallCard({videos}) {
    const classes = useStyles();
    const history = useHistory();

    // selectors 
    const {thumbnails} = videos.snippet;

    // get data from global state 
    const {setWatchLater } = useStateValue();
    
    // date videos 
    const date = videos.snippet.publishedAt;
    const dateObject = new Date (date);

    // views counter 
    const views = videos.statistics.viewCount

     // go to the page watch movie
     const goToWatchVideo = () => {
        // or || this helped me with id because i couldn't get the same id sorry !!!  
        history.push(`/watchvideo/${videos?.id}`);
        setWatchLater(videos);
    }
    return (
        <Card className={classes.root}>
            <CardActionArea className={classes.actionCard}  onClick={goToWatchVideo}>
                <Box display="flex" justifyContent="center" alignItems="center">
                    <CardMedia
                    className={classes.media}
                    image={thumbnails.medium.url} 
                    />
                    <CardContent className={classes.content}>
                        <Typography gutterBottom variant="h6"  component="h2" className={classes.channelTitle}> 
                            {videos.snippet.channelTitle}
                        </Typography>
                        <Typography  gutterBottom  variant="body2" color="textSecondary" className={classes.titleVideo} component="p">
                            {videos.snippet.title}
                        </Typography>
                        <Typography  gutterBottom  variant="body2" color="textSecondary" component="p"  className={classes.titleVideo}>
                            {numeral(views).format('0.a')} views , {dateObject.toDateString()}
                        </Typography> 
                    </CardContent>
                </Box>
            </CardActionArea>
        </Card>
    )
}

export default SmallCard
