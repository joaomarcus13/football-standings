import ApiManager from './apiManager.js';
import AppController from './controller.js';
import ViewManager from './view.js';
import leagues from './config/leagues.js';

const appController = new AppController({
  leagues,
  viewManager: new ViewManager(),
  apiManager: new ApiManager(),
});

appController.initialize();
