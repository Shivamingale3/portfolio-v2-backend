import { Router } from 'express';
import AuthController from '@controllers/auth.controller';
import { CreateUserDto, LoginDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import authMiddleware from '@middlewares/auth.middleware';
import validationMiddleware from '@middlewares/validation.middleware';

class AuthRoute implements Routes {
  public path = '/auth';
  public router = Router();
  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/register`, validationMiddleware(CreateUserDto, 'body'), this.authController.signUp);
    this.router.post(`${this.path}/login`, validationMiddleware(LoginDto, 'body'), this.authController.logIn);
    this.router.get(`${this.path}/verify-user`, authMiddleware, this.authController.verifyUser);
    this.router.post(`${this.path}/send-reset-password-mail`, this.authController.sendResetPasswordMail);
    this.router.post(`${this.path}/verify-otp`, this.authController.verifyOTP);
  }
}

export default AuthRoute;
