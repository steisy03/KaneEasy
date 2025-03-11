import { Controller, Get, UseGuards, Param } from '@nestjs/common';
import { LoanRequestService } from './loan-request.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Controller({ path: 'loan', version: '2' })
export class LoanRequestV2Controller {

    constructor(private LoanRequestService: LoanRequestService) { }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    async getLoanWithAmortization(@Param('id') id: number) {
        return this.LoanRequestService.getLoanWithAmortization(id);
    }

}
