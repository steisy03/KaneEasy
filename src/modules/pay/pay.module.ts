import { Module } from '@nestjs/common';
import { PayService } from './pay.service';
import { LoanService } from '../loan/loan.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pay } from './entities/pay.entity';
import { Loan } from '../loan/entities/loan.entity';
import { LoanRequest } from '../loan/entities/loan-request.entity';
import { QuoteService } from '../quote/quote.service';
import { Quote } from '../quote/entities/quote.entity';
import { PayController } from './pay.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Pay]),
    TypeOrmModule.forFeature([Loan]),
    TypeOrmModule.forFeature([LoanRequest]),
    TypeOrmModule.forFeature([Quote]),
  ],
  providers: [PayService, LoanService, QuoteService],
  exports: [PayService, LoanService, QuoteService],
  controllers: [PayController],
})
export class PayModule {}
