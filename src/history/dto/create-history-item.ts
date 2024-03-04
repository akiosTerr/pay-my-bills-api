import { IsNotEmpty, IsNumber, IsString, IsDateString, IsEmpty } from "class-validator"
import { User } from "src/auth/schemas/user.schema"

export class CreateHistoryItemDto {
    @IsNotEmpty()
    @IsNumber()
    readonly value: number
    @IsNotEmpty()
    @IsDateString()
    readonly paymentDate: Date
    @IsNotEmpty()
    @IsDateString()
    readonly expirationDate: Date
    @IsNotEmpty()
    @IsString()
    readonly recurringBillId: string
    @IsNotEmpty()
    @IsString()
    readonly recurringBillGroupId: string
    @IsEmpty({message: 'you cannot pass user id'})
    readonly user: User
}