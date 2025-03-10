import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { LoanRequestService } from './loan-request.service';
import { CreateLoanRequestDto } from '../../common/dto/create-loan-request.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Controller('loan')
export class LoanRequestController {

    constructor(private LoanRequestService: LoanRequestService) { }

    @Post()
    @UseGuards(JwtAuthGuard)
    async makeLoanRequest(@Body() CreateLoanRequestDto: CreateLoanRequestDto) {
        return this.LoanRequestService.makeLoanRequest(CreateLoanRequestDto);
    }
}
