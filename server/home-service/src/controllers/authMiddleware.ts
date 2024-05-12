
import jwt from 'jsonwebtoken';
import { secretKey } from '../model/config';
import { Request, Response ,NextFunction } from 'express';


interface CustomRequest extends Request {
    decoded?: any;
}

export function authMiddleware(req: CustomRequest, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({mesage: 'No token provided'});
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Failed to authenticate token '});

        }
    
        req.decoded = decoded;
        next();
    });
}

export function isAdmin(req: CustomRequest, res: Response, next: NextFunction) {
    const role = req.decoded.role;
    if (role !== 'admin') {
        return res.status(403).json({ message: 'Insufficient permissions' });
    }
    next();
}

export function isUser(req:CustomRequest, res: Response, next: NextFunction) {
    const role = req.decoded.role;
    if (role !== 'user') {
        return res.status(403).json({ message: 'Insufficient permissions' });
    }
    next();
}

export function isVisitor(req: CustomRequest, res: Response, next: NextFunction) {
    const role = req.decoded.role;
    if (role !== 'visitor') {
        return res.status(403).json({ message: 'Insufficient permissions' });
    }
    next();
}

//module.exports = authMiddleware;