import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom"
import axios from "axios";

const Container = styled.div`
    text-align: center;
      display: flex;
      min-height: 100vh;
      align-items: center;
      justify-content: center;
      color: white;
      background-color: burlywood;

`;

const Input = styled.input`
    margin: 0.5rem 0;
     padding: 1rem;
      border: none;
      border-radius: 15px;
`;

const Label = styled.label`
    text-align: left;
    padding: 1.25rem 0;
`;

const Button = styled.button`
    border: none;
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  cursor: pointer;
  color: #7439db;
`;


const Register = () => {
    const navigate = useNavigate();
    let mess = "";

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email); 
        onSubmit(e);
    }
    const [user, setUser] = useState({
        email: "",
        password: ""
    });
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(user.email);
            console.log(user.password);
            await axios.put("http://localhost:8081/user/register", user);
            
            localStorage.setItem("user", user.email);
            localStorage.setItem("refresh", user.email);
            navigate("/home");
        }
        catch (error) {
            mess = "Invalid Email & password"
            window.alert(mess);
        }
    };
   
    const { email, password } = user;

    const onInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    return (
        <Container className="auth-form-container">
            <h2>Register</h2>
            <form className="register-form" onSubmit={handleSubmit}>
                <Label htmlFor="email">email</Label>
                <Input value={user.email} onChange={(e) => onInputChange(e)} type="email" placeholder="youremail@gmail.com" id="email" name="email" />
                <Label htmlFor="password">password</Label>
                <Input value={user.password} onChange={(e) => onInputChange(e)} type="password" placeholder="********" id="password" name="password" />
                <Button type="submit">Register</Button>
            </form>

            <button className="link-btn" onClick={() => navigate("/")}>Already have an account? Login here.</button>
        </Container>
    )
}

export default Register;