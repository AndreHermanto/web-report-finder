import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
		padding: theme.spacing(3),
		marginTop: '12%',
    textAlign: 'center'
	},
}));

export function Home() {
	const classes = useStyles();
  return (
		<main className={classes.content}>

		</main>
	)
}