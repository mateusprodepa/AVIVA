import { OPEN_SNACKBAR } from '../actions/snackbar';

const initialState = {
  isOpen: false,
  role: 'success',
  message: ''
}

export function snackbar(state = initialState, action) {
  switch(action.type) {
    case OPEN_SNACKBAR:
      return {
        isOpen: action.snackbar.isOpen,
        role: action.snackbar.role,
        message: action.snackbar.message
      }

    default:
      return state;
  }
}
