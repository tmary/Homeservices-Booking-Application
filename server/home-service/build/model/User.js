"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
var jwt = require('jsonwebtoken');
const SALT_FACTOR = 10;
const UserSchema = new mongoose_1.default.Schema({
    email: { type: String, required: true, unique: true },
    lastName: { type: String },
    firstName: { type: String },
    address: { type: String },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'user', 'visitor'], default: 'user' }
});
UserSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (this.isModified('password')) {
            const salt = yield bcrypt_1.default.genSalt(10);
            this.password = yield bcrypt_1.default.hash(this.password, salt);
        }
        next();
    });
});
UserSchema.methods.comparePassword = function (candidatePassword, callback) {
    bcrypt_1.default.compare(candidatePassword, this.password, (err, isMatch) => {
        if (err) {
            return callback(err);
        }
        callback(null, isMatch);
    });
};
UserSchema.methods.isAdmin = function () {
    return this.role === 'admin';
};
UserSchema.methods.generateJWT = function () {
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);
    return jwt.sign({
        _id: this._id,
        email: this.email,
        role: this.role,
        exp: Math.floor(expiry.getTime() / 1000),
    }, 'My_secret');
};
exports.User = mongoose_1.default.model('User', UserSchema);
