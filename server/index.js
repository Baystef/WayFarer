import '@babel/polyfill';
import express from 'express';
import log from './src/utils/log';

const app = express();


app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Welcome to WayFarer',
  });
});

const port = process.env.PORT || 4800;

app.listen(port, () => log(`App is listening on port ${port}`));

export default app;
