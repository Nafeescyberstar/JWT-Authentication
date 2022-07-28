import React, { useState } from 'react'
import axios from 'axios';

import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {Form,Button, Container, Row,Col} from 'react-bootstrap';


function Login(props) {
    
    
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [login,setLogin] = useState(false);
    const navigate = useNavigate();
    const handleSubmit = async(e) => {
        // prevent the form from refreshing the whole page
        e.preventDefault();
        await axios.post('http://localhost:4000/login',{
            email:email,
            password:password
        })
        .then((result) => {
            setLogin(result.data.message);
            props.setAuth(result.data.token);
            navigate('/')
          }
          )
          .catch((error) => {
            setLogin(error.response.data.message);
            console.log(error.response.data.message)
            error = new Error();
          });
        
      }

  return (
    <>
     <Container>
            <Row>
            <Col>
    <h2>Sign In</h2>
    <Form onSubmit={(e)=>handleSubmit(e)}>
     <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={email}
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        {/* password */}
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}

          />
        </Form.Group>
        <Button className='my-1 btn-sm'
          variant="primary"
          type="submit"
          onClick={(e) => handleSubmit(e)}
        >
          Login
        </Button>
        <Link to="/register"><Button className="my-2 btn-success btn-sm mx-2">Register</Button></Link>
        </Form>
       
        <p className='bg-dark text-white'>{login}</p>
        </Col>
        </Row>
        </Container>
    </>
  )
}

export default Login