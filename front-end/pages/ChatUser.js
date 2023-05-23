import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ChatRoom from "./ChatRoom";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";


const FilterContainer = styled.div`
  display: flex;
  padding: 20px 0px;

  justify-content: space-between;
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


export default function ChatAdmin() {
    const navigate = useNavigate();

    return (

        <div className="container1">

            <Navbar />
            <FilterContainer>
                <Button onClick={() => navigate("/home")} >Home</Button>
                <Button onClick={() => navigate("/home/M")} >Men Fashion</Button>
                <Button onClick={() => navigate("/home/F")} >Women Fashion</Button>
                <Button onClick={() => navigate("/home/cart")} >Cart</Button>
                <Button onClick={() => navigate("/home/wishlist")} >Wishlist</Button>
            </FilterContainer>
            <ChatRoom />
            
        </div>

    );

}