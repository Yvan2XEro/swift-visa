import { findDemand, updateDemand } from '@/lib/prisma/demands';
import { NextResponse } from 'next/server';

export async function GET(_: Request, { params }: any) {
    try {
        const { demand, error } = await findDemand(params.id)
        if (!!error || !demand) return NextResponse.json({ message: "not found" }, { status: 404 })
        return NextResponse.json(demand, { status: 200 })
    } catch (error: any) {
        console.log(error)
        return NextResponse.json({ message: error.toString() }, { status: 500 })
    }
}

export async function PUT(req: Request, { params }: any) {
    try {
        const data = await req.json();
        console.log(data)
        const { demand, error } = await updateDemand(params.id, data)
        if (!!error || !demand) return NextResponse.json({ message: "not found" }, { status: 404 })
        return NextResponse.json(demand, { status: 201 })
    } catch (error: any) {
        return NextResponse.json({ message: error.toString() }, { status: 500 })
    }
}