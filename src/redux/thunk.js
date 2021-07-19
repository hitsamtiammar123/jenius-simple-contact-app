import api from './api';
import * as CONST from './constants';

function fetchApi(dispatch, method, url, type, failedType, d = {}){
  return  api[method](url, d)
  .then((result) => {
    dispatch({
      type,
      payload: result.data.data
    });
  })
  .catch(err => dispatch({
    type: failedType,
    payload: err,
  }))
}

export const getContact = () => {
  return dispatch => {
    dispatch({
      type: CONST.TOOGLE_LOADING
    });
    fetchApi(dispatch, 'get','/contact',CONST.SET_DATA, CONST.SET_DATA_FAILED);
  }
}

export const createContact = (payload) => {
  return dispatch => {
    dispatch({
      type: CONST.TOOGLE_LOADING
    });
    fetchApi(dispatch, 'post','/contact',CONST.ADD_DATA_SUCCESS, CONST.ADD_DATA_FAILED, payload);
  }
}

export const updateContact = (payload) => {
  return dispatch => {
    dispatch({
      type: CONST.TOOGLE_LOADING
    });
    fetchApi(dispatch, 'put','/contact',CONST.UPDATE_DATA_SUCCESS, CONST.UPDATE_DATA_FAILED, payload);
  }
}

export const deleteContact = (payload) => {
  return dispatch => {
    dispatch({
      type: CONST.TOOGLE_LOADING
    });
    fetchApi(dispatch, 'delete',`/contact/${payload}`,CONST.DELETE_DATA_SUCCESS, CONST.DELETE_DATA_FAILED);
  }
}