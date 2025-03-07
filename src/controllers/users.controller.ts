import { HttpException } from '@/exceptions/HttpException';
import { IUser } from '@/interfaces/users.interface';
import userService from '@/services/users.service';
import { CreateUserDto } from '@dtos/users.dto';
import { NextFunction, Request, Response } from 'express';

class UsersController {
  public getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllUsersData: IUser[] = await userService.findAllUser();

      res.status(200).json({ data: findAllUsersData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.params.id;
      const findOneUserData: IUser = await userService.findUserById(userId);

      res.status(200).json({ data: findOneUserData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: CreateUserDto = req.body;
      const createUserData: IUser = await userService.createUser(userData);

      res.status(201).json({ data: createUserData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.params.id;
      const userData: CreateUserDto = req.body;
      const updateUserData: IUser = await userService.updateUser(userId, userData);

      res.status(200).json({ data: updateUserData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.params.id;
      const deleteUserData: IUser = await userService.deleteUser(userId);

      res.status(200).json({ data: deleteUserData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };

  public async resetPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const email = req.body.email ? String(req.body.email) : '';
      const password = req.body.password ? String(req.body.password) : '';
      if (!email) throw new HttpException(400, 'Email is required');
      if (!password) throw new HttpException(400, 'Password is required');
      await userService.resetPassword(email, password);
      res.status(200).json({ message: 'Reset Password Successfully!' });
    } catch (error) {
      next(error);
    }
  }
}

export default UsersController;
