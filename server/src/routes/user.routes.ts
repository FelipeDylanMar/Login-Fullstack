import { Router } from 'express';
import * as userController from '../controllers/user.controller';

const router = Router();

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.get('/users', userController.getUsers);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);

export default router;
