import React, { Component } from 'react';

import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Typography } from '@material-ui/core';

import * as authActions from '../store/actions/auth';

class LoginForm extends Component {

  state = {
    email: '',
    password: '',
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();

    this.props.userLoginRequest(this.state);
  }

  render() {

    const { classes, hasErrored } = this.props;

    if(this.props.userIsLoggedIn) {
      
      this.props.history.push('/')

    }

    return (
      <form className={classes.form} onSubmit={this.handleSubmit}>
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="email">Email</InputLabel>
          <Input onChange={this.handleChange} value={this.state.email} id="email" name="email" type="email" autoComplete="email" autoFocus/>
          { hasErrored && hasErrored.errors.email ? <Typography variant="caption" color="secondary">{ hasErrored.errors.email }</Typography> : null }
        </FormControl>
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input onChange={this.handleChange} value={this.state.password} name="password" type="password" id="password" autoComplete="current-password"/>
          { hasErrored && hasErrored.errors.password ? <Typography variant="caption" color="secondary">{ hasErrored.errors.password }</Typography> : null }
        </FormControl>
        <Button type="submit" fullWidth variant="raised" color="primary" className={classes.submit} >
          Sign in
        </Button>
      </form>
    )
  }
}

const mapStateToProps = (state) => ({
  hasErrored: state.userLoginHasErrored,
  isLoading: state.userLoginIsLoading,
  userIsLoggedIn: state.userIsLoggedIn
})

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(authActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
