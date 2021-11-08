import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%'
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  whiteBg: {
    backgroundColor: '#fafafa'
  },
  floatRight: {
    float: 'right'
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
  },
  stepIcon: {
    color: "var(--hover-color)",
    "&$activeIcon": {
      color: "var(--main-color)"
    },
    "&$completedIcon": {
      color: "var(--main-color)"
    }
  },
  activeIcon: {},
  completedIcon: {},
  noPadding: {
    padding: 0
  }
}));

function getSteps() {
  return ['Select samples', 'Review'];
}

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0: 
      return 'Select samples';
    case 1:
      return 'Review';
    default:
      return 'Unknown stepIndex';
  }
}

export function SampleSearchReportStepper(props) {
  const { setCurrentStep, step, selectedSamples, reviewed, reset } = props;
  const classes = useStyles();
  const steps = getSteps();

  const handleNext = () => {
    setCurrentStep(step + 1);
  };

  const handleBack = () => {
    setCurrentStep(step - 1);
  };

  const handleReset = () => {
    reset();
  };

  return (
    <>
      <div className={classes.root}>
        <Stepper activeStep={step} alternativeLabel className={classes.noPadding}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel StepIconProps={{ classes:{ root: classes.stepIcon, active: classes.activeIcon, completed: classes.completedIcon } }}>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <div>
          {step === steps.length ? (
            <div>
              <div className={classes.floatRight}>
                <Button onClick={handleReset}>Reset</Button>
              </div>
            </div>
          ) : (
            <div>
              <div className={classes.floatRight}>
                <Button
                  disabled={step === 0}
                  onClick={handleBack}
                  className={classes.backButton}
                >
                  Back
                </Button>
                {step === 0 && <Button variant="contained" classes={{ root: classes.button, disabled: classes.disabledButton}} onClick={handleNext} disabled={selectedSamples.length === 0}>
                  Next
                </Button>}
                {step === 1 && <Button variant="contained" classes={{ root: classes.button, disabled: classes.disabledButton}} onClick={handleNext} disabled={!reviewed}>
                  Show Reports
                </Button>}
              </div>
              
            </div>
          )}
        </div>
      </div>
      {step !== 2 && <>
      <br/>
      <h3>{getStepContent(step)}</h3>
      </>}
    </>
  );
}

SampleSearchReportStepper.propTypes = {
  selectedSamples: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    gender: PropTypes.string,
    dob: PropTypes.string,
  })).isRequired,
  reset: PropTypes.func.isRequired,
  reviewed: PropTypes.bool.isRequired,
  step: PropTypes.number.isRequired,
  setCurrentStep: PropTypes.func.isRequired
};