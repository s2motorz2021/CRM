import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Expense from '@/models/Expense';

export async function GET(request) {
    try {
        await dbConnect();
        const { searchParams } = new URL(request.url);
        const branch = searchParams.get('branch');

        let query = {};
        if (branch) query.branch = branch;

        const expenses = await Expense.find(query).sort({ date: -1 });
        return NextResponse.json(expenses);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        await dbConnect();
        const data = await request.json();
        let expense;

        if (data._id) {
            expense = await Expense.findByIdAndUpdate(data._id, data, { new: true });
        } else {
            if (!data.expenseNo) {
                const count = await Expense.countDocuments();
                data.expenseNo = `EXP-${String(count + 1).padStart(4, '0')}`;
            }
            expense = await Expense.create(data);
        }
        return NextResponse.json(expense);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
