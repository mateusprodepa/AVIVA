import React from 'react';

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const styles1 = theme => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.dark,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
});

const styles2 = theme => ({
  margin: {
    margin: theme.spacing.unit,
  },
});

const Snackbar = (props) => {

  const { classes } = props;

  return (
    <MySnackbarContentWrapper
      variant="success"
      className={classes.margin}
      message={props.message}
    />
  )

}

export default withStyles(styles2)(Snackbar);
