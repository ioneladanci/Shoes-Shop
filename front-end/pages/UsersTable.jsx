import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import NavbarAdmin from "../components/NavbarAdmin";
import styled from "styled-components";
import { mobile } from "../responsive";

const Container = styled.div`
  flex: 1; 
  padding: 0px 10px;
  width: 100%;
  height: 80%;
  ${mobile({ width: "40vh", height: "10%" })}
`;


export default function  UsersTable ()  {
    const [user, setUsers] = useState([]);
    let r = localStorage.getItem("refresh");
    let result = "";
    


   /* const interval = setInterval(() => {
        loadUsers();
    }, 5000); //set your time here. repeat every 5 seconds
*/
    useEffect(() => {
        localStorage.setItem("loc", window.location);
        loadUsers();
    }, [r]);

    const loadUsers = async () => {
        result = await axios.get("http://localhost:8081/user/all_users");     
        for (let i = 0; i < result.data.length; i++) {          
            if (result.data[i].loged === true) {
                result.data[i].loged = "yes";
            } else {
                result.data[i].loged = "no";
            }
        }
        setUsers(result.data);
    };


    return (
        <Container>
            <div className="container">

                <NavbarAdmin />
                <div className="container2">
            <div className="py-4">
                <table className="table border shadow">
                    <thead>
                        <tr>
                            <th scope="col">Email</th>
                            <th scope="col">Role</th>
                            <th scope="col">Logged</th>
                        </tr>
                    </thead>
                    <tbody>
                        {user.map((user, index) => (
                            <tr> 
                                <td bgcolor="green">{user.email}</td>
                                <td>{user.role}</td>
                                <td>{user.loged}</td>
                       </tr>
                        ))}
                    </tbody>
                </table>
                    </div>
                </div>
            </div>
            </Container>
    );
}

