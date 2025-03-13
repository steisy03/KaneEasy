import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Loan } from '../../common/entities/loan.entity';
import { ApproveLoanDto } from '../../common/dto/approve-loan.dto';
import { amortization } from 'src/utils/amortization.util';
import { LoanRequest } from 'src/common/entities/loan-request.entity';

@Injectable()
export class LoanService {
    constructor(
        @InjectRepository(Loan)
        private readonly loanRepository: Repository<Loan>,
        @InjectRepository(LoanRequest)
        private readonly loanRequestRepository: Repository<LoanRequest>
    ) { }

    async getLoanById(id: number) {
        return this.loanRepository.findOne({ where: { id } });
    }

    async getLoans() {
        return this.loanRepository.find();
    }

    async createLoan(approveLoanDto: ApproveLoanDto) {
        const { 
            loan_request,
            approved_amount,
            approved_rate,
            approved_year,
            payment_day,
            payment_day_to_pay
        } = approveLoanDto;

        //TODO: fix that shit
        const LoanRequest = await this.loanRequestRepository.find({ 
            where: { id: loan_request },
            relations : ['loan_type']
        });

        if (!LoanRequest) {
            throw new Error('Loan request not found');
        }
        
        const quote = approved_year * 12;
        const { pay } = amortization(approved_amount, approved_rate, quote);
        //
        // Calculate the next payment date based on the payment_day
        const currentDate = new Date();
        const paymentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, payment_day);
        //
        return await this.loanRepository.save({
            loan_request: LoanRequest[0],
            approved_amount,
            approved_rate,
            approved_year,
            payment_day,
            payment_day_to_pay,
            quote,
            status: 'init',
            pending_amount: approved_amount,
            pending_quote: quote,
            paying_rate: 0,
            amount_to_pay: pay,
            next_payment_date: paymentDate,
            loan_type: {id: LoanRequest[0].loan_type.id}
        });
    }

}
