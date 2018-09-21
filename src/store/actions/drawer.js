export const TOGGLE_DRAWER = 'TOGGLE_DRAWER';

export const toggleDrawer = (isOpen) => async (dispatch, getState) => dispatch({
  type: TOGGLE_DRAWER,
  payload: Boolean(isOpen)
})
