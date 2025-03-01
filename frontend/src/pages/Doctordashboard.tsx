import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, FileText, Calendar, Clock, Plus, Search } from 'lucide-react';
import FileUpload from '../components/FileUpload';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import patientRecords from './patientRecords';

// Mock data
const initialPatients = [
  { id: '1', name: 'kamlesh', age: 45, lastVisit: '2023-05-15', condition: 'Hypertension' },
  { id: '2', name: 'rahul', age: 32, lastVisit: '2023-06-02', condition: 'Diabetes Type 2' },
  { id: '3', name: 'rekha', age: 58, lastVisit: '2023-04-28', condition: 'Arthritis' },
  { id: '4', name: 'sanjay', age: 27, lastVisit: '2023-06-10', condition: 'Asthma' },
  { id: '5', name: 'mangal', age: 63, lastVisit: '2023-05-22', condition: 'Coronary Artery Disease' },
];

const appointments = [
  { id: '1', patientName: 'krishna', date: '2023-06-15', time: '09:00 AM', type: 'Follow-up' },
  { id: '2', patientName: 'nitin', date: '2023-06-15', time: '10:30 AM', type: 'Consultation' },
  { id: '3', patientName: 'nikhil', date: '2023-06-16', time: '02:00 PM', type: 'Check-up' },
];


const DoctorDashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [isCreatingPrescription, setIsCreatingPrescription] = useState(false);
  const [isAddingPatient, setIsAddingPatient] = useState(false);
  const [patients, setPatients] = useState(initialPatients);
  const [isViewingRecord, setIsViewingRecord] = useState(false);

  const patientRecord = selectedPatient
  ? patientRecords.find((record:any) => record.patientId === selectedPatient.id)
  : null;
  
  const [newPatient, setNewPatient] = useState({
    name: '',
    age: '',
    lastVisit: '',
    condition: '',
  });
  const [prescription, setPrescription] = useState({
    diagnosis: '',
    medications: [{ name: '', dosage: '', frequency: '', duration: '' }],
    notes: '',
  });

  const filteredPatients = patients.filter(patient => 
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.condition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddMedication = () => {
    setPrescription({
      ...prescription,
      medications: [...prescription.medications, { name: '', dosage: '', frequency: '', duration: '' }]
    });
  };

  const handleRemoveMedication = (index: number) => {
    const updatedMedications = [...prescription.medications];
    updatedMedications.splice(index, 1);
    setPrescription({
      ...prescription,
      medications: updatedMedications
    });
  };

  const handleMedicationChange = (index: number, field: string, value: string) => {
    const updatedMedications = [...prescription.medications];
    updatedMedications[index] = {
      ...updatedMedications[index],
      [field]: value
    };
    setPrescription({
      ...prescription,
      medications: updatedMedications
    });
  };

  const handleFileUpload = (files: File[]) => {
    console.log('Files uploaded:', files);
    // In a real app, you would upload these files to a server
  };

  const handleSubmitPrescription = () => {
    console.log('Prescription submitted:', {
      patient: selectedPatient,
      ...prescription,
      date: new Date().toISOString().split('T')[0]
    });
    // Reset form
    setPrescription({
      diagnosis: '',
      medications: [{ name: '', dosage: '', frequency: '', duration: '' }],
      notes: '',
    });
    setIsCreatingPrescription(false);
    setSelectedPatient(null);
  };

  const handleAddPatient = () => {
    const newPatientData = {
      id: String(patients.length + 1),
      ...newPatient,
      age: parseInt(newPatient.age),
    };
    setPatients([...patients, newPatientData]);
    setIsAddingPatient(false);
    setNewPatient({
      name: '',
      age: '',
      lastVisit: '',
      condition: '',
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Doctor Dashboard</h1>
          <p className="text-gray-600">Welcome back, {currentUser?.name}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            { icon: <Users className="h-6 w-6 text-blue-500" />, title: 'Total Patients', value: patients.length },
            { icon: <Calendar className="h-6 w-6 text-green-500" />, title: 'Today\'s Appointments', value: appointments.filter(a => a.date === '2023-06-15').length },
            { icon: <Clock className="h-6 w-6 text-purple-500" />, title: 'Pending Reports', value: 3 },
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
                <h2 className="text-lg font-medium text-gray-900">Patients</h2>
                <div className="flex items-center">
                  <div className="relative mr-4">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search patients..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                  <button
                    onClick={() => setIsAddingPatient(true)}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Patient
                  </button>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Age
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Visit
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Condition
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredPatients.map((patient) => (
                    <motion.tr 
                      key={patient.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      whileHover={{ backgroundColor: 'rgba(243, 244, 246, 0.5)' }}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{patient.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{patient.age}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{patient.lastVisit}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {patient.condition}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button 
                          onClick={() => {
                            setSelectedPatient(patient);
                            setIsCreatingPrescription(true);
                          }}
                          className="text-blue-600 hover:text-blue-900 mr-3"
                        >
                          Add Prescription
                        </button>
                        <button className="text-indigo-600 hover:text-indigo-900"
                            onClick={() => {
                              setSelectedPatient(patient);
                              setIsViewingRecord(true);
                          }}
                        >
                          View Records
                        </button>
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
              <h2 className="text-lg font-medium text-gray-900">Today's Appointments</h2>
            </div>
            <div className="p-6">
              <ul className="divide-y divide-gray-200">
                {appointments.filter(a => a.date === '2023-06-15').map((appointment) => (
                  <motion.li 
                    key={appointment.id}
                    className="py-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center">
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {appointment.patientName}
                        </p>
                        <p className="text-sm text-gray-500">
                          {appointment.time} - {appointment.type}
                        </p>
                      </div>
                      <div>
                        <button className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
                          Details
                        </button>
                      </div>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        {isCreatingPrescription && selectedPatient && (
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
                <h3 className="text-lg font-medium">New Prescription for {selectedPatient.name}</h3>
                <button 
                  onClick={() => setIsCreatingPrescription(false)}
                  className="text-white hover:text-gray-200"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-6">
                <div className="mb-6">
                  <label htmlFor="diagnosis" className="block text-sm font-medium text-gray-700 mb-1">
                    Diagnosis
                  </label>
                  <textarea
                    id="diagnosis"
                    rows={3}
                    value={prescription.diagnosis}
                    onChange={(e) => setPrescription({ ...prescription, diagnosis: e.target.value })}
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Enter diagnosis details"
                  />
                </div>

                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Medications
                    </label>
                    <button
                      type="button"
                      onClick={handleAddMedication}
                      className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Add Medication
                    </button>
                  </div>
                  
                  {prescription.medications.map((medication, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-md mb-3">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                        <div>
                          <label className="block text-xs font-medium text-gray-500 mb-1">
                            Medication Name
                          </label>
                          <input
                            type="text"
                            value={medication.name}
                            onChange={(e) => handleMedicationChange(index, 'name', e.target.value)}
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            placeholder="e.g., Amoxicillin"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-500 mb-1">
                            Dosage
                          </label>
                          <input
                            type="text"
                            value={medication.dosage}
                            onChange={(e) => handleMedicationChange(index, 'dosage', e.target.value)}
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            placeholder="e.g., 500mg"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                        <div>
                          <label className="block text-xs font-medium text-gray-500 mb-1">
                            Frequency
                          </label>
                          <input
                            type="text"
                            value={medication.frequency}
                            onChange={(e) => handleMedicationChange(index, 'frequency', e.target.value)}
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            placeholder="e.g., Twice daily"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-500 mb-1">
                            Duration
                          </label>
                          <input
                            type="text"
                            value={medication.duration}
                            onChange={(e) => handleMedicationChange(index, 'duration', e.target.value)}
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            placeholder="e.g., 7 days"
                          />
                        </div>
                      </div>
                      {prescription.medications.length > 1 && (
                        <div className="flex justify-end">
                          <button
                            type="button"
                            onClick={() => handleRemoveMedication(index)}
                            className="text-sm text-red-600 hover:text-red-800"
                          >
                            Remove
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mb-6">
                  <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                    Additional Notes
                  </label>
                  <textarea
                    id="notes"
                    rows={3}
                    value={prescription.notes}
                    onChange={(e) => setPrescription({ ...prescription, notes: e.target.value })}
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Any additional instructions or notes"
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Attachments
                  </label>
                  <FileUpload onFileUpload={handleFileUpload} />
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setIsCreatingPrescription(false)}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmitPrescription}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Save Prescription
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {isAddingPatient && (
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
                <h3 className="text-lg font-medium">Add New Patient</h3>
                <button 
                  onClick={() => setIsAddingPatient(false)}
                  className="text-white hover:text-gray-200"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-6">
                <div className="mb-6">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={newPatient.name}
                    onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Enter patient's name"
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
                    Age
                  </label>
                  <input
                    type="number"
                    id="age"
                    value={newPatient.age}
                    onChange={(e) => setNewPatient({ ...newPatient, age: e.target.value })}
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Enter patient's age"
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="lastVisit" className="block text-sm font-medium text-gray-700 mb-1">
                    Last Visit
                  </label>
                  <input
                    type="date"
                    id="lastVisit"
                    value={newPatient.lastVisit}
                    onChange={(e) => setNewPatient({ ...newPatient, lastVisit: e.target.value })}
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="condition" className="block text-sm font-medium text-gray-700 mb-1">
                    Condition
                  </label>
                  <input
                    type="text"
                    id="condition"
                    value={newPatient.condition}
                    onChange={(e) => setNewPatient({ ...newPatient, condition: e.target.value })}
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Enter patient's condition"
                  />
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setIsAddingPatient(false)}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleAddPatient}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Patient
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

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
                          {patientRecord.medicalRecords.map((record:any) => (
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
                          {patientRecord.prescriptions.map((prescription:any) => (
                            <li key={prescription.id} className="py-4">
                              <div>
                                <p className="text-sm font-medium text-gray-900">
                                  Prescribed by {prescription.doctorName} on {prescription.date}
                                </p>
                                <p className="text-sm text-gray-500">
                                  Diagnosis: {prescription.diagnosis}
                                </p>
                                <ul className="list-disc list-inside mt-2">
                                  {prescription.medications.map((medication:any, index:any) => (
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
                          {patientRecord.labReports.map((report:any) => (
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
    </div>
  );
};

export default DoctorDashboard;