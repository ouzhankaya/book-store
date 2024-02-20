import { IsString, IsNotEmpty, Length } from 'class-validator';

export class CreateBookStoreDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
