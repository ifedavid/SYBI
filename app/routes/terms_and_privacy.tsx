import type { Route } from "./+types/terms_and_privacy";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Terms & Privacy - SYBI" },
    {
      name: "description",
      content: "Legal terms of service and privacy policy for Should You Buy It?",
    },
  ];
}

export default function TermsAndPrivacy() {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      {/* Legal Disclaimer Section */}
      <section className="mb-12 prose prose-sm max-w-none">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Legal Disclaimer</h1>
        <p className="text-sm text-gray-600 mb-6">Effective Date: April 8, 2025</p>
        
        <p className="mb-6">
          By using <i>Should You Buy It?</i>, you agree to the following terms and conditions. All reviews and opinions expressed on this platform are those of individual users and not of <i>Should You Buy It?</i> as a brand. While we moderate reviews for authenticity, <i>Should You Buy It?</i> is not liable for any false, defamatory, or misleading content submitted by users.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">User Responsibility</h2>
        <p>Users must ensure that:</p>
        <ul className="list-disc pl-5 mb-6">
          <li>Their reviews reflect genuine experiences with a product, service, or brand.</li>
          <li>Their statements are truthful, respectful, and based on actual interactions.</li>
          <li>They are not posting fake or malicious content, or impersonating someone else.</li>
        </ul>
        <p className="mb-6">Reviews that violate these guidelines may be removed without notice.</p>

        <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Business Rights & Review Disputes</h2>
        <p>If you are a business and believe a review about your brand is false, harmful, or submitted without proof of patronage:</p>
        <ul className="list-disc pl-5 mb-6">
          <li>Contact us via email at admin@shouldubuyit.com</li>
          <li>We will investigate the matter within 7 working days.</li>
          <li>During this time, we may request verification from the reviewer.</li>
          <li>Appropriate action will be taken, which may include review removal.</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Review Verification</h2>
        <p className="mb-6">
          To ensure fairness, <i>Should You Buy It?</i> may request proof of transaction (e.g. receipts, order confirmations, or communication) before publishing or resolving disputes around a review. Verified reviews will be marked accordingly.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Defamation & Legal Risks</h2>
        <p className="mb-6">
          Any content that defames a brand or individual without basis may be grounds for legal action under the Cybercrimes Act (2015) and Nigerian defamation laws. Contact us with evidence if you believe a review is unlawful.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Indemnity Clause</h2>
        <p className="mb-6">
          By submitting a review, you agree to indemnify and hold harmless <i>Should You Buy It?</i> and its affiliates against any claims or damages arising from your content.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Governing Law</h2>
        <p className="mb-10">
          This disclaimer is governed by the laws of the Federal Republic of Nigeria. Disputes will be resolved in Nigerian courts.
        </p>

        <hr className="my-12 border-gray-200" />

        <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
        <p className="text-sm text-gray-600 mb-6">Effective Date: April 8, 2025</p>

        <p className="mb-6">
          <i>Should You Buy It?</i> is committed to protecting your privacy. This policy explains how we collect, use, and safeguard the personal information you provide.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">1. What We Collect</h2>
        <p>We may collect the following information when you submit a review or use our contact form:</p>
        <ul className="list-disc pl-5 mb-6">
          <li>Name</li>
          <li>Email address</li>
          <li>Any other info you choose to include in your review</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">2. How We Use Your Information</h2>
        <p>We use this information to:</p>
        <ul className="list-disc pl-5 mb-6">
          <li>Contact you if there's a concern about your review.</li>
          <li>Request additional verification, if needed.</li>
          <li>Respond to legal complaints or disputes.</li>
        </ul>
        <p className="mb-6">
          We do not use your information for marketing or share it with third parties, except where legally required.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">3. Data Security</h2>
        <p className="mb-6">
          We use reasonable technical and administrative measures to protect your personal data. However, no system is 100% secure, so we cannot guarantee absolute security.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">4. Your Rights</h2>
        <p>You can request to:</p>
        <ul className="list-disc pl-5 mb-6">
          <li>View the information we have stored about you.</li>
          <li>Ask us to delete your personal data from our system.</li>
        </ul>
        <p className="mb-6">
          To make a request, email us at admin@shouldubuyit.com
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">5. Cookies</h2>
        <p className="mb-6">
          We may use cookies to enhance your browsing experience (e.g., remembering your preferences or preventing spam). You can disable cookies in your browser settings.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">6. Changes to This Policy</h2>
        <p className="mb-6">
          We may update this Privacy Policy as needed. Any changes will be posted here with a revised effective date.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">7. Contact</h2>
        <p className="mb-6">
          For questions about your privacy, contact us at:{' '}
          <a href="mailto:admin@shouldubuyit.com" className="text-lime-600 hover:text-lime-700">
            admin@shouldubuyit.com
          </a>
        </p>
      </section>
    </div>
  );
}
