import React from 'react';
import PropTypes from 'prop-types';
import { useForm, Controller } from "react-hook-form";
import { makeStyles } from '@material-ui/core/styles';
import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button';
import { GetFormattedDate } from '../shared/functions/GetFormattedDate';
import { Select, MenuItem } from "@material-ui/core";
import { REPORTS } from '../shared/data/report-value-label-mapping';
import Tooltip from '@material-ui/core/Tooltip';
import { IconButton } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";

const useStyles = makeStyles((theme) => ({
  container: {
    textAlign:'center'
  },
  inputContainer: {
    marginTop: 25
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

export function SearchForm(props) {
  const {onSearch, disabledSearch, reportInit } = props;
  const { control, handleSubmit, setValue, watch } = useForm();
  const [open, setOpen] = React.useState(false);
  const onSubmit = (data) => {
    data.id = data.id === undefined ? '':data.id;
    data.first_name = data.first_name === undefined ? '':data.first_name;
    data.last_name = data.last_name === undefined ? '':data.last_name;
    data.dob = data.dob === undefined ? '':data.dob;

    if(data.dob !== ''){
      data.dob = GetFormattedDate(data.dob);
    }
    onSearch(data);
  };
  const classes = useStyles();

  const handleTooltipChange = (value) => {
    setOpen(value);
  };

  const changeReport= () => {
    handleTooltipChange(true);
    setTimeout(function(){ handleTooltipChange(false); }, 3000);
  }
  const watchNonId = watch(['first_name','last_name','dob']);
  const watchId = watch('id');

  const handleClear = (name) => {
    setValue(name, '');
  }

  return (
    <div className={classes.container}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Button variant="contained" type="submit" disabled={disabledSearch} classes={{ root: classes.button, disabled: classes.disabledButton}}>Search</Button>
        <Tooltip PopperProps={{
                  disablePortal: true,
                }}
                onClose={() => handleTooltipChange(false)}
                open={open}
                disableFocusListener
                disableHoverListener
                disableTouchListener
                title="Changing report will remove sample selections">
          <div className={classes.inputContainer}>
            <label>Report: </label>
            <Controller
              render={
                ({ field }) => <Select label="Report" onClick={() => changeReport()} {...field}>
                  {REPORTS.map(r => <MenuItem key={r.value} value={r.value}>{r.label}</MenuItem>)}
                </Select>
              }
              control={control}
              name="report"
              defaultValue={reportInit}
            />
          </div>
        </Tooltip>
        <br />
        <div className={classes.inputContainer}>
          <Controller
            name="id"
            control={control}
            render={({ field: { onChange, onBlur, value, name, ref } }) => <TextField 
                                      label="Clinical ids" 
                                      InputLabelProps={{
                                        shrink: true,
                                      }} 
                                      inputRef={ref}
                                      onChange={(e) => setValue("id", e.target.value)}
                                      placeholder="e.g id1,id2,id3" 
                                      disabled={watchNonId.map(e => e !== undefined && e.length>0).includes(true)}
                                      InputProps={{
                                        endAdornment: (
                                          <IconButton onClick={() => handleClear('id')}>
                                            <ClearIcon />
                                          </IconButton>
                                        )
                                      }}
                                      />}
          />
        </div>
        <br />
        <div> OR </div>
        <div className={classes.inputContainer}>
          <Controller
            name="first_name"
            control={control}
            render={({ field: { onChange, onBlur, value, name, ref } }) => <TextField 
                                      label="First name" 
                                      InputLabelProps={{
                                        shrink: true,
                                      }} 
                                      onChange={(e) => setValue("first_name", e.target.value)}
                                      inputRef={ref}
                                      disabled={watchId !== '' && watchId !== undefined}
                                      InputProps={{
                                        endAdornment: (
                                          <IconButton onClick={() => handleClear('first_name')}>
                                            <ClearIcon />
                                          </IconButton>
                                        )
                                      }}
                                    />}
          />
        </div>
        <div className={classes.inputContainer}>
          <Controller
            name="last_name"
            control={control}
            render={({ field: { onChange, onBlur, value, name, ref } }) => <TextField 
                                      label="Last name"
                                      InputLabelProps={{
                                        shrink: true,
                                      }}  
                                      onChange={(e) => setValue("last_name", e.target.value)}
                                      inputRef={ref}
                                      disabled={watchId !== '' && watchId !== undefined}
                                      InputProps={{
                                        endAdornment: (
                                          <IconButton onClick={() => handleClear('last_name')}>
                                            <ClearIcon />
                                          </IconButton>
                                        )
                                      }}
                                      />}
          />
        </div>
        <div className={classes.inputContainer}>
          <Controller
            name="dob"
            control={control}
            render={({ field: { onChange, onBlur, value, name, ref } }) => <TextField 
                                      type="date"
                                      label="Date of birth"
                                      InputLabelProps={{
                                        shrink: true,
                                      }} 
                                      onChange={(e) => setValue("dob", e.target.value)}
                                      inputRef={ref}
                                      disabled={watchId !== '' && watchId !== undefined}
                                      InputProps={{
                                        endAdornment: (
                                          <IconButton onClick={() => handleClear('dob')}>
                                            <ClearIcon />
                                          </IconButton>
                                        )
                                      }}
                                       />}
          />
        </div>
      </form>
    </div>
  );
};

SearchForm.propTypes = {
  onSearch: PropTypes.func.isRequired,
  disabledSearch: PropTypes.bool.isRequired,
  reportInit: PropTypes.string
};