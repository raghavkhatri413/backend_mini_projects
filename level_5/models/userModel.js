import pool from "../db.js";

async function createUser(username, email, password) {
    const res = await pool.query('insert into users (username,email,password) values ($1,$2,$3) returning *', [username, email, password]);
    return res.rows[0];
}

export { createUser };