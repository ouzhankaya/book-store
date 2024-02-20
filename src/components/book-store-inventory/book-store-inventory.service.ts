import { Injectable } from '@nestjs/common';
import { UpdateBookFromStoreDto } from './dtos/updateBookFromStore.dto';
import { BookService } from '../book/book.service';
import { Source } from 'src/data/source';
import { BookStoreInventory } from 'src/entities/bookStoreInventory.entity';
import { BookStoreService } from '../book-store/book-store.service';
import { GetBookDto } from './dtos/getBook.dto';

@Injectable()
export class BookStoreInventoryService {
  constructor(
    private bookService: BookService,
    private bookStoreService: BookStoreService,
  ) {}
  private bookStoreInventoryRepository =
    Source.getRepository(BookStoreInventory);
  async upsertBookInventory(
    updateBookFromStoreDto: UpdateBookFromStoreDto,
  ): Promise<any> {
    const book = await this.bookService.findById(updateBookFromStoreDto.bookId);
    if (!book) {
      return {
        status: false,
        message: 'Book could not found',
      };
    }

    const bookStore = await this.bookStoreService.findById(
      updateBookFromStoreDto.bookStoreId,
    );
    if (!bookStore) {
      return {
        status: false,
        message: 'Book store could not found',
      };
    }

    const bookStoreInventory = await this.findBookStoreInventory(
      updateBookFromStoreDto.bookId,
      updateBookFromStoreDto.bookStoreId,
    );

    if (!bookStoreInventory && updateBookFromStoreDto.type === 'remove') {
      return {
        status: false,
        message: 'book store inventory could not found',
      };
    }

    if (
      bookStoreInventory &&
      updateBookFromStoreDto.type === 'remove' &&
      bookStoreInventory.amount < updateBookFromStoreDto.amount
    ) {
      return {
        status: false,
        message: 'there are not enough books',
      };
    }

    if (!bookStoreInventory && updateBookFromStoreDto.type === 'add') {
      const newBookStoreInventory = new BookStoreInventory();
      newBookStoreInventory.amount = updateBookFromStoreDto.amount;
      newBookStoreInventory.book = book;
      newBookStoreInventory.bookStore = bookStore;

      await this.bookStoreInventoryRepository.save(newBookStoreInventory);
    }

    if (bookStoreInventory) {
      bookStoreInventory.amount =
        updateBookFromStoreDto.type === 'add'
          ? bookStoreInventory.amount + updateBookFromStoreDto.amount
          : bookStoreInventory.amount - updateBookFromStoreDto.amount;
      let data = await this.bookStoreInventoryRepository.save(
        bookStoreInventory,
      );
      return {
        status: true,
        data,
      };
    }
  }

  async findBookStoreInventory(
    bookId: number,
    bookStoreId: number,
  ): Promise<any> {
    const query = this.bookStoreInventoryRepository
      .createQueryBuilder('bookStoreInventory')
      .leftJoinAndSelect('bookStoreInventory.book', 'book')
      .leftJoinAndSelect('bookStoreInventory.bookStore', 'bookStore');

    if (bookId) {
      query.andWhere('book.id = :bookId', { bookId });
    }

    if (bookStoreId) {
      query.andWhere('bookStore.id = :bookStoreId', { bookStoreId });
    }

    return await query.getOne();
  }

  async findBookStoreInventoryByBookStore(bookStoreId: number): Promise<any> {
    const query = this.bookStoreInventoryRepository
      .createQueryBuilder('bookStoreInventory')
      .innerJoinAndSelect('bookStoreInventory.bookStore', 'bookStore')
      .where('bookStore.id = :bookStoreId', { bookStoreId })
      .andWhere('bookStoreInventory.amount > :amount', { amount: 0 });

    return await query.getMany();
  }

  async getBooksByStoreId(bookStoreId: number): Promise<any> {
    let bookStoreInventories = await this.findBookStoreInventoryByBookStore(
      bookStoreId,
    );

    let data: GetBookDto[] = [];

    if (!bookStoreInventories.length) return { status: true, data };

    await Promise.allSettled(
      bookStoreInventories.map(async (b) => {
        let book = await this.bookService.findById(b.id);

        if (book) {
          data.push({
            id: book.id,
            name: book.name,
            isbn: book.isbn,
            amount: b.amount,
          });
        }
      }),
    );

    console.log(data);

    return { status: true, data };
  }

  async updateBookInventory(
    updateBookFromStoreDto: UpdateBookFromStoreDto,
  ): Promise<any> {
    const book = await this.bookService.findById(updateBookFromStoreDto.bookId);
    if (!book) {
      return {
        status: false,
        message: 'Book could not found',
      };
    }

    const bookStore = await this.bookStoreService.findById(
      updateBookFromStoreDto.bookStoreId,
    );
    if (!bookStore) {
      return {
        status: false,
        message: 'Book store could not found',
      };
    }

    const bookStoreInventory = await this.findBookStoreInventory(
      updateBookFromStoreDto.bookId,
      updateBookFromStoreDto.bookStoreId,
    );

    if (!bookStoreInventory) {
      return {
        status: false,
        message: 'book store inventory not found',
      };
    }

    if (
      bookStoreInventory &&
      updateBookFromStoreDto.type === 'remove' &&
      bookStoreInventory.amount < updateBookFromStoreDto.amount
    ) {
      return {
        status: false,
        message: 'there are not enough books',
      };
    }

    if (bookStoreInventory) {
      bookStoreInventory.amount =
        updateBookFromStoreDto.type === 'add'
          ? bookStoreInventory.amount + updateBookFromStoreDto.amount
          : bookStoreInventory.amount - updateBookFromStoreDto.amount;
      let data = await this.bookStoreInventoryRepository.save(
        bookStoreInventory,
      );
      return {
        status: true,
        data,
      };
    }
  }
}
