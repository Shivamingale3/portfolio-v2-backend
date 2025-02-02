import { HttpException } from '@/exceptions/HttpException';
import { IExperience } from '@/interfaces/experience.interface';
import experienceService from '@/services/experience.service';
import { NextFunction, Request, Response } from 'express';

class ExperienceController {
  public async add(request: Request, response: Response, next: NextFunction) {
    try {
      const experienceData: IExperience = request.body.experienceData ? request.body.experienceData : null;
      if (experienceData) throw new HttpException(400, 'Experience data is required');
      const experience = await experienceService.add(experienceData);
      response.status(200).json({ message: 'Education added Successfully!', data: experience });
    } catch (error) {
      next(error);
    }
  }

  public async getById(request: Request, response: Response, next: NextFunction) {
    try {
      const id: string = request.query.id ? String(request.query.id) : null;
      if (!id) throw new HttpException(400, 'Experience id is required');
      const experience: IExperience = await experienceService.getById(id);
      response.status(200).json({ message: 'Experience Fetched Successfully!', data: experience });
    } catch (error) {
      next(error);
    }
  }

  public async getAll(request: Request, response: Response, next: NextFunction) {
    try {
      const experiences: IExperience[] = await experienceService.getAll();
      response.status(200).json({ message: 'Experiences Fetched Successfully!', data: experiences });
    } catch (error) {
      next(error);
    }
  }

  public async updateById(request: Request, response: Response, next: NextFunction) {
    try {
      const experienceData: IExperience = request.body.experienceData ? request.body.experienceData : null;
      if (!experienceData) throw new HttpException(400, 'Experience data is required');
      const experience: IExperience = await experienceService.updateById(experienceData);
      response.status(200).json({ message: 'Experience Updated Successfully!', data: experience });
    } catch (error) {
      next(error);
    }
  }

  public async deleteById(request: Request, response: Response, next: NextFunction) {
    try {
      const id: string = request.query.id ? String(request.query.id) : null;
      if (!id) throw new HttpException(400, 'Experience id is required');
      const experience: IExperience = await experienceService.deleteById(id);
      response.status(200).json({ message: 'Experience Deleted Successfully!', data: experience });
    } catch (error) {
      next(error);
    }
  }
}
const experienceController = new ExperienceController();
export default experienceController;
