import React, { useState , useEffect } from 'react'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import { Avatar, Box, IconButton, makeStyles, Typography } from '@material-ui/core';
import numeral from 'numeral'
import { useHistory , useLocation } from 'react-router-dom';


const useStyles = makeStyles((theme) => {
    return {
        iframeVideo:{
            width: '100%',
            height:'500px',
            marginBottom:theme.spacing(2),
            [theme.breakpoints.down('sm')]: {
                height:'200px',
              },
        },
        titleVideo:{
            marginBottom:theme.spacing(1.8),
            [theme.breakpoints.down('sm')]: {
                fontSize:theme.spacing(2),
              },
        },
        titleDate:{
            [theme.breakpoints.down('sm')]: {
                fontSize:theme.spacing(1.5),
              },
        },
        containerIcons:{
            borderBottom:`1px solid ${theme.palette.text.secondary}`,
            paddingBottom:theme.spacing(2),
            marginBottom:theme.spacing(2),
        },
        containerAvatar:{
            paddingBottom:theme.spacing(2),
            marginBottom:theme.spacing(1),
            cursor: 'pointer'
        },
        titleChannel:{
            marginLeft:theme.spacing(1),
            fontSize:theme.spacing(2),
        },
        ContainerDescription:{
            marginBottom:theme.spacing(2),
        },
        totalDescription:{
            fontSize:theme.spacing(2),
            width: '100%',
            overflow: 'hidden',
        },
        textWrap:{
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            width: '200px'
        },
        colorLink: {
            color:'#087ee5',
            textDecoration:'none',
            cursor: 'pointer'
        },
        btnSubscribe:{
            color:'#ff0000',
            padding:theme.spacing(2),
        },
        btnUnSubscribe:{
            padding:theme.spacing(2),
            color:theme.palette.primary
        }
    }
})

function WatchScreen({video}) {
    const classes = useStyles();
    const history = useHistory();
    const { pathname } = useLocation();

     // function to display all description
     const [displayAllText , setDisplayAllText] = useState(false);
     const displayText = () => {
         setDisplayAllText(!displayAllText);
     }

     // go To The Channel 
     const goToTheChannel = () => {
        history.push(`/channel/${video.snippet.channelId}`);
     }

     useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
 
 
    return (
        <div>
             {/*--iframe--*/}
             <div className={classes.iframeVideo}>
                        <iframe  
                            src={`https://www.youtube.com/embed/${video.id}`}
                            frameBorder='0'
                            width='100%'
                            height='100%'
                            title={video.snippet.title}
                        ></iframe>
            </div>
            {/* --title-- */}
            <Typography gutterBottom variant='h5' fontSize="small" className={classes.titleVideo}>
                {video.snippet.title}
            </Typography>
            {/* --icons like , dislike -- */}
            <Box display="flex" justifyContent="space-between" alignItems="center" width="100%" flexWrap="wrap" className={classes.containerIcons}>

                <Typography color="textSecondary" variant="body1" component="p" className={classes.titleDate} >
                {numeral(video.statistics.viewCount).format('0.a')} views  {new Date (video.snippet.publishedAt).toDateString()}
                </Typography>
        
                <Box display="flex">
                    <Box display="flex" justifyContent="center" alignItems="center">
                        <IconButton>
                            <ThumbUpAltIcon/>
                        </IconButton>

                        <Typography color="textSecondary" variant="subtitle1">
                            {numeral(video.statistics.likeCount).format('0.a')}
                        </Typography>
                    </Box>

                    <Box display="flex" justifyContent="center" alignItems="center">
                        <IconButton>
                            <ThumbDownIcon/>
                        </IconButton>

                        <Typography color="textSecondary" variant="subtitle1">
                        {numeral(video.statistics.dislikeCount).format('0.a')}
                        </Typography>
                    </Box>
                </Box>
            </Box>
            {/* ---avatar container-- */}
            <Box  className={classes.ContainerDescription}>

                <Box display="flex" alignItems="center" className={classes.containerAvatar} onClick={goToTheChannel} >
                    <Avatar src={video.snippet.thumbnails.default.url} />
                    <Typography className={classes.titleChannel} variant="h6"> {video.snippet.channelTitle} </Typography>
                </Box>

                {/* --condition to display text -- */}
                <Box display='flex'>
                    {displayAllText ? (
                        <Typography variant="body1" component="p" className={classes.totalDescription}>
                                {video.snippet.localized.description}
                        </Typography>
                        ) : (
                        <Typography variant="body1" component="p" className={classes.textWrap} >
                            {video.snippet.localized.description}
                        </Typography>
                        )}
                </Box>
                {/* --display the all description -- */}
                {displayAllText ? (<Typography variant="body1" component="p" onClick={displayText} className={classes.colorLink}>show small description </Typography>) : <Typography variant="body1" component="p" onClick={displayText} className={classes.colorLink}>show all description </Typography> }                            
                
            </Box>
        </div>
    )
}

export default WatchScreen
