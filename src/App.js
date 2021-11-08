import React from 'react';
import { SampleSearch } from './features/sampleSearch/SampleSearch';
import { PageNotFound } from './components/pages/PageNotFound';
import { ReportPage } from './components/pages/ReportPage';
import { Home } from './components/pages/Home';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Auth0ProviderWithHistory from "./auth/auth0-provider-with-history";
import ProtectedRoute from "./auth/protected-route";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
}));

function App() {
  const classes = useStyles();
  console.log(process.env.REACT_APP_ENV)
  return (
    <Router>
      <Auth0ProviderWithHistory>
      <div className={classes.root}>
        <CssBaseline />
        <Header />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <ProtectedRoute path="/search" component={SampleSearch} />
          <ProtectedRoute path="/report" component={ReportPage} />
          <Route>
            <PageNotFound />
          </Route>
        </Switch>
        <Footer />
      </div>
      </Auth0ProviderWithHistory>
    </Router>
  );
}

export default App;
