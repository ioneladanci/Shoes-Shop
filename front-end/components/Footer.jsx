import { mobile } from "../responsive";
import styled from "styled-components";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"


const Container = styled.div`
  display: flex;
  ${mobile({ flexDirection: "column" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Logo = styled.h1``;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Center = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ display: "none" })}
`;

const Title = styled.h3`
  margin-bottom: 30px;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;

const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
  cursor: pointer;
`;

const Footer = () => {
    const navigate = useNavigate();
    return (
        <Container>
            <Left>
                <Logo>SHOES SHOP.</Logo>
                <Desc>
                </Desc>
            </Left>
            <Center>
                <Title>Useful Links</Title>
                <List>
                    <ListItem onClick={() => navigate("/home")} >Home</ListItem>
                    <ListItem onClick={() => navigate("/home/cart")}>Cart</ListItem>
                    <ListItem onClick={() => navigate("/home/M")}>Man Fashion</ListItem>
                    <ListItem onClick={() => navigate("/home/F")}>Woman Fashion</ListItem>
                    <ListItem>My Account</ListItem>             
                    <ListItem onClick={() => navigate("/home/wishlist")}>Wishlist</ListItem>
                    <ListItem>Terms</ListItem>
                </List>
            </Center>
            
        </Container>
    );
};

export default Footer;