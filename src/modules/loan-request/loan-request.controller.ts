import { Controller, Post, Body } from '@nestjs/common';
import { LoanRequestService } from './loan-request.service';
import { CreateLoanRequestDto } from '../../common/dto/create-loan-request.dto';

@Controller('loan')
export class LoanRequestController {

    constructor(private LoanRequestService: LoanRequestService) { }

    @Post()
    async makeLoanRequest(@Body() CreateLoanRequestDto: CreateLoanRequestDto) {
        return this.LoanRequestService.makeLoanRequest(CreateLoanRequestDto);
    }
}
