import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as drawerActions from '../store/actions/drawer';

import SideList from './SideList';

const styles = (theme) => ({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },

  root: {
    width: '100%',
    minWidth: 300,
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },

});

const TemporaryDrawer = (props) => {

  const { classes } = props;

  return (
    <div>
      <Drawer open={props.drawer.isOpen} onClose={() => props.toggleDrawer(0)}>
        <div
          tabIndex={0}
          role="button"
          onClick={() => props.toggleDrawer(0)}
          onKeyDown={() => props.toggleDrawer(0)}
        >
          <SideList
            classes={ classes }
            />
        </div>
      </Drawer>
    </div>
  );
}

TemporaryDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  drawer: state.drawer
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(drawerActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TemporaryDrawer));
