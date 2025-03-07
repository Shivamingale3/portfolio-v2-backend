import App from '@/app';
import AuthRoute from '@routes/auth.route';
import IndexRoute from '@routes/index.route';
import UsersRoute from '@routes/users.route';
import validateEnv from '@utils/validateEnv';
import ProfileRoute from './routes/profile.route';
import ProjectRoute from './routes/project.route';
import SkillRoute from './routes/skill.route';
import EducationRoute from './routes/education.route';
import ExperienceRoute from './routes/experience.route';

validateEnv();

const app = new App([
  new IndexRoute(),
  new UsersRoute(),
  new AuthRoute(),
  new ProfileRoute(),
  new ProjectRoute(),
  new SkillRoute(),
  new EducationRoute(),
  new ExperienceRoute(),
]);

app.listen();
