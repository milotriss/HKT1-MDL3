import express, { urlencoded } from 'express';
import cors from 'cors';
import * as path from 'path';
import Controller from './controllers';

const server = express();
const PORT = 9000
server.use(urlencoded())
server.use(express.static(path.join('public')))
server.use(cors())

Controller(server)

server.listen(PORT, () => console.log(`http://localhost:${PORT} SERVER IS OK FEN`));
