export interface RecurringBill {
    _id?: string
    title: string
    gotoUrl: string
    dueDate: string
    previousPrice: string
    billStatus: string
    createdAt?: Date
}