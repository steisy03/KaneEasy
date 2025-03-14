import { Module } from '@nestjs/common';
import { LoanService } from './loan.service';
import { LoanController } from './loan.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Loan } from './entities/loan.entity';
import { LoanRequest } from './entities/loan-request.entity';
import { QuoteService } from '../quote/quote.service';
import { Quote } from '../quote/entities/quote.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Loan]),
    TypeOrmModule.forFeature([LoanRequest]),
    TypeOrmModule.forFeature([Quote])
  ],
  providers: [LoanService, QuoteService ],
  controllers: [LoanController],
  exports: [LoanService, QuoteService ],
})
export class LoanModule {}
