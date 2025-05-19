import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/AddProduct.css";

export default function AddProduct(){
    const [pid,setPid] = useState("");
    const [name,setName] = useState("");
    const [qty,setQty] = useState("");

    const navigate = useNavigate();
    const addProduct = async(payload)=>{
        await axios.post("http://localhost:5000/add-product",payload);
    }
    const handleSubmit = async(e)=>{
        e.preventDefault();
        await addProduct({pid,name,qty});
        navigate("/");
    };
    return(
        <>
        <div>
            <h1>Add book details</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="pid">Enter book id</label>
                <input type="text" name="pid" value={pid} placeholder="Enter pid" onChange={(e)=>setPid(e.target.value)} />
                <label htmlFor="name">Enter book name</label>
                <input type="text" name="name" value={name} placeholder="Enter book name" onChange={(e)=>setName(e.target.value)} />
                <label htmlFor="qty">Enter book qty</label>
                <input type="number" name="qty" value={qty} placeholder="Enter book qty" onChange={(e)=>setQty(e.target.value)} />
                <button type="submit">Submit</button>
            </form>
        </div>
        </>
    )
}