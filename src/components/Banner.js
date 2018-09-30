import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import PropTypes from 'prop-types';

import BannerImg from '../assets/media/img/doacao-sangue.png';

const styles = theme => {
  return {
    root: {
      maxWidth: '1200px',
      margin: theme.spacing.unit ,
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: 75,
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
      background: `url(${BannerImg})`,
      backgroundSize: '100% 100%',
      backgroundAttachment: 'static',
      backgroundOrigin: 'center',
      backgroundRepeat: 'no-repeat'
    },

    bannerTitle: {
      color: '#FFFFFF',
      padding: '24px 0 0 24px',
    }
  }
}

const banner = (props) => {

  const { classes } = props;

  return (
    <Paper className={ classes.root }>
      <div className={ classes.banner }>
        {/*<Typography variant="display3" gutterBottom className={ classes.bannerTitle }>Doe Sangue.</Typography>*/}
      </div>
    </Paper>
  )
}

banner.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(banner);
