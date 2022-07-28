import React, { useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'

function AddDepartment() {
    const [department, setDepartment] = useState();
    const [isChecked, setIsChecked] = useState(false);

    const navigate = useNavigate();
    
  const handleOnChange = () => {
    setIsChecked(!isChecked);
  };

  const saveDepartment = async () => {
   
    await axios.post('http://localhost:4000/adddept', {
       deptname:department,
       status:isChecked

    });
    navigate('/');
}
    return (
        <>
            <div className="row mb-2 my-4">

                <label for="name" className="col-sm-3 col-form-label">Department Name</label>
                <div className="col-sm-4">
                    <input type="text" className="form-control form-control-sm" value={department} name="department" onChange={(e) => setDepartment(e.target.value)} />

                </div>

            </div>
            <div className="row mb-2">

                <label for="name" className="col-sm-3 col-form-label">Active</label>
                <div className="col-sm-4">
                    <input type="checkbox" checked={isChecked} onChange={handleOnChange} name="status"/>

                </div>

            </div>
            <div className="col-sm-5 offset-sm-2">
                <input type="submit" className="btn btn-success btn-sm me-4 " onClick={saveDepartment} value="Save" />
            </div>

        </>
    )
}

export default AddDepartment