import { HttpException } from '@/exceptions/HttpException';
import { IEducation } from '@/interfaces/education.interface';
import educationModel from '@/models/education.model';

class EducationService {
  public educationCollection = educationModel;

  public async add(educationData: IEducation) {
    try {
      const newEducation = await this.educationCollection.create(educationData);
      if (!newEducation) throw new HttpException(400, `Something went wrong while adding new education!`);
      return newEducation;
    } catch (error) {
      throw error;
    }
  }
  public async getById(id: string) {
    try {
      const education = await this.educationCollection.findById(id);
      if (!education) throw new HttpException(400, 'No Education found!');
      return education;
    } catch (error) {
      throw error;
    }
  }

  public async getAll() {
    try {
      const educationList = await this.educationCollection.find();
      if (!educationList) throw new HttpException(400, 'No Education found!');
      return educationList;
    } catch (error) {
      throw error;
    }
  }

  public async updateById(updatedEducationData: IEducation) {
    try {
      const id: string = updatedEducationData._id;
      delete updatedEducationData._id;
      const updatedEducation = await this.educationCollection.findOneAndUpdate({ _id: id }, updatedEducationData, { upsert: true, new: true });
      if (!updatedEducation) throw new HttpException(400, `Something went wrong while updating education id: ${id}!`);
      return updatedEducation;
    } catch (error) {
      throw error;
    }
  }

  public async deleteById(id: string) {
    try {
      const deletedEducation = await this.educationCollection.findByIdAndDelete(id);
      if (!deletedEducation) throw new HttpException(400, `Something went wrong while deleting education id: ${id}!`);
      return deletedEducation;
    } catch (error) {
      throw error;
    }
  }
}
const educationService = new EducationService();
export default educationService;
