import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';
import { Quote } from './entities/quote.entity';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { Loan } from '../loan/entities/loan.entity';

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

    async updateQuote(id: number, status: string) {
        const quote = await this.quoteRepository.findOne({ where: { id } });
        if (!quote) {
            throw new Error('Quote not found');
        }
        await this.quoteRepository.update(id, {
            status
        });
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
