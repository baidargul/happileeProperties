import BreadcrumbOne from '@/components/common/breadcrumb/BreadcrumbOne'
import HeaderOne from '@/layouts/headers/HeaderOne'
import React from 'react'
import FaqArea from '../faq/FaqArea'
import FancyBanner from '../about-us/about-us-two/FancyBanner'
import FooterFour from '@/layouts/footers/FooterFour'

export default function PrivacyPolicy() {
  return (
	<>
	<HeaderOne style={true} />
         <BreadcrumbOne title="Privacy Policy" link="#" link_title="Pages" sub_title="Policiy" style={true} />
         <div className="container my-5">
         <h1 className="text-center mb-4">Privacy Policy</h1>
         <p>
            At <strong>[Housing Website Name]</strong>, your privacy is our top priority. This Privacy Policy outlines how we collect, use, and safeguard your information when you use our website and services. By accessing or using our website, you consent to the terms of this Privacy Policy.
         </p>
         <hr />
         <h1>1. Information We Collect</h1>
         <p>We collect the following types of information:</p>
         <ul>
            <li><strong>Personal Information:</strong> Name, email address, phone number, and other contact details provided during registration or inquiries. Payment details when you engage in transactions.</li>
            <li><strong>Non-Personal Information:</strong> Browsing behavior, device type, IP address, and geographic location. Cookies and similar tracking technologies to enhance your user experience.</li>
            <li><strong>User-Generated Content:</strong> Reviews, ratings, comments, and messages submitted through the platform.</li>
         </ul>

         <h1>2. How We Use Your Information</h1>
         <p>We use your information to:</p>
         <ul>
            <li>Provide and improve our services, including property search, listing, and transaction facilitation.</li>
            <li>Respond to inquiries and support requests.</li>
            <li>Send notifications about new listings, promotions, or updates (you can opt out at any time).</li>
            <li>Analyze user behavior to enhance functionality and personalization.</li>
            <li>Comply with legal obligations and enforce terms and conditions.</li>
         </ul>

         <h1>3. Sharing Your Information</h1>
         <p>We do not sell, trade, or rent your personal information. However, we may share it with:</p>
         <ul>
            <li><strong>Service Providers:</strong> Third-party vendors assisting in website operations, payment processing, or marketing.</li>
            <li><strong>Legal Compliance:</strong> Authorities or entities when required by law or to protect rights, safety, and property.</li>
            <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your information may be transferred to the new entity.</li>
         </ul>

         <h1>4. Cookies and Tracking Technologies</h1>
         <p>We use cookies to:</p>
         <ul>
            <li>Enhance website performance and user experience.</li>
            <li>Track website usage statistics.</li>
            <li>Provide tailored advertisements.</li>
         </ul>
         <p>You can manage your cookie preferences through your browser settings. Note that disabling cookies may impact the functionality of the website.</p>

         <h1>5. Your Rights</h1>
         <p>As a user, you have the right to:</p>
         <ul>
            <li>Access, correct, or delete your personal data.</li>
            <li>Opt-out of marketing communications.</li>
            <li>Request data portability, where applicable.</li>
            <li>Lodge a complaint with a data protection authority.</li>
         </ul>
         <p>To exercise these rights, contact us at <strong>[Insert Contact Email]</strong>.</p>

         <h1>6. Data Security</h1>
         <p>
            We implement robust measures to protect your information, including encryption, firewalls, and secure servers. However, no method of data transmission or storage is 100% secure. Use the website at your own risk.
         </p>

         <h1>7. Third-Party Links</h1>
         <p>
            Our website may include links to third-party sites. We are not responsible for the privacy practices or content of these sites. We recommend reviewing their privacy policies.
         </p>

         <h1>8. Children’s Privacy</h1>
         <p>
            Our website is not intended for children under the age of 13. We do not knowingly collect personal information from children.
         </p>

         <h1>9. Changes to This Policy</h1>
         <p>
            We may update this Privacy Policy periodically. Changes will be reflected with the &quot;Last Updated&quot; date. Continued use of the website constitutes acceptance of these changes.
         </p>

         <h1>10. Contact Us</h1>
         <p>If you have questions or concerns about this Privacy Policy, please contact us at:</p>
         <ul>
            <li>Email: <strong>[Insert Email Address]</strong></li>
            <li>Phone: <strong>[Insert Phone Number]</strong></li>
            <li>Address: <strong>[Insert Physical Address]</strong></li>
         </ul>
         <p>Thank you for trusting <strong>[Housing Website Name]</strong>. We are committed to protecting your privacy.</p>
      </div>
         <FooterFour />
	</>
  )
}
