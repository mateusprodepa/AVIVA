import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import { red } from '@material-ui/core/colors';

const styles = theme => ({
  root: {
    cursor: 'pointer',
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    backgroundColor: '#d32f2f',
    maxWidth: '1200px',
    margin: theme.spacing.unit,
    marginLeft: 'auto',
    marginRight: 'auto',
    [theme.breakpoints.up('sm')]: {
      width: '80%'
    },
    position: 'relative'
  },
  advice: {
    color: '#FEFEFE',
    fontFamily: 'Montserrat',
    textAlign: 'left',
    marginLeft: 18
  },
  closeBtn: {
    color: '#FEFEFE',
    backgroundColor: red[400],
    borderRadius: '50%',
    position: 'absolute',
    top: 16,
    right: 15,
    fontSize: 15,
    padding: 4
  }

});

const PaperSheet = (props) => {

  const { classes } = props;

  return (
      <div onClick={ () => console.log("Não existo ainda") }>
        <Paper className={classes.root} elevation={1}>
          <Typography variant="subheading" component="h3" className={ classes.advice } align="center">
            { props.children }
          </Typography>
          <CloseIcon className={classes.closeBtn} />
        </Paper>
      </div>
  );
}

PaperSheet.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PaperSheet);
