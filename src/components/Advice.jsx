import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import { red } from '@material-ui/core/colors';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as adviceActions from '../store/actions/advice';

const styles = theme => ({
  root: {
    cursor: 'pointer',
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    backgroundColor: '#d32f2f',
    maxWidth: '1200px',
    margin: 0,
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 0,
    [theme.breakpoints.up('sm')]: {
      margin: theme.spacing.unit,
      marginLeft: 'auto',
      marginRight: 'auto',
      width: '80%',
      borderRadius: theme.shape.borderRadius,
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
      <div style={ props.hidden ? { display: 'none' } : null } onClick={ () => console.log("Não existo ainda") }>
        <Paper className={classes.root} elevation={1}>
          <Typography variant="subheading" component="h3" className={ classes.advice } align="center">
            { props.children }
          </Typography>
          <CloseIcon onClick={() => props.hideAdvice(true)} className={classes.closeBtn} />
        </Paper>
      </div>
  );
}

PaperSheet.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  hidden: state.advice.hidden
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(adviceActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PaperSheet));
