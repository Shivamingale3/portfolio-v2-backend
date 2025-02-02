import { HttpException } from '@/exceptions/HttpException';
import { IProject } from '@/interfaces/project.interface';
import projectService from '@/services/project.service';
import { NextFunction, Request, Response } from 'express';

class ProjectController {
  public async getAll(request: Request, response: Response, next: NextFunction) {
    try {
      const allProjects = await projectService.getAll();
      response.status(200).json({ message: 'All projects fetched successfully!', data: allProjects });
    } catch (error) {
      next(error);
    }
  }

  public async getById(request: Request, response: Response, next: NextFunction) {
    try {
      const projectId = request.query.projectId ? String(request.query.projectId) : '';
      if (!projectId) throw new HttpException(400, 'Project id is required');
      const project = await projectService.getById(projectId);
      response.status(200).json({ message: 'Project fetched successfully!', data: project });
    } catch (error) {
      next(error);
    }
  }

  public async updateById(request: Request, response: Response, next: NextFunction) {
    try {
      const updateProjectData: IProject = request.body.updateProjectData;
      const updatedProject = await projectService.updateById(updateProjectData);
      response.status(200).json({ message: 'Project updated successfully!', data: updatedProject });
    } catch (error) {
      next(error);
    }
  }
}

const projectController = new ProjectController();
export default projectController;
