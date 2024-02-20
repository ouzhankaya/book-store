import { IsString, IsNotEmpty, IsNumber, IsIn } from 'class-validator';

export class GetBookDto {
  id: number;
  name: string;
  isbn: string;
  amount: number;
}
