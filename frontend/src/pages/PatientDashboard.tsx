import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Calendar, Clock, Plus, Search, Upload, AlertCircle } from 'lucide-react';
import FileUpload from '../components/FileUpload';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';

// Mock data for prescriptions, records, and access requests
const prescriptions = [
  {
    id: '1',
    doctorName: 'Dr. Sanchit Chauhan',
    date: '2023-06-15',
    diagnosis: 'Hypertension',
    medications: [
      { name: 'Amoxicillin', dosage: '500mg', frequency: 'Twice daily', duration: '7 days' },
    ],
    notes: 'Take medication after meals.',
  },
  {
    id: '2',
    doctorName: 'Dr. Shivansh Tyagi',
    date: '2023-05-20',
    diagnosis: 'Diabetes Type 2',
    medications: [
      { name: 'Metformin', dosage: '1000mg', frequency: 'Once daily', duration: '30 days' },
    ],
    notes: 'Monitor blood sugar levels regularly.',
  },
];

const medicalRecords = [
  { id: '1', title: 'Blood Test Report', date: '2023-06-10', uploadedBy: 'Dr. John Doe' },
  { id: '2', title: 'X-Ray Scan', date: '2023-05-25', uploadedBy: 'Dr. Jane Smith' },
];

const accessRequests = [
  { id: '1', doctorName: 'Dr. John Doe', date: '2023-06-20', status: 'Pending' },
  { id: '2', doctorName: 'Dr. Jane Smith', date: '2023-06-18', status: 'Pending' },
];

const PatientDashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [isUploadingPrescription, setIsUploadingPrescription] = useState(false);
  const [isUploadingLabReport, setIsUploadingLabReport] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const filteredPrescriptions = prescriptions.filter((prescription) =>
    prescription.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prescription.diagnosis.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFileUpload = (files: File[]) => {
    console.log('Files uploaded:', files);
    setUploadedFiles(files);
    // In a real app, you would upload these files to a server
  };

  const handleAccessRequest = (id: string, action: 'allow' | 'deny') => {
    console.log(`Access request ${id} has been ${action}ed`);
    // In a real app, you would update the request status on the server
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Patient Dashboard</h1>
          <p className="text-gray-600">Welcome back, {currentUser?.name}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            { icon: <FileText className="h-6 w-6 text-blue-500" />, title: 'Total Prescriptions', value: prescriptions.length },
            { icon: <Calendar className="h-6 w-6 text-green-500" />, title: 'Upcoming Appointments', value: 2 },
            { icon: <Clock className="h-6 w-6 text-purple-500" />, title: 'Pending Records', value: medicalRecords.length },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-lg shadow-md p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-gray-100">{stat.icon}</div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                  <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div
            className="lg:col-span-2 bg-white rounded-lg shadow-md overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-medium text-gray-900">Prescriptions</h2>
                <div className="flex items-center">
                  <div className="relative mr-4">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search prescriptions..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                  <button
                    onClick={() => setIsUploadingPrescription(true)}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Prescription
                  </button>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Doctor
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Diagnosis
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Medications
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Notes
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredPrescriptions.map((prescription) => (
                    <motion.tr
                      key={prescription.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      whileHover={{ backgroundColor: 'rgba(243, 244, 246, 0.5)' }}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{prescription.doctorName}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{prescription.date}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {prescription.diagnosis}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <ul className="list-disc list-inside">
                          {prescription.medications.map((medication, index) => (
                            <li key={index} className="text-sm text-gray-500">
                              {medication.name} ({medication.dosage}) - {medication.frequency} for {medication.duration}
                            </li>
                          ))}
                        </ul>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{prescription.notes}</div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          <motion.div
            className="bg-white rounded-lg shadow-md overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Medical Records</h2>
            </div>
            <div className="p-6">
              <ul className="divide-y divide-gray-200">
                {medicalRecords.map((record) => (
                  <motion.li
                    key={record.id}
                    className="py-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center">
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {record.title}
                        </p>
                        <p className="text-sm text-gray-500">
                          Uploaded on {record.date} by {record.uploadedBy}
                        </p>
                      </div>
                      <div>
                        <button className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
                          View
                        </button>
                      </div>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Lab Reports Section */}
        <motion.div
          className="mt-8 bg-white rounded-lg shadow-md overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900">Lab Reports</h2>
              <button
                onClick={() => setIsUploadingLabReport(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
              >
                <Upload className="h-4 w-4 mr-2" />
                Upload Lab Report
              </button>
            </div>
          </div>
          <div className="p-6">
            <ul className="divide-y divide-gray-200">
              {medicalRecords.map((record) => (
                <motion.li
                  key={record.id}
                  className="py-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {record.title}
                      </p>
                      <p className="text-sm text-gray-500">
                        Uploaded on {record.date} by {record.uploadedBy}
                      </p>
                    </div>
                    <div>
                      <button className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
                        View
                      </button>
                    </div>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Access Requests Section */}
        <motion.div
          className="mt-8 bg-white rounded-lg shadow-md overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Access Requests</h2>
          </div>
          <div className="p-6">
            <ul className="divide-y divide-gray-200">
              {accessRequests.map((request) => (
                <motion.li
                  key={request.id}
                  className="py-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {request.doctorName} requested access on {request.date}
                      </p>
                      <p className="text-sm text-gray-500">
                        Status: <span className="font-semibold">{request.status}</span>
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleAccessRequest(request.id, 'allow')}
                        className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none"
                      >
                        Allow
                      </button>
                      <button
                        onClick={() => handleAccessRequest(request.id, 'deny')}
                        className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none"
                      >
                        Deny
                      </button>
                    </div>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Upload Prescription Modal */}
        {isUploadingPrescription && (
          <motion.div
            className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              className="bg-white rounded-lg shadow-xl overflow-hidden max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              <div className="px-6 py-4 bg-blue-600 text-white flex justify-between items-center">
                <h3 className="text-lg font-medium">Upload Prescription</h3>
                <button
                  onClick={() => setIsUploadingPrescription(false)}
                  className="text-white hover:text-gray-200"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-6">
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Prescription File
                  </label>
                  <FileUpload onFileUpload={handleFileUpload} />
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setIsUploadingPrescription(false)}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      console.log('Files to upload:', uploadedFiles);
                      setIsUploadingPrescription(false);
                    }}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Upload Lab Report Modal */}
        {isUploadingLabReport && (
          <motion.div
            className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              className="bg-white rounded-lg shadow-xl overflow-hidden max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              <div className="px-6 py-4 bg-blue-600 text-white flex justify-between items-center">
                <h3 className="text-lg font-medium">Upload Lab Report</h3>
                <button
                  onClick={() => setIsUploadingLabReport(false)}
                  className="text-white hover:text-gray-200"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-6">
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Lab Report File
                  </label>
                  <FileUpload onFileUpload={handleFileUpload} />
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setIsUploadingLabReport(false)}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      console.log('Files to upload:', uploadedFiles);
                      setIsUploadingLabReport(false);
                    }}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PatientDashboard;