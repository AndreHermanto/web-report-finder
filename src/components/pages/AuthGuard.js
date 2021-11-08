import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
		padding: theme.spacing(3),
		marginTop: '12%',
    textAlign: 'center'
	},
}));

export function AuthGuard() {
	const classes = useStyles();
  return (
		<main className={classes.content}>
			<Typography variant="h6" noWrap>
				Please login to view to this page.
			</Typography>
		</main>
	)
}