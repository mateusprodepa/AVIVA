import { NEW_DIALOG } from '../actions/dialog';

const initialState = {
  isOpen: false,
  title: '',
  text: '',
  objectId: ''
}

export const dialog = (state = initialState, action) => {
  switch(action.type) {
    case NEW_DIALOG:
      return {
        isOpen: action.dialog.open,
        title: action.dialog.title,
        text: action.dialog.text,
        objectId: action.dialog.objectId
      }

    default:
      return state;
  }
}
