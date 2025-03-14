import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Loan } from './entities/loan.entity';
import { ApproveLoanDto } from '../loan-request/dto/approve-loan.dto';
import { amortization } from 'src/utils/amortization.util';
import { LoanRequest } from 'src/modules/loan/entities/loan-request.entity';

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
            relations: ['loan_type']
        });

        if (!LoanRequest) {
            throw new Error('Loan request not found');
        }

        const quote = approved_year * 12;
        const { pay, principal, interest } = amortization(approved_amount, approved_rate, quote);
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
            loan_type: { id: LoanRequest[0].loan_type.id },
            base_to_pay: principal,
            rate_to_pay: interest
        });
    }

    async updateLoanBalance(id: number) {
        const loan = await this.loanRepository.findOne({ where: { id } });
        if (!loan) {
            throw new Error('Loan not found');
        }
        //
        const {
            base_to_pay,
            rate_to_pay,
        } = loan;
        //
        let {
            pending_amount,
            paying_rate,
            pending_quote,
            status
        } = loan;
        //
        pending_amount = Number(pending_amount) - Number(base_to_pay);
        paying_rate = Number(paying_rate) + Number(rate_to_pay);
        pending_quote = Number(pending_quote) - 1;
        if (pending_quote === 0) {
            status = 'paid';
        }
        //
        await this.loanRepository.update(id, {
            pending_amount,
            paying_rate,
            pending_quote,
            status
        });
    }

    async updateLoanAmortization(id: number, base_to_pay: number) {
        const loan = await this.loanRepository.findOne({ where: { id } });
        if (!loan) {
            throw new Error('Loan not found');
        }
        //
        let {
            pending_amount,
            status
        } = loan;
        //
        const {
            pending_quote,
            approved_rate
        } = loan;
        //
        const { pay, principal, interest } = amortization(pending_amount, approved_rate, pending_quote);
        pending_amount = Number(pending_amount) - Number(base_to_pay);
        if (pending_amount == 0) {
            status = 'paid';
        }
        //
        await this.loanRepository.update(id, {
            pending_amount,
            base_to_pay: principal,
            rate_to_pay: interest,
            amount_to_pay: pay,
            status
        });
    }
}
