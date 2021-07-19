import React from 'react';
import {useParams} from 'react-router-dom';
import './styles.scss';

export default function FormContent(){
  const params = useParams();
  const {id} = params;
  return (
    <>
      <h1 className="mb-4 mt-4">{id ? 'Edit Data' : 'Create New Data'}</h1>
      <div className="mb-5 content-table">
        <div class="form-group mt-4">
          <label for="firstName" className="mb-3">First Name</label>
          <input type="text" class="form-control" id="firstName" aria-describedby="firstName" placeholder="Enter First Name"/>
        </div>
        <div class="form-group mt-4">
          <label for="lastName" className="mb-3">Last Name</label>
          <input type="text" class="form-control" id="lastName" placeholder="Enter Last Name"/>
        </div>
        <div class="form-group mt-4">
          <label for="age" className="mb-3">Age</label>
          <input type="number" min="1" class="form-control" id="age" placeholder="Enter Age"/>
        </div>
        <button className="btn btn-success mt-4">Submit</button>
      </div>
    </>
  );
}