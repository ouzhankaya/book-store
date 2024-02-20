import { IsString, IsNotEmpty, Length, IsEmail } from 'class-validator';
import { UserRole } from 'src/enums/userRole.enum';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 16)
  password: string;

  @IsNotEmpty()
  role: UserRole;
}
