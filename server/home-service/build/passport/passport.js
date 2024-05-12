"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateJWT = exports.configurePassport = void 0;
const passport_local_1 = require("passport-local");
const User_1 = require("../model/User");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var passport = require('passport');
var mongoose = require('mongoose');
const configurePassport = (passport) => {
    passport.serializeUser((user, done) => {
        console.log('user is serialized.');
        done(null, user);
    });
    passport.deserializeUser((user, done) => {
        console.log('user is deserialized.');
        done(null, user);
    });
    passport.use('local', new passport_local_1.Strategy((username, password, done) => {
        const query = User_1.User.findOne({ email: username });
        query.then(user => {
            if (user) {
                user.comparePassword(password, (error, _) => {
                    if (error) {
                        done('Incorrect username or password.');
                    }
                    else {
                        done(null, user._id);
                    }
                });
            }
            else {
                done(null, undefined);
            }
        }).catch(error => {
            done(error);
        });
    }));
    return passport;
};
exports.configurePassport = configurePassport;
const generateJWT = (user) => {
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);
    return jsonwebtoken_1.default.sign({
        email: user.email,
        lastName: user.lastName,
        firstName: user.firstName,
        address: user.address,
        exp: parseInt((expiry.getTime() / 1000).toString()),
        role: user.role,
    }, 'My_secret');
};
exports.generateJWT = generateJWT;
