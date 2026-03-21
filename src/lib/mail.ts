import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.EMAIL_PORT || '587'),
    secure: process.env.EMAIL_SECURE === 'true', // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export const sendMail = async ({ to, subject, html }: { to: string; subject: string; html: string }) => {
    try {
        const info = await transporter.sendMail({
            from: `"Institute Management" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            html,
        });
        console.log('Message sent: %s', info.messageId);
        return info;
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
};

export const sendAbsentAlert = async (studentEmail: string, studentName: string, date: string) => {
    const html = `
        <div style="font-family: sans-serif; padding: 20px; color: #333;">
            <h2 style="color: #ef4444;">Attendance Alert</h2>
            <p>Dear Parent/Guardian,</p>
            <p>This is to inform you that <strong>${studentName}</strong> was marked <strong>Absent</strong> today (${date}).</p>
            <p>If this is an error, please contact the institute office.</p>
            <br/>
            <p>Regards,</p>
            <p><strong>Institute Management</strong></p>
        </div>
    `;
    return sendMail({ to: studentEmail, subject: `Absent Alert - ${studentName}`, html });
};

export const sendNoticeAlert = async (emails: string[], title: string, content: string) => {
    const html = `
        <div style="font-family: sans-serif; padding: 20px; color: #333;">
            <h2 style="color: #4f46e5;">Important Notice</h2>
            <h3 style="margin-top: 0;">${title}</h3>
            <div style="background: #f8fafc; padding: 15px; border-radius: 8px; border-left: 4px solid #4f46e5;">
                ${content}
            </div>
            <br/>
            <p>Check the student portal for more details.</p>
            <p>Regards,</p>
            <p><strong>Institute Management</strong></p>
        </div>
    `;
    return sendMail({ to: emails.join(','), subject: `Important Notice: ${title}`, html });
};

export const sendFeeReceipt = async (studentEmail: string, studentName: string, amount: number, feeType: string) => {
    const html = `
        <div style="font-family: sans-serif; padding: 20px; color: #333 text-align: center;">
            <h2 style="color: #10b981;">Fee Payment Confirmation</h2>
            <p>Dear <strong>${studentName}</strong>,</p>
            <p>We have successfully received your payment of <strong>Rs. ${amount.toLocaleString()}</strong> for <strong>${feeType}</strong>.</p>
            <p>Your invoice is available in the student portal.</p>
            <br/>
            <p>Thank you for your payment!</p>
            <p><strong>Institute Management</strong></p>
        </div>
    `;
    return sendMail({ to: studentEmail, subject: `Payment Received - Rs. ${amount}`, html });
};
