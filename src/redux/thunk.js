import api from './api';
import * as CONST from './constants';

function fetchApi(dispatch, method, url, type, d = {}){
  return  api[method](url, d)
  .then((result) => {
    dispatch({
      type,
      payload: result.data.data
    });
  })
  .catch(err => dispatch({
    type: CONST.SET_DATA_FAILED,
    payload: err,
  }))
}

export const getContact = () => {
  return dispatch => {
    dispatch({
      type: CONST.TOOGLE_LOADING
    });
    fetchApi(dispatch, 'get','/contact',CONST.SET_DATA);
  }
}

export const createContact = (payload) => {
  return dispatch => {
    dispatch({
      type: CONST.TOOGLE_LOADING
    });
    fetchApi(dispatch, 'post','/contact',CONST.ADD_DATA_SUCCESS, payload);
  }
}

export const updateContact = (payload) => {
  return dispatch => {
    dispatch({
      type: CONST.TOOGLE_LOADING
    });
    fetchApi(dispatch, 'put','/contact',CONST.UPDATE_DATA_SUCCESS, payload);
  }
}