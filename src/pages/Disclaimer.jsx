import { Link } from 'react-router-dom';
import { FiAlertTriangle, FiShield, FiUser, FiGlobe, FiMail, FiPhone, FiCalendar } from 'react-icons/fi';

const Disclaimer = () => {
  const lastUpdated = "January 15, 2024";

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Disclaimer
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Important information about the use of A-Toy Services platform and its limitations.
          </p>
          <div className="flex items-center justify-center text-sm text-gray-500 mt-4">
            <FiCalendar className="w-4 h-4 mr-2" />
            Last updated: {lastUpdated}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
              <FiAlertTriangle className="w-6 h-6 mr-3 text-yellow-600" />
              General Disclaimer
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed">
                The information contained on A-Toy Services website is for general information purposes only. 
                While we strive to keep the information up to date and correct, we make no representations or 
                warranties of any kind, express or implied, about the completeness, accuracy, reliability, 
                suitability or availability with respect to the website or the information, products, services, 
                or related graphics contained on the website for any purpose.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
              <FiShield className="w-6 h-6 mr-3 text-primary-600" />
              Service Provider Verification
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed">
                A-Toy Services acts as a platform connecting service providers with customers. While we implement 
                verification processes, we cannot guarantee the credentials, qualifications, or professional conduct 
                of individual service providers. Users are encouraged to:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mt-3">
                <li>Verify service provider credentials independently</li>
                <li>Check reviews and ratings from other users</li>
                <li>Confirm certifications and licenses</li>
                <li>Communicate clearly about services and expectations</li>
                <li>Report any concerns or issues immediately</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
              <FiUser className="w-6 h-6 mr-3 text-primary-600" />
              Health and Safety
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed">
                Users of wellness and therapeutic services should consider the following:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mt-3">
                <li>Consult with healthcare professionals before receiving services</li>
                <li>Inform service providers of any health conditions or contraindications</li>
                <li>Stop services immediately if you experience discomfort or adverse reactions</li>
                <li>Follow all safety guidelines and instructions provided</li>
                <li>Be aware that individual results may vary</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
              <FiGlobe className="w-6 h-6 mr-3 text-primary-600" />
              Third-Party Content and Links
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed">
                Our website may contain links to third-party websites or services. We have no control over and 
                assume no responsibility for the content, privacy policies, or practices of any third-party 
                websites or services. We do not warrant the offerings of any of these entities/individuals or 
                their websites.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
              <FiShield className="w-6 h-6 mr-3 text-primary-600" />
              Limitation of Liability
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed">
                In no event shall A-Toy Services, nor its directors, employees, partners, agents, suppliers, 
                or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, 
                including without limitation, loss of profits, data, use, goodwill, or other intangible losses, 
                resulting from:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mt-3">
                <li>Your use of the service</li>
                <li>Services provided by third-party providers</li>
                <li>Unauthorized access to or alteration of your transmissions</li>
                <li>Any bugs, viruses, trojan horses, or the like</li>
                <li>Errors, mistakes, or inaccuracies in content</li>
                <li>Personal injury or property damage of any nature whatsoever</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
              <FiUser className="w-6 h-6 mr-3 text-primary-600" />
              User Responsibilities
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed">
                As a user of our platform, you agree to:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mt-3">
                <li>Use the service for lawful purposes only</li>
                <li>Provide accurate and truthful information</li>
                <li>Respect the rights and privacy of others</li>
                <li>Take responsibility for your own safety and well-being</li>
                <li>Exercise due diligence when selecting service providers</li>
                <li>Comply with all applicable laws and regulations</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
              <FiAlertTriangle className="w-6 h-6 mr-3 text-yellow-600" />
              No Professional Advice
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed">
                The content on our website is not intended as professional medical, legal, financial, or other 
                professional advice. Always seek the advice of qualified professionals with any questions you may 
                have regarding such matters.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
              <FiCalendar className="w-6 h-6 mr-3 text-primary-600" />
              Service Availability
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed">
                We do not guarantee that the service will be available at all times. We may experience hardware, 
                software, or other problems that could lead to interruptions. You agree that we will not be liable 
                to you or any third party for any such interruption.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
              <FiMail className="w-6 h-6 mr-3 text-primary-600" />
              Contact Information
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed">
                If you have any questions about this disclaimer, please contact us:
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
        </div>

        <div className="mt-12 text-center">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Pages</h3>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/terms-of-service" className="text-primary-600 hover:text-primary-800 font-medium">
                Terms of Service
              </Link>
              <Link to="/privacy-policy" className="text-primary-600 hover:text-primary-800 font-medium">
                Privacy Policy
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

export default Disclaimer;
