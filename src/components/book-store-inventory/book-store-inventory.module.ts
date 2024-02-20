import { Module } from '@nestjs/common';
import { BookStoreInventoryController } from './book-store-inventory.controller';
import { BookStoreInventoryService } from './book-store-inventory.service';
import { BookService } from '../book/book.service';
import { BookStoreService } from '../book-store/book-store.service';

@Module({
  controllers: [BookStoreInventoryController],
  providers: [BookStoreInventoryService, BookService, BookStoreService],
})
export class BookStoreInventoryModule {}
