import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Source } from 'src/data/source';
import { User } from 'src/entities/user.entity';
import { RegisterDto } from './dtos/registerDto';
import { LoginDto } from './dtos/login.dto';
import { ConfigService } from '@nestjs/config';
import { BcryptHelper } from 'src/helpers/bcryptHelper';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  private userRepository = Source.getRepository(User);
  async register(registerDto: RegisterDto): Promise<any> {
    const bcryptHelper = new BcryptHelper();

    const checkUser = await this.findByEmail(registerDto.email);
    if (checkUser) {
      return null;
    }
    const user = new User();
    user.email = registerDto.email;
    user.firstName = registerDto.firstName;
    user.lastName = registerDto.lastName;
    user.password = await bcryptHelper.hashPassword(registerDto.password);
    return await this.userRepository.save(user);
  }

  async validateUser(email: string, password: string): Promise<any> {
    const bcryptHelper = new BcryptHelper();
    const user = await this.findByEmail(email);

    if (!user) return null;
    const isPasswordValid = await bcryptHelper.validatePassword(
      password,
      user.password,
    );

    if (!isPasswordValid) return null;
    return user;
  }

  async findByEmail(email: string): Promise<any> {
    const user = await this.userRepository.findOneBy({ email: email });
    return user;
  }

  async login(loginDto: LoginDto): Promise<any> {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      return false;
    }
    const payload = {
      email: user.email,
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
    };
    let token = await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('JWT_SECRET'),
    });
    return {
      data: payload,
      token,
    };
  }
}
