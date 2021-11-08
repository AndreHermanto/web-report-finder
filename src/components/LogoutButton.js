import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
    customButton: {
      color:'white'
    },
    container: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center'
    }
  }));

const LogoutButton = () => {
  const classes = useStyles();  
  const { logout, user } = useAuth0();
  return (
    <span className={classes.container}>
      <Button
        className={classes.customButton}
        onClick={() =>{
          localStorage.removeItem('idToken');
          localStorage.removeItem('idTokenExp');
          logout({
            returnTo: window.location.origin,
          })
        }}
      >
        Log Out
      </Button>
      <Avatar alt="user" src={user.picture} />
    </span>
  );
};

export default LogoutButton;