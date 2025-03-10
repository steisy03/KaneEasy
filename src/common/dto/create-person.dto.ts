import { IsInt, IsString, IsNotEmpty, MinLength } from 'class-validator';

export class CreatePersonDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(100)
    first_name: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(100)
    last_name: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(15)
    identification: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(250)
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(250)
    address: string;

    @IsInt()
    @IsNotEmpty()
    city: number;

    @IsInt()
    @IsNotEmpty()
    province: number;

    @IsInt()
    @IsNotEmpty()
    sector: number;

    @IsString()
    @IsNotEmpty()
    @MinLength(250)
    phone: string;
}
