import { Module } from '@nestjs/common';
import { LoanRequestService } from './loan-request.service';
import { LoanRequestController } from './loan-request.controller';
import { PersonService } from '../person/person.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoanRequest } from 'src/common/entities/loan-request.entity';
import { LoanTypeService } from '../loan-type/loan-type.service';
import { Person } from 'src/common/entities/person.entity';
import { LoanType } from 'src/common/entities/loan-type.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([LoanRequest]),
        TypeOrmModule.forFeature([Person]),
        TypeOrmModule.forFeature([LoanType]),
    ],
    providers: [LoanRequestService, PersonService, LoanTypeService],
    controllers: [LoanRequestController],
    exports: [LoanRequestService, PersonService, LoanTypeService],
})
export class LoanRequestModule {}
