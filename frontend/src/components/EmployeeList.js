import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';



function EmployeeList() {
  const [empdetails, setEmpdetails] = useState([]);

  useEffect(() => {
    getEmployeeList();
  }, [])

  const getEmployeeList = async (e) => {
    
    const response = await axios.get('http://localhost:4000');
    
    setEmpdetails(response.data);
  }

  const deleteEmp = async(id) =>{
      await axios.delete(`http://localhost:4000/delete/${id}`);
      getEmployeeList();
   
  }

  return (
    <>
      <Navbar/>
      <div className="container bg-success text-light display-6">
        Employee Details
      </div>

      <div className=" my-4">
                <Link to="/add" className="btn btn-warning btn-sm"><span>Add New User</span></Link>
            </div>

      <div className="container table-responsive-sm">
        <Table className="table table-borderless table-hover">
          <thead className="table-dark">
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Age</th>
              <th>Salary</th>
              <th>Department</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {empdetails.map((item, index) => (
              <tr>
                <td>{item.fname}</td>
                <td>{item.lname}</td>
                <td>{item.age}</td>
                <td>{item.salary}</td>
                <td>{item.department.deptname}</td>
                <td>
                <Link to={`/edit/${item._id}`}><button className="btn btn-success btn-sm mx-3">Edit</button></Link>
                  <button onClick={()=> deleteEmp(item._id)} className="btn btn-danger btn-sm">Delete</button>
                </td>
              </tr>

            ))}
          </tbody>
        </Table>
      </div>
    </>
  )
}

export default EmployeeList