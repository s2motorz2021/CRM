import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Invoice from '@/models/Invoice';
import Expense from '@/models/Expense';
// import PurchaseOrder from '@/models/PurchaseOrder'; // Check if exists

export async function GET(request) {
    try {
        await dbConnect();
        const { searchParams } = new URL(request.url);
        const startDate = searchParams.get('startDate') ? new Date(searchParams.get('startDate')) : new Date(new Date().getFullYear(), new Date().getMonth(), 1);
        const endDate = searchParams.get('endDate') ? new Date(searchParams.get('endDate')) : new Date();

        const query = {
            createdAt: { $gte: startDate, $lte: endDate },
            status: { $ne: 'cancelled' }
        };

        // Aggregate Revenue
        const revenueData = await Invoice.aggregate([
            { $match: query },
            { $group: { _id: null, total: { $sum: '$grandTotal' }, count: { $sum: 1 } } }
        ]);

        // Aggregate Expenses
        const expenseData = await Expense.aggregate([
            { $match: { ...query, status: 'approved' } },
            { $group: { _id: null, total: { $sum: '$amount' }, count: { $sum: 1 } } }
        ]);

        // Aggregate Purchases (Draft logic - assuming SparePart costs for now if PO not ready)
        // In a real scenario, we'd sum up vendor bills
        const purchasesTotal = 0;

        const revenue = revenueData[0]?.total || 0;
        const expenses = expenseData[0]?.total || 0;
        const netProfit = revenue - expenses - purchasesTotal;

        return NextResponse.json({
            revenue,
            expenses,
            purchases: purchasesTotal,
            netProfit,
            revenueCount: revenueData[0]?.count || 0,
            expenseCount: expenseData[0]?.count || 0
        });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
