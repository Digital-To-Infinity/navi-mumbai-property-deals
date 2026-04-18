"use client";

import { GoogleOAuthProvider } from "@react-oauth/google";

export default function GoogleProvider({ children }: { children: React.ReactNode }) {
  const envClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  const fallbackClientId = "674839182251-ru68p8j8bicnt2m69n27502kjfbqipn1.apps.googleusercontent.com"; 
  
  // Ensure we have a valid non-empty string
  const clientId = (envClientId && envClientId.trim() !== "") ? envClientId.trim() : fallbackClientId;
  
  return (
    <GoogleOAuthProvider clientId={clientId}>
      {children}
    </GoogleOAuthProvider>
  );
}
