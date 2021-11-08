import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    customButton: {
      color:'white'
    },
  }));

const SignupButton = () => {
  const classes = useStyles();
  const { loginWithRedirect } = useAuth0();
  return (
    <Button
			className={classes.customButton}
      onClick={() =>
        loginWithRedirect({
          screen_hint: "signup",
        })
      }
    >
      Sign Up
    </Button>
  );
};

export default SignupButton;