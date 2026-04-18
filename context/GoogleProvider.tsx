"use client";

import { GoogleOAuthProvider } from "@react-oauth/google";

export default function GoogleProvider({ children }: { children: React.ReactNode }) {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "674839182251-snfbnnrb1b26bv5e8d1arj157h2ng5no.apps.googleusercontent.com";
  
  if (!clientId) {
    console.warn("Google Client ID is missing!");
  }

  return (
    <GoogleOAuthProvider clientId={clientId}>
      {children}
    </GoogleOAuthProvider>
  );
}
