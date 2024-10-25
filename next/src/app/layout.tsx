import React from 'react';
import type { Metadata } from 'next';
import { Nunito_Sans } from 'next/font/google';
import '../../public/styles/globals.css';

const nunito = Nunito_Sans({ subsets: ['cyrillic', 'latin'] });

export const metadata: Metadata = {
    title: 'TODO',
    description: 'TODO Application',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en'>
            <body className={nunito.className}>{children}</body>
        </html>
    );
}
