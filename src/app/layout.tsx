import { AppProvider } from "@/hooks";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Todolist: Gerencie suas Tarefas de Forma Eficiente",
  description:
    "Plataforma de gerenciamento de tarefas online com interface intuitiva. Organize e acompanhe suas tarefas diárias com o Todolist. Experimente grátis!",
  keywords:
    "Todolist, gerenciamento de tarefas, produtividade, lista de tarefas, tarefas online, organização, planejamento, eficiência, plataforma de tarefas, app de tarefas, gestão de tarefas, acompanhamento de tarefas, tarefas diárias, software de tarefas, interface intuitiva, sistema de tarefas, controle de tarefas, automação de tarefas,",

  openGraph: {
    type: "website",
    url: "https://interface-todolist.vercel.app/",
    title: "Todolist: Gerencie suas Tarefas de Forma Eficiente",
    description:
      "Plataforma de gerenciamento de tarefas com interface intuitiva e acompanhamento de tarefas diárias.",
    images: [
      {
        url: "https://interface-todolist.vercel.app/favicon.ico",
        alt: "Todolist Logo",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://interface-todolist.vercel.app/" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Todolist",
              description:
                "Plataforma de gerenciamento de tarefas online com interface intuitiva. Organize e acompanhe suas tarefas diárias com o Todolist. Experimente grátis!",
              url: "https://interface-todolist.vercel.app/",
              logo: "https://interface-todolist.vercel.app/favicon.ico",
              telephone: "+55-88-921531882",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Rua Exemplo, 123",
                addressLocality: "Juazeiro do Norte",
                addressRegion: "Ceará",
                postalCode: "63000-000",
                addressCountry: "BR",
              },
              openingHours: "Mo-Su 00:00-23:59",
              sameAs: [
                "https://www.facebook.com/Todolist",
                "https://www.instagram.com/todolist.tech/",
              ],
            }),
          }}
        />
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
        <AppProvider> {children}</AppProvider>

        <ToastContainer position="top-right" autoClose={2000} />
      </body>
    </html>
  );
}
