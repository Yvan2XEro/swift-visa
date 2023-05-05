import nodemailer from "nodemailer"

export async function sendEmail(from: string, to: string, subject: string, html: string) {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD,
            }
        });

        const mailOptions = {
            from,
            to,
            subject,
            html,
        };

        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.log(error)
    }
}

export function demandLinkMail(link: string) {
    return `
    <p>
    Dear Applicant, <br/>
    here is the link to continue your visa application.
    </p>
    
    <br/><br/>
    <p>Please click on the following link to access the form:</p><p><a href="${link}">${link}</a></p>
    
    <br/><br/>
    <p>This link will expire in two hours, the time to complete your request</p>
    <br/><br/>
    <p style="text-align: center;">${process.env.APP_NAME}</p>
    `
}