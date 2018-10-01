import React, { Component } from 'react';

import SearchForUsersRequests from './SearchForUsersRequests';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import classNames from 'classnames';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import * as requestActions from '../store/actions/requests';

import Request from './Request';
import RequestsLoader from './RequestsLoader';

import PropTypes from 'prop-types'

const styles = theme => ({
  paper: {
    borderRadius: theme.shape.borderRadius,
    maxWidth: '1200px',
    marginLeft: 'auto',
    marginRight: 'auto',
    [theme.breakpoints.up('sm')]: {
      marginLeft: 'auto',
      marginRight: 'auto',
      margin: theme.spacing.unit,
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

  typography: {
    textAlign: 'center',
    opacity: 0.4,
    userSelect: 'none',
    margin: '90px auto'
  }
})


class Requests extends Component {

  componentDidMount() {
    this.props.getRequests();
  }

  render() {

    const { classes } = this.props;

    const grid = <Grid container spacing={40}>
      { this.props.isLoading ?
        <RequestsLoader /> :
        this.props.requests.map(request => (
          <Grid item key={request.id} sm={6} md={4} lg={4}>
            <Request
              id={request.id}
              createdAt={request.createdAt}
              creatorName={request.sender.username}
              location={request.location}
              isFromUser={request.sender.id === this.props.user.id}
              title={request.title}
              text={request.text}
              img={request.img} />
          </Grid>
        ))
       }
    </Grid>

    return (
      <Paper className={ classes.paper }>
        <SearchForUsersRequests />
          <main>
          <div className={classNames(classes.layout, classes.cardGrid)}>
              { this.props.requests.length !== 0 ?
                grid :
                <Typography
                  className={classes.typography}
                  variant="display2">
                  Não foram encontrados pedidos
                </Typography> }
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
  requests: state.requests,
  isLoading: state.requestsAreLoading,
  hasErrored: state.requestsHasErrored,
  user: state.user
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(requestActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Requests));
