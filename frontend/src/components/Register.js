import React,{useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {Form,Button, Container, Row,Col} from 'react-bootstrap';
function Register() {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [register,setRegister] = useState(false);
    
    const handleSubmit = async (e) =>{
        e.preventDefault();
        await axios.post('http://localhost:4000/register',{
            email:email,
            password:password
        }).then((result) => { 
            setRegister(true)})
            
        .catch((error)=>{
            setRegister(error.response.data.message)
            error = new Error();
        });
        
    }
    return (
        <>
        <Container>
            <Row>
            <Col>
            <h2>Register</h2>
            <Form onSubmit={handleSubmit}>
                {/* email */}
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name="email" value={email} size="sm" placeholder="Enter email" onChange={(e)=>setEmail(e.target.value)} />
                
                </Form.Group>

                {/* password */}
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" value={password} size="sm" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />
                </Form.Group>

                {/* submit button */}
                <Button variant="primary" type="submit" className="btn-sm mx-2" onClick={handleSubmit}>
                  Register
                </Button>
                <Link to="/login"><Button className="my-2 btn-success btn-sm">Sign In</Button></Link>
            </Form>
            <p className='bg-dark text-white'>{register}</p>
            </Col>
            </Row>
            </Container>
            
        </>
    )
}

export default Register