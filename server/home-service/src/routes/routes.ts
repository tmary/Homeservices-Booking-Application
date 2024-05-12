import { Router, Request, Response, NextFunction } from 'express';
import { MainClass } from '../main-class';
import { User } from '../model/User';
import passport, { PassportStatic, authenticate } from 'passport';
import { Promotion } from '../model/promotions.model';
import bodyParser from 'body-parser';
import { authMiddleware, isAdmin, isUser, isVisitor } from '../controllers/authMiddleware';
import { UserController } from '../controllers/userController';

export const configureRoutes = (passport: PassportStatic, router: Router): Router => {

    router.get('/', (req: Request, res: Response) => {
        let myClass = new MainClass();
        let message = myClass.greeting();
        res.status(200).send(message);
    });

    router.get('/promise', async (req: Request, res: Response) => {
        let myClass = new MainClass();
        res.setHeader('Content-Type', 'text/html;charset=UTF-8')
        res.setHeader('Transfer-Encoding', 'chuncked');

        try {
            const data = await myClass.greetingPromise();
            res.status(200).send(data);
        } catch (error) {
            res.status(400).send(error);
        }
        res.write('DATA\n');
    });

    router.get('/observable', (req: Request, res: Response) => {
        let myClass = new MainClass();
        res.setHeader('Content-Type', 'text/html;charset=UTF-8')
        res.setHeader('Transfer-Encoding', 'chuncked');
        let message = myClass.greetingObservable().subscribe((data: string) => {
            res.write(data);
        }, (error: string) => {
            res.write(error);
        }, () => {
        });
        res.write('DATA\n');
    });

    router.post('/login', (req: Request, res: Response, next: NextFunction) => {
        passport.authenticate('local', (error: string | null, user: typeof User) => {
            if (error) {
                console.log(error);
                res.status(500).send(error);
            } else {
                if (!user) {
                    res.status(400).send('User not found.');
                } else {
                    req.login(user, (err: string | null) => {
                        if (err) {
                            console.log(err);
                            res.status(500).send('Internal server error.');
                        } else {
                            res.status(200).send(user);
                        }
                    });
                }
            }
        })(req, res, next);
    });

    router.post('/register', async (req: Request, res: Response, next: NextFunction) => {
        const { email, password, firstName, lastName, address } = req.body;
        const user = new User({ email, password, firstName, lastName, address });
        try {
            const data = await user.save();
            res.status(200).send(data);
        } catch (error) {
            console.error('Error registering user:', error);
            res.status(500).send(error);
        }
    });

    router.post('/logout', (req: Request, res: Response, next: NextFunction) => {
        if (req.isAuthenticated()) {
            req.logout((error) => {
                if (error) {
                    console.log(error);
                    res.status(200).send('internal server error.');
                }
                res.status(200).send('Successfully logged out');
            });

        } else {
            res.status(500).send('User is not logged in.')
        }

    });

    // Route to get all promotions
    router.get('/promotions', async (req: Request, res: Response, next: NextFunction) => {
        try {
            const promotions = await Promotion.find();
            res.status(200).json(promotions);
        } catch (error) {
            console.error('Error fetching promotions:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    });

    // Route to create a new promotion
    router.post('/promotions', authMiddleware, isAdmin, UserController.getUser, async (req: Request, res: Response, next: NextFunction) => {
        const promotionData = req.body;
        try {
            const newPromotion = await Promotion.create(promotionData);
            res.status(201).json(newPromotion);
        } catch (error) {
            console.error('Error creating promotion:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    });

    // Route to update an existing promotion
    router.put('/promotions/:id', authMiddleware, isAdmin, UserController.getUser, async (req: Request, res: Response, next: NextFunction) => {
        const promotionId = req.params.id;
        const promotionData = req.body;
        try {
            const updatedPromotion = await Promotion.findByIdAndUpdate(promotionId, promotionData, { new: true });
            res.status(200).json(updatedPromotion);
        } catch (error) {
            console.error('Error updating promotion:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    });

    // Route to delete a promotion
    router.delete('/promotions/:id', authMiddleware, isAdmin, UserController.getUser, async (req: Request, res: Response, next: NextFunction) => {
        const promotionId = req.params.id;
        try {
            await Promotion.findByIdAndDelete(promotionId);
            res.status(204).send();
        } catch (error) {
            console.error('Error deleting promotion:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    });

    router.get('/earnings', UserController.getUser, async (req, res) => {
        res.json(earningsData); 
    });

    router.get('/statistics', UserController.getUser, async (req, res) => {
        res.json(statisticsData); 
    });

    router.get('/users', authMiddleware, isAdmin, UserController.getUser, async (req, res) => {
        try {
            const users = await User.find();
            res.json(users);
        } catch (error) {
            console.error('Error fetching users:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    });

    router.post('/account-mgt/admin', async (req: Request, res: Response) => {
        const { email, password , firstName, lastName} = req.body;
        try {
            let existingUser = await User.findOne({ email});
            if (existingUser) {
                return res.status(400).json({ message: 'User already exists' });
            }
            const newUser = new User({
                email,
                password,
                firstName,
                lastName,
                role:'admin'
            });
            await newUser.save();
            res.status(201).json({ message: 'Admin user created successfully' });
        } catch (error) {
            console.error('Error creating admin user', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    });
    router.get('/checkAuth', (req, res) => {
        res.status(200).json({authenticated: true});
    });

    router.use(bodyParser.json());
    return router;

}
