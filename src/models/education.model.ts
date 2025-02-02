import { IEducation } from '@/interfaces/education.interface';
import { Document, model, Schema } from 'mongoose';

const educationSchema: Schema = new Schema({
  degree: {
    type: String,
    required: true,
  },
  institute: {
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

const educationModel = model<IEducation & Document>('education', educationSchema);

export default educationModel;
