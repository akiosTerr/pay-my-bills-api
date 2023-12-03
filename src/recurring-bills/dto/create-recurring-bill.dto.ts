import { IsNotEmpty, IsString, IsNumber, IsEmpty, Min, Max } from "class-validator"
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
    @Min(1, {message: 'day of the month must be between 1 and 31'})
    @Max(31,{message: 'day of the month must be between 1 and 31'})
    readonly expirationDay: number
    @IsEmpty({message: 'you cannot pass user id'})
    readonly user: User
}