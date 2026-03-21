import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Order from "@/models/Order";
import FeeRecord from "@/models/FeeRecord";
import Expense from "@/models/Expense";

export async function GET() {
    await dbConnect();
    try {
        const [orders, fees, expenses] = await Promise.all([
            Order.find({ status: 'completed' }).lean(),
            FeeRecord.find({ status: 'Paid' }).lean(),
            Expense.find().lean()
        ]);

        const totalOrderIncome = orders.reduce((acc, o: any) => acc + (o.amount || 0), 0);
        const totalFeeIncome = fees.reduce((acc, f: any) => acc + (f.amount || 0), 0);
        const totalExpense = expenses.reduce((acc, e: any) => acc + (e.amount || 0), 0);

        // Daily aggregation
        const dailyData: any = {};
        const process = (items: any[], type: 'income' | 'expense') => {
            items.forEach(item => {
                const date = new Date(item.date || item.createdAt || item.paidDate).toLocaleDateString();
                if (!dailyData[date]) dailyData[date] = { date, income: 0, expense: 0 };
                dailyData[date][type] += item.amount || 0;
            });
        };

        process(orders, 'income');
        process(fees, 'income');
        process(expenses, 'expense');

        const daily = Object.values(dailyData).sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime());

        return NextResponse.json({
            totalIncome: totalOrderIncome + totalFeeIncome,
            totalExpense,
            netProfit: (totalOrderIncome + totalFeeIncome) - totalExpense,
            daily,
            recentTransactions: [
                ...orders.map(o => ({ ...o, type: 'Income', source: 'Course Order' })),
                ...fees.map(f => ({ ...f, type: 'Income', source: 'Institute Fee' })),
                ...expenses.map(e => ({ ...e, type: 'Expense', source: e.category }))
            ].sort((a: any, b: any) => new Date(b.createdAt || b.date).getTime() - new Date(a.createdAt || a.date).getTime()).slice(0, 10)
        });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
