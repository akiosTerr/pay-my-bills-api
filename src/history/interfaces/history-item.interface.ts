import { RecurringBill } from "src/recurring-bills/schemas/recurring-bills.shema"

export interface HistoryItem {
    id?: string
    title: string
    value: Number
    paymentDate: string
    expirationDate: string
    recurringBillId: string
}

export interface LineChartData {
    title: string
    data: LineChartValues[]
}

interface LineChartValues {
    value: number
    expiration: string
}