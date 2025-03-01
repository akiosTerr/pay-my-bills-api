import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateCryptoDto {
    @IsNotEmpty()
    @IsString()
    readonly urlname: string
    @IsNotEmpty()
    @IsString()
    readonly name: string
    @IsNotEmpty()
    @IsString()
    readonly symbol: string
}
