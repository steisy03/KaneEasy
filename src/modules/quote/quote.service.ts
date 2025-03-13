import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';
import { Quote } from '../../common/entities/quote.entity';
import { CreateQuoteDto } from '../../common/dto/create-quote.dto';
import { Loan } from '../../common/entities/loan.entity';

@Injectable()
export class QuoteService {
    constructor(
        @InjectRepository(Quote)
        private readonly quoteRepository: Repository<Quote>
    ) {}

    async getQuoteById(id: number) {
        return this.quoteRepository.findOne({ where: { id } });
    }

    async getQuotes() {
        return this.quoteRepository.find();
    }

    async createQuote(createQuote : CreateQuoteDto) {
        const quote = this.quoteRepository.create({
            amount: createQuote.amount,
            loan: createQuote.loan as DeepPartial<Loan>,
            payment_date: createQuote.payment_date
        });
        return this.quoteRepository.save(quote);
    }
}
