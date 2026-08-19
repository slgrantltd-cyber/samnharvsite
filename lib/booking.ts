/**
 * The 15-minute intro call. Set NEXT_PUBLIC_BOOKING_URL (Vercel → Settings →
 * Environment Variables) to the Google Calendar appointment-schedule booking
 * link and /call embeds it live. Until then /call takes a request and we ring.
 */
export const BOOKING_URL = process.env.NEXT_PUBLIC_BOOKING_URL ?? "";
