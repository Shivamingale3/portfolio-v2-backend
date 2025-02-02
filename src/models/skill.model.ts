import { ISkill } from '@/interfaces/skills.interface';
import { Document, model, Schema } from 'mongoose';

const skillSchema: Schema = new Schema({
  skillTitle: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  confidence: {
    type: Number,
    required: true,
  },
});

const skillModel = model<ISkill & Document>('Skills', skillSchema);

export default skillModel;
