import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import './globals.css';

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
  openGraph: {
    title: siteName,
    description: siteDescription,
    url: siteUrl,
    siteName,
    images: [{ url: ogImage, alt: 'Nirajan Dhakal - Full Stack and Generative AI Developer' }],
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: siteName,
    description: siteDescription,
    images: [ogImage]
  },
  robots: {
    index: true,
    follow: true
  },
  alternates: {
    canonical: siteUrl
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Preload critical resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        {/* Prefetch likely resources */}
        <link rel="prefetch" href="/assets/Portal.svg" />
        <link rel="prefetch" href="/assets/Home Icom.svg" />
      </head>
      <body className="bg-[#101111] text-white min-h-screen">
        {children}
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "uncwcvbrj0");
          `}
        </Script>
      </body>
    </html>
  );
}
