export const OPEN_SNACKBAR = 'OPEN_SNACKBAR';

export const openSnackbar = (open = false, role, message) => async (dispatch, getState) => dispatch({
  type: OPEN_SNACKBAR,
  snackbar: {
    isOpen: open,
    role: role ? role : getState().snackbar.role,
    message: message ? message : getState().snackbar.message
  }
})
