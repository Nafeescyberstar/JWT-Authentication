import React from 'react'
import { useState, useEffect } from 'react'
import axios from "axios";
import { Link, useNavigate, useParams } from 'react-router-dom';

function EditEmployee() {

    const navigate = useNavigate();
    const { id } = useParams();
    const [deptdetail, setDeptDetails] = useState([]);
    const [state, setState] = useState({
        fname: "",
        lname: "",
        age: "",
        salary: "",
        department: ""
    })


    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value });
    };

    const updateEmployee = async (e) => {
       e.preventDefault();
        console.log("checking")
        await axios.patch(`http://localhost:4000/update/${id}`, {
            fname: state.fname,
            lname: state.lname,
            age: state.age,
            salary: state.salary,
            department: state.department
        });
        navigate('/');
    }

    useEffect(() => {
        getEmployeeId();
        getDepartment();
    }, [])

    const getEmployeeId = async (e) => {
        const response = await axios.get(`http://localhost:4000/edit/${id}`);
        setState(response.data)
    }

    const getDepartment = async (e) => {
        const response = await axios.get('http://localhost:4000/alldept');
        setDeptDetails(response.data);
    }

    return (
        <>
            <div className=" container-sm bg-danger  text-white  py-2 my-2 w-50 ">Update Employee Detail</div>
            <div className=" container-sm bg-success mt-0 text-white  py-3 my-5 w-50 ">
                {/* <div class="container-sm bg-dark mt-0 text-white  py-3 my-5 w-50  position-absolute translate-middle "> */}
                <form onSubmit={updateEmployee} className="" >
                    <div className="row mb-2">
                        <label for="name" className="col-sm-3 col-form-label">First Name</label>
                        <div className="col-sm-6">
                            <input type="text" className="form-control " value={state.fname} name="fname" onChange={handleChange} required/>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label for="salary" className="col-sm-3 col-form-label">Last Name</label>
                        <div className="col-sm-6">
                            <input type="text" className="form-control " value={state.lname} name="lname" onChange={handleChange} />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label for="age" className="col-sm-3 col-form-label">Age</label>
                        <div className="col-sm-6">
                            <input type="text" className="form-control " value={state.age} name="age" onChange={handleChange} />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label for="salary" className="col-sm-3 col-form-label">Salary</label>
                        <div className="col-sm-6">
                            <input type="text" className="form-control " value={state.salary} name="salary" onChange={handleChange} />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label for="salary" className="col-sm-3 col-form-label">Department</label>
                        <div className="col-sm-6">
                            <select name="department" className="form-control form-control-sm" onChange={handleChange}>
                                <option>{state.department.deptname}</option>
                                {
                                    deptdetail.map((item, index) => (
                                        <option key={index} value={item._id}>{item.deptname}</option>
                                    ))}
                            </select>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-5 offset-sm-2">
                            <button type="submit" className="btn btn-primary btn-sm me-4">Update</button>
                            <Link to="/"><button type="submit" className="btn btn-warning btn-sm">Home</button></Link>
                        </div>
                    </div>
                </form>

            </div>
        </>
    )
}

export default EditEmployee