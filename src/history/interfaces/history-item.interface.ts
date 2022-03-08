export interface HistoryItem {
    id?: string
    title: string
    value: string
    paymentDate: string
    expirationDate: string
    recurringBillId: string
}

export interface LineChartData {
    title: string
    data: Array<number>
}