import { IProject } from '@/interfaces/project.interface';
import { Document, model, Schema } from 'mongoose';

const projectSchema: Schema = new Schema({
  projectTitle: {
    type: String,
    required: true,
  },
  projectDescription: {
    type: String,
    required: true,
  },
  previewImages: {
    type: Array,
    required: true,
  },
  previewVideos: {
    type: Array,
    required: true,
  },
  technologies: {
    type: Array,
    required: true,
  },
  githubRepoLink: {
    type: String,
    required: true,
  },
  liveLink: {
    type: String,
    required: true,
  },
  tags: {
    type: Array,
    required: true,
  },
});

const projectModel = model<IProject & Document>('Projects', projectSchema);

export default projectModel;
