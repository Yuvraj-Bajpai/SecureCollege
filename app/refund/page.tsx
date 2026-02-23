import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Refund & Cancellation Policy | Secure College',
}

export default function RefundPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <div className="container mx-auto px-4 pt-28 pb-16">
        <div className="max-w-4xl mx-auto">
          <header className="mb-10 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white">Refund &amp; Cancellation Policy</h1>
            <p className="mt-2 text-sm md:text-base text-gray-400">Last Updated: February 24, 2026</p>
          </header>

          <div className="space-y-10 text-sm md:text-base text-gray-300">
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">1. Overview</h2>
              <p className="mb-3">
                This Refund &amp; Cancellation Policy (&quot;Policy&quot;) governs all payments made to Secure College
                (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) through our website, platform, or any official
                payment link.
              </p>
              <p>
                By purchasing any paid service from Secure College, you agree to this Policy.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">2. Scope of Policy</h2>
              <p className="mb-3">
                This Policy applies only to payments made directly to Secure College for services listed on our
                Platform.
              </p>
              <p>
                Payments made directly to colleges, universities, institutions, payment gateways, or any third-party
                platforms are governed by their respective refund policies. Secure College does not control, process, or
                guarantee refunds for such payments.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">3. Cancellation Policy</h2>
              <p className="mb-3">
                If cancellation is permitted for a specific service, the cancellation window and applicable terms (if
                any) will be clearly displayed at the time of purchase.
              </p>
              <p className="mb-3">
                If no cancellation terms are mentioned at checkout, the service shall be considered non-cancellable once
                payment is successfully processed.
              </p>
              <p>
                Secure College reserves the right to cancel any service due to technical errors, operational
                limitations, or incorrect pricing. In such cases, a full refund will be issued.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">4. Non-Refundable Booking / Registration Fee</h2>
              <p className="mb-3">
                Secure College may charge a booking fee or registration fee to initiate admission support, counseling,
                profile evaluation, documentation review, or college coordination services.
              </p>
              <p className="mb-3">Such booking/registration fees are strictly non-refundable, as they cover:</p>
              <ul className="list-disc pl-5 space-y-1 mb-3">
                <li>Initial consultation and profile assessment</li>
                <li>Administrative setup and backend processing</li>
                <li>Allocation of counselors and resources</li>
                <li>Operational and coordination expenses</li>
              </ul>
              <p className="mb-3">
                Once the booking/registration fee is paid and service initiation has begun, it shall not be refunded
                under any circumstances, including but not limited to:
              </p>
              <ul className="list-disc pl-5 space-y-1 mb-3">
                <li>Change of mind</li>
                <li>Admission rejection by any institution</li>
                <li>Delay or policy changes by colleges</li>
                <li>Failure to provide required documents</li>
                <li>User discontinuing the service midway</li>
              </ul>
              <p>
                The non-refundable nature of the fee will be disclosed at the time of payment.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">5. Refund Eligibility</h2>
              <p className="mb-3">Refunds may be considered only under the following circumstances:</p>
              <ul className="list-disc pl-5 space-y-1 mb-3">
                <li>Duplicate payment for the same transaction.</li>
                <li>
                  Payment was deducted, but the service was not initiated due to a verified technical error attributable
                  to Secure College.
                </li>
                <li>
                  The service delivered was materially different from what was explicitly described at the time of
                  purchase.
                </li>
              </ul>
              <p className="mb-3">Refunds will not be granted in the following cases:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Admission not secured in a preferred college or branch.</li>
                <li>Changes in cutoff, fees, eligibility criteria, or seat availability by institutions.</li>
                <li>Dissatisfaction with counseling advice or outcomes.</li>
                <li>Errors caused by incorrect or incomplete information provided by the user.</li>
                <li>Change of decision after service has commenced.</li>
                <li>Failure to meet deadlines set by colleges or examination authorities.</li>
                <li>External factors beyond our control (institutional policy changes, regulatory updates, etc.).</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">6. Partially Delivered Services</h2>
              <p className="mb-3">
                If a paid service has been partially delivered, Secure College reserves the right to:
              </p>
              <ul className="list-disc pl-5 space-y-1 mb-3">
                <li>Deduct charges proportionate to the work completed, and</li>
                <li>Refund only the remaining balance (if applicable).</li>
              </ul>
              <p>
                Refund decisions will be made at our sole discretion in accordance with this Policy.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">7. Refund Request Process</h2>
              <p className="mb-3">
                To request a refund, you must send an email to:{' '}
                <a
                  href="mailto:securecollege6@gmail.com"
                  className="text-primary hover:text-primary-300 underline-offset-2 hover:underline"
                >
                  securecollege6@gmail.com
                </a>
              </p>
              <p className="mb-3">Your request must include:</p>
              <ul className="list-disc pl-5 space-y-1 mb-3">
                <li>Full Name</li>
                <li>Registered Phone Number or Email</li>
                <li>Transaction ID / Payment Reference Number</li>
                <li>Service Purchased</li>
                <li>Detailed reason for the refund request</li>
                <li>Supporting documents or screenshots (if applicable)</li>
              </ul>
              <p className="mb-3">Incomplete requests may delay processing.</p>
              <p>
                Refund requests must be submitted within 7 days of the transaction date, unless otherwise required by
                applicable law.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">8. Refund Method &amp; Timeline</h2>
              <p className="mb-3">
                If approved, refunds will be processed to the original payment method used (UPI, debit/credit card, net
                banking, or wallet).
              </p>
              <p className="mb-3">
                Approved refunds will be initiated within 7–10 working days from the date of approval.
              </p>
              <p>
                Actual credit timelines depend on the user’s bank or payment provider. Secure College is not responsible
                for delays caused by third-party financial institutions.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">9. Grievance Redressal</h2>
              <p className="mb-3">
                For complaints or disputes related to payments or refunds, please contact:
              </p>
              <p className="mb-1">Secure College</p>
              <p className="mb-1">Knowledge Park II</p>
              <p className="mb-1">Greater Noida, Uttar Pradesh – 201310</p>
              <p className="mb-3">India</p>
              <p>
                Email:{' '}
                <a
                  href="mailto:securecollege6@gmail.com"
                  className="text-primary hover:text-primary-300 underline-offset-2 hover:underline"
                >
                  securecollege6@gmail.com
                </a>
              </p>
              <p className="mt-3">
                We aim to acknowledge complaints within 48 hours and resolve them within 30 days, in accordance with
                applicable Indian consumer protection regulations.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">10. Limitation of Liability</h2>
              <p className="mb-3">
                Under no circumstances shall Secure College’s total liability for any refund claim exceed the amount
                paid by the user for the specific service in dispute.
              </p>
              <p>
                Secure College shall not be liable for indirect, incidental, consequential, or special damages arising
                from the use of our services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">11. Policy Updates</h2>
              <p className="mb-3">
                Secure College reserves the right to modify or update this Policy at any time.
              </p>
              <p>
                The updated version will be posted on this page with a revised &quot;Last Updated&quot; date. Continued
                use of the Platform constitutes acceptance of the updated Policy.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
