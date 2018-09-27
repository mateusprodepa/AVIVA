import React, { Component } from 'react';

import AddIcon from '@material-ui/icons/Add';
import SendIcon from '@material-ui/icons/Send';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';
import CircularProgress from '@material-ui/core/CircularProgress';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import { Paper } from '@material-ui/core';

import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as newRequestActions from '../store/actions/newRequest';

const styles = theme => ({
  wrapper: {
    position: 'relative'
  },
  fabProgress: {
    color: deepPurple[500],
    position: 'absolute',
    top: -6,
    left: -6
  },
  root: {
    margin: theme.spacing.unit,
    display: 'flex',
    alignItems: 'center',
    position: 'fixed',
    bottom: '20px',
    right: '20px',
  },
  paper: {
    position: 'fixed',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    [theme.breakpoints.up('sm')]: {
      position: 'absolute',
      width: 500,
      height: 600,
      top: -528,
      left: -428,
      zIndex: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
    }
  },
  addBtn: {
    zIndex: 999
  },
  inputRoot: {
    [theme.breakpoints.up('sm')]: {
      flexWrap: 'wrap',
      width: '400px'
    },
    margin: '20px auto',
    width: '500px'
  },
  fileInput: {
    border: 'none'
  }
});

class AddRequest extends Component {

  state = {
    isLoading: false,
    isOpen: false,
    title: '',
    text: '',
    img: ''
  }

  toggleModal = () => {

    const { title, text, img } = this.state;

    if(this.state.isOpen) {
      this.props.newRequest({
        title,
        text,
        img
      })
    }

    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  closeModal = () => {
    this.setState({
      isOpen: false
    })
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {

    const displayNone = {
      display: 'none'
    }

    const { classes } = this.props;
    const self = this;
    const { isLoading, isOpen } = this.state;

    return (
      <ClickAwayListener onClickAway={this.closeModal}>
        <div className={classes.root}>
          <div className={classes.wrapper}>
            <Button
              variant="fab"
              color="secondary"
              aria-label="Add"
              className={classes.addBtn}
              onClick={this.toggleModal}>
              {isOpen ? <SendIcon /> : <AddIcon />}
            </Button>
            {this.props.isLoading && <CircularProgress size={68} className={classes.fabProgress} />}
            <Paper className={classes.paper} style={isOpen ? null : displayNone}>
              <TextField
                onChange={this.handleChange}
                name='title'
                value={this.state.title}
                placeholder="Título do pedido"
                InputProps={{
                  inputRef: self.input,
                  classes: {
                    root: classes.inputRoot,
                  }
                }}
              />

              <TextField
                onChange={this.handleChange}
                name='text'
                multiline={true}
                rows="3"
                value={this.state.text}
                placeholder="Insira o texto aqui (máximo 235 caracteres)"
                InputProps={{
                  inputRef: self.input,
                  classes: {
                    root: classes.inputRoot,
                  }
                }}
              />

            <div>
              <TextField
                onChange={this.handleChange}
                name='img'
                value={this.state.img}
                placeholder="Insira o texto aqui (máximo 235 caracteres)"
                InputProps={{
                  type: 'file',
                  inputRef: self.input,
                  classes: {
                    root: classes.inputRoot,
                  }
                }}
              />
            
            </div>

            </Paper>
          </div>
        </div>
      </ClickAwayListener>
    )
  }
}

AddRequest.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  requestModal: state.requestModal,
  isLoading: state.newRequestIsLoading,
  hasErrored: state.newRequestHasErrored
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(newRequestActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AddRequest));
