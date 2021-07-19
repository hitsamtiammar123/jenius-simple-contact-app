import React, {useState, useEffect} from 'react';
import {useParams, useHistory, useLocation} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {CONST, actions} from  '@c-redux';
import {usePrevious} from '@c/hooks';
import './styles.scss';

export default function FormContent(){
  const params = useParams();
  const listData = useSelector(state => state.listData);
  const loading = useSelector(state => state.loading);
  const action = useSelector(state => state.action);

  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const {id} = params;
  const [type, setType] = useState(id ? 'update' : 'create');
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    age: 0,
  });
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    age: '',
  });
  const prevPathName = usePrevious(location.pathname);
  const prevAction = useParams(action);

  function validate(){
    let countError = 0;
    let listErrors = {...errors};
    const checkDecimalAndWhitespace = /[\s\W]+/;
    if(data.firstName === ''){
      listErrors = {
        ...listErrors,
        firstName: 'First Name must be filled'
      };
      countError++;
    }
    else if(checkDecimalAndWhitespace.test(data.firstName)){
      listErrors = {
        ...listErrors,
        firstName: 'First Name must only contain alphanumeric'
      };
      countError++;
    }
    else{
      listErrors = {
        ...listErrors,
        firstName: ''
      };
    }

    if(data.lastName === ''){
      listErrors = {
        ...listErrors,
        lastName: 'Last Name must be filled'
      };
      countError++;
    }
    else if(checkDecimalAndWhitespace.test(data.lastName)){
      listErrors = {
        ...listErrors,
        lastName: 'Last Name must only contain alphanumeric'
      };
      countError++;
    }
    else{
      listErrors = {
        ...listErrors,
        lastName: ''
      };
    }

    if(data.age === 0){
      listErrors = {
        ...listErrors,
        age: 'Age must not be zero'
      };
      countError++;
    }
    else if(data.age > 100){
      listErrors = {
        ...listErrors,
        age: 'Age must not be larger than 100'
      };
      countError++;
    }
    else{
      listErrors = {
        ...listErrors,
        age: ''
      };
    }

    if(countError === 0){
      return true;
    }
    setErrors(listErrors);
    return false;
  }

  function setValue(key, value){
    setData({
      ...data,
      [key]: value,
    })
  }

  function getDataFromRedux(){
    const currData = listData.find(item => item.id === id);
    if(currData){
      setData(currData);
    }
  }

  function onSubmit(){
    console.log({data, type});
    let action = {};
    if(!validate()){
      return;
    }
    if(type === 'update'){
      action = actions.updateContact(data);
    }
    else if(type === 'create'){
      action = actions.createContact(data);
    }
    dispatch(action);
    // history.push('/');
  }

  useEffect(() => {
    if(listData.length !== 0 && type === 'update'){
      getDataFromRedux();
    }
  },[listData]);

  useEffect(() => {
    if(prevAction !== undefined && prevAction !== action){
      switch(action){
        case CONST.ADD_DATA_SUCCESS:
        case CONST.SET_DATA_SUCCESS:
        case CONST.DELETE_DATA_SUCCESS:
        case CONST.UPDATE_DATA_SUCCESS:
          history.push('/');
        break;
        default:
      }
    }
  }, [prevAction, action]);

  useEffect(() => {
    if(prevPathName !== undefined && prevPathName !== location.pathname){
      if(type === 'update'){
        setType('create');
        setData({
          firstName: '',
          lastName: '',
          age: 0,
        })
      }
      else if(type === 'create'){
        setType('update');
        getDataFromRedux();
      }
      console.log('Masuk ke validasi')
    }
  },[location.pathname, prevPathName]);

  return (
    <>
      <h1 className="mb-4 mt-4">{id ? 'Edit Data' : 'Create New Data'}</h1>
      <div className="mb-5 content-table">
        <div className="form-group mt-4">
          <label htmlFor="firstName" className="mb-3">First Name</label>
          <input type="text" disabled={loading} onChange={(e) => setValue('firstName',e.target.value)} className="form-control" value={data.firstName} id="firstName" aria-describedby="firstName" placeholder="Enter First Name"/>
          <small className="form-text text-danger">{errors.firstName}</small>
        </div>
        <div className="form-group mt-4">
          <label htmlFor="lastName" className="mb-3">Last Name</label>
          <input type="text" disabled={loading} onChange={(e) => setValue('lastName',e.target.value)} className="form-control" value={data.lastName} id="lastName" placeholder="Enter Last Name"/>
          <small className="form-text text-danger">{errors.lastName}</small>
        </div>
        <div className="form-group mt-4">
          <label htmlFor="age" className="mb-3">Age</label>
          <input type="number" disabled={loading} onChange={(e) => setValue('age',Number(e.target.value))} min="1" max="100" className="form-control" value={data.age} id="age" placeholder="Enter Age"/>
          <small className="form-text text-danger">{errors.age}</small>
        </div>
        <button onClick={onSubmit} disabled={loading} className="btn btn-success mt-4">Submit</button>
      </div>
    </>
  );
}