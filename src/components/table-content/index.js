import React from 'react';
import {Link} from 'react-router-dom';
import './styles.scss';

export default function TableContent(){
  return (
    <>
      <h1 className="mb-4 mt-4">Table Content</h1>
      <div className="content row">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Age</th>
              <th scopr="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {Array.from(Array(10)).map((i,idx) => (
              <tr key={idx}>
                <th className="column" scope="row">{idx + 1}</th>
                <td >Mark</td>
                <td >Otto</td>
                <td className="column">10</td>
                <td className="action">
                  <span>
                    <Link to={`/edit/${idx + 1}`}>
                      <button className="btn btn-primary">Edit</button>
                    </Link>
                    <button className="btn btn-danger mx-3">Delete</button>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}