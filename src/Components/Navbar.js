import React , {useState , useEffect }  from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import { Link, useHistory } from 'react-router-dom';
import Logo from './Logo';
import { useStateValue } from '../ContextAPI/globalState';
import { auth, provider } from '../firebase';
import { Avatar, Button } from '@material-ui/core';
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import WatchLaterIcon from '@material-ui/icons/WatchLater';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    // overflow: 'hidden'
  },
  appBar: {
    backgroundColor: theme.palette.primary.main,
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    // marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.secondary.main,
    width: '50%',
    margin: 'auto',
    display: 'flex'
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  inputRoot: {
    color: 'inherit',
    width:'100%'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    // paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  backgroundIcons:{
      backgroundColor: theme.palette.secondary.main,
      marginRight: theme.spacing(0.5)
  },
  iconsNavbar:{
    backgroundColor: theme.palette.secondary.main,
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  small: {
    width: theme.spacing(3.3),
    height: theme.spacing(3.3),
    borderRadius:'50%'
  },
}));

function Navbar ({open , handleDrawerOpen}) {
  const classes = useStyles();
  const history = useHistory()
  const [searchText , setSearchText ] = useState('')

  // get data from global state  
  const {
    userDetails ,
    setUserDetails ,
    setSearch ,
    watchLater,
    subscribes } = useStateValue();
  
  
  // handle Auth 
  async function handleSignIn () {
      await auth.signInWithPopup(provider).then(res => {
        setUserDetails(res.user);
      }).catch(err => {
        alert(err.message);
      })
    }

  // on Auth change 
  useEffect(() => {
    async function onAuthChange () {
      auth.onAuthStateChanged((user) => {
        if (user) {
           setUserDetails(user);
          }
      })
    }

  onAuthChange()

 } , [])


  // handle search 
  const handleSearch = (e) => {
    if (searchText.length > 0 ) {
      e.preventDefault();
      setSearch(searchText);
      history.push('/search');
    }else {
      e.preventDefault();
      history.push('/')
    }
  }

  return (
      <AppBar
        elevation={5}
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          {/* --menu icon--  */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          {/* --logo-- */}
            <Link to='/'>
              <Logo/>
            </Link>
          {/* --search box -- */}
          <form  onSubmit={handleSearch} className={classes.search}>
              <IconButton onClick={handleSearch}>
                <SearchIcon />
              </IconButton>
              <InputBase
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
              placeholder="Search…"
              classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              />
          </form> 
          {/* --icons subscribes , watch later --  */}
          <Link to="/subscribes">
            <IconButton aria-label="show 4 new mails" className={classes.iconsNavbar}>
                <Badge badgeContent={subscribes?.length} color="secondary">
                    <SubscriptionsIcon fontSize="small"  />
                </Badge>
            </IconButton>
          </Link>
          
          <Link to="/watchlater">
            <IconButton aria-label="show 4 new mails" className={classes.iconsNavbar}>
                <Badge badgeContent={watchLater?.length} color="secondary">
                    <WatchLaterIcon fontSize="small"  />
                </Badge>
            </IconButton>   
          </Link>

          {/* --icon profile--  */}
            {userDetails.length === 0  ? (
               <Button  onClick={handleSignIn} >LogIn</Button>
            ) : (
              <IconButton className={classes.backgroundIcons}>
                {userDetails && <Avatar alt='avatar' src={userDetails.photoURL} className={classes.small} />}   
              </IconButton>
            )}

        </Toolbar>
      </AppBar>
             
  );
}



export default Navbar;