import ApiManager from './apiManager.js';
import AppController from './controller.js';
import ViewManager from './view.js';
import { apiconfig } from './config/api.js';
import leagues from './config/leagues.js';

const baseURL = apiconfig.baseURL;
const headers = apiconfig.headers;

const appController = new AppController({
  leagues,
  viewManager: new ViewManager(),
  apiManager: new ApiManager({ baseURL, headers }),
});

appController.initialize();
