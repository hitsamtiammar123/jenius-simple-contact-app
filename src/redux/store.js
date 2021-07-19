import {createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import * as CONST from './constants';

const initialStates = {
  listData: [],
  action: '',
  loading: false,
  errorRes: {},
  successRes: {},
};

function reducer(state = initialStates, actions){
  const {payload, type} = actions;
  switch(type){
    case CONST.SET_DATA:
      return {
        ...state,
        listData: payload,
        loading: false,
        action: type,
      };
    case CONST.ADD_DATA: 
      return {
        ...state,
        listData: [...state.listData, payload],
        loading: false,
        action: type,
      };
    case CONST.UPDATE_DATA:
      return {
        ...state,
        listData: state.listData.map(d => d.id === payload.id ? payload : d),
        loading: false,
        action: type,
      };
    case CONST.DELETE_DATA:
      return {
        ...state,
        listData: state.listData.filter(d => d.id !== payload),
        loading: false,
        action: type,
      }
    case CONST.TOOGLE_LOADING:
      return {
        ...state,
        loading: !state.loading,
        action: type,
      }
    case CONST.ADD_DATA_SUCCESS:
    case CONST.SET_DATA_SUCCESS:
    case CONST.DELETE_DATA_SUCCESS:
    case CONST.UPDATE_DATA_SUCCESS:
      return {
        ...state,
        successRes: payload,
        loading: false,
        action: type,
      }
    case CONST.ADD_DATA_FAILED:
    case CONST.DELETE_DATA_FAILED:
    case CONST.SET_DATA_FAILED:
    case CONST.UPDATE_DATA_FAILED:
      return {
        ...state,
        errorRes: payload,
        loading: false,
        action: type,
      }
    default:
  }
  return state;
}

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

export default store;