import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import axios from "axios";

const FilterContainer = styled.div`
  display: flex;
  padding: -10px 0px;

  justify-content: space-between;
`;

export default function Navbar() {
    const navigate = useNavigate();

    const logout = async () => {
        localStorage.setItem("refresh", localStorage.getItem("refresh") - 1);
       
        const user = localStorage.getItem("user");
        await axios.put("http://localhost:8081/user/logout?email=" + user);    
        navigate("/");
    }

    const getWishListsReport = async () => {
        const user = localStorage.getItem("user");
        alert("wait a few moments");

        try {
            const users = await axios.get("http://localhost:8081/user/report?reportType=wishlist&email=" + user);

            alert("The Wishlists report was sent on email");

        } catch (excepetion) {
            alert("We have a problem with email service, try later.");
        }
        
    }

    const getCartsReport = async () => {
        const user = localStorage.getItem("user");
        alert("wait a few moments");
        
        try {
            const users = await axios.get("http://localhost:8081/user/report?reportType=cart&email=" + user);

            alert("The cart report was sent on email");

        } catch (excepetion) {
            alert("We have a problem with email service, try later.");
        }
    }



    return (
        <div>
            <nav className="container3">
                <div className="container-fluid">
                    <button className="button" onClick={() => logout()}>
                        Shoes Store Admin
                    </button>

                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <button className="button" onClick={() => logout()}>
                        Logout
                    </button>
                    
                    <FilterContainer>
                        <Link className="btn2" to="/homeAdmin/addproduct">
                            Add Product
                        </Link>
                        <Link className="btn2" to="/homeAdmin/users">
                            View Users
                        </Link>
                        <Link className="btn2" to="/ChatAdmin">
                            Forum
                        </Link>

                        <Link className="btn2" to="/HomeAdmin">
                            Home
                        </Link>
                        <button className="btn2" onClick={() => getWishListsReport()}>
                            Wishlists Report
                        </button>

                        <button className="btn2" onClick={() => getCartsReport()}>
                            Carts report
                        </button>
                    </FilterContainer>   
                </div>
            </nav>
            
        </div>
    );
}