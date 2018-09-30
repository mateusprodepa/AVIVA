import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';

import * as snackbarActions from '../store/actions/snackbar';

import MySnackbarContentWrapper from './MySnackbarContentWrapper';

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit,
  },
});

const WarningSnackbar = (props) => {

  return (
    <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          onClose={() => props.openSnackbar(false)}
          open={props.isOpen}
          autoHideDuration={6000}
        >
          <MySnackbarContentWrapper
            onClose={() => props.openSnackbar(false)}
            variant={props.type}
            message={props.message}
          />
    </Snackbar>
  )

}

const mapStateToProps = state => ({
  isOpen: state.snackbar.isOpen,
  type: state.snackbar.role,
  message: state.snackbar.message
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(snackbarActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(WarningSnackbar));
