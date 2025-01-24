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
          For the purpose of these Terms and Conditions, the term
          &ldquo;we,&ldquo; &ldquo;us,&ldquo; &ldquo;our&ldquo; used anywhere on
          this page shall mean{" "}
          <strong>HAPPILEE PROPERTY SOLUTIONS PRIVATE LIMITED</strong>, whose
          registered/operational office is located in Pune, Maharashtra, India.
          &ldquo;you,&ldquo; &ldquo;your,&ldquo; &ldquo;user,&ldquo;
          &ldquo;visitor&ldquo; shall mean any natural or legal person who is
          visiting our website and/or agreed to purchase from us.
        </p>
        <p>
          Your use of the website and/or purchase from us are governed by the
          following Terms and Conditions:
        </p>
        <hr />

        <h5>1. Changes to Content</h5>
        <p>
          The content of the pages of this website is subject to change without
          notice.
        </p>

        <h5>2. No Warranties</h5>
        <p>
          Neither we nor any third parties provide any warranty or guarantee as
          to the accuracy, timeliness, performance, completeness, or suitability
          of the information and materials found or offered on this website for
          any particular purpose. You acknowledge that such information and
          materials may contain inaccuracies or errors, and we expressly exclude
          liability for any such inaccuracies or errors to the fullest extent
          permitted by law.
        </p>

        <h5>3. Use at Your Own Risk</h5>
        <p>
          Your use of any information or materials on our website and/or product
          pages is entirely at your own risk, for which we shall not be liable.
          It shall be your own responsibility to ensure that any products,
          services, or information available through our website and/or product
          pages meet your specific requirements.
        </p>

        <h5>4. Intellectual Property</h5>
        <p>
          Our website contains material which is owned by or licensed to us.
          This material includes, but is not limited to, the design, layout,
          look, appearance, and graphics. Reproduction is prohibited other than
          in accordance with the copyright notice, which forms part of these
          terms and conditions.
        </p>
        <p>
          All trademarks reproduced in our website which are not the property
          of, or licensed to, the operator are acknowledged on the website.
        </p>

        <h5>5. Unauthorized Use</h5>
        <p>
          Unauthorized use of information provided by us shall give rise to a
          claim for damages and/or be a criminal offense.
        </p>

        <h5>6. Third-Party Links</h5>
        <p>
          From time to time, our website may also include links to other
          websites. These links are provided for your convenience to provide
          further information.
        </p>
        <p>
          You may not create a link to our website from another website or
          document without{" "}
          <strong>HAPPILEE PROPERTY SOLUTIONS PRIVATE LIMITED’s</strong> prior
          written consent.
        </p>

        <h5>7. Governing Law</h5>
        <p>
          Any dispute arising out of the use of our website and/or purchase with
          us and/or any engagement with us is subject to the laws of India.
        </p>

        <h5>8. Transaction Liability</h5>
        <p>
          We shall be under no liability whatsoever in respect of any loss or
          damage arising directly or indirectly out of the decline of
          authorization for any transaction, on account of the cardholder having
          exceeded the preset limit mutually agreed by us with our acquiring
          bank from time to time.
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
  );
}
