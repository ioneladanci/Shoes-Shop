import styled from "styled-components";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Container = styled.div`

`;
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

const WishList = () => {
    const [product, setProducts] = useState([]);
    const user = localStorage.getItem("user");
    const navigate = useNavigate();

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        const result = await axios.get("http://localhost:8081/wishlist/get_wishlist?email=" + user);
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

    const deleteProduct = async (id) => {
        await axios.delete("http://localhost:8081/wishlist/delete_from_wishlist?email=" +user +"&productId=" + id);
        loadProducts();
    };

    const addToCart = async (id) => {
        const userEmail = localStorage.getItem("user");

        await axios.post("http://localhost:8081/cart/add_to_cart?email=" + userEmail, {
            "productId": id,
            "quantity": 1
        });
        alert("Product added to cart");

    };

    return (
        <Container>
            <Navbar />
            <Wrapper>
                <Title>YOUR WISHLIST</Title>
                <Top>
                    <TopButton onClick={() => navigate("/home")}>CONTINUE SHOPPING</TopButton>
                </Top>

                <Bottom>
                    <Container>
                        {product.map((product) => (
                            <Info>
                                <Product>
                                    <ProductDetail>
                                        <Image src={product.pictureUrl} />
                                        <Details>
                                            <ProductName>
                                                <b>Product:</b> {product.name}
                                            </ProductName>
                                            <ProductId>
                                                <b>product Id {product.id}:</b> 
                                            </ProductId>
                                            <ProductSize>
                                                <b>Size:</b> 
                                            </ProductSize>
                                        </Details>
                                    </ProductDetail>
                                    <PriceDetail>
                                        
                                        <ProductPrice> {product.price}</ProductPrice>
                                    </PriceDetail>
                                    <button 
                                         onClick={() => deleteProduct(product.id)}> Delete  </button>
                                    <button  onClick={() => addToCart(product.id)}>ADD TO CART</button>
                                </Product>
                                <Hr />

                            </Info>

                        ))}
                    </Container>
                </Bottom>
            </Wrapper>
            <Footer />
        </Container>
    );
};

export default WishList;