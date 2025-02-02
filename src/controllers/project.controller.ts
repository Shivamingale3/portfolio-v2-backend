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

  public async updateProject(request: Request, response: Response, next: NextFunction) {
    try {
      const updateProjectData: IProject = request.body.updateProjectData;
      const updatedProject = await projectService.updateProject(updateProjectData);
      response.status(200).json({ message: 'Project updated successfully!', data: updatedProject });
    } catch (error) {
      next(error);
    }
  }
}

const projectController = new ProjectController();
export default projectController;
