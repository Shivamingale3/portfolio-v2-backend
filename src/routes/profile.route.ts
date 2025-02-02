import profileController from '@/controllers/profile.controller';
import { Routes } from '@interfaces/routes.interface';
import { Router } from 'express';

class ProfileRoute implements Routes {
  public path = '/profile';
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/get`, profileController.getProfile);
    this.router.post(`${this.path}/update`, profileController.updateProfile);
  }
}

export default ProfileRoute;
