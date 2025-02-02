import { HttpException } from '@/exceptions/HttpException';
import { IProject } from '@/interfaces/project.interface';
import projectModel from '@/models/project.model';

class ProjectService {
  public projectsCollection = projectModel;

  public async getAll() {
    try {
      const allProjects = await this.projectsCollection.find().lean();
      if (!allProjects) throw new HttpException(400, 'No projects found');
      return allProjects;
    } catch (error) {
      throw error;
    }
  }

  public async updateProject(updateProjectData: IProject) {
    try {
      const filter: any = {
        _id: updateProjectData.id,
      };
      delete updateProjectData.id;
      const updatedProject = await this.projectsCollection.findByIdAndUpdate(filter, updateProjectData, { upsert: true, new: true });
      if (!updatedProject) throw new HttpException(400, 'Project not found');
      return updatedProject;
    } catch (error) {
      throw error;
    }
  }
}
const projectService = new ProjectService();
export default projectService;
