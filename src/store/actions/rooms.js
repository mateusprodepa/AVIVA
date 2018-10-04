import { socket } from '../../config/socket';

const on = (event) => (does) => socket.on(event, does);
const emit = (event) => (data) => socket.emit(event, data);

export const GET_ROOMS = 'GET_ROOMS';
export const GET_ROOMS_HAS_ERRORED = 'GET_ROOMS_HAS_ERRORED';
export const GET_ROOMS_SUCCESS = 'GET_ROOMS_SUCCESS';
export const GET_ROOMS_IS_LOADING = 'GET_ROOMS_IS_LOADING';

export const getRoomsSuccess = (rooms) => ({
  type: GET_ROOMS_SUCCESS,
  rooms
})

export const getRoomsIsLoading = (bool) => ({
  type: GET_ROOMS_IS_LOADING,
  isLoading: bool
})

export const getRoomsHasErrored = (bool) => ({
  type: GET_ROOMS_HAS_ERRORED,
  hasErrored: bool
})

export const getRooms = () => async (dispatch, getState) => {

  dispatch(getRoomsIsLoading(true));

  socket.emit('getRooms', getState().user.id);

  dispatch(getRoomsIsLoading(false));

}

export const createNewRoom = (users) => async (dispatch) => {
  
  emit('createNewRoom')(users)

}

export const setRoomsListener = () => async (dispatch, getState) => {

  on('userRooms')
    // eslint-disable-next-line
    ((rooms) => dispatch({ type: GET_ROOMS_SUCCESS, rooms }));

  on('impossibleToFindUser')
    // eslint-disable-next-line
    ((message) => console.info(message));

  return new Promise((resolve) => resolve(true))

}
