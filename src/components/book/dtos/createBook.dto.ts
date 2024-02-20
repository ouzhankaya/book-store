import { IsString, IsNotEmpty, Length } from 'class-validator';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  isbn: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}
