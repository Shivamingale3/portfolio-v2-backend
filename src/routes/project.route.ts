import profileController from '@/controllers/profile.controller';
import { Routes } from '@interfaces/routes.interface';
import { Router } from 'express';

class ProjectRoute implements Routes {
  public path = '/project';
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/get-all`, profileController.getProfile);
  }
}

export default ProjectRoute;
