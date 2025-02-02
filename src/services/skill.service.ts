import { ISkill } from '@/interfaces/skills.interface';
import skillModel from '@/models/skill.model';

class SkillService {
  public skillsCollection = skillModel;

  public async getAll() {
    try {
      const skills = await this.skillsCollection.find();
      if (!skills) throw new Error('No skills found');
      return skills;
    } catch (error) {
      throw error;
    }
  }

  public async updateById(updatedSkill: ISkill) {
    try {
      const id = updatedSkill._id;
      delete updatedSkill._id;
      const skill = await this.skillsCollection.findOneAndUpdate({ _id: id }, updatedSkill, {
        upsert: true,
        new: true,
      });
      if (!skill) throw new Error('No skill found');
      return skill;
    } catch (error) {
      throw error;
    }
  }
}
const skillService = new SkillService();
export default skillService;
