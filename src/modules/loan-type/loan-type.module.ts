import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoanType } from '../../common/entities/loan-type.entity';
import { LoanTypeService } from './loan-type.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([LoanType])
    ],
    providers: [LoanTypeService],
    controllers: [],
    exports: [LoanTypeService],
})
export class LoanTypeModule {}
