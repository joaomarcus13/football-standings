import { Router } from 'express';
import path from 'path';
import Controller from './controller.js';

const router = Router();

router.get('/', (req, res) => {
  res.sendFile(path.resolve('app', 'index.html'));
});

const controller = new Controller();
router.get('/standings/:id', controller.getStandings.bind(controller));
router.get('/matches/:id', controller.getMatches.bind(controller));

export { router };
