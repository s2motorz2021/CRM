import dbConnect from '@/lib/mongodb';
import SparePart from '@/models/SparePart';
import InventoryRequest from '@/models/InventoryRequest';
import PurchaseOrder from '@/models/PurchaseOrder';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        await dbConnect();

        // 1. Total Parts and Stock Value
        const allParts = await SparePart.find({});
        const totalParts = allParts.length;
        const totalStockValue = allParts.reduce((sum, part) => sum + (part.stock * part.purchasePrice), 0);
        const lowStockParts = allParts.filter(part => part.stock <= part.minStock).length;

        // 2. Pending Requests
        const pendingRequests = await InventoryRequest.countDocuments({ status: 'pending' });

        // 3. Recent Purchases (last 30 days)
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        const recentPurchases = await PurchaseOrder.countDocuments({
            createdAt: { $gte: thirtyDaysAgo },
            status: 'approved'
        });

        // 4. Category breakdown
        const categories = {};
        allParts.forEach(part => {
            categories[part.category] = (categories[part.category] || 0) + 1;
        });

        return NextResponse.json({
            totalParts,
            totalStockValue,
            lowStockParts,
            pendingRequests,
            recentPurchases,
            categoryBreakdown: categories
        });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
