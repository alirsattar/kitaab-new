// let express = require('express');
import * as express from 'express';
 
class IndexController {
  public path = '/';
  public router = express.Router();
 
  constructor() {
    this.initializeSubroutes();
  }
 
  public initializeSubroutes() {
    this.router.get(this.path, this.indexRoute);
  }
 
  indexRoute = (request: express.Request, response: express.Response) => {
    response.render('index', { title: 'INDEX ROUTE' });
  }
}
 
export default IndexController;