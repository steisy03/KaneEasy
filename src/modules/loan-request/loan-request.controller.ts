import { Controller, Post, Get, Body, UseGuards, Param } from '@nestjs/common';
import { LoanRequestService } from './loan-request.service';
import { CreateLoanRequestDto } from './dto/create-loan-request.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CancelLoanDto } from './dto/cancel-loan.dto';
import { ApproveLoanDto } from './dto/approve-loan.dto';
import { CreatePayDto } from '../pay/dto/create-pay.dto';
import { PayService } from '../pay/pay.service';

@Controller({ path: 'loan', version: '1' })
export class LoanRequestController {

    constructor(
        private LoanRequestService: LoanRequestService, 
        private PayService: PayService
    ) { }

    @Post()
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

    @Post('/approve')
    @UseGuards(JwtAuthGuard)
    async approveLoanRequest(@Body() ApproveLoanDto: ApproveLoanDto) {
        return this.LoanRequestService.approveLoanRequest(ApproveLoanDto);
    }

    @Post('/cancel')
    @UseGuards(JwtAuthGuard)
    async canceltLoanRequest(@Body() cancelLoanDto: CancelLoanDto) {
        return this.LoanRequestService.cancelLoanRequest(cancelLoanDto);
    }

    @Post('/payment')
    @UseGuards(JwtAuthGuard)
    async payLoanRequest(@Body() CreatePayDto: CreatePayDto) {
        return this.PayService.payQuote(CreatePayDto);
    }

    @Post('/abono')
    @UseGuards(JwtAuthGuard)
    async paymentLoanRequest(@Body() CreatePayDto: CreatePayDto) {
        return this.PayService.makeAPayment(CreatePayDto);
    }

}
