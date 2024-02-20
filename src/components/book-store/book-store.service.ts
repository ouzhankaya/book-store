import { Injectable } from '@nestjs/common';
import { Source } from 'src/data/source';
import { Bookstore } from 'src/entities/bookStore.entity';
import { CreateBookStoreDto } from './dtos/createBookStore.dto';

@Injectable()
export class BookStoreService {
  constructor() {}
  private bookStoreRepository = Source.getRepository(Bookstore);

  async findAll(): Promise<any> {
    const boolStores = await this.bookStoreRepository.find({});
    return boolStores;
  }

  async findById(id: number): Promise<any> {
    const boolStores = await this.bookStoreRepository.findOneBy({ id: id });
    return boolStores;
  }

  async create(createBookStoreDto: CreateBookStoreDto): Promise<Bookstore> {
    let bookStore = new Bookstore();
    bookStore.name = createBookStoreDto.name;

    return await this.bookStoreRepository.save(bookStore);
  }
}
