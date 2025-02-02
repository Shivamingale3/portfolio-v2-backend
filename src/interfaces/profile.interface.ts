export interface IProfile {
  firstName?: string;
  lastName?: string;
  jobTitle?: string;
  profilePicture?: string;
  profileDescription?: string;
  socials?: ISocial[];
  homeId?: number;
}

export interface ISocial {
  name?: string;
  url?: string;
  icon?: string;
}
