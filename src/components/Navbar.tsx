"use client";

import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full bg-white shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo + Nome */}
        <div className="flex items-center space-x-3">
          <Image
            src="/favicon.ico" // caminho público (fica em /public/favicon.ico)
            alt="Logo Prefeitura"
            width={28}
            height={28}
            className="rounded"
          />
          <span className="text-xl font-bold text-municipal tracking-wide">
            PMM
          </span>
        </div>

        {/* Links */}
        <div className="flex items-center space-x-8">
          <Link
            href="/home"
            className="text-municipal font-medium hover:text-green-600 transition-colors"
          >
            Início
          </Link>
          <Link
            href="/gerador2"
            className="text-municipal font-medium hover:text-green-600 transition-colors"
          >
            Gerador 2
          </Link>
          <Link
            href="http://192.168.0.98:3000/"
            target="_blank"
            className="text-municipal font-medium hover:text-green-600 transition-colors"
          >
            Contato
          </Link>
        </div>
      </div>
    </nav>
  );
}
