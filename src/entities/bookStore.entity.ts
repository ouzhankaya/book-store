import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Bookstore {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
