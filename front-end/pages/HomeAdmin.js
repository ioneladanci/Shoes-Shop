import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import NavbarAdmin from "../components/NavbarAdmin";

export default function Home() {
    const [product, setProducts] = useState([]);

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        const result = await axios.get("http://localhost:8081/product/all_products");
        setProducts(result.data);
    };

    const deleteProduct = async (id) => {
        await axios.delete(`http://localhost:8081/product/${id}`);
        loadProducts();
    };

    return (
         
        <div className="container">
            <NavbarAdmin />
            <div className="container2">
                <table className="table border shadow">
                    <thead>
                        <tr>
                            <th scope="col">S.N</th>
                            <th scope="col">Name</th>
                            <th scope="col">Category</th>
                            <th scope="col">Brand</th>
                            <th scope="col">Sex</th>
                            <th scope="col">Price</th>
                            <th scope="col">Picture Url</th>
                        </tr>
                    </thead>
                    <tbody>
                        {product.map((product, index) => (
                            <tr>
                                <th scope="row" key={index}>
                                    {index + 1}
                                </th>
                                <td>{product.name}</td>
                                <td>{product.category}</td>
                                <td>{product.brand}</td>
                                <td>{product.sex}</td>
                                <td>{product.price}</td>
                                <td>{product.pictureUrl}</td>
                                <td>
                                    <Link
                                        className="btn btn-primary mx-2"
                                        to={`/homeAdmin/viewProduct/${product.id}`}
                                    >
                                        View
                                    </Link>
                                    <Link
                                        className="btn btn-outline-primary mx-2"
                                        to={`/homeAdmin/editProduct/${product.id}`}
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        className="btn btn-danger mx-2"
                                        onClick={() => deleteProduct(product.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}