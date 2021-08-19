import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Avatar } from '@material-ui/core';
import numeral from 'numeral'
import { useHistory } from 'react-router-dom';
import LazyLoad from 'react-lazyload';
import { useStateValue } from '../ContextAPI/globalState';


const useStyles = makeStyles((theme) => {
  return {
    root: {
        maxWidth: '350px',
        width: '100%',
        borderRadius:theme.shape.borderRadius,
        backgroundColor: theme.palette.primary.main,
        height:370,
        marginBottom:theme.spacing(2)
      },
      actionCard:{
          height:370,
      },
      media: {
        height: 180,
        width: '90%',
        margin: 'auto',
        borderRadius:theme.shape.borderRadius,
        objectFit:'cover'
      },
      avatarText:{
          display: 'flex',
          alignItems:'center',
          '& h2': {
            fontSize:theme.typography.fontSize
          },
          marginBottom: theme.spacing(2),
      },
      avatarImg:{
        marginRight: theme.spacing(2),
      },
      SkeletonText:{
        borderRadius:theme.spacing(0.5)
      },

  }
});


export default function MediaCard({videos}) {
  const classes = useStyles();
  const history = useHistory();
  const {setWatchLater } = useStateValue();

  // selectors 
  const {thumbnails} = videos.snippet;

  // date videos 
  const date = videos?.snippet?.publishedAt;
  const dateObject = new Date (date);

  // views counter 
  const views = videos?.statistics?.viewCount

  // go to the page watch movie
  const goToWatchVideo = () => {
    // or || this helped me with id because i couldn't get the same id sorry !!
    history.push(`/watchvideo/${videos.id.videoId || videos?.id}`);
    setWatchLater(videos);
  }

  return (
      <LazyLoad height={200} effect={200}>
          <Card className={classes.root}>
            <CardActionArea className={classes.actionCard} onClick={goToWatchVideo} >
                {/* --card image -- */}
                <CardMedia
                  className={classes.media}
                  image={thumbnails.medium.url} 
                />
                {/* --content -- */}
                <CardContent>
                  <div className={classes.avatarText}>
                    <Avatar src={thumbnails.default.url}  className={classes.avatarImg} />
                    <Typography gutterBottom variant="h6" component="h2"> 
                        {videos.snippet.channelTitle}
                    </Typography>
                  </div>
                  <Typography gutterBottom variant="body2" color="textPrimary" component="p">
                    {videos.snippet.title}
                  </Typography>
                  <Typography gutterBottom variant="body2" color="textSecondary" component="p">
                      {numeral(views).format('0.a')} views , {dateObject.toDateString()}
                  </Typography> 
              </CardContent>
            </CardActionArea>
          </Card>
        </LazyLoad>
  );
}