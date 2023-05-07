import { demandLinkMail, sendEmail } from '@/lib/functions/mail';
import { generateExpirableToken, getExpirationDateTime } from '@/lib/functions/tokens';
import { createDemand, updateDemand } from '@/lib/prisma/demands';
import { Demand } from '@/types';
import { NextResponse } from 'next/server';


export async function POST(request: Request) {
    const data = await request.json() as Demand
    try {
        const { demand: demandeVisa, error } = await createDemand({ ...data });
        if (!!error || !demandeVisa) return NextResponse.json({ message: (error as any).toString() }, { status: 500 })
        const token = generateExpirableToken(demandeVisa?.id);
        const d = await updateDemand(demandeVisa?.id, { ...demandeVisa, id: undefined, token, expireLink: getExpirationDateTime(token) })

        const link = `${process.env.HOST || request.url.split("/api")[0]}/demands-check/${token}`
        sendEmail(`&${process.env.NOREPLY_EMAIL}`, demandeVisa.email, "Completion of the VISA application request", demandLinkMail(link, d?.demand?.id))
        return NextResponse.json(d, { status: 200 })
    } catch (error: any) {
        console.log(error)
        return NextResponse.json({ message: error.toString() }, { status: 500 })
    }
}
