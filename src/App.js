import React, {useEffect} from 'react';
import {BrowserRouter, Switch, Route, Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {actions, CONST} from '@c-redux';
import {usePrevious} from '@c/hooks';
import {TableContent, FormContent} from './components/index';

const {ADD_DATA_SUCCESS} = CONST;

function App() {
  const dispatch = useDispatch();
  const action = useSelector(state => state.action);
  const prevAction = usePrevious(action);

  useEffect(() => {
    console.log('ini di app')
    dispatch(actions.getContact())
  },[]);

  useEffect(() => {
    if(prevAction !== undefined && prevAction !== action){
      console.log('Data reload')
      switch(action){
        case CONST.ADD_DATA_SUCCESS:
        case CONST.SET_DATA_SUCCESS:
        case CONST.DELETE_DATA_SUCCESS:
        case CONST.UPDATE_DATA_SUCCESS:
          dispatch(actions.getContact());
        break;
        default:
      }
    }
  },[action, prevAction]);

  return (
    <BrowserRouter>
      <div className="container-fluid">
        <nav className="nav nav-tabs">
          <Link className="nav-link" to="/">Home</Link>
          <Link className="nav-link" to="/create">Create New Contact</Link>
        </nav>
        <div className="container">
            <Switch>
              <Route path={["/create","/edit/:id"]}>
                <FormContent/>
              </Route>
              <Route path="/">
                <TableContent/>
              </Route>
            </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
