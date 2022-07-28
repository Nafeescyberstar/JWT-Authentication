
import './App.css';
import Addemployee from './components/Addemployee';
import EmployeeList from './components/EmployeeList';
import AddDepartment from './components/AddDepartment';
import { Routes, Route, Navigate } from "react-router-dom";
import EditEmployee from './components/EditEmployee';
import Register from './components/Register';
import Login from './components/Login';

import { useEffect,useState } from 'react';



function App() {
 const [isAuthenticated,setIsAuthenticated] = useState(()=>JSON.parse(localStorage.getItem('token'))||false);

 const setAuth = (value)=>{
  setIsAuthenticated(value);
 }
 console.log(isAuthenticated)
 useEffect(()=>{
  localStorage.setItem("token",JSON.stringify(isAuthenticated));
 },[isAuthenticated]);
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={isAuthenticated ? <EmployeeList/> : <Navigate to="/login" replace/>}></Route>
        <Route path="/add" element={isAuthenticated ? <Addemployee/> : <Navigate to="/login" replace/>}></Route>
        <Route path="/adddepartment" element={isAuthenticated ? <AddDepartment/>:<Navigate to="/login" replace/>}></Route>
        <Route path="/edit/:id" element={isAuthenticated ? <EditEmployee/>: <Navigate to="/login" replace/>}></Route>
        <Route path="register" element={<Register/>}></Route>
        <Route path="login" element={<Login setAuth={setAuth}/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
