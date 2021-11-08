import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import { FamilyMemberDialogForm } from './FamilyMemberDialogForm';

export function SamplesPaginatedTable(props){
    const { selectedSamples, showReport, samples, getFamily, familyMembers, reportType, familyLoading, searchById } = props;
    const [page, setPage] = useState(0);
    const [open, setOpen] = React.useState('');
    const [rowsPerPage, setRowsPerPage] = useState(5);
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };

    const renderButton = (sampleReport) => {
      if(selectedSamples.some(item => item.id === sampleReport.id)){
        return <Button size="small" variant="outlined" color="secondary" onClick={() => showReport(selectedSamples.filter(s => s.id !== sampleReport.id))}>Remove</Button>
      }else{
        return <Button size="small" variant="outlined" style={{color: 'var(--main-color)', backgroundColor: '#FFFFFF'}} onClick={() => showReport([...selectedSamples, sampleReport])}>Add</Button>
      }   
    }

    return (<>
    <div style={{textAlign: 'right', marginBottom: '5px'}}>
      {selectedSamples.length > 0 && <Button size="small" variant="outlined" color="secondary" style={{marginRight: '5px'}} onClick={() => showReport([])}>Remove all samples</Button>}
      <Button size="small" variant="outlined" style={{color: 'var(--main-color)', backgroundColor: '#FFFFFF'}} onClick={() => showReport(samples)}>Add all samples</Button>
    </div>
    <div>
    <Paper>
        <TableContainer>
          {
            searchById ? 
            <Table size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell align="left">Report</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {samples.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                <Fragment key={row.id}>
                <TableRow>
                <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell align="left">
                    {renderButton(row)}
                  </TableCell>
                </TableRow>
                <FamilyMemberDialogForm samples={familyMembers} selectedSamples={selectedSamples} showReport={showReport} onClose={() => setOpen('')} open={open === row.id} loading={familyLoading}/>
              </Fragment>
              ))}
            </TableBody>
          </Table>
            :
            <Table size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>First name</TableCell>
                <TableCell align="left">Last name</TableCell>
                <TableCell align="left">Gender</TableCell>
                <TableCell align="left">Date of Birth</TableCell>
                <TableCell align="left">Relationship</TableCell>
                <TableCell align="left">Family Members</TableCell>
                <TableCell align="left">Report</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {samples.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                <Fragment key={row.id}>
                <TableRow>
                  <TableCell component="th" scope="row">
                    {row.first_name?row.first_name:'N/A'}
                  </TableCell>
                  <TableCell align="left">{row.last_name?row.last_name:'N/A'}</TableCell>
                  <TableCell align="left">{row.gender?row.gender:'N/A'}</TableCell>
                  <TableCell align="left">{row.dob?row.dob:'N/A'}</TableCell>
                  <TableCell align="left">{row.relationship?row.relationship:'N/A'}</TableCell>
                  <TableCell align="left">
                    <Button size="small" variant="outlined" style={{color: 'var(--main-color)', backgroundColor: '#FFFFFF'}} onClick={() => {
                      setOpen(row.id);
                      getFamily(row.familyId, reportType);
                      }}>Show</Button>       
                  </TableCell>
                  <TableCell align="left">
                    {renderButton(row)}
                  </TableCell>
                </TableRow>
                <FamilyMemberDialogForm samples={familyMembers} selectedSamples={selectedSamples} showReport={showReport} onClose={() => setOpen('')} open={open === row.id} loading={familyLoading}/>
              </Fragment>
              ))}
            </TableBody>
          </Table>

          }
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10]}
          component="div"
          count={samples.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      </div></>);
}

SamplesPaginatedTable.propTypes = {
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
  getFamily: PropTypes.func.isRequired, 
  familyMembers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    gender: PropTypes.string,
    dob: PropTypes.string,
  })).isRequired, 
  reportType: PropTypes.string.isRequired, 
  familyLoading: PropTypes.string.isRequired,
  searchById: PropTypes.bool.isRequired
};