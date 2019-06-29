import { Router } from 'express';
import Users from '../controllers/users';
import UserValidate from '../middleware/user-validate';

const router = Router();

// Import validators and controllers
const { signUp } = Users;
const { signupValidate, checkValidationResult } = UserValidate;

// New User Signup
router.post('/signup', signupValidate('signup'), checkValidationResult, signUp);

export default router;
