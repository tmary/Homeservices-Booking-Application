"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isVisitor = exports.isUser = exports.isAdmin = exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../model/config");
function authMiddleware(req, res, next) {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token) {
        return res.status(401).json({ mesage: 'No token provided' });
    }
    jsonwebtoken_1.default.verify(token, config_1.secretKey, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Failed to authenticate token ' });
        }
        req.decoded = decoded;
        next();
    });
}
exports.authMiddleware = authMiddleware;
function isAdmin(req, res, next) {
    const role = req.decoded.role;
    if (role !== 'admin') {
        return res.status(403).json({ message: 'Insufficient permissions' });
    }
    next();
}
exports.isAdmin = isAdmin;
function isUser(req, res, next) {
    const role = req.decoded.role;
    if (role !== 'user') {
        return res.status(403).json({ message: 'Insufficient permissions' });
    }
    next();
}
exports.isUser = isUser;
function isVisitor(req, res, next) {
    const role = req.decoded.role;
    if (role !== 'visitor') {
        return res.status(403).json({ message: 'Insufficient permissions' });
    }
    next();
}
exports.isVisitor = isVisitor;
//module.exports = authMiddleware;
