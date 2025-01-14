import BreadcrumbOne from "@/components/common/breadcrumb/BreadcrumbOne";
import HeaderOne from "@/layouts/headers/HeaderOne";
import React from "react";
import FaqArea from "../faq/FaqArea";
import FancyBanner from "../about-us/about-us-two/FancyBanner";
import FooterFour from "@/layouts/footers/FooterFour";
import HeaderFour from "@/layouts/headers/HeaderFour";
import FooterFive from "@/layouts/footers/FooterFive";

export default function TermsAndConditions() {
  return (
    <>
      <HeaderFour />
      <BreadcrumbOne
        title="Terms and Conditions"
        link="#"
        link_title="Pages"
        sub_title="Terms and Conditions"
        style={false}
      />
      <div className="container my-5">
        <h1 className="text-center mb-4">Terms and Conditions</h1>
        <p>
          Welcome to <strong>Happilee Property</strong>! By accessing or using
          our website and services, you agree to comply with these Terms and
          Conditions. Please read them carefully before using the website. If
          you do not agree, you may not use the site.
        </p>
        <hr />

        <h5>1. Acceptance of Terms</h5>
        <p>
          By accessing or using <strong>Happilee Property</strong>, you agree to
          be bound by these Terms and Conditions and our Privacy Policy. These
          terms apply to all users, including visitors, registered users,
          property owners, and agents.
        </p>

        <h5>2. Eligibility</h5>
        <p>To use our services, you must:</p>
        <ul>
          <li>
            Be at least 18 years old or the age of majority in your
            jurisdiction.
          </li>
          <li>
            Provide accurate and complete information during registration or
            property submission.
          </li>
          <li>Comply with all applicable laws and regulations.</li>
        </ul>

        <h5>3. Services Provided</h5>
        <p>
          <strong>Happilee Property</strong> provides an online platform to:
        </p>
        <ul>
          <li>Search for residential and commercial properties.</li>
          <li>List properties for sale, rent, or lease.</li>
          <li>
            Facilitate communication between property seekers, owners, and
            agents.
          </li>
        </ul>
        <p>
          We are not involved in actual transactions between users and are not
          responsible for any disputes arising from such transactions.
        </p>

        <h5>4. User Responsibilities</h5>
        <p>As a user, you agree to:</p>
        <ul>
          <li>Provide accurate, up-to-date, and truthful information.</li>
          <li>Use the website solely for lawful purposes.</li>
          <li>
            Refrain from posting offensive, misleading, or inappropriate
            content.
          </li>
          <li>
            Respect the intellectual property rights of{" "}
            <strong>Happilee Property</strong> and others.
          </li>
        </ul>

        <h5>5. Property Listings</h5>
        <ul>
          <li>
            Property listings must be accurate, lawful, and comply with
            applicable regulations.
          </li>
          <li>
            <strong>Happilee Property</strong> reserves the right to edit,
            reject, or remove any listing that violates these terms or is deemed
            inappropriate.
          </li>
          <li>
            Users submitting listings agree they are authorized to offer the
            listed property.
          </li>
        </ul>

        <h5>6. Fees and Payments</h5>
        <ul>
          <li>
            Certain services may require payment, such as premium property
            listings.
          </li>
          <li>Fees are non-refundable unless specified otherwise.</li>
          <li>
            Payments must be made through the provided secure payment methods.
          </li>
        </ul>

        <h5>7. Prohibited Activities</h5>
        <p>You may not:</p>
        <ul>
          <li>Use the website for fraudulent or illegal activities.</li>
          <li>Post spam, unsolicited advertisements, or malicious content.</li>
          <li>
            Attempt to hack, disrupt, or misuse the website’s functionality.
          </li>
          <li>Collect user data without consent.</li>
        </ul>

        <h5>8. Limitation of Liability</h5>
        <p>
          <strong>Happilee Property</strong> is not liable for:
        </p>
        <ul>
          <li>
            Inaccurate or misleading property information posted by users.
          </li>
          <li>
            Disputes or issues between users, including financial transactions.
          </li>
          <li>Losses or damages caused by the use of our website.</li>
        </ul>
        <p>
          The website and its services are provided &ldquo;as is&ldquo; without any
          warranties, express or implied.
        </p>

        <h5>9. Intellectual Property</h5>
        <p>
          All content on the website, including text, images, logos, and design,
          is owned by <strong>Happilee Property</strong> or its licensors. You
          may not copy, reproduce, or distribute any content without written
          permission.
        </p>

        <h5>10. Termination</h5>
        <p>
          <strong>Happilee Property</strong> reserves the right to suspend or
          terminate your account and access to the website at any time, with or
          without notice, for any violation of these terms.
        </p>

        <h5>11. Third-Party Links</h5>
        <p>
          The website may include links to third-party websites. We are not
          responsible for the content or practices of these external sites.
        </p>

        <h5>12. Indemnification</h5>
        <p>
          You agree to indemnify and hold <strong>Happilee Property</strong>,
          its affiliates, employees, and agents harmless from any claims,
          losses, or damages resulting from:
        </p>
        <ul>
          <li>Your violation of these terms.</li>
          <li>Your use of the website or its services.</li>
        </ul>

        <h5>13. Governing Law</h5>
        <p>
          These Terms and Conditions are governed by the laws. Any disputes
          arising from the use of our website shall be resolved in the courts.
        </p>

        <h5>14. Changes to Terms</h5>
        <p>
          We may update these Terms and Conditions periodically. Any changes
          will be effective immediately upon posting. Continued use of the
          website constitutes acceptance of the revised terms.
        </p>

        <p>
          Thank you for using <strong>Happilee Property</strong>. We are
          committed to providing a safe and reliable platform for all users.
        </p>
      </div>

      <FooterFive />
    </>
  );
}
