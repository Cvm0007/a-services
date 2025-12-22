import { Link } from 'react-router-dom';
import { FiShield, FiUser, FiGlobe, FiMail, FiPhone, FiCalendar } from 'react-icons/fi';

/**
 * Terms of Service Page - Legal terms and conditions for using A-Toy Services
 * Features: Comprehensive terms, user agreements, service policies, legal compliance
 * Can be modified: Update terms, add new policies, modify legal sections
 */
const TermsOfService = () => {
  const lastUpdated = "January 15, 2024";

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Terms of Service
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Welcome to A-Toy Services. These terms and conditions outline the rules and regulations for the use of our website and services.
          </p>
          <div className="flex items-center justify-center text-sm text-gray-500 mt-4">
            <FiCalendar className="w-4 h-4 mr-2" />
            Last updated: {lastUpdated}
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-sm p-8 space-y-8">
          {/* Agreement to Terms */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
              <FiShield className="w-6 h-6 mr-3 text-primary-600" />
              1. Agreement to Terms
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed">
                By accessing and using A-Toy Services, you accept and agree to be bound by the terms and provision of this agreement. 
                If you do not agree to abide by the above, please do not use this service.
              </p>
              <p className="text-gray-700 leading-relaxed">
                These Terms of Service apply to all users of the service, including without limitation users who are browsers, 
                vendors, customers, merchants, and/or contributors of content.
              </p>
            </div>
          </section>

          {/* Description of Service */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
              <FiGlobe className="w-6 h-6 mr-3 text-primary-600" />
              2. Description of Service
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed">
                A-Toy Services is a platform that connects service providers with customers seeking various wellness and therapeutic services. 
                Our services include:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mt-3">
                <li>Massage therapy services</li>
                <li>Wellness and relaxation treatments</li>
                <li>Professional service provider listings</li>
                <li>Booking and scheduling services</li>
                <li>Payment processing</li>
                <li>User reviews and ratings</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-4">
                We reserve the right to modify, suspend, or discontinue the service (or any part thereof) at any time with or without notice to you.
              </p>
            </div>
          </section>

          {/* User Accounts */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
              <FiUser className="w-6 h-6 mr-3 text-primary-600" />
              3. User Accounts
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed">
                To access certain features of our service, you must register for an account. When you register:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mt-3">
                <li>You must provide accurate, current, and complete information</li>
                <li>You must safeguard your password and account access</li>
                <li>You are responsible for all activities under your account</li>
                <li>You must notify us immediately of any unauthorized use</li>
                <li>You must be at least 18 years of age to create an account</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-4">
                We reserve the right to suspend or terminate your account at any time for any reason, including violation of these terms.
              </p>
            </div>
          </section>

          {/* Service Provider Responsibilities */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
              <FiShield className="w-6 h-6 mr-3 text-primary-600" />
              4. Service Provider Responsibilities
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed">
                As a service provider on our platform, you agree to:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mt-3">
                <li>Provide accurate and complete information about your services</li>
                <li>Maintain professional standards and qualifications</li>
                <li>Comply with all applicable laws and regulations</li>
                <li>Respond promptly to customer inquiries and bookings</li>
                <li>Provide services as described in your listings</li>
                <li>Maintain appropriate insurance and certifications</li>
                <li>Respect customer privacy and confidentiality</li>
              </ul>
            </div>
          </section>

          {/* Customer Responsibilities */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
              <FiUser className="w-6 h-6 mr-3 text-primary-600" />
              5. Customer Responsibilities
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed">
                As a customer using our service, you agree to:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mt-3">
                <li>Provide accurate information when booking services</li>
                <li>Arrive on time for scheduled appointments</li>
                <li>Provide payment for services rendered</li>
                <li>Treat service providers with respect and professionalism</li>
                <li>Follow any specific preparation instructions</li>
                <li>Communicate any health concerns or contraindications</li>
                <li>Cancel appointments with reasonable notice</li>
              </ul>
            </div>
          </section>

          {/* Prohibited Activities */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
              <FiShield className="w-6 h-6 mr-3 text-primary-600" />
              6. Prohibited Activities
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed">
                You may not use our service for any illegal or unauthorized purpose. Prohibited activities include:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mt-3">
                <li>Posting false, misleading, or fraudulent information</li>
                <li>Engaging in illegal services or activities</li>
                <li>Harassment, abuse, or discrimination</li>
                <li>Violation of intellectual property rights</li>
                <li>Spam, phishing, or malicious activities</li>
                <li>Interfering with the proper working of the service</li>
                <li>Attempting to gain unauthorized access to our systems</li>
              </ul>
            </div>
          </section>

          {/* Payment Terms */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
              <FiShield className="w-6 h-6 mr-3 text-primary-600" />
              7. Payment Terms
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed">
                Payment for services is processed through our secure payment system:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mt-3">
                <li>All prices are listed in Indian Rupees (INR)</li>
                <li>Payment must be made before or at the time of service</li>
                <li>We accept credit/debit cards, UPI, and mobile wallets</li>
                <li>Service providers receive payment after service completion</li>
                <li>Refunds are subject to our refund policy</li>
                <li>Platform fees may apply to transactions</li>
              </ul>
            </div>
          </section>

          {/* Privacy Policy */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
              <FiShield className="w-6 h-6 mr-3 text-primary-600" />
              8. Privacy Policy
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed">
                Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the service, 
                to understand our practices. By using our service, you agree to the collection and use of information 
                in accordance with our Privacy Policy.
              </p>
            </div>
          </section>

          {/* Limitation of Liability */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
              <FiShield className="w-6 h-6 mr-3 text-primary-600" />
              9. Limitation of Liability
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed">
                In no event shall A-Toy Services, nor its directors, employees, partners, agents, suppliers, or affiliates, 
                be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, 
                loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of the service.
              </p>
            </div>
          </section>

          {/* Termination */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
              <FiShield className="w-6 h-6 mr-3 text-primary-600" />
              10. Termination
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed">
                We may terminate or suspend your account and bar access to the service immediately, without prior notice or liability, 
                under our sole discretion, for any reason whatsoever, including without limitation if you breach the Terms.
              </p>
            </div>
          </section>

          {/* Contact Information */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
              <FiMail className="w-6 h-6 mr-3 text-primary-600" />
              11. Contact Information
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg mt-4">
                <div className="space-y-2">
                  <div className="flex items-center text-gray-700">
                    <FiMail className="w-4 h-4 mr-2 text-primary-600" />
                    <span>Email: legal@atoyservices.com</span>
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

          {/* Changes to Terms */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
              <FiCalendar className="w-6 h-6 mr-3 text-primary-600" />
              12. Changes to Terms
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed">
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. 
                If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect.
              </p>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Pages</h3>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/privacy-policy" className="text-primary-600 hover:text-primary-800 font-medium">
                Privacy Policy
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

export default TermsOfService;
