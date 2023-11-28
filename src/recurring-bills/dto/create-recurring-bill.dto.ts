import { IsDate, IsNotEmpty, IsString } from "class-validator"

export class CreateRecurringBillDto {
    @IsNotEmpty()
    @IsString()
    readonly title: string
    @IsNotEmpty()
    @IsString()
    readonly gotoUrl: string
    @IsNotEmpty()
    @IsDate()
    readonly dueDate: Date
    @IsNotEmpty()
    @IsString()
    readonly billCategory: string
}