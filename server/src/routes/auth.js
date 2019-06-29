import { Router } from 'express';
import Users from '../controllers/users';
import Validate from '../middleware/validate';

const router = Router();

// Import validators and controllers
const { signUp, signIn } = Users;
const { validate, checkValidationResult } = Validate;

// New User Signup
router.post('/signup', validate('signup'), checkValidationResult, signUp);

// User signin
router.post('/signin', validate('signin'), checkValidationResult, signIn);

export default router;
