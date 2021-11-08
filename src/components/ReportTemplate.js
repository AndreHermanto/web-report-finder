import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Alert } from './Alert';
import { makeStyles } from '@material-ui/core/styles';
import ReactSrcDocIframe from 'react-srcdoc-iframe';

const useStyles = makeStyles((theme) => ({
  errorContainer: {
		margin: "120px 15%"
	},
}));

/*var template = (report) => {
  return ({__html: `<iframe srcDoc='${report}'  width='100%' height='100%'></iframe>`})
};*/

async function  fetchReport(id)  {
  const response = await fetch(`${process.env.REACT_APP_REPORT_FINDER_SERVICE_URL}/reports/${id}`, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      headers: {
        'Content-Type': 'text/html',
        'Authorization': `Bearer ${localStorage.getItem('idToken')}`
      },
    })

    if(response.ok){
      return response.text();
    }else{
      return '';
    }
};

export function ReportTemplate(props) {
  const classes = useStyles();
  const { id, height, checkTokenExp } = props;
  const [report, setReport] = useState('');

  useEffect(() => {
    if(checkTokenExp()){
      if(id){
        fetchReport(id).then(report => {
          setReport(report)
        }).catch(err => {
          console.error(err);
          setReport('<div>Error occured. Please try again later.</div>')
        });
      }
    }
  });
  
  return <>
        {
          id !==''  ? 
            /*Using ReactSrcDocIframe but might comeback to this if the library is no longer supported with newer React. In that case quote(') must be escaped &quot;*/
            <div style={{height: height }}>
              <ReactSrcDocIframe srcDoc={report} width="100%" height="100%"/>
            </div>
          :
          <div className={classes.errorContainer}>
            <Alert severity="error">Sorry, we couldn't compplete your request. Please try again later.</Alert>
          </div>
        }
        </>
  
}

ReportTemplate.propTypes = {
  id: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  checkTokenExp: PropTypes.func.isRequired
};