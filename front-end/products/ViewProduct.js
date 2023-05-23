import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"; 
import NavbarAdmin from "../components/NavbarAdmin";

export default function ViewProduct() {
    const [product, setProduct] = useState({
        name: "",
        category: "",
        brand: "",
        sex: "",
        price: "",
        pictureUrl: "",
    });

    const { id } = useParams();


    useEffect(() => {
        loadProduct();
    }, []);


    const loadProduct= async () => {
        const result = await axios.get(`http://localhost:8081/product/${id}`);
        setProduct(result.data);
    };

    return (
        <div className="container">
            <NavbarAdmin />
            <div className="container2">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">Product Details</h2>

                    <div className="card">
                        <div className="card-header">
                            Details of product id : {product.id}
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">
                                    <b>Name:</b>
                                    {product.name}
                                </li>
                                <li className="list-group-item">
                                    <b>Category:</b>
                                    {product.category}
                                </li>
                                <li className="list-group-item">
                                    <b>Brand:</b>
                                    {product.brand}
                                </li>
                                <li className="list-group-item">
                                    <b>Sex:</b>
                                    {product.sex}
                                </li>
                                <li className="list-group-item">
                                    <b>Price:</b>
                                    {product.price}
                                </li>
                                <li className="list-group-item">
                                    <b>Picture Url:</b>
                                    {product.pictureUrl}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <Link className="btn btn-primary my-2" to={"/homeAdmin"}>
                        Back to Home
                    </Link>
                </div>
                </div>
            </div>
        </div>
    );
}