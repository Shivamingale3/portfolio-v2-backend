import experienceController from '@/controllers/experience.controller';
import { Routes } from '@interfaces/routes.interface';
import { Router } from 'express';

class ExperienceRoute implements Routes {
  public path = '/experience';
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/add`, experienceController.add);
    this.router.get(`${this.path}/get-by-id`, experienceController.getById);
    this.router.get(`${this.path}/get-all`, experienceController.getAll);
    this.router.post(`${this.path}/update-by-id`, experienceController.updateById);
    this.router.post(`${this.path}/delete-by-id`, experienceController.deleteById);
  }
}

export default ExperienceRoute;
