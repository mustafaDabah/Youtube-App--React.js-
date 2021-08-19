import React, { useState } from 'react';
import { makeStyles  } from '@material-ui/core/styles';
import Navbar from '../Components/Navbar';
import Sidebar from '../Components/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';



const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      overflow: 'hidden'
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
    }
}))

function Layout({children}) {
    const [open, setOpen] = useState(false);
    const classes = useStyles();

    // sidebar close  function 
    const handleDrawerClose = () => {
        setOpen(false);
    };

    // sidebar open function 
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    return (
        <div className={classes.root}>
            <CssBaseline />
            <Navbar open={open} handleDrawerOpen={handleDrawerOpen}/>
            <Sidebar open={open} handleDrawerClose={handleDrawerClose}/> 
            <main className={classes.content}>
                <div className={classes.toolbar} />
                    {children}
            </main>
        </div>
    )
}



export default Layout 
