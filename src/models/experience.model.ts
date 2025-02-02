import { IExperience } from '@/interfaces/experience.interface';
import { Document, model, Schema } from 'mongoose';

const experienceSchema: Schema = new Schema({
  position: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const experienceModel = model<IExperience & Document>('experience', experienceSchema);

export default experienceModel;
