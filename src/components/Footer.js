import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import logo from '../assets/gtbanner.png'

const useStyles = makeStyles((theme) => ({
    footerContainer: {
			position: 'fixed',
			bottom: 0,
			width: '100% !important',
			height: '40px !important',
			background: '#f5f5f5',
			zIndex: theme.zIndex.drawer + 1,
			display: 'flex',
			justifyContent: 'space-between',
			padding: '10px 5%',
			borderTopStyle: 'solid',
			borderWidth: '1px',
			borderColor: '#D3D3D3'
			},
			logo:{
				height: '18px'
			},
			logoContainer:{
				display: 'flex'
			}
  }));

export function Footer() {
	const classes = useStyles();
	return (<div className={classes.footerContainer}>
		<div className={classes.logoContainer}>
			<Typography variant="caption">Secured with <img src={logo} className={classes.logo} alt="logo"/></Typography>
		</div>
		<Typography variant="caption">Copyright © 2021</Typography>
	</div>); 

}