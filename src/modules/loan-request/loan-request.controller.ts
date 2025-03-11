import { Controller, Post, Get, Body, UseGuards, Param } from '@nestjs/common';
import { LoanRequestService } from './loan-request.service';
import { CreateLoanRequestDto } from '../../common/dto/create-loan-request.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Controller({ path: 'loan', version: '1' })
export class LoanRequestController {

    constructor(private LoanRequestService: LoanRequestService) { }

    @Post()
    @UseGuards(JwtAuthGuard)
    async makeLoanRequest(@Body() CreateLoanRequestDto: CreateLoanRequestDto) {
        return this.LoanRequestService.makeLoanRequest(CreateLoanRequestDto);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    async getLoanRequests() {
        return this.LoanRequestService.getLoanRequests();
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    async getLoanWithoutAmortization(@Param('id') id: number) {
        return this.LoanRequestService.getLoanWithoutAmortization(id);
    }

    @Post('approve/:id')
    @UseGuards(JwtAuthGuard)
    async approveLoanRequest(@Param('id') id: number) {
        return this.LoanRequestService.approveLoanRequest(id);
    }

    @Post('cancel/:id')
    @UseGuards(JwtAuthGuard)
    async rejectLoanRequest(@Param('id') id: number) {
        return this.LoanRequestService.rejectLoanRequest(id);
    }

}
