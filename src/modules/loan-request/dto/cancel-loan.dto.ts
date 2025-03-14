import { IsInt, IsString, IsNotEmpty, MinLength } from 'class-validator';

export class CancelLoanDto {
    @IsInt()
    @IsNotEmpty()
    loan_request_id: number;

    @IsString()
    @IsNotEmpty()
    @MinLength(250)
    reason: string;
}