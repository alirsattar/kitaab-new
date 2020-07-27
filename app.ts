// npm package imports
import * as dotenv from 'dotenv';
import * as bodyParser from 'body-parser';
import * as createError from 'http-errors';
import * as express from 'express';
import * as path from 'path';
import * as cookieParser from 'cookie-parser';
import * as logger from 'morgan';
import { Sequelize } from 'sequelize';

dotenv.config();

// App class
 
class App {
  public app: express.Application;
  public port: number;
 
  constructor(controllers, port) {
    this.app = express();
    this.port = port;
 
    this.initializeMiddlewares();
    this.makeDbConnection();
    this.initializeControllers(controllers);
  }

  private makeDbConnection() {
    const sequelize = new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASS,
      {
        host: process.env.DB_HOST,
        dialect: 'mysql'
      }
    );
    
    const testDbConnection = async ()=> {
      try {
        await sequelize.authenticate();
        // tslint:disable-next-line: no-console
        console.log('Connection has been established successfully.');
      } catch (error) {
        // tslint:disable-next-line: no-console
        console.error('Unable to connect to the database:', error);
      }
    };
    
    testDbConnection();
  }
 
  private initializeMiddlewares() {
    this.app.use(bodyParser.json());
    
    // view engine setup
    this.app.set('views', path.join(__dirname, 'views'));
    this.app.set('view engine', 'hbs');

    this.app.use(logger('dev'));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(cookieParser());
    this.app.use(express.static(path.join(__dirname, 'public')));
  }
 
  /**
   * 
   * @param controllers 
   */
  private initializeControllers(controllers) {
    controllers.forEach((controller) => {
      this.app.use('/', controller.router);
    });

    this.initializeErrorHandling();
  }

  private initializeErrorHandling() {
    // catch 404 and forward to error handler
    this.app.use('/',(req, res, next)=> {
      next(createError(404));
    });

    // error handler
    this.app.use((err, req, res, next)=> {
      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'development' ? err : {};

      // render the error page
      res.status(err.status || 500);
      res.render('error');
    });
  }
 
  public listen() {
    this.app.listen(this.port, () => {
      // tslint:disable-next-line: no-console
      console.log(`App listening on the port ${this.port}`);
    });
  }
}
 
export default App;
