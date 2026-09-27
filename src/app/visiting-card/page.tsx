import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "../../data/siteConfig";
import "./visiting-card.css";

export const metadata: Metadata = {
  title: "SevenKNC Visiting Card",
};

export default function VisitingCardPage() {
  const vCardDownloadUrl = `${SITE.websiteUrl}visiting-card.vcf`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(vCardDownloadUrl)}`;

  return (
    <div className="vcard-page">
      <div className="vcard-card">
        <div className="vcard-brand">SevenKNC Global Exim</div>
        <div className="vcard-subtitle">Business Contact Card</div>
        <div className="vcard-content">
          <div className="vcard-details">
            <div><strong>Name:</strong> Kulashree Chittevan</div>
            <div><strong>Phone:</strong> +91 7499449790</div>
            <div><strong>WhatsApp:</strong> +91 7499449790</div>
            <div><strong>Email:</strong> sevenknc.globalexim@gmail.com</div>
            <div>
              <strong>Office:</strong> A1707, R16, Life Republic Township, Near
              Gaikwad Nagar, Jambe, Pune 411033, Maharashtra, India
            </div>
            <div><strong>Website:</strong> https://sevenkncglobalexim.com/</div>
            <div className="vcard-actions">
              <a className="vcard-btn" href="/visiting-card.vcf" download="SevenKNC-Visiting-Card.vcf">
                Download vCard
              </a>
              <Link className="vcard-btn secondary" href="/">
                Back to website
              </Link>
            </div>
          </div>
          <div className="vcard-qr">
            <img src={qrCodeUrl} alt="SevenKNC visiting card QR code" />
          </div>
        </div>
      </div>
    </div>
  );
}
