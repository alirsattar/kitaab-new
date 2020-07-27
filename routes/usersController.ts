// let express = require('express');
import * as express from 'express';
import User from '../models/user.model';
import { Sequelize } from 'sequelize';
 
class UsersController {
  public path = '/users';
  public router = express.Router();
 
  constructor() {
    this.initializeSubroutes();
  }
 
  public initializeSubroutes() {
    this.router.get(this.path, this.getAllUsersRoute);
  }
 
  getAllUsersRoute = (request: express.Request, response: express.Response, next: express.NextFunction) => {
    const sequelize = new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASS,
      {
        host: process.env.DB_HOST,
        dialect: 'mysql'
      }
    );

    // sequelize.authenticate();

    User.findAll()
      .then((allUsers)=>{
        response.json(allUsers);

        // response.render('index', { title: 'GETALLUSERSROUTE', data: usersAsJson });
      })
      .catch((err)=> {
        console.error(err);

        next(err);
      })
  }
}
 
export default UsersController;