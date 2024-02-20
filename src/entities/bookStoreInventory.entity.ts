import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Bookstore } from './bookStore.entity';
import { Book } from './book.entity';

@Entity()
export class BookStoreInventory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Bookstore)
  bookStore: Bookstore;

  @ManyToOne(() => Book)
  book: Book;

  @Column()
  amount: number;
}
