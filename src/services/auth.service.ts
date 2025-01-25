import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { SECRET_KEY } from '@config';
import { CreateUserDto, LoginDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, TokenData } from '@interfaces/auth.interface';
import { IUser } from '@interfaces/users.interface';
import userModel from '@models/users.model';
import { isEmpty } from '@utils/util';
import otpModel from '@/models/otp.model';
import { getResetPasswordTemplate } from './emailTemplate.service';
import { EmailService } from './nodeMailer.service';

class AuthService {
  public users = userModel;

  public async signup(userData: CreateUserDto): Promise<IUser> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');

    const findUser: IUser = await this.users.findOne({ email: userData.email });
    if (findUser) throw new HttpException(409, `This email ${userData.email} already exists`);

    const hashedPassword = await hash(userData.password, 10);
    const createUserData: IUser = await this.users.create({ ...userData, password: hashedPassword });

    return createUserData;
  }

  public async login(userData: LoginDto): Promise<{ cookie: string; findUser: IUser }> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');

    const findUser: IUser = await this.users.findOne({ email: userData.email });
    if (!findUser) throw new HttpException(409, `This email ${userData.email} was not found`);

    const isPasswordMatching: boolean = await compare(userData.password, findUser.password);
    if (!isPasswordMatching) throw new HttpException(409, 'Password is not matching');

    const tokenData = this.createToken(findUser);
    const cookie = this.createCookie(tokenData);

    return { cookie, findUser };
  }

  public async logout(userData: IUser): Promise<IUser> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');

    const findUser: IUser = await this.users.findOne({ email: userData.email, password: userData.password });
    if (!findUser) throw new HttpException(409, `This email ${userData.email} was not found`);

    return findUser;
  }

  public createToken(user: IUser): TokenData {
    const dataStoredInToken: DataStoredInToken = { _id: user._id };
    const secretKey: string = SECRET_KEY;
    const expiresIn: number = 60 * 60;

    return { expiresIn, token: sign(dataStoredInToken, secretKey, { expiresIn }) };
  }

  public createCookie(tokenData: TokenData): string {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
  }

  public generateOTP(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  public async sendResetPasswordMail(email) {
    try {
      const user: IUser = await this.users.findOne({ email: email });
      if (!user) throw new HttpException(400, `User with email: ${email} was not found`);
      const otp = this.generateOTP();
      await otpModel.findOneAndDelete({ email });
      const emailTemplate = getResetPasswordTemplate({ firstName: user.firstName, lastName: user.lastName, otp: otp });
      await new EmailService().sendEmail({ to: email, subject: 'Reset Password', html: emailTemplate });
      const document = otpModel.create({ email: email, otp: otp });
      if (!document) throw new HttpException(400, `Error while creating otp`);
      return;
    } catch (error) {
      otpModel.deleteOne({ email: email });
      throw error;
    }
  }

  public async verifyOTP(otp, email) {
    try {
      const document = await otpModel.findOne({ otp: otp, email: email });
      if (!document) throw new HttpException(400, `Invalid OTP or EMail`);
      await otpModel.findOneAndDelete({ otp: otp });
      return;
    } catch (error) {
      throw error;
    }
  }
}

const authService = new AuthService();
export default authService;
