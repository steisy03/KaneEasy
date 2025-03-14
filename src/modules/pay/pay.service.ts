import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pay } from './entities/pay.entity';
import { Repository, Equal, DeepPartial } from 'typeorm';
import { LoanService } from '../loan/loan.service';
import { CreatePayDto } from './dto/create-pay.dto';
import { QuoteService } from '../quote/quote.service';

@Injectable()
export class PayService {
  constructor(
    private LoanService: LoanService,
    private QuoteService: QuoteService,
    @InjectRepository(Pay)
    private readonly paymentRepository: Repository<Pay>,
  ) {}

  async getPaymentById(id: number) {
    return this.paymentRepository.findOne({ where: { id } });
  }

  async getPaymentByLoanId(loanId: number) {
    return this.paymentRepository.find({ where: { loan: Equal(loanId) } });
  }

  async getPayments() {
    return this.paymentRepository.find();
  }

  async createPay(createPayDto: CreatePayDto) {
    const loan = await this.LoanService.getLoanById(createPayDto.loan_id);
    if (!loan) {
      throw new Error('Loan not found');
    }
    const payment = this.paymentRepository.create({
      loan,
      amount: createPayDto.amount,
    });

    const quote = await this.QuoteService.getQuoteById(
        createPayDto.quote_id,
    );
    if (!quote) {
      throw new Error('Quote not found');
    }

    if (quote.status === 'Paid') {
      throw new Error('Quote already paid');
    }
    await this.QuoteService.updateQuote(createPayDto.quote_id, 'paid');
    await this.LoanService.updateLoanBalance(loan.id);

    return await this.paymentRepository.save(payment);
  }
}
