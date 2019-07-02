import { Router } from 'express';
import auth from './auth';
import buses from './buses';
import trips from './trips';

const routes = Router();

routes.use('/auth', auth);
routes.use('/buses', buses);
routes.use('/trips', trips);

export default routes;
