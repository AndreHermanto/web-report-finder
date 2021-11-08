import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { ReportTemplate } from './ReportTemplate';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  }
}));

export function ReportTabs(props) {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const { sampleReports, reportType, handleChangeTab, checkTokenExp } = props;

  const handleChange = (event, newValue) => {
    setValue(newValue);
    handleChangeTab(newValue);
  };
  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          {sampleReports.map((s,i) => 
						<Tab label={s.first_name && s.last_name ? s.first_name + ' ' + s.last_name : '('+s.id+')'} {...a11yProps(i)} key={s.id}/>
					)}
        </Tabs>
      </AppBar>
			{sampleReports.map((s,i) => {
				return (<TabPanel value={value} index={i} key={s.id}>
          {reportType === 'pharmcat' &&  <ReportTemplate id={s.id} checkTokenExp={checkTokenExp} height='60vh'/>}
          {reportType === 'myrr' && <span> MyRR dummy report</span>}
          {reportType === 'seqr' && <span> SEQR dummy report</span>}
				</TabPanel>);
			})}
    </div>
  );
}

ReportTabs.propTypes = {
  sampleReports: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string
  })).isRequired,
  handleChangeTab: PropTypes.func.isRequired,
  checkTokenExp: PropTypes.func.isRequired,
  reportType: PropTypes.string.isRequired
};
