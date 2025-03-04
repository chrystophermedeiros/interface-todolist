"use client";

import { useTheme } from "@/hooks/ThemeContext";
import { IcBaselineBrightnessHigh } from "@/icons/baseline-brightness-high";
import { IcBaselineNightlightRound } from "@/icons/baseline-nigtligrh-round";
import Image from "next/image";
import Link from "next/link";

import { Hero } from "./Hero";

export const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="fixed top-0 w-full z-20 h-16 bg-background-primary shadow-xl  flex items-center justify-between p-4">
      <nav>
        <Link title="Clique para voltar a página inicial" href="/">
          <Image
            src="/favicon.ico"
            alt="Logo"
            width={40}
            height={40}
            className="rounded-full border-2 border-transparent cursor-pointer hover:border-color-green-forest hover:border-2 hover:transition-all hover:duration-100"
          />
        </Link>
      </nav>
      <article className="flex items-center gap-4">
        <button
          title="Clique para trocar o tema"
          onClick={toggleTheme}
          className=" hover:underline hover:text-color-green-forest  p-1 flex items-center gap-1"
        >
          <span>Tema</span>

          <span>
            {theme === "light" ? (
              <IcBaselineBrightnessHigh />
            ) : (
              <IcBaselineNightlightRound />
            )}
          </span>
        </button>
        <Hero />
      </article>
    </header>
  );
};
