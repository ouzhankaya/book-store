import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UserRole } from 'src/enums/userRole.enum';
import { JwtAuthGuard } from 'src/guards/jwtAuth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/helpers/rolesDecorator';
import { UpdateBookFromStoreDto } from './dtos/updateBookFromStore.dto';
import { BookStoreInventoryService } from './book-store-inventory.service';

@Controller('book-store-inventories')
export class BookStoreInventoryController {
  constructor(private bookStoreInventoryService: BookStoreInventoryService) {}

  @Roles(UserRole.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put('upsert-book-inventory')
  async upsertBookInventory(
    @Body() updateBookFromStoreDto: UpdateBookFromStoreDto,
    @Res() res,
  ) {
    try {
      const result = await this.bookStoreInventoryService.upsertBookInventory(
        updateBookFromStoreDto,
      );
      if (result && result.status && !result.status) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          status: false,
          data: null,
          message: result.message,
        });
      }
      return res
        .status(HttpStatus.OK)
        .json({ status: true, data: result.data });
    } catch (error) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: error.message });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getBook(@Param('id') id: number, @Res() res) {
    try {
      const result = await this.bookStoreInventoryService.getBooksByStoreId(id);

      return res.status(HttpStatus.OK).json({ status: true, data: result });
    } catch (error) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: error.message });
    }
  }

  @Roles(UserRole.StoreManager)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put('update-book-inventory')
  async updateBookInventory(
    @Body() updateBookFromStoreDto: UpdateBookFromStoreDto,
    @Res() res,
  ) {
    try {
      const result = await this.bookStoreInventoryService.updateBookInventory(
        updateBookFromStoreDto,
      );

      if (result && !result.status) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          status: false,
          data: null,
          message: result.message,
        });
      }
      return res
        .status(HttpStatus.OK)
        .json({ status: true, data: result.data });
    } catch (error) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ status: false, data: null, message: error.message });
    }
  }
}
