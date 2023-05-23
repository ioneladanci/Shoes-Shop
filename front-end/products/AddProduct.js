import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavbarAdmin from "../components/NavbarAdmin";
import validation from "../validation/ProductValidation"


export default function AddProduct() {
    let navigate = useNavigate();
    const [errors, setError] = useState({})
    const [product, setProduct] = useState({
        name: "",
        category: "",
        brand: "",
        sex: "",
        price: "",
        pictureUrl: "",
    });

    const { name, category, brand, sex, price, pictureUrl } = product;

    const onInputChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setError(validation(product));
        try {
            await axios.post("http://localhost:8081/product", product);
            navigate("/homeAdmin");
            console.log("Merge");
        }
        catch (Exception) {
            alert("Invalid values");
        }
       
        
    };

    return (
        <div className="container">
            <NavbarAdmin />
            <div className="container2">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">Add Product</h2>

                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className="mb-3">
                            <label htmlFor="Name" className="form-label">
                                Name
                            </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="Enter the name of the product"
                                name="name"
                                value={name}
                                onChange={(e) => onInputChange(e)}
                                />
                                {errors.name && <p style={{ color: "red", fontSize: "13px" }}> * {errors.name}</p>}

                        </div>
                        <div className="mb-3">
                            <label htmlFor="Category" className="form-label">
                                Category
                            </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="Enter the category of the product (Boots/Trainers/Sandals)"
                                name="category"
                                value={category}
                                onChange={(e) => onInputChange(e)}
                                />
                                {errors.category && <p style={{ color: "red", fontSize: "13px" }}> * {errors.category}</p>}
                            
                        </div>
                        
                        <div className="mb-3">
                            <label htmlFor="Brand" className="form-label">
                                Brand
                            </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="Enter the brand of the product"
                                name="brand"
                                value={brand}
                                onChange={(e) => onInputChange(e)}
                                />
                                {errors.brand && <p style={{ color: "red", fontSize: "13px" }}> * {errors.brand}</p>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Sex" className="form-label">
                                Sex
                            </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="Enter the sex (F/M) "
                                name="sex"
                                value={sex}
                                onChange={(e) => onInputChange(e)}
                            />
                                {errors.sex && <p style={{ color: "red", fontSize: "13px" }}> * {errors.sex}</p>}
                        </div>
                       
                        <div className="mb-3">
                            <label htmlFor="Price" className="form-label">
                                Price
                            </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="Enter the price of the product "
                                name="price"
                                value={price}
                                onChange={(e) => onInputChange(e)}
                                />
                                {errors.price && <p style={{ color: "red", fontSize: "13px" }}> * {errors.price}</p>}
                        </div>
                       
                        <div className="mb-3">
                            <label htmlFor="Picture Url" className="form-label">
                                Picture Url
                            </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="Enter the picture Url"
                                name="pictureUrl"
                                value={pictureUrl}
                                onChange={(e) => onInputChange(e)}
                                />
                                {errors.pictureUrl && <p style={{ color: "red", fontSize: "13px" }}> * {errors.pictureUrl}</p>}
                        </div>
                        <button type="submit" className="btn btn-outline-primary">
                            Submit
                        </button>
                        <Link className="btn btn-outline-danger mx-2" to="/homeAdmin">
                            Cancel
                        </Link>
                    </form>
                </div>
                </div>
            </div>
        </div>
    );
}
