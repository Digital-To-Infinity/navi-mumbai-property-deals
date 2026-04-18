const rawGoogleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID?.trim() ?? "";

export const googleClientId = rawGoogleClientId.length > 0 ? rawGoogleClientId : null;

export const isGoogleAuthConfigured = googleClientId !== null;
