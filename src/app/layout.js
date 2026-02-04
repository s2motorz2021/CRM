import './globals.css';
import ClientLayout from '@/components/ClientLayout';

export const metadata = {
    title: 'S2 Motorz CRM - Smart Service for Smart Bikes',
    description: 'Integrated CRM + ERP Platform for Two-Wheeler Multi-Brand Service & Spare Parts Sales',
    icons: {
        icon: '/logo.png',
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@400;500;600;700&display=swap" rel="stylesheet" />
            </head>
            <body>
                <ClientLayout>
                    {children}
                </ClientLayout>
            </body>
        </html>
    );
}
