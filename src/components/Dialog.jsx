import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as dialogActions from '../store/actions/dialog';

class AlertDialog extends React.Component {

  render() {
    return (
      <div>
        <Dialog
          open={this.props.isOpen}
          onClose={() => this.props.newDialog()}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{ this.props.title }</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              { this.props.text }
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.props.deleteRequest(this.props.objectId)} color="primary">
              Sim
            </Button>
            <Button onClick={() => this.props.newDialog()} color="primary" autoFocus>
              Não
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isOpen: state.dialog.isOpen,
  text: state.dialog.text,
  title: state.dialog.title,
  objectId: state.dialog.objectId
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(dialogActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AlertDialog);
