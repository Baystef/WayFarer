import '@babel/polyfill';
import express from 'express';
import morgan from 'morgan';
import swaggerUI from 'swagger-ui-express';
import yaml from 'yamljs';
import routes from './src/routes';
import { log } from './src/utils';

const app = express();

const swaggerDoc = yaml.load(`${process.cwd()}/swagger.yaml`);
app.use('/api/v1/docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc));

app.use(morgan('dev'));
app.use(express.json());

app.use('/api/v1', routes);


app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Welcome to WayFarer',
  });
});

app.all('*', (req, res) => {
  res.status(404).json({
    status: 'error',
    error: 'Route not found!',
  });
});

app.use((err, req, res, next) => {
  log(err.message);
  res.status((err.status >= 100 && err.status < 600) ? err.status : 500).json({
    status: 'error',
    error: 'Invalid request. Please ensure you entered the right thing',
  });
});


const port = process.env.PORT || 4800;

app.listen(port, () => log(`App is listening on port ${port}`));

export default app;
