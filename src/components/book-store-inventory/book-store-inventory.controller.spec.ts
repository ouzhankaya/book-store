import { Test, TestingModule } from '@nestjs/testing';
import { BookStoreInventoryController } from './book-store-inventory.controller';

describe('BookStoreInventoryController', () => {
  let controller: BookStoreInventoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookStoreInventoryController],
    }).compile();

    controller = module.get<BookStoreInventoryController>(BookStoreInventoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
