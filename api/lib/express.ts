import express, { Application, Request, Response, NextFunction } from 'express';
import GraphHTTP from 'express-graphql';
import { Schema } from '../graphql/Schema';
import { decodeJWT } from './hash';
import { sequelize } from './sequelize';
import { Team } from '../models/Team';
import { Subject } from '../models/Subject';

// A hack to add the JWT decoded token to the request object
declare global {
  namespace Express {
    interface Request {
      JWT: any; // Decoded JWT for server sided Use
      USER: any // User object from the database
    }
  }
}

// Server
const app: Application = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('trust proxy', true);
app.disable('x-powered-by');

// Security CORS
app.use((req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

// JWT Authorization
app.use(async (req: Request, res: Response, next: NextFunction) => {
  const JWT_TOKEN: string | undefined = req.header("JWT");
  if (JWT_TOKEN) {
    try {
      req.JWT = await decodeJWT(JWT_TOKEN); // Decode for server sided use only
      res.setHeader('JWT', JWT_TOKEN); // return (non-decoded) JWT token to client
      if (!req.JWT.manager) {
        req.USER = await sequelize.models.User.findOne({ where: { _id: req.JWT._id }, include: [{ model: Team, as: 'teams', exclude: ['inviteCode'] }] });
      } else if (req.JWT.manager) {
        req.USER = await sequelize.models.Manager.findOne({ where: { _id: req.JWT._id }, include: [{ model: Subject, as: 'subjects' }] });
      }
      if (!req.USER) {
        throw new Error("Database, Cache or Client Header discrepancy");
      }
    } catch (err) {
      process.env.NODE_ENV == 'development' ? console.error({ code: err.name, message: err.message, path: 'api/lib/express.ts' }) : null;
      req.JWT = null; // Null for server sided use only
      res.removeHeader('JWT'); // Remove JWT from server response
    }
  }
  next();
});

// GraphQL
app.use('/graphql', GraphHTTP({
  schema: Schema,
  pretty: true,
  graphiql: process.env.NODE_ENV == 'development'
}));

// Error handling
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  process.env.NODE_ENV == 'development' ? console.error({ name: err.name, message: err.message }) : null;
  return res.status(500).json(err);
});

export { app };