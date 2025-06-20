import pool from "../db.js";

async function createUser(username, email, password) {
    const res = await pool.query('insert into users (username,email,password) values ($1,$2,$3) returning *', [username, email, password]);
    return res.rows[0];
}

async function getUserByEmail(email) {
    const res = await pool.query('select * from users where email=$1', [email]);
    return res.rows[0];
}

async function getUserByUsername(username) {
    const res = await pool.query('select * from users where username=$1', [username]);
    return res.rows[0];
}

async function deleteUser(id) {
    const res = await pool.query('delete from users where id=$1', [id]);
}

export { createUser, getUserByEmail, getUserByUsername, deleteUser };