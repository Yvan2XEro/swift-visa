import { findDemandByEmail } from "@/lib/prisma/demands"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    try {
        const data = await req.json()
        if (!data.email)
            return NextResponse.json({ "message": "Email is required!" });
        const { demand, error } = await findDemandByEmail(data.email)
        if (!!error || !demand) return NextResponse.json({ message: "not found" }, { status: 404 })
        return NextResponse.json(demand, { status: 200, })
    } catch (error: any) {
        console.log(error)
        return NextResponse.json({ message: error.toString() }, { status: 500 })
    }
}
