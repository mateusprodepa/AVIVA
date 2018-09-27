import React from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

const styles = {

  row: {
    display: 'flex',
    justifyContent: 'center',
  },

  avatar: {
    margin: 10,
  },

  bigAvatar: {
    width: 60,
    height: 60,
  }

};

const UserAvatar = (props) => {
  const { classes } = props;
  return (
    <div
      onClick={props.onClick}
      className={classes.row}>
      <Avatar alt="Avatar" src={ props.img } className={classes.avatar} />
    </div>
  );
}

UserAvatar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserAvatar);
