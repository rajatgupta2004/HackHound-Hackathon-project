import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Calendar, Clock, Search } from 'lucide-react';

// Mock data
const initialPatients = [
  { id: '1', name: 'kamlesh', age: 45, lastVisit: '2023-05-15', condition: 'Hypertension' },
  { id: '2', name: 'rahul', age: 32, lastVisit: '2023-06-02', condition: 'Diabetes Type 2' },
  { id: '3', name: 'rekha', age: 58, lastVisit: '2023-04-28', condition: 'Arthritis' },
  { id: '4', name: 'sanjay', age: 27, lastVisit: '2023-06-10', condition: 'Asthma' },
  { id: '5', name: 'mangal', age: 63, lastVisit: '2023-05-22', condition: 'Coronary Artery Disease' },
];

const patientRecords = [
  {
    id: '1',
    patientId: '1', // Corresponds to kamlesh
    medicalRecords: [
      { id: '1', title: 'Blood Pressure Report', date: '2023-05-10', uploadedBy: 'Dr. John Doe' },
      { id: '2', title: 'Cholesterol Test', date: '2023-04-25', uploadedBy: 'Dr. Jane Smith' },
    ],
    prescriptions: [
      {
        id: '1',
        doctorName: 'Dr. John Doe',
        date: '2023-05-15',
        diagnosis: 'Hypertension',
        medications: [
          { name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily', duration: '30 days' },
          { name: 'Amlodipine', dosage: '5mg', frequency: 'Once daily', duration: '30 days' },
        ],
        notes: 'Monitor blood pressure regularly.',
      },
    ],
    labReports: [
      { id: '1', title: 'Complete Blood Count', date: '2023-05-12', uploadedBy: 'LabCorp' },
    ],
  },
  // Add more patient records as needed
];

const Record: React.FC = () => {
  const [selectedPatient, setSelectedPatient] = useState<typeof initialPatients[0] | null>(null);
  const [isViewingRecord, setIsViewingRecord] = useState(false);

  // Find the patient's records based on their ID
  const patientRecord = selectedPatient
    ? patientRecords.find((record) => record.patientId === selectedPatient.id)
    : null;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Doctor Dashboard</h1>

      {/* Patient List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {initialPatients.map((patient) => (
          <motion.div
            key={patient.id}
            className="bg-white rounded-lg shadow-md p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">{patient.name}</h2>
                <p className="text-sm text-gray-500">{patient.condition}</p>
              </div>
              <button
                onClick={() => {
                  setSelectedPatient(patient);
                  setIsViewingRecord(true);
                }}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
              >
                View Record
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* View Record Modal */}
      {isViewingRecord && selectedPatient && patientRecord && (
        <motion.div
          className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="bg-white rounded-lg shadow-xl overflow-hidden max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <div className="px-6 py-4 bg-blue-600 text-white flex justify-between items-center">
              <h3 className="text-lg font-medium">
                Medical Records for {selectedPatient.name}
              </h3>
              <button
                onClick={() => setIsViewingRecord(false)}
                className="text-white hover:text-gray-200"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6">
              {/* Medical Records */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Medical Records</h4>
                <ul className="divide-y divide-gray-200">
                  {patientRecord.medicalRecords.map((record) => (
                    <li key={record.id} className="py-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{record.title}</p>
                          <p className="text-sm text-gray-500">
                            Uploaded on {record.date} by {record.uploadedBy}
                          </p>
                        </div>
                        <button className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
                          Download
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Prescriptions */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Prescriptions</h4>
                <ul className="divide-y divide-gray-200">
                  {patientRecord.prescriptions.map((prescription) => (
                    <li key={prescription.id} className="py-4">
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Prescribed by {prescription.doctorName} on {prescription.date}
                        </p>
                        <p className="text-sm text-gray-500">
                          Diagnosis: {prescription.diagnosis}
                        </p>
                        <ul className="list-disc list-inside mt-2">
                          {prescription.medications.map((medication, index) => (
                            <li key={index} className="text-sm text-gray-500">
                              {medication.name} ({medication.dosage}) - {medication.frequency} for {medication.duration}
                            </li>
                          ))}
                        </ul>
                        <p className="text-sm text-gray-500 mt-2">Notes: {prescription.notes}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Lab Reports */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Lab Reports</h4>
                <ul className="divide-y divide-gray-200">
                  {patientRecord.labReports.map((report) => (
                    <li key={report.id} className="py-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{report.title}</p>
                          <p className="text-sm text-gray-500">
                            Uploaded on {report.date} by {report.uploadedBy}
                          </p>
                        </div>
                        <button className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
                          Download
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Record;