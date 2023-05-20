import { downloadMail, sendEmail } from "@/lib/functions/mail"
import { findDemand, updateDemand } from "@/lib/prisma/demands"
import { NextResponse } from "next/server"

export async function PUT(request: Request, { params }: any) {

    const { demand, error } = await findDemand(params.id)
    if (!!error || !demand) return NextResponse.json({ message: "Not found or not available" }, { status: 400 })

    await updateDemand(params.id, { ...demand, statut: "available" })
    const link = `${process.env.HOST || request.url.split("/api")[0]}/demands-download/${params.id}`

    const response = await sendEmail(`&${process.env.NOREPLY_EMAIL}`, demand.email, "Your visa is available", downloadMail(link))
    if (response?.accepted)
        return NextResponse.json(undefined, { status: 200 })
    return NextResponse.json({ message: response?.response || "Unable to send email" }, { status: 501 })
}