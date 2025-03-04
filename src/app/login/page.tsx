"use client";
import { CookieConsent } from "@/components/CookieConset";
import { LoginComponent } from "@/components/Login";
import useRedirectIfAuthenticated from "@/hooks/RedirectIfAuthenticated";
export default function Login() {
  useRedirectIfAuthenticated();

  return (
    <main className="flex flex-col h-screen w-full justify-center items-center p-2 bg-background-primary">
      <LoginComponent />
      <CookieConsent />
    </main>
  );
}
