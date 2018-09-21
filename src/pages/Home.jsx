import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import Paper from '@material-ui/core/Paper';

import Header from '../components/Header';
import Drawer from '../components/Drawer';
import Banner from '../components/Banner';
import SearchForUsersInput from '../components/SearchForUsersInput';
import { withStyles } from '@material-ui/core/styles'

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
        <SearchForUsersInput />
      </Paper>
    </Fragment>
  )
}

export default withStyles(styles)(home);
