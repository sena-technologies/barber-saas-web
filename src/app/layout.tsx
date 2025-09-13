import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Barbearia Sena — Agendamentos e Loja",
  description: "Site da barbearia com serviços, loja de produtos e agendamento online.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <header className="border-b border-neutral-200 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
          <div className="mx-auto max-w-5xl px-4 h-14 flex items-center justify-between">
            <a href="/" className="font-semibold tracking-tight">Barbearia Sena</a>
            <nav className="flex items-center gap-4 text-sm">
              <a className="hover:underline" href="/">Início</a>
              <a className="hover:underline" href="/agendamento">Agendamento</a>
              <a className="hover:underline opacity-60 pointer-events-none" href="#" title="Em breve">Serviços</a>
              <a className="hover:underline opacity-60 pointer-events-none" href="#" title="Em breve">Loja</a>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer className="mt-16 border-t border-neutral-200">
          <div className="mx-auto max-w-5xl px-4 py-6 text-xs text-neutral-600">
            © {new Date().getFullYear()} Barbearia Sena. Todos os direitos reservados.
          </div>
        </footer>
      </body>
    </html>
  );
}
