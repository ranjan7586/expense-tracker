import jwt from 'jsonwebtoken';
export const validateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const bearerToken = authHeader && authHeader.split(' ')[1];
    if (!bearerToken) return res.status(401).send({ success: false, message: 'Unauthorized', data: req.headers });
    jwt.verify(bearerToken, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(401).send({ success: false, message: 'Invalid token' });
        next();
    })
}