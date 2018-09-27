import axios from 'axios';
import { REQUESTS_URL } from '../../config/config';

export const GET_REQUESTS = 'GET_REQUESTS';
export const REQUESTS_ARE_LOADING = 'REQUESTS_ARE_LOADING';
export const REQUESTS_HAS_ERRORED= 'REQUESTS_HAS_ERRORED';
export const REQUESTS_FETCH_DATA_SUCCESS = 'REQUESTS_FETCH_DATA_SUCCESS';
export const REFRESH_REQUESTS = 'REFRESH_REQUESTS';

export const requestsAreLoading = (bool) => ({
  type: REQUESTS_ARE_LOADING,
  isLoading: bool
})

export const requestsHasErrored = (bool) => ({
  type: REQUESTS_HAS_ERRORED,
  hasErrored: bool
})

export const requestsFetchDataSuccess = (requests) => ({
  type: REQUESTS_FETCH_DATA_SUCCESS,
  requests
})

export const getRequests = () => async (dispatch, getState) => {
  dispatch(requestsAreLoading(true));
  axios.get(REQUESTS_URL)

    .then(response => {

      if(response.data.requests) {
        dispatch(requestsFetchDataSuccess(response.data.requests));
      }

      dispatch(requestsAreLoading(false));

    })

    .catch(err => {
      dispatch(requestsHasErrored(true));
      dispatch(requestsAreLoading(false));
    });
}
