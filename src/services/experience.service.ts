import { HttpException } from '@/exceptions/HttpException';
import { IExperience } from '@/interfaces/experience.interface';
import experienceModel from '@/models/experience.model';

class ExperienceService {
  public experienceCollection = experienceModel;

  public async add(experienceData: IExperience) {
    try {
      const newExperience = await this.experienceCollection.create(experienceData);
      if (!newExperience) throw new HttpException(400, 'Something went wrong while adding Experience!');
      return newExperience;
    } catch (error) {
      throw error;
    }
  }

  public async getById(id: string) {
    try {
      const experience: IExperience = await this.experienceCollection.findById(id).lean();
      if (!experience) throw new HttpException(404, `Experience with id ${id} not found!`);
      return experience;
    } catch (error) {
      throw error;
    }
  }

  public async getAll() {
    try {
      const experiences: IExperience[] = await this.experienceCollection.find().lean();
      if (!experiences) throw new HttpException(404, 'No Experience found!');
      return experiences;
    } catch (error) {
      throw error;
    }
  }

  public async updateById(experienceData: IExperience) {
    try {
      const id: string = experienceData._id;
      delete experienceData._id;
      const updatedExperience: IExperience = await this.experienceCollection.findByIdAndUpdate(id, experienceData, { new: true }).lean();
      if (!updatedExperience) throw new HttpException(400, 'Something went wrong while updating Experience!');
      return updatedExperience;
    } catch (error) {
      throw error;
    }
  }

  public async deleteById(id: string) {
    try {
      const deletedExperience: IExperience = await this.experienceCollection.findByIdAndDelete(id).lean();
      if (!deletedExperience) throw new HttpException(400, 'Something went wrong while deleting Experience!');
      return deletedExperience;
    } catch (error) {
      throw error;
    }
  }
}
const experienceService = new ExperienceService();
export default experienceService;
