import { IsInt, IsNotEmpty, IsDecimal, IsDate } from 'class-validator';

export class CreateQuoteDto {
    @IsDecimal()
    @IsNotEmpty()
    amount: number;

    @IsInt()
    @IsNotEmpty()
    loan: number;

    @IsDate()
    @IsNotEmpty()
    payment_date: Date;


}