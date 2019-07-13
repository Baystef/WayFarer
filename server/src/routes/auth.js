import { Router } from 'express';
import Users from '../controllers/users';
import Validate from '../middleware/validate';

const router = Router();

const { signUp, signIn } = Users;
const { validate, checkValidationResult } = Validate;

// New user signup
router.post('/signup', validate('signup'), checkValidationResult, signUp);

// User signin
router.post('/signin', validate('signin'), checkValidationResult, signIn);

export default router;
