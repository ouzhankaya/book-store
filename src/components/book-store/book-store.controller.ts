import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { BookStoreService } from './book-store.service';
import { JwtAuthGuard } from 'src/guards/jwtAuth.guard';
import { CreateBookStoreDto } from './dtos/createBookStore.dto';
import { RolesGuard } from 'src/guards/roles.guard';
import { UserRole } from 'src/enums/userRole.enum';
import { Roles } from 'src/helpers/rolesDecorator';

@Controller('book-stores')
export class BookStoreController {
  constructor(private bookStoreService: BookStoreService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Res() res) {
    try {
      const result = await this.bookStoreService.findAll();

      return res.status(HttpStatus.OK).json({ status: true, data: result });
    } catch (error) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: error.message });
    }
  }

  @Roles(UserRole.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async create(@Body() createBookStoreDto: CreateBookStoreDto, @Res() res) {
    try {
      const result = await this.bookStoreService.create(createBookStoreDto);

      return res.status(HttpStatus.OK).json({ status: true, data: result });
    } catch (error) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: error.message });
    }
  }
}
