import { FiShield, FiUsers, FiAward, FiHeart } from 'react-icons/fi';

const About = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-500 to-primary-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About A Toy Services</h1>
            <p className="text-xl text-primary-100">
              Your trusted partner for quality, safe, and educational toys that inspire creativity and learning.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center">Our Story</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed mb-4">
                Founded in 2024, E-Toy Services began with a simple mission: to provide parents with access to 
                high-quality, safe, and educational toys that support child development. We understand that choosing 
                the right toys for your children is important, and we're here to make that process easier.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Our team consists of educators, child development specialists, and parents who are passionate about 
                creating positive play experiences. We carefully curate our collection to ensure every toy meets our 
                high standards for safety, educational value, and fun.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Today, we're proud to serve families across the country, helping children learn, grow, and thrive 
                through play. Our commitment to quality and safety remains at the heart of everything we do.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiShield className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Safety First</h3>
              <p className="text-gray-600">
                All our toys meet or exceed safety standards and are thoroughly tested for quality and durability.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiUsers className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Expert Curation</h3>
              <p className="text-gray-600">
                Our team of specialists carefully selects each toy for its educational value and developmental benefits.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiAward className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Quality Assurance</h3>
              <p className="text-gray-600">
                We partner with trusted manufacturers and stand behind the quality of every product we offer.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiHeart className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Child-Focused</h3>
              <p className="text-gray-600">
                Every decision we make is centered around what's best for children's development and well-being.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Safety Information */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center">Safety Information</h2>
            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-3">Age-Appropriate Selection</h3>
                  <p className="text-gray-700">
                    All our products are clearly labeled with recommended age ranges to help you choose 
                    toys that are developmentally appropriate for your child.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-3">Safety Certifications</h3>
                  <p className="text-gray-700">
                    Our toys meet ASTM, CPSC, and other relevant safety standards. We only work with 
                    manufacturers who share our commitment to child safety.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-3">Material Quality</h3>
                  <p className="text-gray-700">
                    We use non-toxic, durable materials that are safe for children. All products are 
                    regularly tested for harmful substances and durability.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-3">Regular Inspections</h3>
                  <p className="text-gray-700">
                    Our quality team regularly inspects products to ensure they meet our high standards 
                    for safety and quality.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">How We Work</h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                  1
                </div>
                <h3 className="font-semibold text-lg mb-2">Browse & Discover</h3>
                <p className="text-gray-600">
                  Explore our curated collection of educational toys organized by age, category, and developmental benefits.
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                  2
                </div>
                <h3 className="font-semibold text-lg mb-2">Request Information</h3>
                <p className="text-gray-600">
                  Create an account to access detailed product information and submit appointment requests.
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                  3
                </div>
                <h3 className="font-semibold text-lg mb-2">Personal Consultation</h3>
                <p className="text-gray-600">
                  Our team contacts you to discuss your needs and help you choose the perfect toys for your child.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="bg-secondary-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Have Questions?</h2>
          <p className="text-xl mb-8 text-secondary-100">
            We're here to help you find the perfect toys for your little ones.
          </p>
          <a href="/contact" className="btn-primary bg-white text-secondary-600 hover:bg-gray-100">
            Contact Us
          </a>
        </div>
      </section>
    </div>
  );
};

export default About;
