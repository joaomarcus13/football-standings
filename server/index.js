import express from 'express';
import { router } from './routes.js';

const app = express();

const port = process.env.PORT || 3333;

app.use('/src', express.static('app/src'));
app.use(router);

app.listen(port, () => {
  console.log(`listen port ${port}`);
});
