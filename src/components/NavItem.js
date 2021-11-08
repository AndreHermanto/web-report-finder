import React from "react";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import {
  useHistory
} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    customButton: {
			color:'white',
			margin: '0 10px'
    },
  }));

const NavItem = (props) => {
	const { name, url } = props;
	const classes = useStyles();
	let history = useHistory();
	
	const handleNav = () => {
    history.push(url);
  }

  return <Button className={classes.customButton} onClick={() => handleNav()}>{name}</Button>;
};

export default NavItem;