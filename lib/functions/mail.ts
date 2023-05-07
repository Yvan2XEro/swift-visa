import nodemailer from "nodemailer"

export async function sendEmail(from: string, to: string, subject: string, html: string) {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "swift.visa237@gmail.com",//process.env.EMAIL,
                pass: process.env.GMAIL_PASSWORD,
            }
        });

        const mailOptions = {
            from: process.env.NOREPLY_EMAIL,
            to,
            subject,
            html
        };

        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.log(error)
    }
}

export function demandLinkMail(link: string, id: any) {
    return `
    <p>
    Dear Applicant, <br/>
    here is the link to continue your visa application.
    </p>
    <p>ID: <strong>${id}</strong> </p>
    <br/><br/>
    <p>Please click on the following link to access the form:</p><p><a href="${link}">${link}</a></p>
    
    <br/><br/>
    <p>This link will expire in two hours, the time to complete your request</p>
    <br/><br/>
    <p style="text-align: center;">${process.env.APP_NAME}</p>
    `
}