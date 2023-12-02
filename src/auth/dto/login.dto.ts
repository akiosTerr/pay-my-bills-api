import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator"

export class LoginDto {
    @IsNotEmpty()
    @IsEmail()
    readonly email: string
    @IsNotEmpty()
    @IsString()
    @MinLength(7)
    readonly password: string
}