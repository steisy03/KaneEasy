import { Injectable } from '@nestjs/common';
import { CreateLoanRequestDto } from '../../common/dto/create-loan-request.dto';
import { CreatePersonDto } from 'src/common/dto/create-person.dto';
import { PersonService } from '../person/person.service';
import { Person } from '../../common/entities/person.entity';
import { LoanRequest } from 'src/common/entities/loan-request.entity';
import { LoanTypeService } from '../loan-type/loan-type.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { amortization, withoutAmortization } from '../../utils/amortization.util';

@Injectable()
export class LoanRequestService {
    constructor(
        private PersonService: PersonService,
        private LoanTypeService: LoanTypeService,
        @InjectRepository( LoanRequest )
        private readonly loanRequestRepository: Repository<LoanRequest>,
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
        loanRequest[0].amortization = amortization(amount, interest_rate, years);
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


    


}
