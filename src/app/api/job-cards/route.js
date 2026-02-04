import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import JobCard from '@/models/JobCard';
import InventoryRequest from '@/models/InventoryRequest';
import Staff from '@/models/Staff';

export async function GET() {
    try {
        await dbConnect();
        const jobCards = await JobCard.find({})
            .populate('customerId', 'name phone')
            .populate('vehicleId', 'registrationNo brand model')
            .populate('technicianId', 'name')
            .sort({ createdAt: -1 });
        return NextResponse.json(jobCards);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        await dbConnect();
        const data = await request.json();
        let jobCard;

        if (data._id) {
            jobCard = await JobCard.findByIdAndUpdate(data._id, data, { new: true });
        } else {
            if (!data.jobCardNo) {
                const count = await JobCard.countDocuments();
                data.jobCardNo = `JC-${String(count + 1).padStart(3, '0')}`;
            }
            jobCard = await JobCard.create(data);
        }

        // Sync spareRequests with InventoryRequest model
        if (data.spareRequests && data.spareRequests.length > 0) {
            const tech = await Staff.findById(data.technicianId);
            const techName = tech ? tech.name : 'Unknown';

            for (const spare of data.spareRequests) {
                // Check if request already exists for this Job Card and part
                const existingReq = await InventoryRequest.findOne({
                    jobCardNo: jobCard.jobCardNo,
                    partNumber: spare.partNumber || spare.name // Fallback if partNumber not provided
                });

                if (!existingReq) {
                    await InventoryRequest.create({
                        jobCardNo: jobCard.jobCardNo,
                        technicianName: techName,
                        partName: spare.name,
                        partNumber: spare.partNumber || spare.name,
                        qty: spare.qty,
                        status: spare.status || 'pending'
                    });
                }
            }
        }

        return NextResponse.json(jobCard);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
