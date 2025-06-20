import pool from "../db.js";

async function createPost(title, content, user_id, username) {
    const res = await pool.query('insert into posts (title,content,user_id,username) values ($1,$2,$3,$4) returning *', [title, content, user_id, username]);
    return res.rows[0];
}

async function getPostById(id) {
    const res = await pool.query('select * from posts where id=$1', [id]);
    return res.rows[0];
}

async function getAllPost({ search = '', sort = 'desc', limit = 10, offset = 0 }) {
    const query = `select * from posts WHERE title ILIKE $1 ORDER BY created_at ${sort === 'asc' ? 'ASC' : 'DESC'} limit $2 offset $3`;
    if(search){
        offset=0;
    }
    const res = await pool.query(query, [`%${search}%`, limit, offset]);
    return res.rows;
}

async function updatePost(id, title, content) {
    const res = await pool.query('update posts set title=$1,content=$2 where id=$3 returning *', [title, content, id]);
    return res.rows[0];
}

async function deletePost(id) {
    await pool.query('delete from posts where id=$1', [id]);
}

export { createPost, getPostById, getAllPost, updatePost, deletePost };