import { HttpException } from '@/exceptions/HttpException';
import { IProfile } from '@/interfaces/profile.interface';
import profileModel from '@/models/profile.model';

class ProfileService {
  public profileCollection = profileModel;
  public filter;

  constructor() {
    this.filter = { homeId: 15012002 };
  }

  public async getProfile() {
    try {
      const profileData = await this.profileCollection.findOne(this.filter).lean();
      if (!profileData) throw new HttpException(400, 'Something went wrong while fetching profile!');
      return profileData;
    } catch (error) {
      throw error;
    }
  }

  public async updateProfile(updatedProfileData: IProfile) {
    try {
      const profileData = await this.profileCollection.findOneAndUpdate(this.filter, updatedProfileData, {
        upsert: true,
        new: true,
      });
      if (!profileData) throw new HttpException(400, 'Something went wrong while fetching profile!');
      return profileData;
    } catch (error) {
      throw error;
    }
  }
}
const profileService = new ProfileService();
export default profileService;
