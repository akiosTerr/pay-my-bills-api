import { IsNotEmpty, IsNumber, IsString, IsDateString } from "class-validator"

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
}