import { IsDate, IsOptional, IsString } from "class-validator"

export class UpdateRecurringBillDto {
    @IsOptional()
    @IsString()
    readonly title: string
    @IsOptional()
    @IsString()
    readonly gotoUrl: string
    @IsOptional()
    @IsDate()
    readonly dueDate: Date
    @IsOptional()
    @IsString()
    readonly billCategory: string
}