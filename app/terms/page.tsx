import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service | Secure College',
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <div className="container mx-auto px-4 pt-28 pb-16">
        <div className="max-w-4xl mx-auto">
          <header className="mb-10 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white">Terms of Service</h1>
            <p className="mt-2 text-sm md:text-base text-gray-400">Last Updated: February 23, 2026</p>
          </header>

          <div className="space-y-10 text-sm md:text-base text-gray-300">
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">1. Acceptance of Terms</h2>
              <p className="mb-3">
                These Terms of Service (&quot;Terms&quot;) govern your access to and use of the website, tools, and
                services operated by Secure College (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) (the
                &quot;Platform&quot;).
              </p>
              <p className="mb-3">
                By accessing or using the Platform, you agree to be legally bound by these Terms and our Privacy Policy.
                If you do not agree, you must immediately discontinue use of the Platform.
              </p>
              <p>Your continued use constitutes electronic acceptance under applicable Indian laws.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">2. Nature of Services</h2>
              <p className="mb-3">Secure College operates as an educational guidance and information platform.</p>
              <p className="mb-3">We provide:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Information about colleges, courses, fees, placements, and admissions</li>
                <li>Rank-based prediction and comparison tools</li>
                <li>Admission guidance and counseling support</li>
              </ul>
              <p className="mt-3">
                We do not operate as a university, admission authority, or regulatory body.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">3. No Admission Guarantee</h2>
              <p className="mb-3">
                Secure College provides advisory and predictive services based on historical data and publicly available
                information.
              </p>
              <p className="mb-3">We do not guarantee admission to any college, course, or branch.</p>
              <p className="mb-3">
                Final admission decisions are solely determined by the respective educational institutions.
              </p>
              <p className="mb-3">
                Cutoffs, fees, seat availability, and policies are subject to change without notice.
              </p>
              <p>
                Users must independently verify all critical information directly with the concerned institution before
                making financial or academic decisions.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">4. User Responsibilities</h2>
              <p className="mb-3">You agree to:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Provide accurate, complete, and current information.</li>
                <li>Use the Platform only for lawful educational purposes.</li>
                <li>Not misuse, scrape, copy, reverse engineer, or disrupt the Platform.</li>
                <li>Not submit false academic records or impersonate another person.</li>
              </ul>
              <p className="mt-3">
                You are solely responsible for decisions made based on the information provided on the Platform.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">5. Fees and Payments (If Applicable)</h2>
              <p className="mb-3">If you purchase any paid services:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>All fees are disclosed before payment.</li>
                <li>Payments once made are subject to our Refund Policy.</li>
                <li>We are not responsible for payment gateway failures or banking delays beyond our control.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">6. Intellectual Property</h2>
              <p className="mb-3">All content on the Platform including:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Text</li>
                <li>Design</li>
                <li>Software</li>
                <li>Tools</li>
                <li>Logos</li>
                <li>Branding</li>
              </ul>
              <p className="mt-3">
                is the intellectual property of Secure College and protected under applicable Indian laws.
              </p>
              <p className="mt-3">
                Unauthorized reproduction, distribution, or commercial use is strictly prohibited.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">7. User-Generated Content</h2>
              <p className="mb-3">If you submit reviews, comments, or content:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  You grant Secure College a non-exclusive, royalty-free license to use, reproduce, and display such
                  content.
                </li>
                <li>
                  You represent that the content is truthful and does not infringe any third-party rights.
                </li>
              </ul>
              <p className="mt-3">We reserve the right to remove any content at our sole discretion.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">8. Limitation of Liability</h2>
              <p className="mb-3">To the maximum extent permitted by Indian law:</p>
              <p className="mb-3">
                Secure College, its directors, employees, partners, or affiliates shall not be liable for:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Any admission rejection</li>
                <li>Seat cancellation</li>
                <li>Changes in college policies</li>
                <li>Errors or outdated information</li>
                <li>Technical interruptions</li>
                <li>Unauthorized access to user data</li>
                <li>Any direct, indirect, incidental, or consequential damages</li>
              </ul>
              <p className="mt-3">Your use of the Platform is at your own risk.</p>
              <p className="mt-3">
                In no event shall our total liability exceed the amount paid by you (if any) for our services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">9. Indemnification</h2>
              <p className="mb-3">
                You agree to indemnify and hold harmless Secure College and its representatives from any claims,
                damages, losses, or legal expenses arising out of:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Your misuse of the Platform</li>
                <li>Violation of these Terms</li>
                <li>Submission of false or misleading information</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">10. Termination</h2>
              <p className="mb-3">
                We reserve the right to suspend or terminate access to the Platform at our discretion, without prior
                notice, if:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>You violate these Terms</li>
                <li>Your conduct is harmful to other users or to Secure College</li>
                <li>Required by law</li>
              </ul>
              <p className="mt-3">
                Termination does not waive any rights or liabilities accrued prior to termination.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">11. Force Majeure</h2>
              <p className="mb-3">
                We shall not be held liable for failure or delay in performance due to circumstances beyond our
                reasonable control, including but not limited to:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Government actions</li>
                <li>Regulatory changes</li>
                <li>Natural disasters</li>
                <li>Internet outages</li>
                <li>Technical failures</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">12. Governing Law and Jurisdiction</h2>
              <p className="mb-3">
                These Terms shall be governed by and construed in accordance with the laws of India.
              </p>
              <p>
                Any disputes arising from these Terms shall be subject to the exclusive jurisdiction of the courts
                located in Greater Noida, Uttar Pradesh, India.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">13. Modifications to Terms</h2>
              <p className="mb-3">
                We may update these Terms at any time. Updated versions will be posted on this page with a revised
                &quot;Last Updated&quot; date.
              </p>
              <p>
                Continued use of the Platform after changes constitutes acceptance of the revised Terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">14. Contact Information</h2>
              <p className="mb-3">Secure College</p>
              <p className="mb-1">Knowledge Park II</p>
              <p className="mb-1">Greater Noida, Uttar Pradesh – 201310</p>
              <p className="mb-3">India</p>
              <p>
                Email: <span className="text-gray-100">securecollege6@gmail.com</span>
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
