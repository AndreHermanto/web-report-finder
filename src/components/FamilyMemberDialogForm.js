import React from "react";
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  buttonContainer: {
    margin: 20,
    justifyContent: 'space-evenly',
    display: 'flex'
  },
  loadingContainer:{
    marginTop: '2em',
    marginBottom: '2em',
    textAlign: 'center'
  },
  disabledButton:{
    backgroundColor: 'rgba(0, 0, 0, 0.38)'
  },
  button: {
    backgroundColor: 'var(--main-color)', 
    color: '#FFFFFF',
    "&:hover":{
      backgroundColor: 'var(--hover-color)', 
      color: '#FFFFFF',
    }
  }
}));

export function FamilyMemberDialogForm(props) {
  const classes = useStyles();
  const { onClose, open, selectedSamples, showReport, samples, loading } = props;

  const renderButton = (sampleReport) => {
    if(selectedSamples.some(item => item.id === sampleReport.id)){
      return <Button size="small" variant="outlined" color="secondary" onClick={() => showReport(selectedSamples.filter(s => s.id !== sampleReport.id))}>Remove</Button>
    }else{
      return <Button size="small" variant="outlined" classes={{ root: classes.button, disabled: classes.disabledButton}} onClick={() => showReport([...selectedSamples, sampleReport])}>Add</Button>
    }   
  }

  const addAllFamilyMembers = () => {
    let newSelectedSamples = []
    samples.forEach(s=> {
      if(!selectedSamples.map(s=> s.id).includes(s.id)){
        newSelectedSamples.push(s);
      }
    })
    showReport([...selectedSamples, ...newSelectedSamples])
  }

  return (
      <Dialog onClose={onClose} fullWidth={true}
        maxWidth='md' aria-labelledby="simple-dialog-title" open={open}>
        {loading!=='loading' ?
        <>
          <TableContainer component={Paper}>
            <Table aria-label="spanning table">
              <TableHead>
                <TableRow>
                  <TableCell align="center" colSpan={8}>
                    Family Members
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">First name</TableCell>
                  <TableCell align="left">Last name</TableCell>
                  <TableCell align="left">Gender</TableCell>
                  <TableCell align="left">Date of Birth</TableCell>
                  <TableCell align="left">Relationship</TableCell>
                  <TableCell align="left">Add</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {samples.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      {row.first_name}
                    </TableCell>
                    <TableCell align="left">{row.last_name}</TableCell>
                    <TableCell align="left">{row.gender}</TableCell>
                    <TableCell align="left">{row.dob}</TableCell>
                    <TableCell align="left">{row.relationship}</TableCell>
                    <TableCell align="left">
                        {renderButton(row)}
                      </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <div className={classes.buttonContainer}>
            <Button size="small" variant="contained" classes={{ root: classes.button, disabled: classes.disabledButton}} onClick={() => addAllFamilyMembers()}>Add all available family members</Button>
            <Button size="small" variant="outlined" classes={{ root: classes.button, disabled: classes.disabledButton}} onClick={() => onClose()}>Close</Button>
          </div>
        </>
        :
        <div className={classes.loadingContainer}>
          <CircularProgress size="150px" />
        </div>
        }
      </Dialog>

  );
}

FamilyMemberDialogForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedSamples: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    gender: PropTypes.string,
    dob: PropTypes.string,
  })).isRequired,
  samples: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    gender: PropTypes.string,
    dob: PropTypes.string,
  })).isRequired,
  showReport: PropTypes.func.isRequired,
};