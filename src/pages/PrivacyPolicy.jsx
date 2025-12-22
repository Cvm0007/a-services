import { Link } from 'react-router-dom';
import { FiShield, FiLock, FiDatabase, FiEye, FiUser, FiGlobe, FiMail, FiPhone, FiCalendar } from 'react-icons/fi';

/**
 * Privacy Policy Page - Comprehensive privacy and data protection policy
 * Features: Data collection, usage, sharing, security, user rights, compliance
 * Can be modified: Update privacy practices, add new data types, modify consent mechanisms
 */
const PrivacyPolicy = () => {
  const lastUpdated = "January 15, 2024";

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            At A-Toy Services, we are committed to protecting your privacy and ensuring the security of your personal information.
          </p>
          <div className="flex items-center justify-center text-sm text-gray-500 mt-4">
            <FiCalendar className="w-4 h-4 mr-2" />
            Last updated: {lastUpdated}
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-sm p-8 space-y-8">
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
              <FiShield className="w-6 h-6 mr-3 text-primary-600" />
              1. Introduction
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed">
                This Privacy Policy explains how A-Toy Services collects, uses, maintains, and discloses information 
                collected from users (each, a "User") of our website and services ("Service"). This privacy policy applies 
                to the Service and all products and services offered by A-Toy Services.
              </p>
              <p className="text-gray-700 leading-relaxed mt-3">
                We use your personal information to provide and improve the service. By using the Service, you agree to 
                the collection and use of information in accordance with this policy.
              </p>
            </div>
          </section>

          {/* Information We Collect */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
              <FiDatabase className="w-6 h-6 mr-3 text-primary-600" />
              2. Information We Collect
            </h2>
            <div className="prose prose-gray max-w-none">
              <h3 className="text-lg font-medium text-gray-900 mb-3">Personal Information</h3>
              <p className="text-gray-700 leading-relaxed">
                When you register for an account or use our services, we may collect:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mt-3">
                <li>Name, email address, and phone number</li>
                <li>Physical address and location data</li>
                <li>Date of birth and age verification</li>
                <li>Professional credentials and certifications</li>
                <li>Payment information (processed securely)</li>
                <li>Profile photos and service images</li>
              </ul>

              <h3 className="text-lg font-medium text-gray-900 mb-3 mt-6">Service Usage Information</h3>
              <p className="text-gray-700 leading-relaxed">
                We automatically collect information about how you use our service:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mt-3">
                <li>Pages visited and time spent on pages</li>
                <li>Search queries and filter preferences</li>
                <li>Booking history and service preferences</li>
                <li>Device information and browser type</li>
                <li>IP address and general location</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>

              <h3 className="text-lg font-medium text-gray-900 mb-3 mt-6">Communications</h3>
              <p className="text-gray-700 leading-relaxed">
                We collect information when you communicate with us:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mt-3">
                <li>Customer support inquiries</li>
                <li>Feedback and reviews</li>
                <li>Service provider communications</li>
                <li>Marketing preferences and responses</li>
              </ul>
            </div>
          </section>

          {/* How We Use Your Information */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
              <FiEye className="w-6 h-6 mr-3 text-primary-600" />
              3. How We Use Your Information
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed">
                A-Toy Services uses the collected information for various purposes:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mt-3">
                <li><strong>Service Provision:</strong> To provide, operate, and maintain our service</li>
                <li><strong>Account Management:</strong> To manage your account and provide customer support</li>
                <li><strong>Matching:</strong> To connect customers with appropriate service providers</li>
                <li><strong>Payments:</strong> To process payments and manage financial transactions</li>
                <li><strong>Communication:</strong> To send you service-related communications</li>
                <li><strong>Improvement:</strong> To analyze usage patterns and improve our services</li>
                <li><strong>Security:</strong> To detect and prevent fraud, abuse, and security issues</li>
                <li><strong>Legal Compliance:</strong> To comply with legal obligations and regulations</li>
                <li><strong>Marketing:</strong> To send marketing communications (with your consent)</li>
              </ul>
            </div>
          </section>

          {/* Information Sharing */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
              <FiGlobe className="w-6 h-6 mr-3 text-primary-600" />
              4. Information Sharing
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed">
                We may share your information in the following circumstances:
              </p>
              
              <h3 className="text-lg font-medium text-gray-900 mb-3 mt-4">Service Providers</h3>
              <p className="text-gray-700 leading-relaxed">
                We share relevant information with service providers to facilitate service delivery:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mt-3">
                <li>Customer contact information for booking and communication</li>
                <li>Service provider profiles and availability</li>
                <li>Booking details and service requirements</li>
                <li>Payment confirmation (not full payment details)</li>
              </ul>

              <h3 className="text-lg font-medium text-gray-900 mb-3 mt-4">Third-Party Services</h3>
              <p className="text-gray-700 leading-relaxed">
                We use third-party services to operate our business:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mt-3">
                <li>Payment processors for secure transactions</li>
                <li>Cloud hosting providers for data storage</li>
                <li>Analytics services for usage insights</li>
                <li>Communication platforms for notifications</li>
              </ul>

              <h3 className="text-lg font-medium text-gray-900 mb-3 mt-4">Legal Requirements</h3>
              <p className="text-gray-700 leading-relaxed">
                We may disclose information when required by law:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mt-3">
                <li>To comply with legal obligations</li>
                <li>To protect our rights and property</li>
                <li>To prevent harm to users or the public</li>
                <li>In connection with legal proceedings</li>
              </ul>
            </div>
          </section>

          {/* Data Security */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
              <FiLock className="w-6 h-6 mr-3 text-primary-600" />
              5. Data Security
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed">
                We implement appropriate security measures to protect your personal information:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mt-3">
                <li>SSL encryption for data transmission</li>
                <li>Secure servers for data storage</li>
                <li>Regular security audits and updates</li>
                <li>Access controls and authentication systems</li>
                <li>Employee training on data protection</li>
                <li>Incident response procedures</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-4">
                However, no method of transmission over the Internet or method of electronic storage is 100% secure. 
                While we strive to use commercially acceptable means to protect your personal information, we cannot 
                guarantee its absolute security.
              </p>
            </div>
          </section>

          {/* Your Rights */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
              <FiUser className="w-6 h-6 mr-3 text-primary-600" />
              6. Your Rights
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed">
                You have the following rights regarding your personal information:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mt-3">
                <li><strong>Access:</strong> Request access to your personal information</li>
                <li><strong>Correction:</strong> Request correction of inaccurate information</li>
                <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                <li><strong>Portability:</strong> Request transfer of your data</li>
                <li><strong>Restriction:</strong> Request restriction of processing</li>
                <li><strong>Objection:</strong> Object to processing of your information</li>
                <li><strong>Consent:</strong> Withdraw consent at any time</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-4">
                To exercise these rights, please contact us using the information provided below.
              </p>
            </div>
          </section>

          {/* Cookies and Tracking */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
              <FiGlobe className="w-6 h-6 mr-3 text-primary-600" />
              7. Cookies and Tracking
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed">
                We use cookies and similar tracking technologies to track activity on our service and hold certain information:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mt-3">
                <li><strong>Essential Cookies:</strong> Required for basic functionality</li>
                <li><strong>Performance Cookies:</strong> To monitor and improve service performance</li>
                <li><strong>Functional Cookies:</strong> To remember your preferences</li>
                <li><strong>Marketing Cookies:</strong> To deliver relevant advertisements</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-4">
                You can control cookies through your browser settings. However, disabling cookies may affect your ability to use certain features of our service.
              </p>
            </div>
          </section>

          {/* Data Retention */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
              <FiCalendar className="w-6 h-6 mr-3 text-primary-600" />
              8. Data Retention
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed">
                We retain your personal information only as long as necessary for the purposes outlined in this privacy policy, 
                unless a longer retention period is required or permitted by law.
              </p>
              <p className="text-gray-700 leading-relaxed mt-3">
                We may retain certain information for legitimate business purposes, such as fraud prevention, legal compliance, 
                and service improvement, even after you have deleted your account.
              </p>
            </div>
          </section>

          {/* Children's Privacy */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
              <FiShield className="w-6 h-6 mr-3 text-primary-600" />
              9. Children's Privacy
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed">
                Our service is not intended for use by children under the age of 18. We do not knowingly collect 
                personally identifiable information from children under 18. If you are a parent or guardian and 
                you are aware that your child has provided us with personal information, please contact us.
              </p>
            </div>
          </section>

          {/* International Data Transfer */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
              <FiGlobe className="w-6 h-6 mr-3 text-primary-600" />
              10. International Data Transfer
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed">
                Your personal information may be transferred to, and maintained on, computers located outside of your 
                state, province, country or other governmental jurisdiction where the data protection laws may differ 
                from those of your jurisdiction.
              </p>
              <p className="text-gray-700 leading-relaxed mt-3">
                We ensure appropriate safeguards are in place to protect your personal information in accordance with 
                applicable data protection laws.
              </p>
            </div>
          </section>

          {/* Changes to Privacy Policy */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
              <FiCalendar className="w-6 h-6 mr-3 text-primary-600" />
              11. Changes to Privacy Policy
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed">
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the 
                new Privacy Policy on this page and updating the "Last updated" date at the top.
              </p>
              <p className="text-gray-700 leading-relaxed mt-3">
                You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy 
                Policy are effective when they are posted on this page.
              </p>
            </div>
          </section>

          {/* Contact Information */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
              <FiMail className="w-6 h-6 mr-3 text-primary-600" />
              12. Contact Information
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg mt-4">
                <div className="space-y-2">
                  <div className="flex items-center text-gray-700">
                    <FiMail className="w-4 h-4 mr-2 text-primary-600" />
                    <span>Email: privacy@atoyservices.com</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <FiPhone className="w-4 h-4 mr-2 text-primary-600" />
                    <span>Phone: +91-9876543210</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <FiGlobe className="w-4 h-4 mr-2 text-primary-600" />
                    <span>Website: www.atoyservices.com</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Pages</h3>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/terms-of-service" className="text-primary-600 hover:text-primary-800 font-medium">
                Terms of Service
              </Link>
              <Link to="/disclaimer" className="text-primary-600 hover:text-primary-800 font-medium">
                Disclaimer
              </Link>
              <Link to="/refund-policy" className="text-primary-600 hover:text-primary-800 font-medium">
                Refund Policy
              </Link>
              <Link to="/contact" className="text-primary-600 hover:text-primary-800 font-medium">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
