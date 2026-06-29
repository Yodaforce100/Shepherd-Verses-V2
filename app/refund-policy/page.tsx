import type { Metadata } from "next"
import {
  LegalPage,
  LegalLead,
  LegalSection,
  LegalParagraph,
  LegalList,
  LegalListItem,
  LegalLink,
} from "@/components/legal-page"

export const metadata: Metadata = {
  title: "Refund Policy | Shepherd Verses",
  description:
    "Our 30-day money-back guarantee and how refunds are processed for the Shepherd Verses service.",
}

export default function RefundPolicyPage() {
  return (
    <LegalPage title="Refund Policy" lastUpdated="29 June 2026">
      <LegalParagraph>
        Shepherd Verses Pty Ltd (ACN 699 365 716)
      </LegalParagraph>

      <LegalLead>
        This Refund Policy applies to subscriptions to the Shepherd Verses
        service (the &ldquo;Service&rdquo;) provided by Shepherd Verses Pty Ltd
        (ACN 699 365 716). It forms part of our Terms and Conditions.
      </LegalLead>

      <LegalSection heading="1. Our 30-day money-back guarantee">
        <LegalParagraph>
          We want you to be happy with the Service. We offer a 30-day money-back
          guarantee. If you are not satisfied, you may request a full refund
          within 30 days of your initial purchase or of a subscription renewal,
          and we will arrange a refund of that payment.
        </LegalParagraph>
      </LegalSection>

      <LegalSection heading="2. Free trial">
        <LegalParagraph>
          Our subscription begins with a 3-day free trial. You will not be
          charged during the free trial. If you cancel before the trial ends, no
          payment is taken and no refund is needed. If you do not cancel, your
          paid subscription begins automatically at the end of the trial, and the
          30-day money-back guarantee above then applies to that first payment.
        </LegalParagraph>
      </LegalSection>

      <LegalSection heading="3. How refunds are processed (Paddle as Merchant of Record)">
        <LegalParagraph>
          Our payments are processed by Paddle (Paddle.com Market Limited and its
          group companies), which acts as our authorised reseller and Merchant of
          Record. Because Paddle is the Merchant of Record, refunds are processed
          by Paddle, not directly by us.
        </LegalParagraph>
        <LegalParagraph>To request a refund, you can either:</LegalParagraph>
        <LegalList>
          <LegalListItem>
            Contact us at{" "}
            <LegalLink href="mailto:hello@shepherdverses.com">
              hello@shepherdverses.com
            </LegalLink>{" "}
            and we will arrange the refund with Paddle on your behalf; or
          </LegalListItem>
          <LegalListItem>
            Contact Paddle directly using the buyer support link in your purchase
            confirmation email, or via{" "}
            <LegalLink href="https://paddle.net">https://paddle.net</LegalLink>.
          </LegalListItem>
        </LegalList>
        <LegalParagraph>
          Approved refunds are normally returned to your original payment method,
          typically within 14 days of approval, depending on your bank or card
          provider.
        </LegalParagraph>
      </LegalSection>

      <LegalSection heading="4. Cancelling future renewals">
        <LegalParagraph>
          Separate from a refund, you can cancel your subscription at any time to
          stop future charges. When you cancel, the cancellation takes effect at
          the end of your current paid billing period. You will keep access to
          the Service until then, and you will not be charged again. Cancelling
          does not automatically refund the current period &ndash; if you would
          also like a refund of your most recent payment, please request one as
          set out above (subject to the 30-day guarantee).
        </LegalParagraph>
      </LegalSection>

      <LegalSection heading="5. Your rights under the Australian Consumer Law">
        <LegalParagraph>
          This Refund Policy operates in addition to your rights under the
          Australian Consumer Law (ACL), which cannot be excluded. Among other
          things, you are entitled to a remedy if the Service is not provided with
          due care and skill, is not fit for a stated purpose, or does not match
          its description.
        </LegalParagraph>
        <LegalParagraph>
          If the Service has a major failure, you may be entitled to a refund or
          other remedy under the ACL even outside the 30-day window above. Nothing
          in this Policy limits those rights.
        </LegalParagraph>
      </LegalSection>

      <LegalSection heading="6. How to contact us">
        <LegalParagraph>
          Shepherd Verses Pty Ltd
          <br />
          ACN 699 365 716
          <br />
          Email:{" "}
          <LegalLink href="mailto:hello@shepherdverses.com">
            hello@shepherdverses.com
          </LegalLink>
          <br />
          Phone: +61 412 664 024
        </LegalParagraph>
      </LegalSection>
    </LegalPage>
  )
}
