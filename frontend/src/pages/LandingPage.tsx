import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaStethoscope, FaUserMd, FaCalendarCheck, FaChartLine } from 'react-icons/fa';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <header className="container mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Welcome to <span className="text-blue-600">MediConnect Pro</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Your comprehensive healthcare companion for better health management and care
          </p>
          <Link
            to="/user/dashboard"
            className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition duration-300"
          >
            Get Started
          </Link>
        </motion.div>
      </header>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-6 bg-white rounded-xl shadow-lg"
            >
              <FaStethoscope className="text-4xl text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Symptom Checker</h3>
              <p className="text-gray-600">Advanced AI-powered symptom analysis for quick health insights</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-6 bg-white rounded-xl shadow-lg"
            >
              <FaUserMd className="text-4xl text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Virtual Clinic</h3>
              <p className="text-gray-600">Connect with healthcare professionals from the comfort of your home</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-6 bg-white rounded-xl shadow-lg"
            >
              <FaCalendarCheck className="text-4xl text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Preventive Care</h3>
              <p className="text-gray-600">Stay ahead with personalized preventive care recommendations</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-6 bg-white rounded-xl shadow-lg"
            >
              <FaChartLine className="text-4xl text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Health Dashboard</h3>
              <p className="text-gray-600">Track and monitor your health metrics in real-time</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-50">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Ready to Take Control of Your Health?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Join thousands of users who trust MediConnect Pro for their healthcare needs
            </p>
            <Link
              to="/user/dashboard"
              className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition duration-300"
            >
              Start Your Journey
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-xl font-semibold mb-4">MediConnect Pro</h4>
              <p className="text-gray-400">Your trusted healthcare companion</p>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link to="/user/sc" className="text-gray-400 hover:text-white">Symptom Checker</Link></li>
                <li><Link to="/user/clinic" className="text-gray-400 hover:text-white">Virtual Clinic</Link></li>
                <li><Link to="/user/preventive" className="text-gray-400 hover:text-white">Preventive Care</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-4">Contact</h4>
              <p className="text-gray-400">support@mediconnectpro.com</p>
              <p className="text-gray-400">1-800-MEDI-PRO</p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center">
            <p className="text-gray-400">&copy; 2024 MediConnect Pro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage; 