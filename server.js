import express from 'express';
import path from 'path';

const app = express();

app.use('/src', express.static('./app/src'));

app.get('/', (req, res) => {
  res.sendFile(path.resolve('app', 'index.html'));
});

app.listen(3333, () => {
  console.log('listen port 3333');
});
