import express from 'express';
import path from 'path';

const app = express();

const port = process.env.PORT || 3333;

app.use('/src', express.static('./app/src'));

app.get('/', (req, res) => {
  res.sendFile(path.resolve('app', 'index.html'));
});

app.listen(port, () => {
  console.log(`listen port ${port}`);
});
