import React, { Component } from 'react';

import SearchForUsersRequests from './SearchForUsersRequests';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import classNames from 'classnames';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles'

import * as requestActions from '../store/actions/requests';

import Request from './Request';

import PropTypes from 'prop-types'

const styles = theme => ({
  paper: {
    borderRadius: theme.shape.borderRadius,
    maxWidth: '1200px',
    margin: theme.spacing.unit,
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
  },

  cardGrid: {
    padding: `${theme.spacing.unit * 8}px 0`,
  },

  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: '90%',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },

  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
})


class Requests extends Component {

  componentDidMount() {
    this.props.getRequests();
  }

  render() {
    
    const { classes } = this.props;

    return (
      <Paper className={ classes.paper }>
        <SearchForUsersRequests />
          <main>
          <div className={classNames(classes.layout, classes.cardGrid)}>
            <Grid container spacing={40}>
              {this.props.requests.map(request => (
                <Grid item key={request.id} sm={6} md={4} lg={4}>
                  <Request title={request.title} text={request.text} img={request.img} />
                </Grid>
              ))}
            </Grid>
          </div>
        </main>
      </Paper>
    )
  }
}

Requests.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  requests: state.requests
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(requestActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Requests));
