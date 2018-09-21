import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { Typography, Paper } from '@material-ui/core';

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
      height: '300px',
      width: '100%',
      borderRadius: theme.shape.borderRadius,
    },
  }
}

const banner = (props) => {

  const { classes } = props;

  return (
    <Paper className={ classes.root }>
      <div className={ classes.banner }>
      </div>
    </Paper>
  )
}

export default withStyles(styles)(banner);
