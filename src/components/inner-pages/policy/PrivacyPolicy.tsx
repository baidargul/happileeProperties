import BreadcrumbOne from '@/components/common/breadcrumb/BreadcrumbOne'
import HeaderOne from '@/layouts/headers/HeaderOne'
import React from 'react'
import FaqArea from '../faq/FaqArea'
import FancyBanner from '../about-us/about-us-two/FancyBanner'
import FooterFour from '@/layouts/footers/FooterFour'
import HeaderFour from '@/layouts/headers/HeaderFour'
import FooterFive from '@/layouts/footers/FooterFive'

export default function PrivacyPolicy() {
  return (
	<>
	<HeaderFour/>
         <BreadcrumbOne title="Privacy Policy" link="#" link_title="Pages" sub_title="Privacy Policy" style={false} />
         <div className="container my-5">
  <h1 className="text-center mb-4">Privacy Policy</h1>
  <h5>SECTION 1 - WHAT DO WE DO WITH YOUR INFORMATION?</h5>
  <p>
    When you purchase something from our store, as part of the buying and selling process, we collect the personal information you give us, such as your name, address, and email address.
    When you browse our store, we also automatically receive your computer’s internet protocol (IP) address to provide us with information that helps us learn about your browser and operating system.
    <br />
    <strong>Email marketing (if applicable):</strong> With your permission, we may send you emails about our store, new products, and other updates.
  </p>

  <h5>SECTION 2 - CONSENT</h5>
  <p>
    <strong>How do you get my consent?</strong><br />
    When you provide us with personal information to complete a transaction, verify your credit card, place an order, arrange for a delivery, or return a purchase, we imply that you consent to our collecting it and using it for that specific reason only.
    If we ask for your personal information for a secondary reason, like marketing, we will either ask you directly for your expressed consent or provide you with an opportunity to say no.
    <br />
    <strong>How do I withdraw my consent?</strong><br />
    If after you opt-in, you change your mind, you may withdraw your consent for us to contact you, for the continued collection, use, or disclosure of your information at any time by contacting us at happileepropertysolutions@gmail.com or mailing us at: HAPPILEE PROPERTY SOLUTIONS PRIVATE LIMITED, Pune, Maharashtra, India.
  </p>

  <h5>SECTION 3 - DISCLOSURE</h5>
  <p>
    We may disclose your personal information if we are required by law to do so or if you violate our Terms of Service.
  </p>

  <h5>SECTION 4 - PAYMENT</h5>
  <p>
    We use Razorpay for processing payments. We/Razorpay do not store your card data on their servers. The data is encrypted through the Payment Card Industry Data Security Standard (PCI-DSS) when processing payment. Your purchase transaction data is only used as long as is necessary to complete your purchase transaction. After that is complete, your purchase transaction information is not saved.
    <br />
    Our payment gateway adheres to the standards set by PCI-DSS as managed by the PCI Security Standards Council, which is a joint effort of brands like Visa, MasterCard, American Express, and Discover.
    PCI-DSS requirements help ensure the secure handling of credit card information by our store and its service providers.
  </p>

  <h5>SECTION 5 - THIRD-PARTY SERVICES</h5>
  <p>
    In general, the third-party providers used by us will only collect, use, and disclose your information to the extent necessary to allow them to perform the services they provide to us.
    However, certain third-party service providers, such as payment gateways and other payment transaction processors, have their own privacy policies regarding the information we are required to provide to them for your purchase-related transactions.
    For these providers, we recommend that you read their privacy policies to understand how your personal information will be handled by these providers.
    <br />
    In particular, remember that certain providers may be located in or have facilities in a different jurisdiction than either you or us. If you proceed with a transaction that involves the services of a third-party service provider, your information may become subject to the laws of the jurisdiction(s) in which that service provider or its facilities are located.
    <br />
    Once you leave our store’s website or are redirected to a third-party website or application, you are no longer governed by this Privacy Policy or our website’s Terms of Service.
  </p>
  <p>
    <strong>Links</strong><br />
    When you click on links on our store, they may direct you away from our site. We are not responsible for the privacy practices of other sites and encourage you to read their privacy statements.
  </p>

  <h5>SECTION 6 - SECURITY</h5>
  <p>
    To protect your personal information, we take reasonable precautions and follow industry best practices to ensure it is not inappropriately lost, misused, accessed, disclosed, altered, or destroyed.
  </p>

  <h5>SECTION 7 - COOKIES</h5>
  <p>
    We use cookies to maintain the session of your user. It is not used to personally identify you on other websites.
  </p>

  <h5>SECTION 8 - AGE OF CONSENT</h5>
  <p>
    By using this site, you represent that you are at least the age of majority in your state or province of residence, or that you are the age of majority in your state or province of residence and you have given us your consent to allow any of your minor dependents to use this site.
  </p>

  <h5>SECTION 9 - CHANGES TO THIS PRIVACY POLICY</h5>
  <p>
    We reserve the right to modify this privacy policy at any time, so please review it frequently. Changes and clarifications will take effect immediately upon their posting on the website. If we make material changes to this policy, we will notify you here that it has been updated so that you are aware of what information we collect, how we use it, and under what circumstances, if any, we use and/or disclose it.
    <br />
    If our store is acquired or merged with another company, your information may be transferred to the new owners so that we may continue to sell products to you.
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
