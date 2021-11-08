import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    customButton: {
      color:'white'
    },
  }));

const LoginButton = () => {
  const classes = useStyles();
  const { loginWithRedirect } = useAuth0();

  return <Button className={classes.customButton} onClick={() => loginWithRedirect()}>Log In</Button>;
};

export default LoginButton;