import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import NavbarAdmin from "../components/NavbarAdmin";


export default function EditProduct() {
    let navigate = useNavigate();

    const { id } = useParams();

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

    useEffect(() => {
        loadProduct();
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:8081/product/${id}`, product);
        navigate("/homeAdmin");
    };

    const loadProduct = async () => {
        const result = await axios.get(`http://localhost:8081/product/${id}`);
        setProduct(result.data);
    };

    return (
        <div className="container">
            <NavbarAdmin />
            <div className="container2">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">Edit Product</h2>

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
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Category" className="form-label">
                                Category
                            </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="Enter the category of the product "
                                name="category"
                                value={category}
                                onChange={(e) => onInputChange(e)}
                            />
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
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Sex" className="form-label">
                                Name
                            </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="Enter the sex "
                                name="sex"
                                value={sex}
                                onChange={(e) => onInputChange(e)}
                            />
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
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Picture Url" className="form-label">
                                Brand
                            </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="Enter the picture Url"
                                name="pictureUrl"
                                value={pictureUrl}
                                onChange={(e) => onInputChange(e)}
                            />
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