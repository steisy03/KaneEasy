import { Module } from '@nestjs/common';
import { LoanRequestService } from './loan-request.service';
import { LoanRequestController } from './loan-request.controller';
import { PersonService } from '../person/person.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoanRequest } from 'src/modules/loan/entities/loan-request.entity';
import { LoanTypeService } from '../loan-type/loan-type.service';
import { Person } from 'src/modules/person/entities/person.entity';
import { LoanType } from 'src/modules/loan-type/entities/loan-type.entity';
import { LoanRequestV2Controller } from './loan-request-v2.controller';
import { LoanCanceled } from 'src/modules/loan/entities/loan-canceled.entity';
import { Loan } from 'src/modules/loan/entities/loan.entity';
import { LoanService } from '../loan/loan.service';
import { QuoteService } from '../quote/quote.service';
import { Quote } from 'src/modules/quote/entities/quote.entity';
import { Pay } from 'src/modules/pay/entities/pay.entity';
import { PayService } from '../pay/pay.service';
@Module({
    imports: [
        TypeOrmModule.forFeature([LoanRequest]),
        TypeOrmModule.forFeature([Person]),
        TypeOrmModule.forFeature([LoanType]),
        TypeOrmModule.forFeature([LoanCanceled]),
        TypeOrmModule.forFeature([Loan]),
        TypeOrmModule.forFeature([Quote]),
        TypeOrmModule.forFeature([Pay]),
    ],
    providers: [
        LoanRequestService, 
        PersonService, 
        LoanTypeService, 
        LoanService, 
        QuoteService,
        PayService
    ],
    controllers: [
        LoanRequestController, 
        LoanRequestV2Controller
    ],
    exports: [
        LoanRequestService, 
        PersonService, 
        LoanTypeService, 
        LoanService, 
        QuoteService,
        PayService
    ],
})
export class LoanRequestModule {}
