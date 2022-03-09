export class CreateHistoryItemDto {
    readonly title: string
    readonly value: number
    readonly paymentDate: string
    readonly expirationDate: string
    readonly recurringBillId: string
}