import { IsNotEmpty, IsString, IsNumber, IsEmpty } from "class-validator"
import { User } from "src/auth/schemas/user.schema"

export class CreateRecurringBillDto {
    @IsNotEmpty()
    @IsString()
    readonly title: string
    @IsNotEmpty()
    @IsString()
    readonly billCategory: string
    @IsNotEmpty()
    @IsNumber()
    readonly expirationDay: number
    @IsEmpty({message: 'you cannot pass user id'})
    readonly user: User
}