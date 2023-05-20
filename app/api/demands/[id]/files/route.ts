import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const UPLOAD_ROOT = "/"

export async function POST(req: Request, { params }: any) {
    // Lire les données du formulaire

    const dir = UPLOAD_ROOT + "/" + params.id

    const fd = await req.formData()

    const passportProof = fd.get("passportProof") as File

    const returnFlightTicketProof = fd.get("returnFlightTicketProof")
    const yellowFeverVaccinationProof = fd.get("yellowFeverVaccinationProof")
    const invitationLetter = fd.get("invitationLetter")
    const hotelBookingProof = fd.get("hotelBookingProof")
    const passportSizePhoto = fd.get("passportSizePhoto")


    // if (!fs.existsSync(dir)) {
    //     fs.mkdirSync(dir, { recursive: true });
    // }

    const imgPath = path.join(UPLOAD_ROOT, 'img.png')

    await fs.promises.writeFile(imgPath, Buffer.from(await passportProof.arrayBuffer()))

    return NextResponse.json({ done: "ok" });
};
