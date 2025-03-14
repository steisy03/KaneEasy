import { Module } from '@nestjs/common';
import { QuoteService } from './quote.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quote } from './entities/quote.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Quote]),
    ],
    providers: [QuoteService],
    exports: [QuoteService],
})
export class QuoteModule {}
