import { IsString, IsNotEmpty, IsNumber, IsIn } from 'class-validator';

export class UpdateBookFromStoreDto {
  @IsNumber()
  @IsNotEmpty()
  bookId: number;

  @IsNumber()
  @IsNotEmpty()
  bookStoreId: number;

  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsString()
  @IsNotEmpty()
  @IsIn(['add', 'remove'])
  type: string;
}
