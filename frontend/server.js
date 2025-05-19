const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());


const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Shripad@19",
    database: "anand1"
});

//table name : books

app.post("/add-product",(req,res)=>{
    console.log("Adding request arrived");
    const {pid,name,qty} = req.body;
    const query = `INSERT INTO books (pid,name,qty) VALUES (?,?,?)`;
    db.query(query,[pid,name,qty],(err)=>{
        if(err)
        {
            console.log("Error occured ",err);
            return res.status(500).json({error:err});
        }
        console.log("Book added");
        return res.json({message: "Book added successfully!"})
    });
});

app.get("/get-all-products",(req,res)=>{
    const query = `SELECT * FROM books`;
    db.query(query,(err,result)=>{
        if(err){
            return res.status(500).json({error:err});
        }
        return res.json(result);
    });
});

app.put("/update-product/:pid",(req,res)=>{
    const {pid} = req.params;
    const {name,qty} = req.body;

    const query = `UPDATE books SET name=?, qty=? WHERE pid=?`;
    db.query(query,[name,qty,pid],(err)=>{
        if(err){
            return res.status(500).json({error:err});
        }
        return res.json({message: "Book updated!"})
    })
})

app.delete("/delete-product/:pid", (req, res) => {
    const { pid } = req.params;
    const query = `DELETE FROM books WHERE pid=?`;
    db.query(query, [pid], (err) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        return res.json({ message: `Book with id ${pid} deleted!` });
    });
});


app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
})