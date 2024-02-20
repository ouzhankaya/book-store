import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { RegisterDto } from './dtos/registerDto';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('register')
  async register(@Body() registerDto: RegisterDto, @Res() res) {
    try {
      const newUser = await this.authService.register(registerDto);
      if (!newUser) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          status: false,
          message: 'an error occured while user creation',
        });
      }
      return res.status(HttpStatus.CREATED).json({
        status: true,
        data: newUser,
      });
    } catch (error) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ status: false, message: error.message });
    }
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res() res) {
    try {
      let result = await this.authService.login(loginDto);
      if (!result) {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .json({ status: false, message: 'login is not successfull' });
      }
      return res
        .status(HttpStatus.OK)
        .json({ data: result.data, token: result.token });
    } catch (error) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: error.message });
    }
  }
}
