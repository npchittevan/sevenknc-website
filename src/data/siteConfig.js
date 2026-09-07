// Central business configuration for SevenKNC Global Exim.
// Update values here and they propagate across the whole site.

export const SITE = {
  name: "SevenKNC Global Exim",
  shortName: "SevenKNC",
  tagline: "Bringing Nature's Best to the World",
  type: "Trading and Export Company",
  location: "Pune, Maharashtra, India",
  phoneDisplay: "+91 7499449790",
  phoneE164: "+917499449790",
  whatsapp: "917499449790",
  email: "sevenknc.globalexim@gmail.com",
  addressLines: [
    "A1707, R16, Life Republic Township",
    "Near Gaikwad Nagar, Jambe",
    "Pune 411033, Maharashtra, India",
  ],
  mapUrl: "https://maps.app.goo.gl/ZkwPY4Gh1waBDi5e7",
  mapEmbedUrl:
    "https://www.google.com/maps?q=Life+Republic+Township,+Jambe,+Pune,+Maharashtra+411033,+India&output=embed",
  // Social media links
  social: [
    { platform: "facebook", url: "https://www.facebook.com/profile.php?id=61572104889249" },
    { platform: "instagram", url: "https://www.instagram.com/sevenknc.globalexim/" },
    { platform: "linkedin", url: "https://www.linkedin.com/company/113164049/" },
  ],
  // If a promotional video is supplied, set videoUrl and poster.
  videoUrl: "",
  videoPoster: "",
};

export const WHATSAPP_DEFAULT_MESSAGE =
  "Hello SevenKNC Global Exim, I am interested in your dehydrated food products and would like to discuss my requirement.";

export const WHATSAPP_MESSAGES = {
  hero:
    "Hello SevenKNC Global Exim, I visited your website and am interested in your dehydrated onion, garlic, ginger and moringa products. I would like to discuss B2B supply requirements.",
  contact:
    "Hello SevenKNC Global Exim, I came through your website and would like to get in touch regarding your dehydrated food product range and export services.",
  footer:
    "Hello SevenKNC Global Exim, I found your website and am interested in your dehydrated food products. I would like to know more about your product range and supply capabilities.",
  floating:
    "Hello SevenKNC Global Exim, I am browsing your website and have some questions about your dehydrated food products and B2B supply options.",
  general:
    "Hello SevenKNC Global Exim, I am interested in your dehydrated food products and would like to discuss my requirement.",
};

export function whatsappLink(message = WHATSAPP_DEFAULT_MESSAGE) {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
}
