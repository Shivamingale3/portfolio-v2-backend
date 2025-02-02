import { HttpException } from '@/exceptions/HttpException';
import { IUser } from '@/interfaces/users.interface';
import authService from '@/services/auth.service';
import { CreateUserDto, LoginDto } from '@dtos/users.dto';
import { RequestWithUser } from '@interfaces/auth.interface';
import { NextFunction, Request, Response } from 'express';

class AuthController {
  public signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: CreateUserDto = req.body;
      const signUpUserData: IUser = await authService.signup(userData);

      res.status(201).json({ data: signUpUserData, message: 'signup' });
    } catch (error) {
      next(error);
    }
  };

  public logIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: LoginDto = req.body;
      const { tokenData, findUser } = await authService.login(userData);
      res.status(200).json({ data: findUser, message: 'login', token: tokenData.token });
    } catch (error) {
      next(error);
    }
  };

  public async verifyUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userData = req.user;
      res.status(200).json({ data: userData, message: 'User Verified Successfully!' });
    } catch (error) {
      next(error);
    }
  }

  public async sendResetPasswordMail(request: Request, response: Response, next: NextFunction) {
    try {
      const email = request.body.email ? String(request.body.email) : '';
      if (!email) throw new HttpException(400, 'Email is required');
      await authService.sendResetPasswordMail(email);
      response.status(200).json({ message: 'Reset password mail sent successfully' });
    } catch (error) {
      next(error);
    }
  }
  public async verifyOTP(request: Request, response: Response, next: NextFunction) {
    try {
      const email = request.body.email ? String(request.body.email) : '';
      const otp = request.body.otp ? String(request.body.otp) : '';
      if (!email) throw new HttpException(400, 'Email is required');
      if (!otp) throw new HttpException(400, 'OTP is required');
      await authService.verifyOTP(otp, email);
      response.status(200).json({ message: 'OTP verified successfully!' });
    } catch (error) {
      next(error);
    }
  }
}

export default AuthController;
