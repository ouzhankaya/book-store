import { Injectable } from '@nestjs/common';
import { Source } from 'src/data/source';
import { User } from 'src/entities/user.entity';
import { CreateUserDto } from './dtos/createUser.dto';

@Injectable()
export class UsersService {
  private userRepository = Source.getRepository(User);

  async create(createUserDto: CreateUserDto): Promise<any> {
    const checkUser = await this.findByEmail(createUserDto.email);
    if (checkUser) {
      return null;
    }
    const user = new User();
    user.email = createUserDto.email;
    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;
    user.password = createUserDto.password;
    user.role = createUserDto.role;
    return await this.userRepository.save(user);
  }

  async findByEmail(email: string): Promise<any> {
    const user = await this.userRepository.findOneBy({ email: email });
    return user;
  }
}
