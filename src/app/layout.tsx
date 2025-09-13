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
  title: "Maro Barbearia — Agendamentos e Loja",
  description: "Barbearia premium com serviços exclusivos, loja de produtos e agendamento online.",
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
        <header className="border-b border-neutral-800/20 bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/90">
          <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
            <a href="/" className="flex items-center gap-3">
              <img 
                src="/maro.jpg" 
                alt="Maro Barbearia" 
                className="h-8 w-8 rounded-full object-cover"
              />
              <span className="font-bold text-xl tracking-tight text-white">MARO BARBEARIA</span>
            </a>
            <nav className="flex items-center gap-6 text-sm font-medium">
              <a className="text-white/80 hover:text-white transition-colors" href="/">Início</a>
              <a className="text-white/80 hover:text-white transition-colors" href="/agendamento">Agendamento</a>
              <a className="text-white/40 pointer-events-none" href="#" title="Em breve">Serviços</a>
              <a className="text-white/40 pointer-events-none" href="#" title="Em breve">Loja</a>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer className="mt-20 border-t border-neutral-800/20 bg-black">
          <div className="mx-auto max-w-6xl px-6 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-3">
                <img 
                  src="/maro.jpg" 
                  alt="Maro Barbearia" 
                  className="h-6 w-6 rounded-full object-cover"
                />
                <span className="text-white font-semibold">MARO BARBEARIA</span>
              </div>
              <div className="text-xs text-neutral-400">
                © {new Date().getFullYear()} Maro Barbearia. Todos os direitos reservados.
              </div>

              <div className="flex items-center space-x-2">
                <p className="text-gray-400 text-sm">
                  Desenvolvido por{' '}
                </p>
                <span className="text-red-400 hover:text-red-300 transition-colors font-semibold">
                  Sena Technologies
                </span>
              </div>
            
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
