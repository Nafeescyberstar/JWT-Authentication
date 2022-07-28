import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Tabs, Tab, Row, Button, Col, Container, Stack } from "react-bootstrap";
import { Link, useNavigate } from 'react-router-dom'

function Addemployee() {
    const [currentTab, setCurrentTab] = useState(0);
   
    const [addData, setAddData] = useState({
        fname: "",
        lname: "",
        age: "",
        salary: "",
        department: ""
    });
    
    const [validation, setValidation] = useState({
        fname: "",
        lname: "",
        age: "",
        salary: "",
        department: ""
    });

    function handleOnChange(e) {

        const { name, value } = e.target;
        setAddData({ ...addData, [name]: value });
    }

    const checkValidation = () => {

        let errors = JSON.parse(JSON.stringify(validation));
        if (!addData.fname) {
            errors.fname = "First Name is required";
        }


        if (!addData.lname) {
            errors.lname = "Last Name is required";
        }

        if (!addData.age) {
            errors.age = "Age is required";
        }

        if (!addData.salary) {
            errors.salary = "Salary is required";
        }

        if (!addData.department ) {
            errors.department = "department is required";
        }

        setValidation(errors);
    }

    const [deptdetail, setDeptDetails] = useState([]);

    const navigate = useNavigate();

    const saveEmployee = async (e) => {
        checkValidation();
        await axios.post('http://localhost:4000/adduser', {
            fname: addData.fname,
            lname: addData.lname,
            age: addData.age,
            salary: addData.salary,
            department: addData.department

        });
        navigate('/');
    }

    useEffect(() => {
        getDepartment();
    }, [])

    const getDepartment = async () => {
        const response = await axios.get('http://localhost:4000/alldept');
        setDeptDetails(response.data);

    }

    return (
        <>

            <Tabs activeKey={currentTab} id="controlled-tab-example">

                <Tab eventKey={0} title="Personal Info" disabled={currentTab !== 0} className="my-5">

                    <div className="row mb-2">

                        <label for="name" className="col-sm-3 col-form-label">First Name</label>
                        <div className="col-sm-4">
                            <input type="text" className="form-control form-control-sm" value={addData.addfname} name="fname" onChange={(e) => handleOnChange(e)} />
                            {validation.fname && <p>{validation.fname}</p>}
                            {validation.fname && console.log(validation)}
                        </div>

                    </div>
                    <div className="row mb-2">
                        <label for="name" className="col-sm-3 col-form-label">Last Name</label>
                        <div className="col-sm-4">
                            <input type="tex" className="form-control form-control-sm" value={addData.lname} name="lname" onChange={(e) => handleOnChange(e)} />
                            {validation.lname && <p>{validation.lname}</p>}
                            {validation.lname && console.log(validation)}
                        </div></div>

                    <div className="row mb-2">
                        <label for="name" className="col-sm-3 col-form-label">Age</label>
                        <div className="col-sm-4">
                            <input type="text" className="form-control form-control-sm" value={addData.age} name="age" onChange={(e) => handleOnChange(e)} />
                            {validation.age && <p>{validation.age}</p>}
                            {validation.age && console.log(validation)}

                        </div></div>

                </Tab>
                <Tab eventKey={1} title="Official Info" disabled={currentTab !== 1} className="my-5">
                    <div className=" col-10 my-1">
                        <Link to="/adddepartment" className="btn btn-primary btn-sm"><span>Add Department</span></Link>
                    </div>
                    <div className="row mb-2">
                        <label for="name" className="col-sm-3 col-form-label">Salary</label>
                        <div className="col-sm-4">
                            <input type="text" className="form-control form-control-sm" value={addData.salary} name="salary" onChange={(e) => handleOnChange(e)} />
                            {validation.salary && <p>{validation.salary}</p>}
                            {validation.salary && console.log(validation)}
                        </div></div>
                    <div className="row mb-2">
                        <label for="name" className="col-sm-3 col-form-label">Department</label>
                        <div className="col-sm-4">
                            <select name="department" className="form-control form-control-sm" onChange={(e) => handleOnChange(e)}>
                                <option value="default" >
                                    Select Department
                                </option>
                                {deptdetail.map((item, index) => (
                                    <option key={index} value={item._id}>{item.deptname}</option>
                                ))}
                            </select>
                            {validation.department && <p>{validation.department}</p>}
                            {validation.department && console.log(validation)}
                        </div></div>
                    <div className="col-sm-5 offset-sm-2">

                        <input type="submit" className="btn btn-success btn-sm me-4 " onClick={saveEmployee} value="Save" />
                    </div>
                </Tab>
            </Tabs>

            <Stack gap={3} direction="horizontal" className="mt-3">
                <Button className="success me-2" disabled={currentTab === 0}
                    onClick={() => setCurrentTab((prev) => prev - 1)}>
                    Prev
                </Button>
                {
                <Button
                    className="success me-2" disabled={!addData.fname || !addData.lname || !addData.age || currentTab === 1}
                    onClick={() => setCurrentTab((prev) => prev + 1)}>
                    Next
                </Button>}
            </Stack>
        </>
    )
}

export default Addemployee