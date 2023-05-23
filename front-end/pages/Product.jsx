import styled from "styled-components";
import { mobile } from "../responsive";
import axios from "axios";


const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  width: 100%;
  height: 30%;
  ${mobile({ padding: "10px", flexDirection: "column" })}
`;

const ImgContainer = styled.div`
  flex: 1;
  width: 50%;
  height: 30%;
`;

const Image = styled.img`
  width: 70%;
  object-fit: cover;
  ${mobile({ height: "40vh" })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 10px;
  width: 60%;
  height: 50%;
  ${mobile({ width: "40vh" , height: "10%" })}
`; 

const Title = styled.h1`
  font-weight: 100px;
  font-size: 20px;
  padding: 10px 20px;
`;

const Desc = styled.p`
  margin: 20px 0px;
padding: 10px 20px;
`;

const Price = styled.span`
  font-weight: 50;
  font-size: 30px;
padding: 10px 30px;
`;

const AddContainer = styled.div`
  width: 70%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
padding: 40px 20px;
`;

const Button = styled.button`
  padding: 10px;
  border: 1px solid gray;
  background-color: white;
  cursor: pointer;
  color:gray;
  margin: 1px 5px;
  font-weight: 700;
`;

const Product = ({ product})  => {
   
   
    let c = "";
   

    const addToFav = async () => {
        const userEmail = localStorage.getItem("user");

        await axios.post("http://localhost:8081/wishlist?email=" + userEmail + "&productId=" + product.id);
        alert("Product added to wishlist");
    };

    const addToCart = async () => {
        const userEmail = localStorage.getItem("user");

        await axios.post("http://localhost:8081/cart/add_to_cart?email=" + userEmail, {
            "productId": product.id,
            "quantity": 1
        });
        alert("Product added to cart");       
    };
   
    return (
        <Container>
            
            <Wrapper>
                <ImgContainer>
                    <Image src={product.pictureUrl} />
                </ImgContainer>
                <InfoContainer>
                    <Title>{product.name}</Title>
                    <Desc>
                        Brand: {product.brand}
                    </Desc>
                    <Price>{product.price}</Price>
                    <AddContainer>
                        <Button onClick={() => addToFav(product.id)}>ADD TO WISHLIST   </Button>
                        <Button onClick={() => addToCart(product.id)}>ADD TO CART  </Button>
                        <div>{ c}</div>
                    </AddContainer>
                </InfoContainer>
            </Wrapper>
          
           
        </Container>
    );
};

export default Product;