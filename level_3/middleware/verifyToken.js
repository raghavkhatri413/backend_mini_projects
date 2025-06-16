import jwt from 'jsonwebtoken';

const verifyToken=(req,res,next)=>{
    const token=req.headers['authorization']?.split(' ')[1];
    if(!token)  return res.status(403).json({ error: 'Token missing' });

    jwt.verify(token,process.env.JWT_SECRET,(err,decode)=>{
        if(err) return res.status(401).json({ error: 'Invalid token' });
        req.userId=decode.id;
        next();
    });
};

export default verifyToken;