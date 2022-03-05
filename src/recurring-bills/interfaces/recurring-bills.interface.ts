export interface RecurringBill {
    _id?: string
    title: string
    gotoUrl: string
    dueDate: Date
    previousPrice: string
    billStatus: string
    createdAt?: Date
}