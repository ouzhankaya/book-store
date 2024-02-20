import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dtos/createBook.dto';
import { Roles } from 'src/helpers/rolesDecorator';
import { UserRole } from 'src/enums/userRole.enum';
import { JwtAuthGuard } from 'src/guards/jwtAuth.guard';
import { RolesGuard } from 'src/guards/roles.guard';

@Controller('books')
export class BookController {
  constructor(private bookService: BookService) {}

  @Roles(UserRole.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async create(@Body() createBookDto: CreateBookDto, @Res() res) {
    try {
      const result = await this.bookService.create(createBookDto);
      if (!result) {
        return res.status(HttpStatus.OK).json({
          status: false,
          data: null,
          message: 'this book is already exist',
        });
      }
      return res.status(HttpStatus.OK).json({ status: true, data: result });
    } catch (error) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: error.message });
    }
  }
}
