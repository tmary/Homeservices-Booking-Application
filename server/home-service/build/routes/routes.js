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
exports.configureRoutes = void 0;
const main_class_1 = require("../main-class");
const User_1 = require("../model/User");
const promotions_model_1 = require("../model/promotions.model");
const body_parser_1 = __importDefault(require("body-parser"));
const authMiddleware_1 = require("../controllers/authMiddleware");
const userController_1 = require("../controllers/userController");
const configureRoutes = (passport, router) => {
    router.get('/', (req, res) => {
        let myClass = new main_class_1.MainClass();
        let message = myClass.greeting();
        res.status(200).send(message);
    });
    router.get('/promise', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let myClass = new main_class_1.MainClass();
        res.setHeader('Content-Type', 'text/html;charset=UTF-8');
        res.setHeader('Transfer-Encoding', 'chuncked');
        try {
            const data = yield myClass.greetingPromise();
            res.status(200).send(data);
        }
        catch (error) {
            res.status(400).send(error);
        }
        res.write('DATA\n');
    }));
    router.get('/observable', (req, res) => {
        let myClass = new main_class_1.MainClass();
        res.setHeader('Content-Type', 'text/html;charset=UTF-8');
        res.setHeader('Transfer-Encoding', 'chuncked');
        let message = myClass.greetingObservable().subscribe((data) => {
            res.write(data);
        }, (error) => {
            res.write(error);
        }, () => {
        });
        res.write('DATA\n');
    });
    router.post('/login', (req, res, next) => {
        passport.authenticate('local', (error, user) => {
            if (error) {
                console.log(error);
                res.status(500).send(error);
            }
            else {
                if (!user) {
                    res.status(400).send('User not found.');
                }
                else {
                    req.login(user, (err) => {
                        if (err) {
                            console.log(err);
                            res.status(500).send('Internal server error.');
                        }
                        else {
                            res.status(200).send(user);
                        }
                    });
                }
            }
        })(req, res, next);
    });
    router.post('/register', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, password, firstName, lastName, address } = req.body;
        const user = new User_1.User({ email, password, firstName, lastName, address });
        try {
            const data = yield user.save();
            res.status(200).send(data);
        }
        catch (error) {
            console.error('Error registering user:', error);
            res.status(500).send(error);
        }
    }));
    router.post('/logout', (req, res, next) => {
        if (req.isAuthenticated()) {
            req.logout((error) => {
                if (error) {
                    console.log(error);
                    res.status(200).send('internal server error.');
                }
                res.status(200).send('Successfully logged out');
            });
        }
        else {
            res.status(500).send('User is not logged in.');
        }
    });
    // Route to get all promotions
    router.get('/promotions', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const promotions = yield promotions_model_1.Promotion.find();
            res.status(200).json(promotions);
        }
        catch (error) {
            console.error('Error fetching promotions:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }));
    // Route to create a new promotion
    router.post('/promotions', authMiddleware_1.authMiddleware, authMiddleware_1.isAdmin, userController_1.UserController.getUser, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const promotionData = req.body;
        try {
            const newPromotion = yield promotions_model_1.Promotion.create(promotionData);
            res.status(201).json(newPromotion);
        }
        catch (error) {
            console.error('Error creating promotion:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }));
    // Route to update an existing promotion
    router.put('/promotions/:id', authMiddleware_1.authMiddleware, authMiddleware_1.isAdmin, userController_1.UserController.getUser, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const promotionId = req.params.id;
        const promotionData = req.body;
        try {
            const updatedPromotion = yield promotions_model_1.Promotion.findByIdAndUpdate(promotionId, promotionData, { new: true });
            res.status(200).json(updatedPromotion);
        }
        catch (error) {
            console.error('Error updating promotion:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }));
    // Route to delete a promotion
    router.delete('/promotions/:id', authMiddleware_1.authMiddleware, authMiddleware_1.isAdmin, userController_1.UserController.getUser, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const promotionId = req.params.id;
        try {
            yield promotions_model_1.Promotion.findByIdAndDelete(promotionId);
            res.status(204).send();
        }
        catch (error) {
            console.error('Error deleting promotion:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }));
    router.get('/earnings', userController_1.UserController.getUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        res.json(earningsData);
    }));
    router.get('/statistics', userController_1.UserController.getUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        res.json(statisticsData);
    }));
    router.get('/users', authMiddleware_1.authMiddleware, authMiddleware_1.isAdmin, userController_1.UserController.getUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const users = yield User_1.User.find();
            res.json(users);
        }
        catch (error) {
            console.error('Error fetching users:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }));
    router.post('/account-mgt/admin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, password, firstName, lastName } = req.body;
        try {
            let existingUser = yield User_1.User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: 'User already exists' });
            }
            const newUser = new User_1.User({
                email,
                password,
                firstName,
                lastName,
                role: 'admin'
            });
            yield newUser.save();
            res.status(201).json({ message: 'Admin user created successfully' });
        }
        catch (error) {
            console.error('Error creating admin user', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }));
    router.get('/checkAuth', (req, res) => {
        res.status(200).json({ authenticated: true });
    });
    router.use(body_parser_1.default.json());
    return router;
};
exports.configureRoutes = configureRoutes;
