import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, Heart, Thermometer, Weight, Droplet, AlarmClockCheck, Pill, Bed, Moon } from 'lucide-react';
import { motion } from 'framer-motion';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const data = [
  { name: 'Mon', heartRate: 72, bloodPressure: 120, temperature: 36.6, steps: 8450 },
  { name: 'Tue', heartRate: 75, bloodPressure: 122, temperature: 36.7, steps: 9230 },
  { name: 'Wed', heartRate: 70, bloodPressure: 118, temperature: 36.5, steps: 7450 },
  { name: 'Thu', heartRate: 73, bloodPressure: 121, temperature: 36.6, steps: 10200 },
  { name: 'Fri', heartRate: 71, bloodPressure: 119, temperature: 36.8, steps: 8800 },
  { name: 'Sat', heartRate: 69, bloodPressure: 117, temperature: 36.7, steps: 6500 },
  { name: 'Sun', heartRate: 74, bloodPressure: 123, temperature: 36.6, steps: 7200 },
];

const stats = [
  { name: 'Heart Rate', value: '72 bpm', icon: Heart, color: 'text-red-500', trend: 2.1 },
  { name: 'Blood Pressure', value: '120/80', icon: Activity, color: 'text-blue-500', trend: -0.5 },
  { name: 'Temperature', value: '36.6°C', icon: Thermometer, color: 'text-orange-500', trend: 0.2 },
  { name: 'Weight', value: '70 kg', icon: Weight, color: 'text-purple-500', trend: -1.2 },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

export function HealthDashboard() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hydration, setHydration] = useState(65);
  const [bmi, setBMI] = useState({ weight: 70, height: 175 });
  const [medications, setMedications] = useState([
    { time: '08:00 AM', med: 'Metformin', dosage: '500mg' },
    { time: '12:00 PM', med: 'Vitamin D', dosage: '2000IU' },
    { time: '07:00 PM', med: 'Omega-3', dosage: '1g' },
  ]);
  const [newMedication, setNewMedication] = useState({ time: '', med: '', dosage: '' });

  const calculateBMI = () => (bmi.weight / ((bmi.height / 100) ** 2)).toFixed(1);

  const handleAddMedication = () => {
    setMedications([...medications, newMedication]);
    setNewMedication({ time: '', med: '', dosage: '' });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-8 bg-gradient-to-br from-blue-200 to-purple-50 min-h-screen"
    >
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Health Dashboard</h1>
      
      {/* Stats Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.name}
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-all duration-300 border border-gray-100"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.name}</p>
                <p className="text-2xl font-bold mt-1 text-gray-800">{stat.value}</p>
                <span className={`text-sm ${stat.trend > 0 ? 'text-red-500' : 'text-green-500'}`}>
                  {stat.trend > 0 ? '↑' : '↓'} {Math.abs(stat.trend)}%
                </span>
              </div>
              <stat.icon className={`h-12 w-12 ${stat.color} opacity-80 p-2 rounded-full bg-gray-100`} />
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Health Metrics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Hydration Card */}
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          className="bg-gradient-to-br from-blue-500 to-blue-400 rounded-2xl shadow-xl p-6 text-white relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mt-16 -mr-16" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full -mb-16 -ml-16" />
          
          <div className="flex items-center justify-between mb-4 relative z-10">
            <h2 className="text-xl font-semibold">Hydration</h2>
            <Droplet className="h-8 w-8" />
          </div>
          <div className="flex items-center justify-center h-40 relative z-10">
            <div className="w-32 h-32">
              <CircularProgressbar
                value={hydration}
                text={`${hydration}%`}
                styles={buildStyles({
                  pathColor: 'white',
                  textColor: 'white',
                  trailColor: 'rgba(255,255,255,0.2)',
                  pathTransitionDuration: 0.5,
                })}
              />
            </div>
          </div>
          <button
            onClick={() => setHydration(Math.min(100, hydration + 10))}
            className="mt-4 w-full bg-white/20 hover:bg-white/30 transition-colors rounded-xl py-3 font-medium relative z-10"
          >
            Add 250ml Water
          </button>
        </motion.div>

        {/* BMI Calculator */}
        <motion.div
          initial={{ x: -50 }}
          animate={{ x: 0 }}
          className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-4">BMI Calculator</h2>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-600 block mb-2">Height (cm)</label>
              <input
                type="number"
                value={bmi.height}
                onChange={(e) => setBMI({ ...bmi, height: +e.target.value })}
                className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600 block mb-2">Weight (kg)</label>
              <input
                type="number"
                value={bmi.weight}
                onChange={(e) => setBMI({ ...bmi, weight: +e.target.value })}
                className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              />
            </div>
            <div className="text-center py-4">
              <span className="text-3xl font-bold text-blue-600 bg-blue-50 px-6 py-3 rounded-xl">
                BMI: {calculateBMI()}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Medication Schedule */}
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Medication Schedule</h2>
            <Pill className="h-8 w-8 text-purple-500 bg-purple-100 p-1.5 rounded-lg" />
          </div>
          <div className="space-y-3">
            {medications.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all cursor-pointer border border-gray-200"
              >
                <div>
                  <p className="font-semibold text-gray-800">{item.med}</p>
                  <p className="text-sm text-gray-600">{item.dosage}</p>
                </div>
                <span className="text-blue-500 font-medium">{item.time}</span>
              </motion.div>
            ))}
          </div>
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Add New Medication</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Time"
                value={newMedication.time}
                onChange={(e) => setNewMedication({ ...newMedication, time: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
              <input
                type="text"
                placeholder="Medication"
                value={newMedication.med}
                onChange={(e) => setNewMedication({ ...newMedication, med: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
              <input
                type="text"
                placeholder="Dosage"
                value={newMedication.dosage}
                onChange={(e) => setNewMedication({ ...newMedication, dosage: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
              <button
                onClick={handleAddMedication}
                className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-all"
              >
                Add Medication
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Chart Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100"
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Weekly Health Trends</h2>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="name" 
                tick={{ fill: '#666' }}
                axisLine={{ stroke: '#ddd' }}
              />
              <YAxis 
                tick={{ fill: '#666' }}
                axisLine={{ stroke: '#ddd' }}
              />
              <Tooltip 
                contentStyle={{
                  background: '#fff',
                  border: 'none',
                  borderRadius: '12px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  padding: '1rem',
                }}
                itemStyle={{ color: '#666', fontSize: '14px' }}
              />
              <Area 
                type="monotone" 
                dataKey="heartRate" 
                stroke="#D62828" 
                fill="#D62828" 
                fillOpacity={0.1}
                strokeWidth={2}
                name="Heart Rate (bpm)"
              />
              <Area 
                type="monotone" 
                dataKey="steps" 
                stroke="#10B981" 
                fill="#10B981" 
                fillOpacity={0.1}
                strokeWidth={2}
                name="Daily Steps"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Additional Improvements */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Sleep Quality Card */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-green-50 p-6 rounded-2xl flex items-center space-x-4 border border-green-100"
        >
          <Bed className="h-12 w-12 text-green-600 p-2 bg-green-100 rounded-xl" />
          <div>
            <h3 className="font-semibold text-green-800 text-lg">Sleep Quality</h3>
            <p className="text-2xl font-bold text-green-900">
              7.2h <span className="text-sm text-green-600">avg/night</span>
            </p>
          </div>
        </motion.div>

        {/* Activity Card */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-purple-50 p-6 rounded-2xl flex items-center space-x-4 border border-purple-100"
        >
          <Activity className="h-12 w-12 text-purple-600 p-2 bg-purple-100 rounded-xl" />
          <div>
            <h3 className="font-semibold text-purple-800 text-lg">Daily Activity</h3>
            <p className="text-2xl font-bold text-purple-900">
              8,430 <span className="text-sm text-purple-600">steps/day</span>
            </p>
          </div>
        </motion.div>

        {/* Streak Card */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-orange-50 p-6 rounded-2xl flex items-center space-x-4 border border-orange-100"
        >
          <Moon className="h-12 w-12 text-orange-600 p-2 bg-orange-100 rounded-xl" />
          <div>
            <h3 className="font-semibold text-orange-800 text-lg">Health Streak</h3>
            <p className="text-2xl font-bold text-orange-900">
              23 <span className="text-sm text-orange-600">days</span>
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}