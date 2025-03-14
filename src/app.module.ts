import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { LoanRequestModule } from './modules/loan-request/loan-request.module';
import { PersonModule } from './modules/person/person.module';
import { LoanTypeModule } from './modules/loan-type/loan-type.module';
import { LoanModule } from './modules/loan/loan.module';
import { QuoteModule } from './modules/quote/quote.module';
import { PayModule } from './modules/pay/pay.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +(process.env.DB_PORT || 5432),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // Set to false in production
    }),
    UsersModule,
    AuthModule,
    LoanRequestModule,
    PersonModule,
    LoanTypeModule,
    LoanModule,
    QuoteModule,
    PayModule,
  ],
})
export class AppModule {}
