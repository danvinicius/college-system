import express from 'express';
import Server from './Server';

const port = Number(process.env.PORT);
const app = express();
const server = new Server(app, port);

//=-=-=-=-=-=-=-=-=-=//
server.config();
server.run();