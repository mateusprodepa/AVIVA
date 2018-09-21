import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles'

import Header from '../components/Header';
import Drawer from '../components/Drawer';
import Banner from '../components/Banner';
import SearchForUsersRequests from '../components/SearchForUsersRequests';
import DonationRequestCard from '../components/DonationRequestCard';

const styles = theme => ({

  paper: {
    padding: '4px',
    borderRadius: theme.shape.borderRadius,
    maxWidth: '1200px',
    margin: theme.spacing.unit ,
    marginLeft: 'auto',
    marginRight: 'auto',
    [theme.breakpoints.up('sm')]: {
      width: '80%'
    },
  },

  root: {
    flexGrow: 1,
  },

  gridPaper: {
    height: 140,
    flex: 1
  },

  control: {
    padding: theme.spacing.unit * 2,
  },

  demo: {
    display: 'flex',
    [theme.breakpoints.up('sm')]: {
      width: '100%'
    },
    margin: '20px auto'
  }

})

const home = (props) => {

  const { classes } = props;

  return (
    <Fragment>
      <Header />
      <Drawer />
      <Banner />
      <Paper className={ classes.paper }>
        <SearchForUsersRequests />
          <Grid container className={classes.demo} justify="center" spacing={Number(16)}>
            {[0, 1, 2, 3, 4, 5].map(value => (
              <Grid key={value} item>
                <DonationRequestCard />
              </Grid>
            ))}
          </Grid>
      </Paper>
    </Fragment>
  )
}

home.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(home);
