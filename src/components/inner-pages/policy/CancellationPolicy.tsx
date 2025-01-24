import BreadcrumbOne from '@/components/common/breadcrumb/BreadcrumbOne'
import HeaderOne from '@/layouts/headers/HeaderOne'
import React from 'react'
import FaqArea from '../faq/FaqArea'
import FancyBanner from '../about-us/about-us-two/FancyBanner'
import FooterFour from '@/layouts/footers/FooterFour'
import HeaderFour from '@/layouts/headers/HeaderFour'
import FooterFive from '@/layouts/footers/FooterFive'

export default function CancellationPolicy() {
  return (
	<>
	<HeaderFour/>
         <BreadcrumbOne title="Cancellation Policy" link="#" link_title="Pages" sub_title="Cancellation Policy" style={false} />
         <div className="container my-5">
  <h1 className="text-center mb-4">Cancellation Policy</h1>
  <p>
    At <strong>Happilee Property</strong>, we aim to provide transparent and fair cancellation policies for all users. Please read this policy carefully to understand the terms governing cancellations, refunds, and modifications related to our services.
  </p>
  <hr />

  <h5>1. Cancellation of Paid Services</h5>
  <p>Paid services, such as premium listings or subscription plans, may be canceled under the following conditions:</p>
  <ul>
    <li>Cancellations must be requested within 24 hours of the purchase.</li>
    <li>To initiate a cancellation, users must contact our support team with proof of purchase.</li>
  </ul>

  <h5>2. Refund Policy</h5>
  <p>Refunds for canceled services are subject to the following terms:</p>
  <ul>
    <li>
      <strong>Eligible Refunds:</strong> Refunds are only granted for cancellations made within the eligible timeframe and for services not yet rendered.
    </li>
    <li>
      <strong>Non-Refundable Fees:</strong> Service fees, administrative charges, or payments for services already delivered are non-refundable.
    </li>
    <li>Refunds, if approved, will be processed within 7-10 business days to the original payment method.</li>
  </ul>

  <h5>3. Cancellation of Property Listings</h5>
  <p>Property owners or agents may cancel property listings under the following guidelines:</p>
  <ul>
    <li>Listings may be removed at any time through the user dashboard or by contacting support.</li>
    <li>
      If the listing was part of a paid plan, cancellation does not automatically result in a refund unless requested and eligible under the refund terms.
    </li>
  </ul>

  <h5>4. Subscription Cancellations</h5>
  <p>Subscriptions can be canceled at any time by accessing your account settings:</p>
  <ul>
    <li>Cancellation will take effect at the end of the current billing cycle.</li>
    <li>No partial refunds will be provided for unused subscription periods.</li>
  </ul>

  <h5>5. Cancellations Due to Policy Violations</h5>
  <p>
    <strong>Happilee Property</strong> reserves the right to cancel or suspend any service, listing, or subscription without prior notice if it is found to violate our Terms and Conditions or applicable laws. In such cases, no refunds will be issued.
  </p>

  <h5>6. Modification of Listings or Services</h5>
  <p>
    Users can request modifications to their listings or services instead of cancellations. Any changes are subject to approval and may incur additional fees.
  </p>

  <h5>7. Force Majeure</h5>
  <p>
    Cancellations or interruptions caused by events beyond our control, such as natural disasters, technical failures, or government actions, may not qualify for refunds. However, we will work to resolve any issues promptly.
  </p>

  <h5>8. Changes to This Policy</h5>
  <p>
    <strong>Happilee Property</strong> reserves the right to update or modify this Cancellation Policy at any time. Updates will be reflected with the &ldquo;Last Updated&ldquo; date. Continued use of the website constitutes acceptance of the updated policy.
  </p>

  <p>
    For further assistance, please contact us. We value your trust and aim to provide the best possible service experience.
  </p>
  <p>
        Address:  HN, 798, Shinde Vasti, <br />
        CHH. Shivaji Vidyalaya, Mardi, <br />
        Tal-Maan, Mardi Talman, Satara, Maharashtra, 415508. <br />
        <br />
        Email: ask@Happilee.com <br />
        Mobile No. 7218767879 <br />
        </p>
</div>


         <FooterFive />
	</>
  )
}
