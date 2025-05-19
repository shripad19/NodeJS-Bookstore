import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/Home.css";

export default function Home() {
    const [products, setProducts] = useState([]);

    const navigate = useNavigate();
    const fetchProducts = async () => {
        const res = await axios.get("http://localhost:5000/get-all-products");
        setProducts(res.data);
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    const deleteProduct = async (pid) => {
        await axios.delete(`http://localhost:5000/delete-product/${pid}`);
        fetchProducts();
    }

    const updateProduct = (product) => {
        navigate("/update", { state: product });
    }

    return (
        <>
            <div>
                <h1>Book Store Management System</h1>
                <button onClick={() => { navigate("/add") }}>Add New Book</button>

                <table>
                    <thead>
                        <tr>
                            <th>ProductID</th>
                            <th>Name</th>
                            <th>Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((book) => (
                            <tr key={book.pid}>
                                <td>{book.pid}</td>
                                <td>{book.name}</td>
                                <td>{book.qty}</td>
                                <td>
                                    <button onClick={() => updateProduct(book)}>Update</button>
                                    <button onClick={() => deleteProduct(book.pid)}>Delete</button>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
        </>
    )
}