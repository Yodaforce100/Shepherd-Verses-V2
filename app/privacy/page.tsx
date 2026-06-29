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
  title: "Privacy Policy | Shepherd Verses",
  description:
    "How Shepherd Verses Pty Ltd collects, uses, stores and discloses your personal information.",
}

export default function PrivacyPolicyPage() {
  return (
    <LegalPage title="Privacy Policy" lastUpdated="29 June 2026">
      <LegalParagraph>
        Shepherd Verses Pty Ltd (ACN 699 365 716)
      </LegalParagraph>

      <LegalLead>
        This Privacy Policy explains how Shepherd Verses Pty Ltd (ACN 699 365
        716) (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) collects,
        uses, stores and discloses your personal information when you use the
        Shepherd Verses service (the &ldquo;Service&rdquo;), accessed via our
        Telegram application and our website at shepherdverses.com.
      </LegalLead>

      <LegalParagraph>
        We are committed to protecting your privacy and handling your personal
        information in an open and transparent manner. We comply with the
        Privacy Act 1988 (Cth) and the Australian Privacy Principles (APPs).
      </LegalParagraph>

      <LegalSection heading="1. What personal information we collect">
        <LegalParagraph>
          We aim to collect only the personal information we reasonably need to
          provide the Service. The information we collect and hold falls into
          the following categories:
        </LegalParagraph>

        <LegalSubheading>Contact and identity information</LegalSubheading>
        <LegalList>
          <LegalListItem>
            Your email address &ndash; used to create and manage your account
            and to communicate with you about the Service.
          </LegalListItem>
          <LegalListItem>
            Your first name &ndash; which you provide when you sign up. We use
            it to personalise your experience, including a short spoken welcome
            message that greets you by name.
          </LegalListItem>
          <LegalListItem>
            Your country and time zone &ndash; used to deliver your daily
            message at an appropriate local time and to help us understand where
            our subscribers are based.
          </LegalListItem>
        </LegalList>

        <LegalSubheading>Telegram account information</LegalSubheading>
        <LegalParagraph>
          Because the Service is delivered through Telegram, we store your
          Telegram user ID, chat ID and username (@handle) so we can link your
          account and deliver your messages to you.
        </LegalParagraph>

        <LegalSubheading>
          Account, subscription and usage information
        </LegalSubheading>
        <LegalList>
          <LegalListItem>
            Your subscription details &ndash; such as your plan tier,
            subscription status, and the customer and subscription reference IDs
            provided by our payment provider (we do not store your card details
            &ndash; see section 3).
          </LegalListItem>
          <LegalListItem>
            Basic account and usage information &ndash; such as whether you have
            completed onboarding, the number of messages sent to you, and the
            dates of your most recent messages and interactions. We use this to
            operate the Service and improve your experience.
          </LegalListItem>
        </LegalList>

        <LegalSubheading>IP address (at sign-up)</LegalSubheading>
        <LegalParagraph>
          Your IP address &ndash; briefly used at sign-up to detect your
          country, via our geolocation provider (ipapi.co). It is used for this
          purpose and is not stored in our database.
        </LegalParagraph>

        <LegalParagraph>
          We do not ask for or store your postal address, date of birth, or any
          sensitive identity information beyond what is described in this Policy.
        </LegalParagraph>
      </LegalSection>

      <LegalSection heading="2. Information about how you feel">
        <LegalParagraph>
          As part of using the Service, you select an emotion from a list we
          provide (for example, within the Telegram app) that reflects how you
          are feeling. In response, we send you a message and a voice recording
          containing scripture, an affirmation and a mantra. The same content is
          provided to you in both text and voice form. The voice recordings are
          produced using a third-party text-to-speech provider (ElevenLabs).
        </LegalParagraph>
        <LegalParagraph>
          The emotion you select is used to choose and deliver the content that
          matches how you are feeling. We also keep a record of the emotions you
          have selected and the content sent to you over time, so that we can
          avoid repeating the same content and improve your experience. We treat
          this information with care. Depending on the circumstances, information
          about your emotional or wellbeing state may be considered sensitive
          information under the Privacy Act, and we only collect and hold it with
          your consent, which you provide by choosing to use the Service and
          selecting an emotion.
        </LegalParagraph>
      </LegalSection>

      <LegalSection heading="3. Payment information">
        <LegalParagraph>
          We do not collect or store your credit card or other payment details.
          All payments and the checkout process are handled by our authorised
          payment provider and Merchant of Record, Paddle (Paddle.com Market
          Limited and its group companies). When you subscribe, Paddle collects
          and processes your payment information directly under its own terms and
          privacy notice.
        </LegalParagraph>
        <LegalParagraph>
          We encourage you to review Paddle&rsquo;s privacy notice to understand
          how it handles your information:{" "}
          <LegalLink href="https://www.paddle.com/legal/privacy">
            https://www.paddle.com/legal/privacy
          </LegalLink>
          .
        </LegalParagraph>
        <LegalParagraph>
          Paddle provides us with limited information needed to manage your
          subscription (such as your subscription status), but not your full
          card details.
        </LegalParagraph>
      </LegalSection>

      <LegalSection heading="4. How we use your information">
        <LegalParagraph>
          We use the personal information we collect to:
        </LegalParagraph>
        <LegalList>
          <LegalListItem>
            Create, manage and maintain your account and subscription;
          </LegalListItem>
          <LegalListItem>
            Deliver your daily messages and voice recordings at an appropriate
            time for your location;
          </LegalListItem>
          <LegalListItem>
            Respond to your enquiries and provide customer support;
          </LegalListItem>
          <LegalListItem>
            Manage your free trial and, where applicable, your paid subscription
            via Paddle;
          </LegalListItem>
          <LegalListItem>
            Maintain the security and integrity of the Service; and
          </LegalListItem>
          <LegalListItem>Comply with our legal obligations.</LegalListItem>
        </LegalList>
        <LegalParagraph>
          We do not currently send marketing emails. If we decide to do so in
          future, we will only send them where permitted by law, and you will be
          able to opt out (unsubscribe) at any time.
        </LegalParagraph>
      </LegalSection>

      <LegalSection heading="5. How your information is stored">
        <LegalParagraph>
          Your information is stored in our database hosted by Supabase. Supabase
          hosts data in various regions. Our data is stored in the following
          region: AWS ap-northeast-2 (Seoul, South Korea).
        </LegalParagraph>
        <LegalParagraph>
          Because our data is hosted in South Korea, your information is stored
          and processed outside Australia. Where your information is stored or
          processed overseas, we take reasonable steps to ensure it is handled in
          accordance with the Australian Privacy Principles and is subject to
          appropriate safeguards. By using the Service, you consent to your
          information being stored and processed in the region identified above.
        </LegalParagraph>
        <LegalParagraph>
          We take reasonable technical and organisational measures to protect
          your personal information from misuse, interference, loss, and
          unauthorised access, modification or disclosure.
        </LegalParagraph>
      </LegalSection>

      <LegalSection heading="6. Disclosure of your information">
        <LegalParagraph>
          We do not sell your personal information. We only disclose it to:
        </LegalParagraph>
        <LegalList>
          <LegalListItem>
            Paddle, our payment provider and Merchant of Record, to process your
            subscription;
          </LegalListItem>
          <LegalListItem>
            Supabase, our database hosting provider, to store your data;
          </LegalListItem>
          <LegalListItem>
            Telegram, to the extent the Service is delivered through the Telegram
            platform (your use of Telegram is also governed by Telegram&rsquo;s
            own privacy policy);
          </LegalListItem>
          <LegalListItem>
            ElevenLabs, our text-to-speech provider, which converts the message
            content &ndash; and the short welcome that includes your first name
            &ndash; into the voice recordings we deliver to you;
          </LegalListItem>
          <LegalListItem>
            ipapi.co, an IP geolocation provider, which we use at sign-up to
            detect your country from your IP address;
          </LegalListItem>
          <LegalListItem>
            Sentry, our error-monitoring provider, which helps us detect and fix
            technical problems (Sentry receives only a Telegram identifier for
            this purpose, not your email, country or timezone);
          </LegalListItem>
          <LegalListItem>
            Vercel, our website hosting provider, whose servers process technical
            information such as your IP address and browser details in standard
            server logs when you visit our website. Vercel also provides us with
            privacy-friendly website analytics (aggregate traffic and usage data,
            with no cookies and no identification of individuals);
          </LegalListItem>
          <LegalListItem>
            Service providers who help us operate the Service, under appropriate
            confidentiality obligations; and
          </LegalListItem>
          <LegalListItem>
            Government, regulatory or law enforcement bodies where required or
            authorised by law.
          </LegalListItem>
        </LegalList>
        <LegalParagraph>
          Some of these service providers are located outside Australia and may
          store or process your information overseas. Where they do, we take
          reasonable steps to ensure your information is handled in accordance
          with the Australian Privacy Principles.
        </LegalParagraph>
      </LegalSection>

      <LegalSection heading="7. Your rights">
        <LegalParagraph>
          Under the Privacy Act and the Australian Privacy Principles, you have
          the right to:
        </LegalParagraph>
        <LegalList>
          <LegalListItem>
            Request access to the personal information we hold about you;
          </LegalListItem>
          <LegalListItem>
            Ask us to correct information that is inaccurate, out of date or
            incomplete;
          </LegalListItem>
          <LegalListItem>
            Request that we delete your personal information, subject to any
            legal obligations we have to retain it; and
          </LegalListItem>
          <LegalListItem>
            Withdraw your consent or cancel your subscription at any time.
          </LegalListItem>
        </LegalList>
        <LegalParagraph>
          To exercise any of these rights, please contact us at{" "}
          <LegalLink href="mailto:hello@shepherdverses.com">
            hello@shepherdverses.com
          </LegalLink>
          . We will respond within a reasonable time, and as required by the
          Privacy Act.
        </LegalParagraph>
      </LegalSection>

      <LegalSection heading="8. Cookies and website analytics">
        <LegalParagraph>
          Our website may use basic cookies or similar technologies necessary
          for the site to function. Our website uses Vercel Analytics, a
          privacy-friendly analytics tool provided by our hosting provider,
          Vercel, to understand overall site traffic and usage. It does not use
          cookies and does not identify you individually. If we add other
          analytics tools in future, we will update this Policy to describe what
          is collected and how you can manage it.
        </LegalParagraph>
      </LegalSection>

      <LegalSection heading="9. Data retention">
        <LegalParagraph>
          We retain your personal information for as long as your account is
          active or as needed to provide the Service.
        </LegalParagraph>
        <LegalParagraph>
          When you unsubscribe or ask us to close your account, we first mark
          your account as inactive (a &ldquo;soft delete&rdquo;), which stops the
          Service and removes your data from everyday use. We then permanently
          erase your personal information within 90 days, unless we are required
          to retain some of it to comply with our legal obligations (for example,
          certain transaction records).
        </LegalParagraph>
      </LegalSection>

      <LegalSection heading="10. Children">
        <LegalParagraph>
          The Service is intended for adults. It is not directed at children, and
          we do not knowingly collect personal information from anyone under the
          age of 18. If you believe a minor has provided us with personal
          information, please contact us so we can remove it.
        </LegalParagraph>
      </LegalSection>

      <LegalSection heading="11. Changes to this Policy">
        <LegalParagraph>
          We may update this Privacy Policy from time to time. When we do, we
          will revise the &ldquo;Last updated&rdquo; date at the top of this
          page. We encourage you to review this Policy periodically.
        </LegalParagraph>
      </LegalSection>

      <LegalSection heading="12. How to contact us">
        <LegalParagraph>
          If you have any questions, concerns or complaints about this Privacy
          Policy or how we handle your personal information, please contact us:
        </LegalParagraph>
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
        <LegalParagraph>
          If you are not satisfied with our response to a privacy complaint, you
          may contact the Office of the Australian Information Commissioner
          (OAIC) at{" "}
          <LegalLink href="https://www.oaic.gov.au">www.oaic.gov.au</LegalLink>.
        </LegalParagraph>
      </LegalSection>
    </LegalPage>
  )
}
