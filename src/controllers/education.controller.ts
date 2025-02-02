import { HttpException } from '@/exceptions/HttpException';
import { IEducation } from '@/interfaces/education.interface';
import educationService from '@/services/education.service';
import { NextFunction, Request, Response } from 'express';

class EducationController {
  public async add(request: Request, response: Response, next: NextFunction) {
    try {
      const educationData: IEducation = request.body.educationData;
      const result = await educationService.add(educationData);
      response.status(200).json({
        status: true,
        message: 'Education added successfully',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  public async getById(request: Request, response: Response, next: NextFunction) {
    try {
      const id: string = request.query.id ? String(request.query.id) : '';
      if (!id) throw new HttpException(400, 'Education id is required!');
      const result = await educationService.getById(id);
      response.status(200).json({
        status: true,
        message: 'Education fetched successfully',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  public async getAll(request: Request, response: Response, next: NextFunction) {
    try {
      const result = await educationService.getAll();
      response.status(200).json({
        status: true,
        message: 'All Education fetched successfully',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  public async updateById(request: Request, response: Response, next: NextFunction) {
    try {
      const updatedEducationData: IEducation = request.body.educationData ? request.body.educationData : null;
      if (!updatedEducationData) throw new HttpException(400, 'Education data is required!');
      const result = await educationService.updateById(updatedEducationData);
      response.status(200).json({
        status: true,
        message: 'Education updated successfully',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  public async deleteById(request: Request, response: Response, next: NextFunction) {
    try {
      const id: string = request.query.id ? String(request.query.id) : '';
      if (!id) throw new HttpException(400, 'Education id is required!');
      const result = await educationService.deleteById(id);
      response.status(200).json({
        status: true,
        message: 'Education deleted successfully',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}
const educationController = new EducationController();
export default educationController;
