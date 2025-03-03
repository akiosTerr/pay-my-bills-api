import { IsEmpty, IsNotEmpty, IsNumber, IsString } from "class-validator"
import { User } from "src/auth/schemas/user.schema"

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
    @IsEmpty({ message: 'you cannot pass user id' })
    readonly user: User
}
