import { Injectable } from '@nestjs/common';
import { RecurringBill } from './interfaces/recurring-bills.interface';


@Injectable()
export class RecurringBillsService {
    private readonly recBills: RecurringBill[] = [
        {
            id: "123456",
            title: "EDP",
            value: "11,00",
            gotoUrl: "google.com",
            dueDate: "12/08/2025",
            previousPrice: "12,00",
        },
        {
            id: "123456",
            title: "SAEG",
            value: "10,00",
            gotoUrl: "google.com",
            dueDate: "11/08/2025",
            previousPrice: "9,00",
        },
    ];

    getAll(): RecurringBill[] {
        return this.recBills
    }
}
