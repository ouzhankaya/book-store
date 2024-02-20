import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './components/users/users.module';
import { UsersController } from './components/users/users.controller';
import { UsersService } from './components/users/users.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthController } from './components/auth/auth.controller';
import { AuthModule } from './components/auth/auth.module';
import { AuthService } from './components/auth/auth.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BookStoreModule } from './components/book-store/book-store.module';
import { BookStoreController } from './components/book-store/book-store.controller';
import { BookStoreService } from './components/book-store/book-store.service';
import { JwtStrategy } from './components/auth/jwt/jwt.strategy';
import { BookService } from './components/book/book.service';
import { BookController } from './components/book/book.controller';
import { BookModule } from './components/book/book.module';
import { BookStoreInventoryModule } from './components/book-store-inventory/book-store-inventory.module';
import { BookStoreInventoryController } from './components/book-store-inventory/book-store-inventory.controller';
import { BookStoreInventoryService } from './components/book-store-inventory/book-store-inventory.service';
@Module({
  imports: [
    UsersModule,
    AuthModule,
    BookStoreModule,
    BookModule,
    BookStoreInventoryModule,
  ],
  controllers: [
    AppController,
    UsersController,
    AuthController,
    BookStoreController,
    BookController,
    BookStoreInventoryController,
  ],
  providers: [
    AppService,
    UsersService,
    AuthService,
    JwtService,
    ConfigService,
    BookStoreService,
    JwtStrategy,
    BookService,
    BookStoreInventoryService,
  ],
})
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: configService.get<string>('JWT_EXPIRES') },
      }),
    }),
  ],
})
export class AppModule {}
