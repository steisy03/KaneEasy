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

@Module({
    imports: [
        TypeOrmModule.forFeature([LoanRequest]),
        TypeOrmModule.forFeature([Person]),
        TypeOrmModule.forFeature([LoanType]),
        TypeOrmModule.forFeature([LoanCanceled]),
    ],
    providers: [LoanRequestService, PersonService, LoanTypeService],
    controllers: [LoanRequestController, LoanRequestV2Controller],
    exports: [LoanRequestService, PersonService, LoanTypeService],
})
export class LoanRequestModule {}
