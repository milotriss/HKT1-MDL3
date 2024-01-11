import express from 'express';
import userController from './users.controller';
import postController from './posts.controller';

const Controller = (server:express.Express) => {
    server.use('/api/v1/users',userController)
    server.use('/api/v1/users',postController)
}
export default Controller