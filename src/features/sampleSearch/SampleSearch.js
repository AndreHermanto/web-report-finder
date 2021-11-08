import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import {
    getSamples,
    getSamplesByIds,
    getFamily,
    selectSamples,
    selectFamily,
    setShowReport,
    selectStatus,
    selectShowReport,
    selectError,
    setStep,
    selectCurrentStep,
    setReportType,
    selectReportType,
    setReviewed,
    selectReviewed,
    resetState,
    selectStatusFamily
  } from './sampleSearchSlice';
import { SearchForm } from '../../components/SearchForm';
import { SamplesPaginatedTable } from '../../components/SamplesPaginatedTable';
import { ReviewSampleReports } from '../../components/ReviewSampleReports';
import { ReportTabs } from '../../components/ReportTabs';
import { Alert } from '../../components/Alert';
import { SampleSearchReportStepper } from '../../components/SampleSearchReportStepper';
import { ConvertToURLQuery } from '../../shared/functions/ConvertToURLQuery'

import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import CircularProgress from '@material-ui/core/CircularProgress';

import { useAuth0 } from "@auth0/auth0-react";

import {
  useHistory,
  useLocation
} from "react-router-dom";

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
    minHeight: 600
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    marginBottom: 40
  },
  loadingContainer:{
    paddingTop: '8em',
    textAlign: 'center'
  },
  formContainer: {
    marginTop: '3em'
  },
  buttonContainer: {
    backgroundColor: '#fafafa',
    height: 48
  },
  disabledButton:{
    backgroundColor: 'rgba(0, 0, 0, 0.38)'
  },
  button: {
    float: 'right',
    margin: 5,
    backgroundColor: 'var(--main-color)', 
    color: '#FFFFFF',
    "&:hover":{
      backgroundColor: 'var(--hover-color)', 
      color: '#FFFFFF',
    }
  },
  contentContainer: {
    maxWidth:'80vw'
  }
}));

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export function SampleSearch() {
  const classes = useStyles();
  const samples = useSelector(selectSamples);
  const families = useSelector(selectFamily);
  const status = useSelector(selectStatus);
  const statusFamily = useSelector(selectStatusFamily);
  const report = useSelector(selectShowReport);
  const reportType = useSelector(selectReportType);
  const error = useSelector(selectError);
  const currentStep = useSelector(selectCurrentStep);
  const reviewed = useSelector(selectReviewed);
  const dispatch = useDispatch();

  let location = useLocation();
  let query = useQuery();
  let history = useHistory();

  const handleSearch = (query) => {
    if(checkTokenExp()){
      let url = "/search?"+ConvertToURLQuery(query)
      history.push(url);
    }
  }

  let initFormQuery = {}

  const showReport = (samples) => {
    dispatch(setShowReport(samples));
  }

  const setCurrentStep = (step) => {
    dispatch(setStep(step))
    if(step === 0){
      dispatch(setReviewed(false))
    }
  }

  const setReviewChange = (reviewed) => {
    dispatch(setReviewed(reviewed));
  }

  const reset = () => {
    dispatch(resetState());
  }

  const getFamilyMembers = (familyId, report) => {
    if(checkTokenExp()){
      dispatch(getFamily({
        familyId: familyId,
        report: report
      }));
    }
  }

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

  const {
    isAuthenticated,
    getAccessTokenSilently,
    getIdTokenClaims,
    logout
  } = useAuth0();

  const [tabIndex, setTab] = useState(0);
  const [searchById, setSearchById] = useState(false);

  const handleChangeTab = (value) => {
    setTab(value);
  }

  useEffect(() => {
    const getUserMetadata = async () => {
      if (isAuthenticated) {
        try {
          if(localStorage.getItem('idToken') === null || localStorage.getItem('idTokenExp') === null){
            const idToken = await getIdTokenClaims({});
            localStorage.setItem('idToken', idToken.__raw);
            localStorage.setItem('idTokenExp', idToken.exp);
          }else{
            //if token expired logout
            checkTokenExp();
          }
        } catch (e) {
          console.log(e.message);
        }
      }
    };

    getUserMetadata();

    if(query.get("id") || query.get("first_name") || query.get("last_name") || query.get("dob")){
      // eslint-disable-next-line
      if(query.get("id") !== ''){
        initFormQuery = {
          id: query.get("id") || '',
          report: query.get('report')
        }
        setSearchById(true);
        dispatch(getSamplesByIds(initFormQuery));
      }else{
        initFormQuery = {
          first_name: query.get("first_name") || '',
          last_name: query.get("last_name") || '',
          dob: query.get("dob") || '',
          report: query.get('report')
        }
        setSearchById(false);
        dispatch(getSamples(initFormQuery));
      }
      setCurrentStep(0);
      if(query.get('report') !== reportType){
        showReport([])
        dispatch(setReportType(query.get('report')))
      }
    }else{
      reset();
    }
  },[location, getAccessTokenSilently, isAuthenticated]);

  return (
  <>
    <SideBar handleSearch={handleSearch} query={query} />
    <main className={classes.content}>
      <Toolbar />
        {status === 'failed' && 
          <Alert severity="error">{error}</Alert>
        }
        {status !== 'failed' &&
        <>
          {status === 'loading' ? 
            <div className={classes.loadingContainer}>
              <CircularProgress size="150px" />
            </div>
            :
            <div className={classes.contentContainer}>
              { samples.length > 0 && <SampleSearchReportStepper setCurrentStep={setCurrentStep} step={currentStep} selectedSamples={report} reviewed={reviewed} reset={reset}/> }
              {currentStep === 0 &&   
                <>
                    <div>
                      {samples.length > 0 &&
                      <div>
                        <SamplesPaginatedTable samples={samples} showReport={showReport} selectedSamples={report} getFamily={getFamilyMembers} reportType={reportType} familyMembers={families} familyLoading={statusFamily} searchById={searchById} />
                      </div> 
                      }
                      { samples.length === 0 && status === 'fulfilled' && 
                        <Alert severity="error">Samples not found</Alert>
                      }
                    </div>
                </>
                }

              {currentStep === 1 && 
                <>
                  {report.length > 0 && 
                    <div>
                      <ReviewSampleReports samples={report} reviewed={reviewed} handleReviewChange={setReviewChange} reportType={reportType}/>
                    </div>
                  }
                </>
              }
              
              {currentStep === 2 &&
                <>
                  {report.length > 0 && 
                    <div>
                      <div className={classes.buttonContainer}>
                        <Button className={classes.button} classes={{ root: classes.button, disabled: classes.disabledButton}} href={'https://patient-discovery.web.app/patientInfo?id='+ report.map(s=>s.id)[tabIndex]} target="_blank" color="primary">
                          See sample on Patients Discovery
                        </Button>
                      </div>
                      <ReportTabs sampleReports={report} reportType={reportType} handleChangeTab={handleChangeTab} checkTokenExp={checkTokenExp}/>
                    </div>
                  }
                </>
              }
            </div>
            }
          </>
          }
        <div>
        </div>
    </main>
  </>
  );
}


function SideBar(props) {
  const classes = useStyles();
  const { handleSearch, query } = props;

  return (<Drawer
    className={classes.drawer}
    variant="permanent"
    classes={{
      paper: classes.drawerPaper,
    }}
  >
    <Toolbar />
    <div className={classes.drawerContainer}>
      <div className={classes.formContainer}>
        <SearchForm onSearch={handleSearch} reportInit={query.get('report')?query.get('report'):'pharmcat'} disabledSearch={false}/>
      </div>  
    </div>
  </Drawer>);
}

SideBar.propTypes = {
  handleSearch: PropTypes.func.isRequired,
  query: PropTypes.any.isRequired,
};