import styled from "styled-components";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { json, useNavigate } from "react-router-dom";

const Container = styled.div``;


const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
        props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;

const Cart = () => {
    const [product, setProducts] = useState([]);
    const [items, setItems] = useState([]);
    const navigate = useNavigate();
    const user = localStorage.getItem("user");

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        const result = await axios.get("http://localhost:8081/cart/list_cart_items?email=" + user);
        let itemList = result.data;
        let products = [];
        let price = 0;
        let totalPrice = 0;
        let currency = localStorage.getItem("currency");
        console.log(result.data.cartItems[0].product);
        if (currency == "RON") {
            totalPrice = (itemList.totalCost * 4.47).toFixed(2) + " RON"
        }
        else {
            totalPrice = itemList.totalCost + " $"
        }
        for (let i = 0; i < result.data.cartItems.length; i++) {
            if (currency == "RON") {
                price = (result.data.cartItems[i].product.price * 4.47).toFixed(2) + " RON";
            }
            else {
                price = result.data.cartItems[i].product.price + " $";
            }
            result.data.cartItems[i].product.price = price;
            products.push(result.data.cartItems[i]);

        }
        itemList.totalCost = totalPrice;
        console.log(totalPrice);
        setItems(itemList);
        setProducts(products);
    };

    const deleteProduct = async (id) => {
        await axios.delete("http://localhost:8081/cart/delete_product?email=" +user + "&productId="+id);
        loadProducts();
    };

    const sendEmail = async () => {
        await axios.post("http://localhost:8081/cart/send_email?email=" + user);
       
        loadProducts();
    };

    return (
        <Container>
            <Navbar />
       
            <Wrapper>
                <Title>YOUR BAG</Title>
                <Top>
                    <TopButton onClick={() => navigate("/home")}>CONTINUE SHOPPING</TopButton>
                   
                </Top>
                
                <Bottom>
                    <Container>
                        {product.map((product) => (
                            <Info>
                            <Product>
                                    <ProductDetail>
                                        <Image src={product.product.pictureUrl} />
                                <Details>
                                    <ProductName>
                                         <b>Product:</b> {product.product.name}
                                    </ProductName>
                                    <ProductId>
                                                <b> product id: {product.product.id}</b> 
                                    </ProductId>
                                    <ProductSize>
                                        <b>Size:</b> 
                                    </ProductSize>
                                </Details>
                            </ProductDetail>
                            <PriceDetail>
                                <ProductAmountContainer>

                                            <ProductAmount>quantity {product.quantity}</ProductAmount>
                                    
                                        </ProductAmountContainer>
                                        <ProductPrice> {product.product.price}</ProductPrice>
                                    </PriceDetail>
                                    <button onClick={() => deleteProduct(product.product.id)}>Delete</button>
                        </Product>
                                <Hr />
                               
                    </Info>
                    
                        ))}
                       
                    </Container>
                    
                </Bottom>
                <Summary>
                    <SummaryTitle>ORDER SUMMARY</SummaryTitle>

                    <SummaryItem type="total">
                        <SummaryItemText>Total</SummaryItemText>
                        <SummaryItemPrice> {items.totalCost }</SummaryItemPrice>
                    </SummaryItem>
                    <Button onClick={() => sendEmail()}>CHECKOUT NOW</Button>
                    
                </Summary>
            </Wrapper>

            <Footer />
        </Container>
    );
};

export default Cart;