import { Injectable } from '@nestjs/common';
import { CreateLoanRequestDto } from './dto/create-loan-request.dto';
import { CreatePersonDto } from 'src/modules/person/dto/create-person.dto';
import { PersonService } from '../person/person.service';
import { Person } from '../person/entities/person.entity';
import { LoanRequest } from 'src/modules/loan/entities/loan-request.entity';
import { LoanTypeService } from '../loan-type/loan-type.service';
import { InjectRepository } from '@nestjs/typeorm';
import { amortization, withoutAmortization } from '../../utils/amortization.util';
import { LoanCanceled } from 'src/modules/loan/entities/loan-canceled.entity';
import { CancelLoanDto } from 'src/modules/loan-request/dto/cancel-loan.dto';
import { LoanService } from '../loan/loan.service';
import { ApproveLoanDto } from 'src/modules/loan-request/dto/approve-loan.dto';
import { QuoteService } from '../quote/quote.service';
import { CreateQuoteDto } from 'src/modules/quote/dto/create-quote.dto';
import { Repository, DataSource } from 'typeorm';
@Injectable()
export class LoanRequestService {
    constructor(
        private PersonService: PersonService,
        private LoanTypeService: LoanTypeService,
        private LoanService: LoanService,
        private QuoteService: QuoteService,
        @InjectRepository( LoanRequest )
        private readonly loanRequestRepository: Repository<LoanRequest>,
        @InjectRepository( LoanCanceled )
        private readonly loanCanceledRepository: Repository<LoanCanceled>,
        private readonly dataSource: DataSource
    ) { }

    async makeLoanRequest(createLoanRequestDto: CreateLoanRequestDto) {
        //
        const {
            first_name,
            last_name,
            identification,
            email,
            phone,
            address,
            province,
            city,
            sector,
            amount,
            years,
            loan_type
        } = createLoanRequestDto;

        let findPerson = await this.PersonService.getPersonByIdentification(identification);
        if (!findPerson) {
            const createPersonDTO = new CreatePersonDto();
            createPersonDTO.first_name = first_name;
            createPersonDTO.last_name = last_name;
            createPersonDTO.identification = identification;
            createPersonDTO.email = email;
            createPersonDTO.phone = phone;
            createPersonDTO.address = address;
            createPersonDTO.province = province;
            createPersonDTO.city = city;
            createPersonDTO.sector = sector;
            findPerson = await this.PersonService.createPerson(createPersonDTO);
        }

        return this.createLoanRequest(amount, years, loan_type, findPerson);        
        
    }

    async createLoanRequest(amount: number, years: number, loan_type: number, person: Person) {
        const findLoanType = await this.LoanTypeService.getLoanType(loan_type);
        if (!findLoanType) {
            throw new Error(`Loan type with id ${loan_type} not found`);
        }
        const loanRequest = new LoanRequest();
        loanRequest.amount = amount;
        loanRequest.years = years;
        loanRequest.loan_type = findLoanType;
        loanRequest.person = person;
        return this.loanRequestRepository.save(loanRequest);
    }

    async getLoanRequests() {
        return this.loanRequestRepository.find({ relations: ['person', 'loan_type'] } );
    }

    async getLoanWithAmortization(loanRequestId: number) {
        const loanRequest = await this.loanRequestRepository.find({
            where: { id: loanRequestId },
            relations: ['loan_type']
        });

        if (!loanRequest) {
            throw new Error(`Loan request with id ${loanRequestId} not found`);
        }

        const { amount, years, loan_type } = (await loanRequest)[0];
        const { interest_rate } = loan_type;
        loanRequest[0].amortization = amortization(amount, interest_rate, years * 12)['pay'];
        //year * 12 para obtener la cantidad de cuotas predeterminadas
        return loanRequest;
    }

    async getLoanWithoutAmortization(loanRequestId: number) {
        const loanRequest = await this.loanRequestRepository.find({
            where: { id: loanRequestId },
            relations: ['loan_type']
        });

        if (!loanRequest) {
            throw new Error(`Loan request with id ${loanRequestId} not found`);
        }

        const { amount, loan_type } = (await loanRequest)[0];
        const { interest_rate } = loan_type;
        loanRequest[0].amortization = withoutAmortization (amount, interest_rate);
        return loanRequest;
    }

    async approveLoanRequest(approveLoanDto: ApproveLoanDto) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            const { loan_request } = approveLoanDto;
            const loanRequest = await this.loanRequestRepository.find({ where: { id: loan_request } });
            if (!loanRequest) {
                throw new Error(`Loan request with id ${loan_request} not found`);
            }

            if (loanRequest[0].status !== 'pending') {
                throw new Error(`Loan request with id ${loan_request} is not pending`);
            } else {
                // Update loan request status
                await queryRunner.manager.update(LoanRequest, loan_request, { status: 'approved' });

                // Create loan
                const loan = await this.LoanService.createLoan(approveLoanDto);

                // Create quote information
                const quote = new CreateQuoteDto();
                quote.amount = loan.amount_to_pay;
                quote.loan = loan.id;
                quote.payment_date = loan.next_payment_date;
                await this.QuoteService.createQuote(quote);
                //
                await queryRunner.commitTransaction();
                return loan;
            }
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        } finally {
            await queryRunner.release();
        }
    }

    async cancelLoanRequest(cancelLoanDto: CancelLoanDto) {

        const loanRequest = await this.loanRequestRepository.find({ where: { id: cancelLoanDto.loan_request_id } } );
        if (!loanRequest) {
            throw new Error(`Loan request with id ${cancelLoanDto.loan_request_id} not found`);
        }
        await this.loanRequestRepository.update(cancelLoanDto.loan_request_id, { status: 'cancelled' });
        await this.loanCanceledRepository.save(cancelLoanDto);
        return this.loanRequestRepository.find({ where: { id: cancelLoanDto.loan_request_id } } );
    }


}



