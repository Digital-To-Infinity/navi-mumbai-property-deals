"use client";

import { GoogleOAuthProvider } from "@react-oauth/google";
import { googleClientId } from "@/lib/googleAuth";

export default function GoogleProvider({ children }: { children: React.ReactNode }) {
  if (!googleClientId) {
    console.warn("Google OAuth is disabled because NEXT_PUBLIC_GOOGLE_CLIENT_ID is missing.");
    return <>{children}</>;
  }

  return <GoogleOAuthProvider clientId={googleClientId}>{children}</GoogleOAuthProvider>;
}
