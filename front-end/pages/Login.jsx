import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom"
import axios from "axios";
import UsersTable from "./UsersTable";


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
  border-radius: 20px;
  cursor: pointer;
  color: #7439db;
    width: 100px;
        height: 60px;
    margin:10px
`;



const Login = () => {
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
        let r = Math.random();
        try {
            console.log(user.email);
            console.log(user.password);
            const result = await axios.put("http://localhost:8081/user/login", user);
            //setUser(result.data);

            localStorage.setItem("user", user.email);
            localStorage.setItem("refresh", user.email);
            localStorage.setItem("currency", "imlicit");

            
            navigate("/home");
            
        }
        catch (error) {
            mess = "Wrong Email & password"
            window.alert(mess);
            
        }
       
    };
    const onAdmin = async (e) => {
        e.preventDefault();
        let r = Math.random();
        try {
            console.log(user.email);
            console.log(user.password);
            await axios.put("http://localhost:8081/user/loginAdmin", user);
            localStorage.setItem("user", user.email);
            localStorage.setItem("refresh", user.email);
            navigate("/homeAdmin");
            
           
        }
        catch (error) {
            mess = "Wrong Email & password"
            window.alert(mess);
        }
    };
    const { email, password } = user;

    const onInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };
    return (
        <Container className="auth-form-container">
            <h2>Login</h2>
            <form className="login-form" >
                <Label htmlFor="email">email</Label>
                <Input value={user.email} onChange={(e) => onInputChange(e)} type="email" placeholder="youremail@gmail.com" id="email" name="email" />
                <Label htmlFor="password">password</Label>
                <Input value={user.password} onChange={(e) => onInputChange(e)} type="password" placeholder="********" id="password" name="password" />
               
                <div>
                    <Button type="submit" onClick={(e) => handleSubmit(e)}>Log In</Button>
                    
                    <Button type="admin" onClick={(e) => onAdmin(e)}>ADMIN</Button>
                   </div>

            </form>
            <button className="link-btn" onClick={() => navigate("/register")}>Don't have an account? Register here.</button>
            <button className="link-btn" onClick={() => navigate("/ForgotPassword")}>Forgot your password?</button>
            
        </Container>
    )
}

export default Login;