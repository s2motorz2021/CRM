import dbConnect from '@/lib/mongodb';
import SparePart from '@/models/SparePart';
import InventoryHistory from '@/models/InventoryHistory';
import { NextResponse } from 'next/server';

const sampleParts = [
    { partNumber: 'SP-001', barcode: 'BC-SP-001', name: 'Engine Oil 1L (10W-40)', brand: 'Generic', category: 'Lubricants', purchasePrice: 350, salePrice: 450, mrp: 499, stock: 25, minStock: 10, rackLocation: 'OIL-1', compatibleModels: 'All Two-Wheelers' },
    { partNumber: 'SP-002', barcode: 'BC-SP-002', name: 'Air Filter - Universal', brand: 'Generic', category: 'Filters', purchasePrice: 180, salePrice: 280, mrp: 320, stock: 15, minStock: 5, rackLocation: 'A1', compatibleModels: 'Honda Activa, TVS Jupiter' },
    { partNumber: 'SP-003', barcode: 'BC-SP-003', name: 'Spark Plug - NGK', brand: 'Generic', category: 'Electrical', purchasePrice: 120, salePrice: 180, mrp: 220, stock: 30, minStock: 10, rackLocation: 'B2', compatibleModels: 'All Petrol Vehicles' },
    { partNumber: 'SP-004', barcode: 'BC-SP-004', name: 'Brake Pads Set - Front', brand: 'Generic', category: 'Brake System', purchasePrice: 450, salePrice: 650, mrp: 750, stock: 8, minStock: 10, rackLocation: 'C1', compatibleModels: 'Honda, TVS' },
    { partNumber: 'SP-005', barcode: 'BC-SP-005', name: 'Chain Set - 428', brand: 'Generic', category: 'Chain & Sprocket', purchasePrice: 850, salePrice: 1200, mrp: 1400, stock: 3, minStock: 5, rackLocation: 'D1', compatibleModels: 'Hero Splendor, Bajaj Pulsar' },
    { partNumber: 'SP-006', barcode: 'BC-SP-006', name: 'Headlight Bulb 12V', brand: 'Generic', category: 'Electrical', purchasePrice: 80, salePrice: 120, mrp: 150, stock: 20, minStock: 8, rackLocation: 'B3', compatibleModels: 'Universal' },
    { partNumber: 'SP-007', barcode: 'BC-SP-007', name: 'Clutch Plate', brand: 'Honda', category: 'Engine Parts', purchasePrice: 550, salePrice: 850, mrp: 999, stock: 2, minStock: 5, rackLocation: 'E1', compatibleModels: 'Honda Activa' },
];

export async function GET() {
    try {
        await dbConnect();

        // Clear existing parts
        await SparePart.deleteMany({});

        // Seed parts
        await SparePart.insertMany(sampleParts);

        // Log seeding
        await InventoryHistory.create({
            type: 'adjustment',
            reason: 'Database re-seeded with sample parts',
            user: 'System'
        });

        return NextResponse.json({ message: 'Database seeded with sample parts!' });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
