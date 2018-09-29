import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  flex: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: '50px 0'
  },
  fabProgress: {
    // color: deepPurple[500]
    textAlign: 'center'
  },
}

const RequestsLoader = (props) => {
  const { classes } = props;
  return (
    <div className={classes.flex}>
      <CircularProgress size={68} className={classes.fabProgress} />
    </div>
  )
}

export default withStyles(styles)(RequestsLoader);
