import { IsString,IsInt, IsNotEmpty, MinLength, IsEmail, IsDecimal } from 'class-validator';

export class ApproveLoanDto {
    @IsInt()
    @IsNotEmpty()
    loan_request_id: number;

    @IsDecimal()
    @IsNotEmpty()
    approved_amount: number;

    @IsInt()
    @IsNotEmpty()
    approved_rate: number;

    @IsInt()
    @IsNotEmpty()
    approved_year: number;

    @IsInt()
    @IsNotEmpty()
    payment_day: number;

    @IsInt()
    @IsNotEmpty()
    payment_day_to_pay: number;
}