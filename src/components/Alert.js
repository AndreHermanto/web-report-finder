import MuiAlert from '@material-ui/lab/Alert';

export function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}