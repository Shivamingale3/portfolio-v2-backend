import { cleanEnv, port, str } from 'envalid';

const validateEnv = () => {
  cleanEnv(process.env, {
    NODE_ENV: str(),
    PORT: port(),
    MONGO_URI: str(),
    SECRET_KEY: str(),
    LOG_FORMAT: str(),
    LOG_DIR: str(),
    ORIGIN: str(),
    SMTP_HOST: str(),
    SMTP_PORT: str(),
    SMTP_USER: str(),
    SMTP_PASSWORD: str(),
  });
};

export default validateEnv;
