import React from 'react';
import {Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {actions} from '@c-redux';
import './styles.scss';

export default function TableContent(){
  const listData = useSelector(state => state.listData);
  const loading = useSelector(state => state.loading);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(actions.getContact())
  // },[]);

  return (
    <>
      <h1 className="mb-4 mt-4">Table Content</h1>
      <div className="content row">
        {loading && <p className="text-success">Loading data...</p>}
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
            {listData.map((item,idx) => (
              <tr key={item.id}>
                <th className="column" scope="row">{idx + 1}</th>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td className="column">{item.age}</td>
                <td className="action">
                  <span>
                    <Link to={`/edit/${item.id}`}>
                      <button disabled={loading} className="btn btn-primary">Edit</button>
                    </Link>
                    <button disabled={loading} onClick={() => {
                      dispatch(actions.deleteContact(item.id));
                    }} className="btn btn-danger mx-3">Delete</button>
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