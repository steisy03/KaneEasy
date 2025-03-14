import { IsString,IsInt, IsNotEmpty, MinLength, IsEmail } from 'class-validator';

export class CreateLoanRequestDto {

    //person
    @IsString()
    @IsNotEmpty()
    @MinLength(100)
    first_name: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(100)
    last_name: string;

    @IsInt()
    @IsNotEmpty()
    @MinLength(15)
    identification: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    @MinLength(250)
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(15)
    phone: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(250)
    address: string;

    @IsInt()
    @IsNotEmpty()
    province: number;

    @IsInt()
    @IsNotEmpty()
    city: number;

    @IsInt()
    @IsNotEmpty()
    sector: number;

    //loan request
    @IsInt()
    @IsNotEmpty()
    amount: number;

    @IsInt()
    @IsNotEmpty()
    years: number;

    @IsInt()
    @IsNotEmpty()
    loan_type: number;
}