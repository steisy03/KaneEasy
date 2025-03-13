import { Module } from '@nestjs/common';
import { LoanRequestService } from './loan-request.service';
import { LoanRequestController } from './loan-request.controller';
import { PersonService } from '../person/person.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoanRequest } from 'src/common/entities/loan-request.entity';
import { LoanTypeService } from '../loan-type/loan-type.service';
import { Person } from 'src/common/entities/person.entity';
import { LoanType } from 'src/common/entities/loan-type.entity';
import { LoanRequestV2Controller } from './loan-request-v2.controller';
import { LoanCanceled } from 'src/common/entities/loan-canceled.entity';
import { Loan } from 'src/common/entities/loan.entity';
import { LoanService } from '../loan/loan.service';
import { QuoteService } from '../quote/quote.service';
import { Quote } from 'src/common/entities/quote.entity';
@Module({
    imports: [
        TypeOrmModule.forFeature([LoanRequest]),
        TypeOrmModule.forFeature([Person]),
        TypeOrmModule.forFeature([LoanType]),
        TypeOrmModule.forFeature([LoanCanceled]),
        TypeOrmModule.forFeature([Loan]),
        TypeOrmModule.forFeature([Quote])
    ],
    providers: [LoanRequestService, PersonService, LoanTypeService, LoanService, QuoteService],
    controllers: [LoanRequestController, LoanRequestV2Controller],
    exports: [LoanRequestService, PersonService, LoanTypeService, LoanService, QuoteService],
})
export class LoanRequestModule {}
