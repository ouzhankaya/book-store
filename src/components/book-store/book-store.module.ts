import { Module } from '@nestjs/common';
import { BookStoreController } from './book-store.controller';
import { BookStoreService } from './book-store.service';

@Module({
  controllers: [BookStoreController],
  providers: [BookStoreService]
})
export class BookStoreModule {}
