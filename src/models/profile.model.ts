import { IProfile } from '@/interfaces/profile.interface';
import { Document, model, Schema } from 'mongoose';

const profileSchema: Schema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  jobTitle: {
    type: String,
    required: true,
  },
  profileDescription: {
    type: String,
    required: true,
  },
  socials: {
    type: [],
    required: true,
  },
  profilePicture: {
    type: String,
    required: true,
  },
  homeId: {
    type: Number,
    required: true,
  },
});

const profileModel = model<IProfile & Document>('profile', profileSchema);

export default profileModel;
