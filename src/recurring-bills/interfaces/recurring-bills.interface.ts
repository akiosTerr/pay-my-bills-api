export interface RecurringBill {
    _id?: string
    title: string
    expirationDay: number
    nextExpirationDate: Date
    billCategory: string
    createdAt?: Date
}