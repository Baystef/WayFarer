import { Router } from 'express';
import auth from './auth';
import buses from './buses';

const routes = Router();

routes.use('/auth', auth);
routes.use('/buses', buses);

export default routes;
