import { IsInt, IsNotEmpty, IsDecimal } from 'class-validator';

export class CreateQuoteDto {
    @IsDecimal()
    @IsNotEmpty()
    amount: number;

    @IsInt()
    @IsNotEmpty()
    loan: number;

}