import axios from 'axios';
import { NEW_REQUEST_URL } from '../../config/config';
import { getToken } from '../../utils/utils';
import { getRequests } from './requests';
import { openSnackbar } from './snackbar';

export const NEW_REQUEST_IS_LOADING = 'NEW_REQUEST_IS_LOADING';
export const NEW_REQUEST_HAS_ERRORED = 'NEW_REQUEST_HAS_ERRORED';
export const NEW_REQUEST_SUCCESS = 'NEW_REQUEST_SUCCESS';

export function newRequestIsLoading(bool) {
  return {
    type: NEW_REQUEST_IS_LOADING,
    isLoading: bool
  }
}

export function newRequestHasErrored(bool) {
  return {
    type: NEW_REQUEST_HAS_ERRORED,
    hasErrored: bool
  }
}

export function newRequestSuccess(request) {
  return async function(dispatch) {

    dispatch({
      type: NEW_REQUEST_SUCCESS,
      request
    })

    dispatch(getRequests());

  }
}

export function newRequest(data) {

  return async function(dispatch) {
    dispatch(newRequestIsLoading(true));

    const token = getToken();

    const headers = { authorization: `Bearer ${token}` }

    axios.post(NEW_REQUEST_URL, data, headers)
    .then(response => {
      console.log(response.data);
      if(response.data.status === 'success') {
        dispatch(newRequestSuccess(response.data));
        dispatch(openSnackbar(true, response.data.status, response.data.message));
      } else {
        dispatch(openSnackbar(true, response.data.status, response.data.message));
      }
    })

    .catch(error => {
      dispatch(newRequestIsLoading(false));
      dispatch(newRequestHasErrored(true));
    })

    dispatch(newRequestIsLoading(false));
  }

}
