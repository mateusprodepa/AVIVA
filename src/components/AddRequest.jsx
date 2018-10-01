import React, { Component } from 'react';

import AddIcon from '@material-ui/icons/Add';
import SendIcon from '@material-ui/icons/Send';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';
import CircularProgress from '@material-ui/core/CircularProgress';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import TextField from '@material-ui/core/TextField';
import { Paper } from '@material-ui/core';

import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as newRequestActions from '../store/actions/newRequest';

const styles = theme => ({
  wrapper: {
    position: 'relative',
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
    padding: '16px 0',
    position: 'fixed',
    width: '100%',
    height: '100%',
    top: '56px',
    left: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    [theme.breakpoints.up('sm')]: {
      position: 'absolute',
      width: 500,
      height: 600,
      top: -528,
      left: -428,
      zIndex: 0,
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
    minWidth: '300px',
    maxWidth: '500px',
    padding: 4,
  },
  fileInput: {
    maxWidth: 400,
    margin: '0 auto',
    border: 'none',
    textAlign: 'center',
  },
  image: {
    textAlign: 'center',
    maxWidth: 200,
    margin: '0 auto',
  },
  fileInputWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  }
});

class AddRequest extends Component {

  constructor(props) {
    super(props);
    this.imageRef = React.createRef();
    this.fileInput = React.createRef();
  }

  state = {
    isLoading: false,
    isOpen: false,
    title: '',
    text: '',
    base64: ''
  }

  toggleModal = () => {

    const initialState = {
      isLoading: false,
      isOpen: false,
      title: '',
      text: '',
    }

    const { title, text, base64 } = this.state;

    if(this.state.isOpen) {
      this.props.newRequest({
        title,
        text,
        img: base64,
        senderId: this.props.user.id,
        senderUsername: this.props.user.username,
        location: this.props.user.city
      })

      this.setState(initialState)
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
    this.setState({ [e.target.name]: e.target.value });
  }

  encodeImageFileAsURL = (element) => {
    const file = element.target.files[0];
    if(file) {
      if(file.type.includes('image')) {
        const reader = new FileReader();
        reader.onloadend = async () => {
          const base64 = reader.result;
          await this.setState({ base64 })
          this.imageRef.current.src = base64;
        }
        reader.readAsDataURL(file);
      }
    } else {
      this.imageRef.current.src = '';
      this.setState({ base64: '' });
    }
  }

  render() {

    const displayNone = {
      display: 'none'
    }

    const self = this;

    const { classes } = this.props;
    const { isOpen } = this.state;

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
                  classes: {
                    root: classes.inputRoot,
                  }
                }}
              />
              { /*eslint-disable*/ }
              <TextField
                onChange={this.handleChange}
                name='text'
                multiline={true}
                rows="3"
                value={this.state.text}
                placeholder="Insira o texto aqui (máximo 235 caracteres)"
                inputProps={{
                  maxLength: 235
                }}
                InputProps={{
                  classes: {
                    root: classes.inputRoot,
                  }
                }}
              />
              { /* eslint-enable */ }
              <div className={classes.fileInputWrapper}>
                <TextField
                  onChange={(e) => this.encodeImageFileAsURL(e)}
                  name='img'
                  InputProps={{
                    type: 'file',
                    inputRef: self.fileInput,
                    classes: {
                      root: classes.inputRoot,
                    }
                  }}
                />
                { this.state.base64 !== '' ? <img alt="request-preview" className={classes.image} src="" ref={this.imageRef}></img> : null }

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
  hasErrored: state.newRequestHasErrored,
  user: state.user
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(newRequestActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AddRequest));
