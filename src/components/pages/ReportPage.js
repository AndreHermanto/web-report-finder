import React, { useEffect, useState } from 'react';
import { ReportTemplate } from '../ReportTemplate';
import {
    useLocation
	} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { useAuth0 } from "@auth0/auth0-react";

const useStyles = makeStyles((theme) => ({
	reportContainer: {
		width: "100%",
		marginTop: '65px'
	},
}));

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export function ReportPage() {
	const classes = useStyles();
	let location = useLocation();
	const [sample, setSample] = useState('');
	const [report, setReport] = useState('');
	let query = useQuery();

	const {
		logout
	  } = useAuth0();

	const checkTokenExp = () => {
		if(localStorage.getItem('idTokenExp')*1000 < Date.now()){
		  localStorage.removeItem('idToken');
		  localStorage.removeItem('idTokenExp');
		  logout({
			returnTo: window.location.origin,
		  })
		  return false;
		}else{
		  return true;
		}
	  }

	useEffect(() => {
    if(query.get("report") && query.get("sample")){
			setSample(query.get("sample"));
			setReport(query.get("report"));
    }
  },[location, query]);	
	return 	<div className={classes.reportContainer}>
						<ReportTemplate id={sample} height='90vh' checkTokenExp={checkTokenExp}/>
					</div>
			
}