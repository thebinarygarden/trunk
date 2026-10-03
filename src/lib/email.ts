import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

// Deliberately not awaited by callers: awaiting would let response timing reveal
// whether an account exists. On Cloud Run this relies on --no-cpu-throttling so the
// send can finish after the response has gone out.
export function sendEmail(to: string, subject: string, text: string) {
    if (!resend) {
        if (process.env.NODE_ENV === 'production') {
            console.error(`[email] RESEND_API_KEY is not set; dropped "${subject}"`);
        } else {
            console.log(`[email] to: ${to}\n[email] subject: ${subject}\n${text}`);
        }
        return;
    }
    resend.emails
        .send({ from: process.env.EMAIL_FROM!, to, subject, text })
        .then(({ error }) => {
            if (error) console.error('[email] send failed', error);
        })
        .catch((error) => console.error('[email] send failed', error));
}
