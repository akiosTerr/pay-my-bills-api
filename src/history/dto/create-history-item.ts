import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateHistoryItemDto {
    @IsNotEmpty()
    @IsString()
    readonly title: string
    @IsNotEmpty()
    @IsNumber()
    readonly value: number
    @IsNotEmpty()
    @IsString()
    readonly paymentDate: string
    @IsNotEmpty()
    @IsString()
    readonly expirationDate: string
    @IsNotEmpty()
    @IsString()
    readonly recurringBillId: string
}