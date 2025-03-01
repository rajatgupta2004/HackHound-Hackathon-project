import React, { useState } from 'react';
import { Calendar, ClipboardList, UserCheck, FileText, Plus, Search, Stethoscope, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

const initialPatients = [
  { id: 1, name: 'Sanjay Sharma', age: 45, lastVisit: 'Mar 12', nextAppointment: 'Apr 5', status: 'Follow-up' },
  { id: 2, name: 'Ranveer Gupta', age: 52, lastVisit: 'Mar 19', nextAppointment: 'Apr 10', status: 'New Patient' },
  { id: 3, name: 'Khushi Tyagi', age: 38, lastVisit: 'Mar 25', nextAppointment: 'Apr 15', status: 'Recurring' },
];

const documents = [
  { id: 1, title: 'Patient Report - Sanjay Sharma', date: 'Mar 12', type: 'PDF', category: 'Medical History' },
  { id: 2, title: 'Patient Report - Ranveer Gupta', date: 'Mar 19', type: 'PDF', category: 'Lab Results' },
  { id: 3, title: 'Patient Report - Khushi Tyagi', date: 'Mar 25', type: 'PDF', category: 'Prescription' },
];

const stats = [
  { title: 'Total Patients', value: '1,234', icon: UserCheck, color: 'bg-blue-100', textColor: 'text-blue-600' },
  { title: 'Upcoming Appointments', value: '27', icon: Calendar, color: 'bg-purple-100', textColor: 'text-purple-600' },
  { title: 'Pending Documents', value: '12', icon: FileText, color: 'bg-orange-100', textColor: 'text-orange-600' },
  { title: 'Active Cases', value: '48', icon: Activity, color: 'bg-green-100', textColor: 'text-green-600' },
];

const initialAppointments = [
  { date: 'Apr 5', time: '10:00 AM', patient: 'Sanjay Sharma', type: 'General Checkup', status: 'Confirmed' },
  { date: 'Apr 10', time: '2:30 PM', patient: 'Ranveer Gupta', type: 'Cardiology Review', status: 'Pending' },
  { date: 'Apr 15', time: '11:15 AM', patient: 'Khushi Tyagi', type: 'Blood Work', status: 'Confirmed' },
];

export function ProviderPortal() {
  const [appointments, setAppointments] = useState(initialAppointments);
  const [patients, setPatients] = useState(initialPatients);
  const [showForm, setShowForm] = useState(false);
  const [showPatientForm, setShowPatientForm] = useState(false);
  const [newAppointment, setNewAppointment] = useState({ date: '', time: '', patient: '', type: '', status: 'Pending' });
  const [newPatient, setNewPatient] = useState({ name: '', age: '', lastVisit: '', nextAppointment: '', status: 'New Patient' });

  const handleAddAppointment = () => {
    setAppointments([...appointments, newAppointment]);

    const patientExists = patients.some(patient => patient.name === newAppointment.patient);
    if (!patientExists) {
      setPatients([...patients, { id: patients.length + 1, name: newAppointment.patient, age: 0, lastVisit: '', nextAppointment: newAppointment.date, status: 'New Patient' }]);
    }

    setShowForm(false);
    setNewAppointment({ date: '', time: '', patient: '', type: '', status: 'Pending' });
  };

  const handleAddPatient = () => {
    setPatients([...patients, { ...newPatient, id: patients.length + 1 }]);
    setShowPatientForm(false);
    setNewPatient({ name: '', age: '', lastVisit: '', nextAppointment: '', status: 'New Patient' });
  };

  return (
    <div className="p-8 bg-gradient-to-br from-blue-200 to-purple-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Provider Portal
          </h1>
          <button
            onClick={() => setShowPatientForm(true)}
            className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-5 w-5 mr-2" />
            New Patient
          </button>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-sm p-4 border border-gray-100"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-semibold mt-1">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-xl ${stat.color}`}>
                    <Icon className={`h-6 w-6 ${stat.textColor}`} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Patients Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                <UserCheck className="h-6 w-6 mr-2 text-blue-600" />
                Patient List
              </h2>
              <div className="relative">
                <Search className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search patients..."
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="space-y-3">
              {patients.map((patient) => (
                <motion.div
                  key={patient.id}
                  whileHover={{ y: -2 }}
                  className="p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-800">{patient.name}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-sm text-gray-600">Age: {patient.age}</span>
                        <span className="text-xs px-2 py-1 bg-blue-100 text-blue-600 rounded-full">
                          {patient.status}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Last Visit: {patient.lastVisit}</p>
                      <p className="text-sm text-blue-600 font-medium">{patient.nextAppointment}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Documents Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                <ClipboardList className="h-6 w-6 mr-2 text-purple-600" />
                Documents
              </h2>
              <button className="flex items-center bg-purple-600 text-white px-4 py-2 rounded-xl hover:bg-purple-700 transition-colors">
                <Plus className="h-5 w-5 mr-2" />
                Upload
              </button>
            </div>
            <div className="space-y-3">
              {documents.map((document) => (
                <motion.div
                  key={document.id}
                  whileHover={{ y: -2 }}
                  className="p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-800">{document.title}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-sm text-gray-600">{document.date}</span>
                        <span className="text-xs px-2 py-1 bg-purple-100 text-purple-600 rounded-full">
                          {document.category}
                        </span>
                      </div>
                    </div>
                    <span className="text-sm text-gray-600">{document.type}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Appointments Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 bg-white rounded-2xl shadow-xl p-6 border border-gray-100"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
              <Calendar className="h-6 w-6 mr-2 text-green-600" />
              Upcoming Appointments
            </h2>
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700 transition-colors"
            >
              <Plus className="h-5 w-5 mr-2" />
              Schedule
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {appointments.map((appointment, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -2 }}
                className="p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-semibold text-gray-800">{appointment.patient}</p>
                    <p className="text-sm text-gray-600">{appointment.type}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    appointment.status === 'Confirmed' 
                      ? 'bg-green-100 text-green-600' 
                      : 'bg-yellow-100 text-yellow-600'
                  }`}>
                    {appointment.status}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-blue-600 font-medium">{appointment.date}</p>
                  <p className="text-sm text-gray-600">{appointment.time}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {showForm && (
            <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Add New Appointment</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Date"
                  value={newAppointment.date}
                  onChange={(e) => setNewAppointment({ ...newAppointment, date: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
                <input
                  type="text"
                  placeholder="Time"
                  value={newAppointment.time}
                  onChange={(e) => setNewAppointment({ ...newAppointment, time: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
                <input
                  type="text"
                  placeholder="Patient"
                  value={newAppointment.patient}
                  onChange={(e) => setNewAppointment({ ...newAppointment, patient: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
                <input
                  type="text"
                  placeholder="Type"
                  value={newAppointment.type}
                  onChange={(e) => setNewAppointment({ ...newAppointment, type: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
                <select
                  value={newAppointment.status}
                  onChange={(e) => setNewAppointment({ ...newAppointment, status: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                >
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                </select>
                <button
                  onClick={handleAddAppointment}
                  className="w-full py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-all"
                >
                  Add Appointment
                </button>
              </div>
            </div>
          )}

          {showPatientForm && (
            <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Add New Patient</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Name"
                  value={newPatient.name}
                  onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
                <input
                  type="text"
                  placeholder="Age"
                  value={newPatient.age}
                  onChange={(e) => setNewPatient({ ...newPatient, age: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
                <input
                  type="text"
                  placeholder="Last Visit"
                  value={newPatient.lastVisit}
                  onChange={(e) => setNewPatient({ ...newPatient, lastVisit: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
                <input
                  type="text"
                  placeholder="Next Appointment"
                  value={newPatient.nextAppointment}
                  onChange={(e) => setNewPatient({ ...newPatient, nextAppointment: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
                <select
                  value={newPatient.status}
                  onChange={(e) => setNewPatient({ ...newPatient, status: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                >
                  <option value="New Patient">New Patient</option>
                  <option value="Follow-up">Follow-up</option>
                  <option value="Recurring">Recurring</option>
                </select>
                <button
                  onClick={handleAddPatient}
                  className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all"
                >
                  Add Patient
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}