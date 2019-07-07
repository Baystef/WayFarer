import { Router } from 'express';
import auth from './auth';
import buses from './buses';
import trips from './trips';
import bookings from './bookings';

const routes = Router();

routes.use('/auth', auth);
routes.use('/buses', buses);
routes.use('/trips', trips);
routes.use('/bookings', bookings);

export default routes;
