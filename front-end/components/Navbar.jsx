import React, { useState } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UsersTable from "../pages/UsersTable";


const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  width: 60%;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
  width: 60%;
  ${mobile({ flex: 0.5, justifyContent: "center" })}
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
  width: 100%;
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;


const Button = styled.button`
  padding: 10px;
  border: none;
  background-color: white;
  cursor: pointer;
  color:gray;
  margin: 1px 5px;
  font-weight: 700;
`;

const Navbar = () => {
    const [message, setMessage] = useState('');

    const handleChange = (event) => {
        setMessage(event.target.value);
    };

    const navigate = useNavigate();

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            localStorage.setItem("O1", "http://localhost:8081/product/findByNameLike?name=" + message);
            setTimeout(function () {
                console.log("Two");
            }, 10);
            localStorage.setItem("O2", message);
            navigate("/home/productList");
        }
        
    };

    const logout = async () => {
        
        localStorage.setItem("refresh", localStorage.getItem("refresh") - 1);
        const user = localStorage.getItem("user");
        localStorage.setItem("refresh", user.email + "logout");
        await axios.put("http://localhost:8081/user/logout?email=" + user);
        setTimeout(function () {
            console.log("Two");
        }, 30);
        navigate("/");
        UsersTable.setState();
    }

    return (
        <Container>
            <Wrapper>
                <Left>
                    <Language>EN</Language>
                    <SearchContainer>
                        <Input 
                            type="text"
                            id="message"
                            name="message"
                            value={message}
                            onChange={handleChange}
                            onKeyDown={handleKeyDown} />
                         
                        <div style={{ color: "gray", fontSize: 10 }} />
                    </SearchContainer>
                </Left>
                <Center>
                    <Logo>Shoes Shop.</Logo>
                </Center>
                <Right>
                    <Button onClick={() => navigate("/ChatUser")} >Forum</Button>
                    <Button onClick={() => logout()} >SIGN OUT</Button>

                    <MenuItem>
                        <div badgeContent={4} color="primary">
                            <div />
                        </div>
                    </MenuItem>
                </Right>
            </Wrapper>          
        </Container>

    );
};

export default Navbar;