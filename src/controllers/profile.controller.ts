import { HttpException } from '@/exceptions/HttpException';
import { IProfile } from '@/interfaces/profile.interface';
import profileService from '@/services/profile.service';
import { NextFunction, Request, Response } from 'express';

class ProfileController {
  public async getProfile(request: Request, response: Response, next: NextFunction) {
    try {
      const profileData = await profileService.getProfile();
      response.status(200).json({
        message: 'Profile fetched successfully',
        data: profileData,
      });
    } catch (error) {
      next(error);
    }
  }

  public async updateProfile(request: Request, response: Response, next: NextFunction) {
    try {
      const updatedProfileData: IProfile = request.body.updatedProfileData;
      if (!updatedProfileData) throw new HttpException(400, 'No data provided to update Profile!');
      const profileData = await profileService.updateProfile(request.body);
      response.status(200).json({
        message: 'Profile updated successfully',
        data: profileData,
      });
    } catch (error) {
      next(error);
    }
  }
}
const profileController = new ProfileController();
export default profileController;
