import { Injectable } from '@nestjs/common';
import { Source } from 'src/data/source';
import { Book } from 'src/entities/book.entity';
import { CreateBookDto } from './dtos/createBook.dto';

@Injectable()
export class BookService {
  private bookRepository = Source.getRepository(Book);

  async create(createBookDto: CreateBookDto): Promise<any> {
    const checkBook = await this.findByISBN(createBookDto.isbn);
    if (checkBook) {
      return false;
    }

    const book = new Book();

    book.isbn = createBookDto.isbn;
    book.name = createBookDto.isbn;

    return await this.bookRepository.save(book);
  }

  async findByISBN(isbn: string) {
    const book = await this.bookRepository.findOneBy({ isbn: isbn });
    return book;
  }

  async findById(id: number) {
    const book = await this.bookRepository.findOneBy({ id: id });
    return book;
  }
}
