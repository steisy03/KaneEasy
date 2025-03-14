import { IsInt, IsString, IsNotEmpty, MinLength, IsDecimal } from 'class-validator';

export class CreatePayDto {
    @IsDecimal()
    @IsNotEmpty()
    amount: number;

    @IsString()
    @MinLength(250)
    type: string;

    @IsInt()
    @IsNotEmpty()
    loan_id: number;

    @IsInt()
    quote_id: number;
}