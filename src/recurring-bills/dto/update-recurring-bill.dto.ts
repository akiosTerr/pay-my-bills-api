import { IsDate, IsEmpty, IsNumber, IsOptional, IsString } from "class-validator"
import { User } from "src/auth/schemas/user.schema"

export class UpdateRecurringBillDto {
    @IsOptional()
    @IsString()
    readonly title: string
    @IsOptional()
    @IsString()
    readonly billCategory: string
    @IsOptional()
    @IsNumber()
    readonly expirationDay: number
}