import axios from 'axios';
import { DELETE_REQUEST_URL } from '../../config/config';
import { getRequests } from './requests';
export const DELETE_REQUEST = 'DELETE_REQUEST';
export const NEW_DIALOG = 'NEW_DIALOG';

export const newDialog = (open = false, title, text, objectId) => async (dispatch, getState) =>
  dispatch({
    type: NEW_DIALOG,
    dialog: {
      open,
      title: title ? title : getState().dialog.title,
      text: text ? text : getState().dialog.text,
      objectId: objectId ? objectId : getState().dialog.objectId
    }
})

export const deleteRequest = (id) => async (dispatch) => {

  axios.delete(DELETE_REQUEST_URL + id)
    .then(response => {
      dispatch(newDialog());
      dispatch({
        type: DELETE_REQUEST,
        id
      })
      dispatch(getRequests());
    })

}
