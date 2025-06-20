import pool from "../db.js";

async function addComment(postId, userId, username, content) {
    const res = await pool.query('insert into comments (post_id,user_id,username,content) values ($1,$2,$3,$4) returning *', [postId, userId, username, content]);
    return res.rows[0];
}

async function getCommentForPost(postId) {
    const res = await pool.query('select * from comments where post_id=$1', [postId]);
    return res.rows;
}

async function getCommentById(id) {
    const res = await pool.query('select * from comment where id=$1', [id]);
    return res.rows[0];
}

async function updateComment(id, content) {
    const res = await pool.query('update comments set content=$1 from comments where id=$2 returning *', [content, id]);
    return res.rows[0];
}

async function deleteComment(id) {
    await pool.query('delete from comments where id=$1', [id]);
}

export { addComment, getCommentForPost, getCommentById, updateComment, deleteComment };