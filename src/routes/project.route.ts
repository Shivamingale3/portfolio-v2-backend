import projectController from '@/controllers/project.controller';
import { Routes } from '@interfaces/routes.interface';
import { Router } from 'express';

class ProjectRoute implements Routes {
  public path = '/project';
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/get-all`, projectController.getAll);
    this.router.get(`${this.path}/get-by-id`, projectController.getById);
    this.router.post(`${this.path}/update-by-id`, projectController.updateById);
  }
}

export default ProjectRoute;
