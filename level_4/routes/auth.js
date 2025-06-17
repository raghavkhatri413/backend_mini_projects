import express from "express";
const router=express.Router();
router.use(express.json());
import bcrypt from 'bcrypt';
import pool from "../db.js";
import jwt from 'jsonwebtoken';

//Register
router.post('/register',async (req,res)=>{
    try {
        const {email,password}=req.body;
        if(!email || !password) return res.status(400).send("Required fields are empty");

        const hashed=await bcrypt.hash(password,10);
        const user=await pool.query('insert into users (email,password) values ($1,$2) returning id',[email,hashed]);
        res.status(201).json({ message: 'User registered', userId: user.rows[0].id });
    } catch (error) {
        console.log(error);
        return;
    }
});

//Login
router.post('/login',async (req,res)=>{
    try {
        const {email,password}=req.body;
        const user=await pool.query('select * from users where email=$1',[email]);
        if (!user.rows.length) return res.status(401).json({ error: 'Invalid email' });

        const isMatch=bcrypt.compare(password,user.rows[0].password);
        if (!isMatch) return res.status(401).json({ error: 'Wrong password' });

        const token=jwt.sign({id:user.rows[0].id},process.env.JWT_SECRET,{expiresIn:'1h'});
        res.json({ message: 'Login successful', token });
    } catch (error) {
        console.log(error);
        return;
    }
})

export default router;