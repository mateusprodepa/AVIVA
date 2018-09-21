import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import PropTypes from 'prop-types';

import BannerImg from '../assets/media/img/blood-donation.jpg';

const styles = theme => {
  console.log(theme.palette)
  return {
    root: {
      maxWidth: '1200px',
      margin: theme.spacing.unit ,
      marginLeft: 'auto',
      marginRight: 'auto',
      borderRadius: theme.shape.borderRadius,
      [theme.breakpoints.up('sm')]: {
        width: '80%'
      },
    },

    banner: {
      backgroundColor: '#F74D4D',
      height: '500px',
      width: '100%',
      borderRadius: theme.shape.borderRadius,
      // background: `url(${BannerImg})`,
      backgroundSize: 'cover',
      backgroundAttachment: 'fixed',
      backgroundOrigin: 'center'
    },
  }
}

const banner = (props) => {

  const { classes } = props;

  return (
    <Paper className={ classes.root }>
      <div className={ classes.banner }></div>
    </Paper>
  )
}

banner.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(banner);
