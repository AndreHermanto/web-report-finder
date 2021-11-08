import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import logo from '../assets/gtlogocircle.png';
import {
  useHistory
} from "react-router-dom";
import AuthenticationButton from "./AuthenticationButton";
import NavItem from "./NavItem";

const useStyles = makeStyles((theme) => ({
    containerContent: {
      display: 'flex',
      justifyContent: 'spaceBetween',
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%'
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        background: "var(--main-color)"
      },
    logo:{
      height: 30,
      marginRight:5
    },
    logoContainer: {
      display: 'contents',
      "&:hover": {
        cursor: 'pointer'
      },
      marginLeft: '1em',
      marginRight: '1em'
    },
    authContainer: {
      marginLeft:'auto',
      marginRight: '10',
      display: 'flex'
    },
    navContainer: {
      marginRight: '40px',
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'row'
    }
  }));

export function Header() {
  const classes = useStyles();
  let history = useHistory();
  
  const handleBackHome = () => {
    let url = "/"
    history.push(url);
  }

	return (<AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
          <div className={classes.logoContainer} onClick={handleBackHome}>
            <img src={logo} className={classes.logo} alt="logo" />
            <Typography variant="h6" noWrap>
              Singleton Search App
            </Typography>
          </div>
          <div className={classes.authContainer}>
            <span className={classes.navContainer}>
              <NavItem name='Search' url='/search' />
            </span>
            <AuthenticationButton />
          </div>
      </Toolbar>
  </AppBar>); 

}