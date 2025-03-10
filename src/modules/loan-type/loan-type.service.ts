import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoanType } from '../../common/entities/loan-type.entity';

@Injectable()
export class LoanTypeService {
    constructor(
        @InjectRepository(LoanType)
        private readonly loanTypeRepository: Repository<LoanType>,
    ) { }

    async getLoanTypes(): Promise<LoanType[]> {
        return this.loanTypeRepository.find();
    }

    async getLoanType(id: number): Promise<LoanType> {
        const loanType = await this.loanTypeRepository.findOne({ where: { id } });
        if (!loanType) {
            throw new Error(`Loan type with id ${id} not found`);
        }
        return loanType;
    }

    async createLoanType(loanType: LoanType) {
        return this.loanTypeRepository.save(loanType);
    }
}
