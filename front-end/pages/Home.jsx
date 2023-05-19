import React from "react";
import Categories1 from "../components/Categories1";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";


const Home = () => {
    return (
        <div>          
            <Navbar />
            <Categories1 />           
            <Footer />
        </div>
    );
};

export default Home;