import type { Metadata } from "next"
import {
  LegalPage,
  LegalLead,
  LegalSection,
  LegalSubheading,
  LegalParagraph,
  LegalList,
  LegalListItem,
  LegalLink,
} from "@/components/legal-page"

export const metadata: Metadata = {
  title: "Terms and Conditions | Shepherd Verses",
  description:
    "The terms and conditions governing your access to and use of the Shepherd Verses service.",
}

export default function TermsPage() {
  return (
    <LegalPage title="Terms and Conditions" lastUpdated="29 June 2026">
      <LegalParagraph>
        Shepherd Verses Pty Ltd (ACN 699 365 716)
      </LegalParagraph>

      <LegalLead>
        These Terms and Conditions (&ldquo;Terms&rdquo;) govern your access to
        and use of the Shepherd Verses service (the &ldquo;Service&rdquo;)
        provided by Shepherd Verses Pty Ltd (ACN 699 365 716) (&ldquo;we&rdquo;,
        &ldquo;us&rdquo;, &ldquo;our&rdquo;), a company registered in Victoria,
        Australia.
      </LegalLead>

      <LegalParagraph>
        By subscribing to, accessing or using the Service, you agree to be bound
        by these Terms. If you do not agree, please do not use the Service.
      </LegalParagraph>

      <LegalSection heading="1. The Service">
        <LegalParagraph>
          Shepherd Verses is a faith-based wellbeing subscription service. You
          select an emotion that reflects how you are feeling from a list we
          provide (for example, within the Telegram app), and we send you a
          message and a voice recording containing carefully selected Bible
          scripture, an affirmation and a mantra intended to provide comfort and
          encouragement.
        </LegalParagraph>
        <LegalParagraph>
          The Service is intended for personal comfort, reflection and
          encouragement only. It is not a substitute for professional medical,
          psychological, psychiatric or counselling advice, diagnosis or
          treatment. If you are experiencing distress or a health concern, please
          consult a qualified professional. If you are in crisis, please contact
          your local emergency services or a crisis support line.
        </LegalParagraph>
      </LegalSection>

      <LegalSection heading="2. Eligibility">
        <LegalParagraph>
          You must be at least 18 years old and able to form a legally binding
          contract to use the Service. By using the Service, you confirm that you
          meet these requirements.
        </LegalParagraph>
      </LegalSection>

      <LegalSection heading="3. Payments, subscriptions and Merchant of Record">
        <LegalParagraph>
          All payments for the Service are processed by Paddle (Paddle.com Market
          Limited and its group companies), which acts as our authorised reseller
          and Merchant of Record. This means that when you purchase a
          subscription, your contract for the purchase is with Paddle as
          reseller, and Paddle handles billing, payment processing, and
          order-related enquiries including refunds.
        </LegalParagraph>
        <LegalParagraph>
          Your purchase is also subject to Paddle&rsquo;s buyer terms and
          policies, available at{" "}
          <LegalLink href="https://www.paddle.com/legal/checkout-buyer-terms">
            https://www.paddle.com/legal/checkout-buyer-terms
          </LegalLink>
          .
        </LegalParagraph>

        <LegalSubheading>3.1 Subscription plans and pricing</LegalSubheading>
        <LegalParagraph>
          The Service is offered on a subscription basis. Current pricing is:
        </LegalParagraph>
        <LegalList>
          <LegalListItem>Monthly plan: US$8.95 per month; or</LegalListItem>
          <LegalListItem>
            Annual plan: US$80.40 per year (approximately US$6.70 per month
            &ndash; the equivalent of about 3 months free compared with paying
            monthly).
          </LegalListItem>
        </LegalList>
        <LegalParagraph>
          Prices are stated in US dollars and may be subject to applicable taxes,
          which Paddle will calculate and display at checkout. We may change our
          prices from time to time. Any price change will not affect the current
          paid period of an existing subscription; it will apply from your next
          renewal, and we (or Paddle) will give you notice as required by law
          before any increased amount is charged.
        </LegalParagraph>

        <LegalSubheading>3.2 Free trial</LegalSubheading>
        <LegalParagraph>
          We offer a free trial of 3 days. If you do not cancel before the end of
          the 3-day free trial, your paid subscription will begin automatically
          and your chosen payment method will be charged for the plan you
          selected. You may cancel at any time during the trial to avoid being
          charged.
        </LegalParagraph>

        <LegalSubheading>3.3 Automatic renewal and cancellation</LegalSubheading>
        <LegalParagraph>
          Your subscription automatically renews at the end of each billing
          period (monthly or annually, depending on your plan) until you cancel.
          You authorise Paddle to charge your payment method for each renewal
          until you cancel.
        </LegalParagraph>
        <LegalParagraph>
          You can cancel at any time. When you cancel, your cancellation takes
          effect at the end of your current paid billing period, and you will not
          be charged again. You will continue to have access to the Service until
          the end of that period. To cancel, you can use the cancellation link in
          your Paddle confirmation email, manage your subscription via Paddle, or
          contact us at{" "}
          <LegalLink href="mailto:hello@shepherdverses.com">
            hello@shepherdverses.com
          </LegalLink>{" "}
          and we will assist you.
        </LegalParagraph>
      </LegalSection>

      <LegalSection heading="4. Your statutory rights (Australian Consumer Law)">
        <LegalParagraph>
          Nothing in these Terms excludes, restricts or modifies any guarantee,
          right or remedy you may have under the Australian Consumer Law (ACL) or
          any other law that cannot lawfully be excluded. Our Service comes with
          guarantees that cannot be excluded under the ACL.
        </LegalParagraph>
        <LegalParagraph>
          Where we are permitted to limit our liability, our liability is limited
          (at our option) to re-supplying the Service or paying the cost of
          having the Service re-supplied. Please also see our Refund Policy, which
          forms part of these Terms.
        </LegalParagraph>
      </LegalSection>

      <LegalSection heading="5. Acceptable use">
        <LegalParagraph>
          When using the Service, you agree not to:
        </LegalParagraph>
        <LegalList>
          <LegalListItem>
            Copy, reproduce, distribute, publicly display, resell or commercially
            exploit the content provided through the Service, except for your own
            personal use;
          </LegalListItem>
          <LegalListItem>
            Share your account access with others or allow others to use your
            subscription;
          </LegalListItem>
          <LegalListItem>
            Use the Service in any unlawful way or for any unlawful purpose;
          </LegalListItem>
          <LegalListItem>
            Attempt to interfere with, compromise or disrupt the Service or its
            security; or
          </LegalListItem>
          <LegalListItem>
            Reverse engineer or attempt to extract the source code or underlying
            systems of the Service.
          </LegalListItem>
        </LegalList>
      </LegalSection>

      <LegalSection heading="6. Intellectual property">
        <LegalParagraph>
          The Bible scripture used in the Service is taken from the World English
          Bible British Edition (WEBBE), which is in the public domain.
        </LegalParagraph>
        <LegalParagraph>
          However, the affirmations, mantras, voice recordings and other written
          content created by us are our original works and are owned by us. Our
          selection, arrangement, compilation and presentation of all content
          &ndash; together with our branding and the &ldquo;Shepherd
          Verses&rdquo; name &ndash; are also our intellectual property or are
          licensed to us.
        </LegalParagraph>
        <LegalParagraph>
          We grant you a limited, non-exclusive, non-transferable, revocable
          licence to access and use the content for your own personal,
          non-commercial use while your subscription is active. You may not
          reproduce, distribute, publicly share, sell or otherwise commercially
          exploit any of our content without our prior written permission.
        </LegalParagraph>
      </LegalSection>

      <LegalSection heading="7. Availability and changes to the Service">
        <LegalParagraph>
          We aim to keep the Service available and delivered reliably, but we do
          not guarantee that it will always be uninterrupted or error-free. The
          Service is partly delivered through third-party platforms (such as
          Telegram), and we are not responsible for those platforms&rsquo;
          availability. We may modify, suspend or discontinue features of the
          Service from time to time. If we discontinue the Service entirely, we
          will give you reasonable notice and handle any pre-paid amounts fairly
          and in accordance with the ACL.
        </LegalParagraph>
      </LegalSection>

      <LegalSection heading="8. Disclaimer and limitation of liability">
        <LegalParagraph>
          To the maximum extent permitted by law, and subject to your rights
          under the Australian Consumer Law (see section 4), the Service and its
          content are provided on an &ldquo;as is&rdquo; and &ldquo;as
          available&rdquo; basis. We do not warrant that the content will meet any
          particular spiritual, emotional, health or other outcome.
        </LegalParagraph>
        <LegalParagraph>
          To the maximum extent permitted by law, we are not liable for any
          indirect, incidental or consequential loss arising out of or in
          connection with your use of the Service.
        </LegalParagraph>
      </LegalSection>

      <LegalSection heading="9. Complaints">
        <LegalParagraph>
          If you have a complaint about the Service, please contact us at{" "}
          <LegalLink href="mailto:hello@shepherdverses.com">
            hello@shepherdverses.com
          </LegalLink>
          . We aim to acknowledge complaints within 2 business days and to
          resolve them within 10 business days where possible. For complaints
          relating to billing, payments or refunds, Paddle (as Merchant of
          Record) may also assist you directly. Please see our Refund Policy for
          more detail.
        </LegalParagraph>
      </LegalSection>

      <LegalSection heading="10. Governing law">
        <LegalParagraph>
          These Terms are governed by the laws of the State of Victoria,
          Australia. You and we submit to the non-exclusive jurisdiction of the
          courts of Victoria and the Commonwealth of Australia. This does not
          affect any rights you have under the law of your own country of
          residence that cannot be excluded.
        </LegalParagraph>
      </LegalSection>

      <LegalSection heading="11. Changes to these Terms">
        <LegalParagraph>
          We may update these Terms from time to time. When we do, we will revise
          the &ldquo;Last updated&rdquo; date above. Material changes will take
          effect from your next renewal, or otherwise as required by law. Your
          continued use of the Service after changes take effect constitutes
          acceptance of the updated Terms.
        </LegalParagraph>
      </LegalSection>

      <LegalSection heading="12. Contact us">
        <LegalParagraph>
          Shepherd Verses Pty Ltd
          <br />
          ACN 699 365 716
          <br />
          Email:{" "}
          <LegalLink href="mailto:hello@shepherdverses.com">
            hello@shepherdverses.com
          </LegalLink>
        </LegalParagraph>
      </LegalSection>
    </LegalPage>
  )
}
