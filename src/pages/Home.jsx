import React, { Fragment } from 'react'

import { Header, Drawer, Banner, Requests, Advice, AddRequest } from '../components/index';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from '../store/actions/auth';

const home = (props) => {

  const { userIsLoggedIn } = props;

  return (
    <Fragment>
      <Header
        user={props.user}
        history={props.history} />
      <Drawer />
      <Banner />
      <Advice>
        Verifique se você está apto para doar clicando aqui.
      </Advice>
      <Requests />
      { userIsLoggedIn ?
        <AddRequest onClick={props.activateRequestsPanel} /> : null }
    </Fragment>
  )
}

const mapStateToProps = state => ({
  userIsLoggedIn: state.userIsLoggedIn,
  user: state.user
})

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(authActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(home);
