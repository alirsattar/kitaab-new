import App from './app';

// Import controllers
import IndexController from './routes/indexController';
import UsersController from './routes/usersController';

// Array of model controllers, to update as needed
const modelControllers = [
  new IndexController(),
  new UsersController()
];
 
const app = new App(modelControllers, 3000);
 
app.listen();