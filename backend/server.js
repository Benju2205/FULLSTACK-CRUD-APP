require('dotenv').config();

const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: "13.228.225.19",
    user: "root",
    password: "",
    database: "crud"
    // host: process.env.MYSQL_HOST,
    // user: process.env.MYSQL_USER,
    // password: process.env.MYSQL_PASSWORD,
    // database: process.env.MYSQL_DATABASE
})

app.get("/",(req,res)=>{
    const sql = "SELECT * FROM student";
    db.query(sql, (err,data)=>{
        if(err) return res.json("Error");
        return res.json(data);
    });
});

app.post('/create',(req,res)=>{
    const sql = "INSERT INTO student (`Name`,`Email`) VALUES (?)";
    const values = [
        req.body.name,
        req.body.email
    ]
    db.query(sql, [values],(err, data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.put('/update/:id',(req,res)=>{
    const sql = "update student set `Name` = ?, `Email` = ? where ID = ?";
    const values = [
        req.body.name,
        req.body.email
    ]
    const id = req.params.id;

    db.query(sql, [...values,id],(err, data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.delete('/student/:id',(req,res)=>{
    const sql = "delete from student where ID=?";
    const id = req.params.id;

    db.query(sql, [id],(err, data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.listen(8081, ()=>{
    console.log("Listening");
})