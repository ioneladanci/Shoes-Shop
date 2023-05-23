import styled from "styled-components";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { mobile } from "../responsive";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Product from "../pages/Product";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  flex: 1;
  padding: 0px 10px;
  width: 100%;
  height: 80%;
  ${mobile({ width: "40vh", height: "10%" })}
`;

const Title = styled.h1`
  margin: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  padding: 20px 0px;

  justify-content: space-between;
`;

const FilterContainer2 = styled.div`
  display: flex;
  padding: 0px 0px;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 10px;
  ${mobile({ width: "0px 10px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({ margin: "10px 0px" })}
`;
const Option = styled.option``;


const Button = styled.button`
  padding: 10px;
  border: none;
  background-color: white;
  cursor: pointer;
  color:gray;
  margin: 1px 5px;
  font-weight: 700;
`;

const ProductList = () => {
    const [product, setProducts] = useState([]);
    const navigate = useNavigate();

    const [selectedCategory1, setSelectedCategory1] = React.useState('');
    const [selectedCategory2, setSelectedCategory2] = React.useState('');
 
    let result = "";
    let link = "";

    let message = localStorage.getItem("O2");

    useEffect(() => {
        loadProducts();
    }, [message]);
 

    link = localStorage.getItem("O1");
    const handleChange2 = async (event) => {
        localStorage.setItem("currency", event.target.value);
        loadProducts();
        window.location.reload();
    }
    const handleChange = async (event) => {
        
        if (event.target.value != "asc" && event.target.value != "desc" && event.target.value != "newest") {
            setSelectedCategory1(event.target.value);
            if (event.target.value != "None") {
                let ll = link.replace("find1", "find2");
                link = ll + "&brand=" + event.target.value;
            }
            if (selectedCategory2 === "asc") {
                let l = link.replace("find1", "find5");
                let l1 = l.replace("find2", "find3");
                link = l1;
            }
            else if (selectedCategory2 === "desc") {
                let l = link.replace("find1", "find6");
                let l1 = l.replace("find2", "find4");
                link = l1;
            }
        }
        else if (selectedCategory1 != "None" && selectedCategory1 != "") {
            let ll = link.replace("find1", "find2");
            link = ll + "&brand=" + selectedCategory1;
        }
        if (event.target.value === "asc") {
            setSelectedCategory2(event.target.value);
            let l = link.replace("find1", "find5");
            let l1 = l.replace("find2", "find3");
            link = l1;
        }
        else if (event.target.value === "desc") {
            setSelectedCategory2(event.target.value);
            let l = link.replace("find1", "find6");
            let l1 = l.replace("find2", "find4");
            link = l1;
        }
        loadProducts(event);
    }


    
    const loadProducts = async () => {
        result = await axios.get(link);
        let currency = localStorage.getItem("currency");
        let products = result.data;
        let price = 0;
        console.log(products);
        console.log("-----");
        console.log(products.length);
        for (let i = 0; i < products.length; i++) {
            console.log("-----");
            console.log(products[i].price);

            if (currency == "RON") {
                price = (products[i].price * 4.47).toFixed(2) + " RON";
            }
            else {
                price = products[i].price + " $";
            }
            products[i].price = price;
        }
        setProducts(result.data);

    };

    return (
        <Container>

            <Navbar onHandleKeyDown={() => loadProducts()} />

            <FilterContainer>
                <Button onClick={() => navigate("/home")} >Home</Button>
                <Button onClick={() => navigate("/home/M")} >Men Fashion</Button>
                <Button onClick={() => navigate("/home/F")} >Women Fashion</Button>
                <Button onClick={() => navigate("/home/cart")} >Cart</Button>
                <Button onClick={() => navigate("/home/wishlist")} >Wishlist</Button>
            </FilterContainer>
            <Title></Title>
            <FilterContainer2>
                <Filter>
                    <FilterText>Filter Brand:</FilterText>
                    <Select onChange={(e) => handleChange(e)}>
                        <Option >
                            None
                        </Option>
                        <Option value="Nike">Nike</Option>
                        <Option value="Adidas">Adidas</Option>
                        <Option value="New Balance">New Balance</Option>
                        <Option value="Converse">Converse</Option>
                        <Option value="Dr Martens">Dr Martens</Option>
                        <Option value="UGG">UGG</Option>
                        <Option value="Be Mine Wide Fit">Be Mine Wide Fit</Option>
                        <Option value="ASOS">ASOS</Option>
                        <Option value="Topshop">Topshop</Option>
                        <Option value="Public Desire Wide Fit">Public Desire Wide Fit</Option>
                        <Option value="Office cleated chelsea">Office cleated chelsea</Option>
                        <Option value="Barbour">Barbour</Option>
                        <Option value="New Look">New Look</Option>
                        <Option value="CAT">CAT</Option>
                    </Select>
                   
                </Filter>
                <Filter>
                    <FilterText>Sort Products:</FilterText>
                    <Select  onChange={(e) => handleChange(e)}>
                        <Option value="newest" selected>Newest</Option>
                        <Option value="asc">Price (asc)</Option>
                        <Option value="desc">Price (desc)</Option>
                    </Select>
                </Filter>
                <Filter>
                    <FilterText>Currency</FilterText>
                    <Select onChange={(e) => handleChange2(e)}>
                        <Option >
                            {localStorage.getItem("currency")}
                        </Option>
                        
                        <Option value="$">$</Option>
                        <Option value="RON">RON</Option>
                    </Select>

                </Filter>
            </FilterContainer2>
            <Container>
                {product.map((product) => (
                    <Product product={product} key={product.id} />
                ))}
            </Container>
            <Footer />
        </Container>
    );
};

export default ProductList;