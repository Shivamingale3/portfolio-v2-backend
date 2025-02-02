import { HttpException } from '@/exceptions/HttpException';
import skillService from '@/services/skill.service';
import { NextFunction, Request, Response } from 'express';

class SkillController {
  public async getAll(request: Request, response: Response, next: NextFunction) {
    try {
      const skills = await skillService.getAll();
      response.status(200).json(skills);
    } catch (error) {
      next(error);
    }
  }

  public async updateById(request: Request, response: Response, next: NextFunction) {
    try {
      const updatedSkillData = request.body.updatedSkill;
      if (!updatedSkillData) throw new HttpException(400, 'No skill data provided');
      const updatedSkill = await skillService.updateById(updatedSkillData);
      response.status(200).json(updatedSkill);
    } catch (error) {
      next(error);
    }
  }
}
const skillController = new SkillController();
export default skillController;
