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
      background-image: linear-gradient(79deg, #7439db, #C66FBC 48%, #F7944D);
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
    width: 120px;
    height: 60px;
    margin:10px
`;



const ForgotPassword = () => {
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
            const result = await axios.post("http://localhost:8081/user/send_password?email=" + user.email);
            navigate("/");
        } catch (e) {
            window.alert("Doesn't exists an acount with this email.");
        }       
        
       
    };

    const { email, password } = user;

    const onInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };
    return (
        <Container className="auth-form-container">
            <h2>Forgot password</h2>
            <form className="login-form" >
                <Label htmlFor="email">           Complete your email</Label>
                <Input value={user.email} onChange={(e) => onInputChange(e)} type="email" placeholder="youremail@gmail.com" id="email" name="email" />
               
                <div>
                    <Button onClick={(e) => handleSubmit(e)}>Send Email</Button>
                    <Button onClick={(e) => navigate("/")}>Back</Button>
                    
                </div>

            </form>
            

        </Container>
    )
}

export default ForgotPassword;