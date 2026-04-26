import { Providers } from '@/src/components/shared/Providers';
import type { Metadata, Viewport } from 'next';
import { Inter, Roboto_Mono, Satisfy } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'optional',
  variable: '--font-inter',
  preload: true,
});

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono',
  preload: false,
});

export const satisfy = Satisfy({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
  variable: '--font-satisfy',
  preload: false,
});

const siteUrl = 'https://dhakalnirajan.com.np';
const siteName = 'Nirajan Dhakal';
const siteDescription =
  'Nirajan Dhakal is a Backend Engineer specializing in Generative AI and scalable web applications. He builds high-performance APIs, AI-driven systems, and cloud-native solutions using JavaScript, TypeScript, and Python.';
const ogImage = '/og.png';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: 'Nirajan Dhakal — Backend & GenAI Engineer',
    template: `%s | Nirajan Dhakal`,
  },

  description: siteDescription,
  applicationName: siteName,

  keywords: [
    'Nirajan Dhakal',
    'Backend Engineer',
    'Generative AI Developer',
    'Full Stack Developer',
    'Python',
    'TypeScript',
    'Django',
    'FastAPI',
    'Next.js',
    'AWS',
    'Nepal',
    'Pokhara',
  ],

  authors: [{ name: 'Nirajan Dhakal', url: siteUrl }],
  creator: 'Nirajan Dhakal',

  openGraph: {
    title: 'Nirajan Dhakal — Backend & GenAI Engineer',
    description: siteDescription,
    url: siteUrl,
    siteName,
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: 'Nirajan Dhakal - Backend and Generative AI Engineer',
      },
    ],
    type: 'website',
    locale: 'en_NP',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Nirajan Dhakal — Backend & GenAI Engineer',
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
      '@id': `${siteUrl}#person`,
      name: 'Nirajan Dhakal',
      url: siteUrl,
      image: `${siteUrl}/og.png`,
      jobTitle: 'Backend Engineer',
      description: siteDescription,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Pokhara',
        addressCountry: 'NP',
      },
      nationality: 'Nepali',
      knowsLanguage: ['en', 'ne'],
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
        'NestJS',
        'React',
        'AWS',
        'LangChain',
        'Generative AI',
        'PostgreSQL',
        'Redis',
        'Docker',
      ],
      hasOccupation: [
        { '@type': 'Occupation', name: 'Backend Engineer' },
        { '@type': 'Occupation', name: 'Full Stack Developer' },
        { '@type': 'Occupation', name: 'AI Engineer' },
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}#website`,
      url: siteUrl,
      name: siteName,
      description: siteDescription,
      inLanguage: 'en',
      publisher: {
        '@id': `${siteUrl}#person`,
      },
      sameAs: [
        'https://github.com/Neerazan',
        'https://www.linkedin.com/in/nirajan-dhakal-a49a36214/',
      ],
    },
    {
      '@type': 'WebPage',
      '@id': siteUrl,
      url: siteUrl,
      name: 'Nirajan Dhakal — Backend & GenAI Engineer',
      isPartOf: {
        '@id': `${siteUrl}#website`,
      },
      about: {
        '@id': `${siteUrl}#person`,
      },
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: `${siteUrl}/og.png`,
      },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${robotoMono.variable} ${satisfy.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-[#0a0a0a] text-white min-h-screen relative overflow-x-hidden antialiased">
        <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-grid-white bg-grid-small-white z-0" />
        <Providers>
          <div className="relative z-10">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
