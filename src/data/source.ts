import { DataSource } from 'typeorm';
import { Book } from '../entities/book.entity';
import { User } from '../entities/user.entity';
import { Bookstore } from '../entities/bookStore.entity';
import { BookStoreInventory } from '../entities/bookStoreInventory.entity';
import * as dotenv from 'dotenv';

dotenv.config();

export const Source = new DataSource({
  type: 'postgres',
  host: process.env.HOST,
  port: Number(process.env.PORT),
  username: 'bookStoreUser',
  password: 'postgresPW12',
  database: 'BookStoreDB',
  entities: [Book, User, Bookstore, BookStoreInventory],
  synchronize: true,
});

Source.initialize()
  .then(() => {
    console.log('database connection has been initialized');
  })
  .catch((error) => {
    console.error('Error during connection initialization', error);
  });
