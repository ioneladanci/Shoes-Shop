import { categories1 } from "../data";
import { mobile } from "../responsive";
import CategoryItem from "./CategoryItem";
import styled from "styled-components";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Container = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;
  ${mobile({ padding: "1px", flexDirection: "line" })}
`;

const Categories1 = () => {
    return (
        <div>          
            <Navbar />             
        <Container>
            {categories1.map((item) => (
                <CategoryItem item={item} key={item.id} />
            ))}
            </Container>
            <Footer />
        </div >
    );
};

export default Categories1;