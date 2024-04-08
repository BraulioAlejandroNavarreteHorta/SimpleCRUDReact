import express, { Application } from 'express';
import bodyParser from 'body-parser';
import cors, { CorsOptions } from 'cors';
import AuthenticationController from './controllers/AuthenticationController';
import ProductosController from './controllers/ProductosController';

const app: Application =  express();

const corsOption: CorsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
};

app.use(cors(corsOption));
app.use(bodyParser.json());

AuthenticationController.mount(app);
ProductosController.mount(app);

export default app;