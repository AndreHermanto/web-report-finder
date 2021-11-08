import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
		padding: theme.spacing(3),
		marginTop: '12%',
    textAlign: 'center'
	},
}));

export function PageNotFound() {
	const classes = useStyles();
  return (
		<main className={classes.content}>
			<ErrorOutlineIcon fontSize="large" />
			<Typography variant="h5" noWrap>
				Page not found.{' '} 
				<Link to="/">
					Go Back
				</Link>
			</Typography>
		</main>
	)
}