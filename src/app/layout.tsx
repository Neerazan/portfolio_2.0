import { Providers } from '@/src/components/shared/Providers';
import type { Metadata, Viewport } from 'next';
import { Inter, Roboto_Mono, Satisfy } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
});

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono',
  preload: false,
});

// Moved here from Header.tsx so it doesn't cause an extra client-side font request
export const satisfy = Satisfy({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
  variable: '--font-satisfy',
  preload: false,
});

const siteUrl = 'https://dhakalnirajan.com.np';
const siteName = 'Nirajan Dhakal';
const siteDescription = 'Nirajan Dhakal — Full Stack and Generative AI Developer skilled in JavaScript, Python, TypeScript, Django, Node.js, Next.js, and AWS. Explore projects that blend cloud infrastructure, GenAI integrations, and scalable web solutions built with clean architecture and automation.';
const ogImage = '/og.png';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  applicationName: siteName,
  keywords: [
    'Nirajan Dhakal',
    'Full Stack Developer',
    'Generative AI Developer',
    'Nepal',
    'Pokhara',
    'Django',
    'Next.js',
    'FastAPI',
    'LangChain',
    'Python',
    'TypeScript',
    'AWS',
    'portfolio',
  ],
  authors: [{ name: 'Nirajan Dhakal', url: siteUrl }],
  creator: 'Nirajan Dhakal',
  openGraph: {
    title: siteName,
    description: siteDescription,
    url: siteUrl,
    siteName,
    images: [{ url: ogImage, width: 1200, height: 630, alt: 'Nirajan Dhakal - Full Stack and Generative AI Developer' }],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteName,
    description: siteDescription,
    images: [ogImage],
    creator: '@dhakalnirajan',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
};

// JSON-LD Structured Data
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${siteUrl}/#person`,
      name: 'Nirajan Dhakal',
      url: siteUrl,
      image: `${siteUrl}/og.png`,
      jobTitle: 'Full Stack Developer',
      description: siteDescription,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Pokhara',
        addressCountry: 'NP',
      },
      sameAs: [
        'https://github.com/Neerazan',
        'https://www.linkedin.com/in/nirajan-dhakal-a49a36214/',
      ],
      knowsAbout: [
        'JavaScript',
        'TypeScript',
        'Python',
        'Django',
        'FastAPI',
        'Node.js',
        'Next.js',
        'React',
        'AWS',
        'LangChain',
        'Generative AI',
        'Machine Learning',
        'PostgreSQL',
        'Docker',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: siteName,
      description: siteDescription,
      publisher: { '@id': `${siteUrl}/#person` },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${robotoMono.variable} ${satisfy.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-[#0a0a0a] text-white min-h-screen relative overflow-x-hidden antialiased">
        {/* Global Grid Texture */}
        <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-grid-white bg-grid-small-white z-0" />
        <Providers>
          <div className="relative z-10">
            {children}
          </div>
        </Providers>
        {/* Microsoft Clarity removed — caused 26KB + 82ms main-thread overhead on mobile */}
      </body>
    </html>
  );
}
