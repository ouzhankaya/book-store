import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/createUser.dto';
import { Roles } from 'src/helpers/rolesDecorator';
import { UserRole } from 'src/enums/userRole.enum';
import { JwtAuthGuard } from 'src/guards/jwtAuth.guard';
import { RolesGuard } from 'src/guards/roles.guard';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Roles(UserRole.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Res() res) {
    try {
      const newUser = await this.userService.create(createUserDto);
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
        .json({ message: error.message });
    }
  }
}
