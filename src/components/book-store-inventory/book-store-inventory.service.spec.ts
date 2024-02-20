import { Test, TestingModule } from '@nestjs/testing';
import { BookStoreInventoryService } from './book-store-inventory.service';

describe('BookStoreInventoryService', () => {
  let service: BookStoreInventoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookStoreInventoryService],
    }).compile();

    service = module.get<BookStoreInventoryService>(BookStoreInventoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
