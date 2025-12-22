import { Link } from 'react-router-dom';
import { FiDollarSign, FiCalendar, FiCheck, FiX, FiClock, FiMail, FiPhone, FiAlertTriangle } from 'react-icons/fi';

const RefundPolicy = () => {
  const lastUpdated = "January 15, 2024";

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Refund Policy
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our comprehensive refund policy ensures fair treatment for both customers and service providers.
          </p>
          <div className="flex items-center justify-center text-sm text-gray-500 mt-4">
            <FiCalendar className="w-4 h-4 mr-2" />
            Last updated: {lastUpdated}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
              <FiDollarSign className="w-6 h-6 mr-3 text-primary-600" />
              Overview
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed">
                At A-Toy Services, we strive to ensure customer satisfaction while maintaining fairness for our service providers. 
                This refund policy outlines the conditions under which refunds may be issued for services booked through our platform.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
              <FiCheck className="w-6 h-6 mr-3 text-green-600" />
              Refund Eligibility
            </h2>
            <div className="prose prose-gray max-w-none">
              <h3 className="text-lg font-medium text-gray-900 mb-3">Full Refund - 100% Refund</h3>
              <p className="text-gray-700 leading-relaxed">
                You may be eligible for a full refund under the following circumstances:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mt-3">
                <li>Cancellation made more than 24 hours before the scheduled appointment</li>
                <li>Service provider fails to show up for the scheduled appointment</li>
                <li>Service provider cancels the appointment less than 24 hours before the scheduled time</li>
                <li>Technical issues on our platform that prevent service delivery</li>
                <li>Service does not match the description provided in the listing</li>
              </ul>

              <h3 className="text-lg font-medium text-gray-900 mb-3 mt-6">Partial Refund - 50% Refund</h3>
              <p className="text-gray-700 leading-relaxed">
                You may be eligible for a partial refund (50%) under the following circumstances:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mt-3">
                <li>Cancellation made between 12-24 hours before the scheduled appointment</li>
                <li>Service arrives more than 30 minutes late for the appointment</li>
                <li>Service quality significantly differs from what was advertised</li>
                <li>Service duration is significantly shorter than advertised</li>
              </ul>

              <h3 className="text-lg font-medium text-gray-900 mb-3 mt-6">No Refund</h3>
              <p className="text-gray-700 leading-relaxed">
                Refunds are generally not available under the following circumstances:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mt-3">
                <li>Cancellation made less than 12 hours before the scheduled appointment</li>
                <li>Customer fails to show up for the scheduled appointment (no-show)</li>
                <li>Customer arrives more than 15 minutes late without prior notification</li>
                <li>Service is completed as described and customer is satisfied</li>
                <li>Refund request is made more than 7 days after the service date</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
              <FiClock className="w-6 h-6 mr-3 text-primary-600" />
              Cancellation Timeframes
            </h2>
            <div className="prose prose-gray max-w-none">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-700">More than 24 hours before</span>
                    <span className="text-green-600 font-semibold">100% Refund</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-700">12-24 hours before</span>
                    <span className="text-yellow-600 font-semibold">50% Refund</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-700">Less than 12 hours before</span>
                    <span className="text-red-600 font-semibold">No Refund</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
              <FiAlertTriangle className="w-6 h-6 mr-3 text-yellow-600" />
              Exceptional Circumstances
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed">
                We understand that exceptional circumstances may arise. In the following cases, we may consider 
                refunds outside of our standard policy:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mt-3">
                <li>Medical emergencies with proper documentation</li>
                <li>Natural disasters or severe weather events</li>
                <li>Family emergencies</li>
                <li>Other unavoidable circumstances beyond your control</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-3">
                These cases will be reviewed individually and refunds are not guaranteed.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
              <FiCalendar className="w-6 h-6 mr-3 text-primary-600" />
              Refund Process
            </h2>
            <div className="prose prose-gray max-w-none">
              <h3 className="text-lg font-medium text-gray-900 mb-3">How to Request a Refund</h3>
              <ol className="list-decimal list-inside text-gray-700 space-y-2 mt-3">
                <li>Log into your A-Toy Services account</li>
                <li>Navigate to your booking history</li>
                <li>Select the service you wish to request a refund for</li>
                <li>Click on "Request Refund" and provide details</li>
                <li>Submit supporting documentation if applicable</li>
                <li>Wait for our review process (typically 3-5 business days)</li>
              </ol>

              <h3 className="text-lg font-medium text-gray-900 mb-3 mt-6">Processing Time</h3>
              <p className="text-gray-700 leading-relaxed">
                Refund requests are typically processed within 3-5 business days. Once approved, refunds will be 
                credited back to your original payment method within 5-10 business days, depending on your bank 
                or payment provider.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
              <FiX className="w-6 h-6 mr-3 text-red-600" />
              Non-Refundable Items
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed">
                The following items are non-refundable:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mt-3">
                <li>Platform fees and service charges</li>
                <li>Gift cards and promotional credits</li>
                <li>Special promotional packages with explicit no-refund terms</li>
                <li>Services already completed to customer satisfaction</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
              <FiAlertTriangle className="w-6 h-6 mr-3 text-yellow-600" />
              Dispute Resolution
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed">
                If you disagree with a refund decision, you may:
              </p>
              <ol className="list-decimal list-inside text-gray-700 space-y-2 mt-3">
                <li>Submit additional information for reconsideration</li>
                <li>Request mediation through our customer support team</li>
                <li>Escalate to our dispute resolution department</li>
              </ol>
              <p className="text-gray-700 leading-relaxed mt-3">
                All decisions are final and binding. We reserve the right to modify this policy at any time.
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
                For refund-related inquiries, please contact us:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg mt-4">
                <div className="space-y-2">
                  <div className="flex items-center text-gray-700">
                    <FiMail className="w-4 h-4 mr-2 text-primary-600" />
                    <span>Email: refunds@atoyservices.com</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <FiPhone className="w-4 h-4 mr-2 text-primary-600" />
                    <span>Phone: +91-9876543210</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <FiClock className="w-4 h-4 mr-2 text-primary-600" />
                    <span>Business Hours: 9 AM - 6 PM IST</span>
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
              <Link to="/disclaimer" className="text-primary-600 hover:text-primary-800 font-medium">
                Disclaimer
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

export default RefundPolicy;
