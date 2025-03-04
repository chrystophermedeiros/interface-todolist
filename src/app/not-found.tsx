'use client';

import Link from 'next/link';

const NotFoundPage = () => {
  return (
    <main className="flex items-center justify-center h-screen bg-background-primary">
      <section className="text-center p-6 bg-background-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-color-orange-fire">404 - Página não encontrada</h1>
        <p className="mt-4 text-color-balck">Desculpe, a página que você está procurando não existe.</p>
        <p className="mt-6  text-color-balck">
          Clique <Link href="/" className="text-color-green-forest text-lg hover:underline">👉aqui</Link> para voltar para a página inicial.
        </p>
      </section>
    </main>
  );
};

export default NotFoundPage;