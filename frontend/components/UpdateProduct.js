import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import "../css/UpdateProduct.css";

export default function UpdateProduct() {
    const { state: init } = useLocation();
    const [product, setProduct] = useState(init);

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const navigate = useNavigate();

    const updateProd = async (id, payload) => {
        await axios.put(`http://localhost:5000/update-product/${id}`, payload);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateProd(product.pid, product);
        navigate("/");
    };

    return (
        <div>
            <h1>Update Book</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="pid">ProductID</label>
                <input
                    type="number"
                    value={product.pid}
                    name="pid"
                    disabled
                />
                <label htmlFor="name">Product Name</label>
                <input
                    type="text"
                    value={product.name}
                    name="name"
                    onChange={handleChange}
                    required
                />
                <label htmlFor="qty">Quantity</label>
                <input
                    type="number"
                    value={product.qty}
                    name="qty"
                    onChange={handleChange}
                    required
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}
