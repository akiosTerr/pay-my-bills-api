import { IsEmpty, IsNotEmpty, IsNumber, IsString } from "class-validator"
import { User } from "src/auth/schemas/user.schema"

export class UpdateCryptoDto {
    @IsNotEmpty()
    @IsString()
    readonly urlname: string
    @IsNotEmpty()
    @IsNumber()
    readonly amount: number
    @IsNotEmpty()
    @IsString()
    readonly name: string
    @IsNotEmpty()
    @IsString()
    readonly symbol: string
}
