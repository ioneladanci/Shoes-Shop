import { categoriesM } from "../data";
import { mobile } from "../responsive";
import CategoryItem from "./CategoryItem";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Container = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;
  ${mobile({ padding: "1px", flexDirection: "column" })}
`;

const CategoriesM = () => {
    return (
        <div>
            <Navbar />
            <Container>
                {categoriesM.map((item) => (
                    <CategoryItem item={item} key={item.id} />
                ))}             
            </Container>
            <Footer />
        </div>
    );
};

export default CategoriesM;