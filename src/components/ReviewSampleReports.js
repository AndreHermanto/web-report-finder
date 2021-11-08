import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { REPORTS } from '../shared/data/report-value-label-mapping';

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export function ReviewSampleReports(props) {
  const { samples, reviewed, handleReviewChange, reportType } = props;
  const classes = useStyles();

  let report = REPORTS.find(r => r.value === reportType).label
  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="spanning table">
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={7}>
                Selected samples for {report} report
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="left">Id</TableCell>
              <TableCell align="left">First name</TableCell>
              <TableCell align="left">Last name</TableCell>
              <TableCell align="left">Gender</TableCell>
              <TableCell align="left">Date of Birth</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {samples.map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                    {row.id}
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.first_name?row.first_name:'N/A'}
                  </TableCell>
                  <TableCell align="left">{row.last_name?row.last_name:'N/A'}</TableCell>
                  <TableCell align="left">{row.gender?row.gender:'N/A'}</TableCell>
                  <TableCell align="left">{row.dob?row.dob:'N/A'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div>
      <h3>Please review your sample selections.</h3>
      <FormGroup row>
        <FormControlLabel
          control={<Checkbox checked={reviewed?true:false} onChange={(e) => handleReviewChange(e.target.checked)} name="reviewed" />}
          label="I have confirmed my sample selections"
        />
      </FormGroup>
      </div>
    </>
  );
}

ReviewSampleReports.propTypes = {
  samples: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    gender: PropTypes.string,
    dob: PropTypes.string,
  })).isRequired,
  reviewed: PropTypes.bool.isRequired,
  handleReviewChange: PropTypes.func.isRequired,
  reportType: PropTypes.string.isRequired
};
