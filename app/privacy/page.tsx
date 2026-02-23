import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | Secure College',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <div className="container mx-auto px-4 pt-28 pb-16">
        <div className="max-w-4xl mx-auto">
          <header className="mb-10 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white">Privacy Policy</h1>
            <p className="mt-2 text-sm md:text-base text-gray-400">Last Updated: February 23, 2026</p>
          </header>

          <div className="space-y-10 text-sm md:text-base text-gray-300">
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">1. Introduction</h2>
              <p className="mb-3">
                Welcome to Secure College (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;).
              </p>
              <p className="mb-3">
                Secure College operates an online platform providing college recommendation, admission guidance, and
                related support services (the &quot;Platform&quot;).
              </p>
              <p className="mb-3">
                We are committed to protecting your personal data in accordance with applicable Indian laws, including
                the Digital Personal Data Protection Act, 2023 (DPDP Act) and other relevant regulations.
              </p>
              <p>
                By accessing or using our Platform, you consent to the collection, use, and processing of your personal
                data as described in this Privacy Policy. If you do not agree, you must discontinue use of the Platform.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">2. Data We Collect</h2>
              <p className="mb-3">We collect only the data necessary to provide our services.</p>

              <h3 className="text-lg font-semibold text-white mb-2">a) Personal Information</h3>
              <ul className="list-disc pl-5 mb-4 space-y-1">
                <li>Full Name</li>
                <li>Email Address</li>
                <li>Phone Number</li>
                <li>City and State</li>
              </ul>

              <h3 className="text-lg font-semibold text-white mb-2">b) Academic Information</h3>
              <ul className="list-disc pl-5 mb-4 space-y-1">
                <li>Class 12th marks</li>
                <li>Entrance exam scores (JEE, CUET, NEET, etc.)</li>
                <li>Preferred courses and colleges</li>
                <li>Academic interests</li>
              </ul>

              <h3 className="text-lg font-semibold text-white mb-2">c) Technical Information</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>IP address</li>
                <li>Device type</li>
                <li>Browser type</li>
                <li>Usage data</li>
                <li>Cookies and tracking technologies</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">3. Purpose of Data Processing</h2>
              <p className="mb-3">We process your data strictly for the following purposes:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>College Matching: To analyze your academic profile and suggest suitable colleges.</li>
                <li>Admission Assistance: To support you in application and counseling processes.</li>
                <li>Communication: To provide admission alerts, updates, and respond to queries.</li>
                <li>Platform Improvement: To improve functionality, analytics, and user experience.</li>
                <li>Compliance: To comply with applicable legal and regulatory requirements.</li>
              </ul>
              <p className="mt-3">We do not sell your personal data to third parties.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">4. Data Sharing</h2>
              <p className="mb-3">We may share your data only in the following cases:</p>

              <h3 className="text-lg font-semibold text-white mb-2">a) Partner Colleges</h3>
              <p className="mb-3">
                With your explicit consent, we may share your profile with colleges you choose to apply to through our
                Platform.
              </p>

              <h3 className="text-lg font-semibold text-white mb-2">b) Service Providers</h3>
              <p className="mb-3">
                We may engage third-party vendors (e.g., hosting providers, payment gateways, SMS/email service
                providers) who process data on our behalf under confidentiality obligations.
              </p>

              <h3 className="text-lg font-semibold text-white mb-2">c) Legal Obligations</h3>
              <p>
                We may disclose information where required by law, court order, or government authority.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">5. Data Retention</h2>
              <p className="mb-3">
                We retain personal data only as long as necessary to fulfill the purposes outlined in this Privacy
                Policy, unless a longer retention period is required by law.
              </p>
              <p>
                You may request deletion of your data at any time, subject to legal or contractual obligations.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">6. Cookies and Tracking Technologies</h2>
              <p className="mb-3">We use cookies and similar technologies to:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Enhance user experience</li>
                <li>Store preferences</li>
                <li>Analyze traffic and usage</li>
              </ul>
              <p className="mt-3">
                You may disable cookies in your browser settings; however, some features of the Platform may not
                function properly.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">7. Data Security</h2>
              <p className="mb-3">
                We implement reasonable technical and organizational safeguards to protect your data from unauthorized
                access, misuse, or disclosure.
              </p>
              <p>
                While we strive to use commercially acceptable means to protect your data, no method of transmission
                over the Internet is completely secure. Therefore, we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">8. Your Rights</h2>
              <p className="mb-3">Subject to applicable Indian laws, you have the right to:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Request access to your personal data</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Withdraw consent at any time</li>
                <li>File a grievance regarding data processing</li>
              </ul>
              <p className="mt-3">
                Requests may be made by contacting us at: Email: <span className="text-gray-100">securecollege6@gmail.com</span>
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">9. Minor Users</h2>
              <p className="mb-3">
                If you are under 18 years of age, you represent that you are accessing the Platform with the consent of
                a parent or legal guardian.
              </p>
              <p>
                We do not knowingly process personal data of minors without appropriate consent. If such data is
                identified, we will take reasonable steps to delete it.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">10. Third-Party Links</h2>
              <p className="mb-3">
                The Platform may contain links to third-party websites (e.g., official college websites). We are not
                responsible for the privacy practices or content of such external websites.
              </p>
              <p>Users are encouraged to review the privacy policies of those websites separately.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">11. Policy Updates</h2>
              <p className="mb-3">
                We may update this Privacy Policy from time to time to reflect operational, legal, or regulatory
                changes.
              </p>
              <p>
                The revised version will be posted on this page with an updated &quot;Last Updated&quot; date. Continued
                use of the Platform after such changes constitutes acceptance of the revised Policy.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">12. Contact Information</h2>
              <p className="mb-3">For any privacy-related concerns or grievances, please contact:</p>
              <p className="mb-1">Secure College</p>
              <p className="mb-1">Knowledge Park II</p>
              <p className="mb-1">Greater Noida, Uttar Pradesh – 201310</p>
              <p className="mb-3">India</p>
              <p>Email: <span className="text-gray-100">securecollege6@gmail.com</span></p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
