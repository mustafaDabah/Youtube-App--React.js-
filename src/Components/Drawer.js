import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import { Link, useHistory } from 'react-router-dom';
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import SearchIcon from '@material-ui/icons/Search';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Box, Switch, Typography } from '@material-ui/core';
import { useStateValue } from '../ContextAPI/globalState';
import { auth } from '../firebase';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';
// drawer width 
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    drawer: {
      backgroundColor: theme.palette.primary.main,
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
      position: 'relative'
    },
    drawerOpen: {
      backgroundColor: theme.palette.primary.main,
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      backgroundColor: theme.palette.primary.main,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width:'0%'
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    copyRightContainer:{
      position: 'absolute',
      bottom: '0%',
      display: 'flex',
      flexDirection:'column',
      '& p':{
        fontSize:theme.spacing(1.7)
      },
      '& a':{
        padding: theme.spacing(1)
      },
      '& svg': {
        color:theme.palette.text.secondary,
        fontSize:theme.spacing(2.3)
      }
    }
  }));
  

function Sidebar({open , handleDrawerClose}) {
    const classes = useStyles();
    const theme = useTheme();
    const history = useHistory();

    // get data from global state 
    const {darkMode ,
           changeDarkMode ,
           userDetails ,
           setUserSignOut }  = useStateValue();

    // sign out 
    async function handleSignOut () {
      await auth.signOut().then(() => {
         setUserSignOut();
       }).catch((err) => {
         alert(err.message);
       })
     }  

    // items List Icons
    const itemListIcons = [
      {text:'Home' , path:'/' , icon:<HomeIcon/> },
      {text:'Watch Later ' , path:'/watchlater' , icon:<WatchLaterIcon/> },
      {text:'subscribes ' , path:'/subscribes' , icon:<SubscriptionsIcon/> },
      {text:'search ' , path:'/search' , icon:<SearchIcon/> },
    ]

    // go to the page function 
    const goToPage = (item) => {
      history.push(item);
      handleDrawerClose()
    }
    return (
        <Drawer
            elevation={5}
            variant="permanent"
            className={clsx(classes.drawer, {
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
              })}
            classes={{
            paper: clsx({
                [classes.drawerOpen]: open,
                [classes.drawerClose]: !open,
             }),
            }}
        >
            <div className={classes.toolbar}>
                <IconButton onClick={handleDrawerClose}>
                    {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </IconButton>
            </div>
            <Divider />
            <List>
                {/* --dark mode -- */}
                <Switch checked={darkMode} onChange={changeDarkMode}  />
                {/* --icons-- */}
                {itemListIcons.map((item , index ) => (
                  <ListItem button key={index} onClick={() => goToPage(item.path)}>
                      <ListItemIcon>
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText>{item.text}</ListItemText>
                  </ListItem>
                ))}
                {/* --btn sign out -- */}
                {userDetails.length !== 0 ? (
                  <ListItem button onClick={handleSignOut}>
                      <ListItemIcon>
                        <ExitToAppIcon/>
                      </ListItemIcon>
                      <ListItemText>sign out </ListItemText>
                  </ListItem>
                ) : false }
                   
            </List>
            <Divider/>
            {/* --copy right -- */}
            <ListItem className={classes.copyRightContainer}>
                  <Typography gutterBottom component="p" color="textSecondary">© Copy Right 2021 Mustafa Dabah</Typography>
                  <Box display="flex">
                    <Link to={{pathname : "https://web.facebook.com/mostafa.dabah.9/?_rdc=1&_rdr"}} target="_blank">
                      <FacebookIcon/>
                    </Link>
                    <Link to={{pathname : "https://twitter.com/MustafaDabah"}} target="_blank">
                      <TwitterIcon/>
                    </Link>
                    <Link to={{pathname : "https://www.linkedin.com/in/mustafa-dabah-ab58661a3/"}} target="_blank">
                      <LinkedInIcon/>
                    </Link>
                    <Link to={{pathname : "https://github.com/mustafaDabah"}} target="_blank">
                      <GitHubIcon/>
                    </Link>
                  </Box>
            </ListItem> 
      </Drawer>
    )
}

// const MemoSidebar = React.memo(, (prevProps, nextProps) => {
//   if (prevProps.updatedAt === nextProps.updatedAt) {
//     return true;
//   }
//   return false;
// });

export default Sidebar
