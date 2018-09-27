import axios from 'axios';
import { NEW_REQUEST_URL } from '../../config/config';
import { getToken } from '../../utils/utils';

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
  return {
    type: NEW_REQUEST_SUCCESS,
    request
  }
}

export function newRequest(data) {

  return async function(dispatch) {
    dispatch(newRequestIsLoading(true));

    const token = getToken();

    const headers = { authorization: `Bearer ${token}` }

    axios.post(NEW_REQUEST_URL, data, headers)
    .then(response => {
      if(response.data.status === 'success') {
        console.log(response.data);
      } else {
        console.log(response.data);
      }
    })

    .catch(error => {
      dispatch(newRequestIsLoading(false));
      dispatch(newRequestHasErrored(true));
    })

    dispatch(newRequestIsLoading(false));
  }

}
