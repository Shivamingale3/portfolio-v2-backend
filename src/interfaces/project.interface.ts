export interface IProject {
  id: number;
  projectTitle?: string;
  projectDescription?: string;
  previewImages?: string[];
  previewVideos?: string[];
  technologies?: IProjectTechnology[];
  githubRepoLink?: string;
  liveLink?: string;
  tags?: string[];
}

export interface IProjectTechnology {
  name?: string;
  icon?: string;
}
