import express from 'express';
import UserService from '../services/user.service';
import checkQuery from '../middlewares/checkQuery';
import checkId from '../middlewares/checkId';
import checkNameUser from '../middlewares/checkNameUser';
import checkEmail from '../middlewares/checkEmail';
const userService = new UserService()
const userController = express.Router();

userController.route('/')
.get(userService.getAllUser)
.get(checkQuery,userService.getUserByName)
.post(checkNameUser,checkEmail,userService.postNewUser)

userController.route('/:id')
.get(checkId,userService.getUserById)
.patch(checkId,userService.patchUserById)
.delete(checkId,userService.deleteUserById)
export default userController