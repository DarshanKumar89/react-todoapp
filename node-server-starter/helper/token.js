import jwt from 'jsonwebtoken';
import { SECRET1 } from '../secret';

export const generateToken = (userId) => jwt.sign({ userId }, SECRET1);

export const Auth = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) res.status(500).send({ auth: false, message: 'No token provided.' });
    jwt.verify(token, SECRET1, (err, decoded) => {
        req.auth = decoded; // If no error, token info is returned in 'decoded'
        if (err) res.status(401).send({ auth: false, message: 'Failed to authenticate token.' });
        next();
    });
};
