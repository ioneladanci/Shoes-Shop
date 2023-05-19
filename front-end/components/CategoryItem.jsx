import { mobile } from "../responsive";
import styled from "styled-components";
import React from "react";
import { useNavigate } from "react-router-dom"


const Container = styled.div`
  flex: 1;
  margin: 3px;
  height: 70vh;
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  ${mobile({ height: "10vh" })}
`;

const Info = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
    color:white;
    margin-bottom: 20px;
`;

const Button = styled.button`
    border:none;
    padding: 10px;
    background-color: white;
    color:gray;
    cursor: pointer;
    font-weight: 600;
`;


const CategoryItem = ({ item }) => {
    const navigate = useNavigate();
    
    const onSubmit = async (e) => {
        e.preventDefault();
        if (item.title === "WOMEN") {
            navigate("/home/F");
        }
        else if (item.title === "MEN") {
            navigate("/home/M");
        }
        else if (item.title === "WOMEN Trainers") {
            localStorage.setItem("O1", "http://localhost:8081/product/find1?sex=F&category=Trainers");
            navigate("/home/productList");      
        }
        else if (item.title === "WOMEN BOOTS") {
            localStorage.setItem("O1", "http://localhost:8081/product/find1?sex=F&category=Boots");
            navigate("/home/productList");
        }
        else if (item.title === "WOMEN SANDALS") {
            localStorage.setItem("O1", "http://localhost:8081/product/find1?sex=F&category=Sandals");
            navigate("/home/productList");
        }
        else if (item.title === "MEN Trainers") {
            localStorage.setItem("O1", "http://localhost:8081/product/find1?sex=M&category=Trainers");
            navigate("/home/productList");
        }
        else if (item.title === "MEN BOOTS") {
            localStorage.setItem("O1", "http://localhost:8081/product/find1?sex=M&category=Boots");
            navigate("/home/productList");
        }
        else if (item.title === "MEN SANDALS") {
            localStorage.setItem("O1", "http://localhost:8081/product/find1?sex=M&category=Sandals");
            navigate("/home/productList");
        }

    };

      return (
          <Container>
          <Image src={item.img} />
          <Info>
                  <Title>{item.title}</Title>
                  <Button onClick={(e) => onSubmit(e)} >SHOP NOW</Button>
          </Info>
        </Container>
      );
};

export default CategoryItem;