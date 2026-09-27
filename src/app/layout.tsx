import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "../styles/global.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://sevenkncglobalexim.com/"),
  title: "SevenKNC Global Exim | Dehydrated Food Products Exporter from India",
  description:
    "SevenKNC Global Exim supplies dehydrated onion, garlic, ginger and moringa products for global B2B buyers, food manufacturers, spice blenders, HoReCa businesses and importers.",
  keywords:
    "Dehydrated Onion Exporter India, Dehydrated Onion Supplier India, Dehydrated Garlic Exporter, Dehydrated Ginger Supplier, Dehydrated Food Ingredients India, Onion Flakes Supplier, Onion Powder Exporter, Garlic Granules Supplier, Ginger Powder Supplier, Moringa Powder Exporter India, Dehydrated Vegetables Supplier, Food Ingredient Exporter India",
  robots: "index, follow",
  authors: [{ name: "SevenKNC Global Exim" }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    title: "SevenKNC Global Exim | Dehydrated Food Products Exporter from India",
    description:
      "Premium dehydrated onion, garlic, ginger and moringa products for global B2B buyers, food manufacturers, spice blenders, HoReCa businesses and importers.",
    locale: "en_IN",
    siteName: "SevenKNC Global Exim",
  },
};

export const viewport: Viewport = {
  themeColor: "#1040a0",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "SevenKNC Global Exim",
  url: "https://sevenkncglobalexim.example/",
  logo: "https://sevenkncglobalexim.example/logo.png",
  description:
    "Trading and export company in Pune, India dealing in dehydrated onion, garlic, ginger and moringa products for global B2B buyers.",
  slogan: "Bringing Nature's Best to the World",
  telephone: "+91-7499449790",
  email: "sevenknc.globalexim@gmail.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "A1707, R16, Life Republic Township, Near Gaikwad Nagar, Jambe",
    addressLocality: "Pune",
    postalCode: "411033",
    addressRegion: "Maharashtra",
    addressCountry: "IN",
  },
  sameAs: [
    "https://www.facebook.com/profile.php?id=61572104889249",
    "https://www.instagram.com/sevenknc.globalexim/",
    "https://www.linkedin.com/company/113164049/",
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "SevenKNC Global Exim",
  url: "https://sevenkncglobalexim.example/",
  description:
    "SevenKNC Global Exim supplies dehydrated onion, garlic, ginger and moringa products for global B2B buyers.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,600&family=Poppins:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
