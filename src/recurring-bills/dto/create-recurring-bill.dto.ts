export class CreateRecurringBillDto {
    readonly title: string
    readonly value: string
    readonly gotoUrl: string
    readonly dueDate: string
    readonly previousPrice: string
}