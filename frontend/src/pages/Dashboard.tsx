import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Activity, Shield, Users, FileText, Clock } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              Connecting Healthcare Systems for Better Patient Care
            </h1>
            <p className="text-xl max-w-3xl mx-auto mb-8">
              Our platform bridges the gap between fragmented healthcare systems, 
              providing a seamless experience for both doctors and patients.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link 
                  to="/signup" 
                  className="inline-block bg-white text-blue-700 font-medium px-6 py-3 rounded-md shadow-md hover:bg-blue-50 transition-colors"
                >
                  Get Started
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link 
                  to="/login" 
                  className="inline-block bg-transparent text-white border border-white font-medium px-6 py-3 rounded-md hover:bg-white hover:bg-opacity-10 transition-colors"
                >
                  Sign In
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Key Features</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Our platform offers a comprehensive solution to the challenges of fragmented healthcare data.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Activity className="h-8 w-8 text-blue-600" />,
                title: "Real-time Data Integration",
                description: "Connect multiple healthcare systems to provide a complete view of patient information in real-time."
              },
              {
                icon: <Shield className="h-8 w-8 text-blue-600" />,
                title: "Secure Data Sharing",
                description: "Advanced encryption and access controls ensure patient data remains private and secure."
              },
              {
                icon: <Users className="h-8 w-8 text-blue-600" />,
                title: "Collaborative Care",
                description: "Enable seamless communication between healthcare providers for better coordinated care."
              },
              {
                icon: <FileText className="h-8 w-8 text-blue-600" />,
                title: "Digital Prescriptions",
                description: "Create, manage, and share digital prescriptions with comprehensive medication details."
              },
              {
                icon: <Clock className="h-8 w-8 text-blue-600" />,
                title: "Historical Records",
                description: "Access complete patient history including past treatments, medications, and test results."
              },
              {
                icon: <Shield className="h-8 w-8 text-blue-600" />,
                title: "Patient Privacy",
                description: "Robust security measures and compliance with healthcare data protection regulations."
              }
            ].map((feature, index) => (
              <motion.div 
                key={index}
                className="bg-white p-6 rounded-lg shadow-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
              >
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-100 mb-4 mx-auto">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-medium text-gray-900 text-center mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-center">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="bg-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-xl overflow-hidden">
            <div className="md:flex">
              <div className="md:flex-1 p-8 md:p-12 bg-gradient-to-br from-indigo-600 to-blue-700 text-white">
                <h2 className="text-3xl font-bold mb-4">Ready to transform healthcare data management?</h2>
                <p className="text-lg mb-6">
                  Join thousands of healthcare providers who are already using our platform to deliver better patient care.
                </p>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link 
                    to="/signup" 
                    className="inline-block bg-white text-blue-700 font-medium px-6 py-3 rounded-md shadow-md hover:bg-blue-50 transition-colors"
                  >
                    Sign Up Now
                  </Link>
                </motion.div>
              </div>
              <div className="md:flex-1 p-8 md:p-12">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Benefits for Healthcare Providers</h3>
                <ul className="space-y-4">
                  {[
                    "Reduce administrative burden with streamlined workflows",
                    "Make informed decisions with complete patient data",
                    "Improve patient outcomes through better care coordination",
                    "Enhance patient satisfaction with faster access to information",
                    "Minimize errors and redundant tests"
                  ].map((benefit, index) => (
                    <motion.li 
                      key={index}
                      className="flex items-start"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">{benefit}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;