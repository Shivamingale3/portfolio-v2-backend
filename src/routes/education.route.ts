import educationController from '@/controllers/education.controller';
import { Routes } from '@interfaces/routes.interface';
import { Router } from 'express';

class EducationRoute implements Routes {
  public path = '/education';
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/add`, educationController.add);
    this.router.get(`${this.path}/get-by-id`, educationController.getById);
    this.router.get(`${this.path}/get-all`, educationController.getAll);
    this.router.post(`${this.path}/update-by-id`, educationController.updateById);
    this.router.post(`${this.path}/delete-by-id`, educationController.deleteById);
  }
}

export default EducationRoute;
