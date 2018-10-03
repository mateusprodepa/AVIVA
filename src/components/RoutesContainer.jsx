import React, { Component, Fragment } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as roomActions from '../store/actions/rooms';
import * as authActions from '../store/actions/auth';

class RoutesContainer extends Component {

  state = {
    userDataHasLoaded: false,
  }

  render() {

    const { userData, userIsLoggedIn } = this.props;

    if(Object.keys(userData).length !== 0 && userIsLoggedIn) {
      this.props.setRoomsListener()
      .then(res => this.props.getRooms())
    }

    return (
      <Fragment>
        { this.props.children }
      </Fragment>
    )
  }

}

const mapStateToProps = state => ({
  userIsLoggedIn: state.userIsLoggedIn,
  userData: state.user
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...roomActions, ...authActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(RoutesContainer);
