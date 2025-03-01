import React, { useState } from 'react';
import { CheckCircle, Calendar, Shield, Info, Plus, Filter, Award, Bell, LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

type TaskStatus = 'completed' | 'scheduled' | 'pending';

type StatusStyles = {
  [key in TaskStatus]: {
    bg: string;
    text: string;
    icon: LucideIcon;
  };
};

const preventiveCareTasks = [
  { id: 1, name: 'Vaccination', date: 'Mar 20', status: 'completed', doctor: 'Dr. Rajeev Gupta' },
  { id: 2, name: 'Annual Physical Exam', date: 'Apr 10', status: 'scheduled', doctor: 'Dr. Sanjeev Sharma' },
  { id: 3, name: 'Blood Pressure Check', date: 'Mar 15', status: 'completed', doctor: 'Dr. Pramod Chaudhary' },
  { id: 4, name: 'Cholesterol Screening', date: 'May 5', status: 'pending', doctor: 'Dr. Pankaj Tyagi' },
];

const tips = [
  { title: 'Stay Hydrated', description: 'Drink at least 8 glasses of water daily', icon: Info, color: 'bg-blue-100' },
  { title: 'Exercise Regularly', description: '30 mins daily activity for better health', icon: Shield, color: 'bg-purple-100' },
  { title: 'Healthy Diet', description: 'Balance your meals with fresh produce', icon: Calendar, color: 'bg-orange-100' },
  { title: 'Regular Checkups', description: 'Annual health screenings are crucial', icon: CheckCircle, color: 'bg-pink-100' },
];

export function PreventiveCare() {
  const [selectedFilter, setSelectedFilter] = useState<TaskStatus | 'all'>('all');
  const [showNotification, setShowNotification] = useState(true);
  const [tasks, setTasks] = useState(preventiveCareTasks);
  const [showForm, setShowForm] = useState(false);
  const [newTask, setNewTask] = useState({ name: '', date: '', status: 'scheduled', doctor: '' });

  const filteredTasks = tasks.filter(task =>
    selectedFilter === 'all' ? true : task.status === selectedFilter
  );

  const statusStyles: StatusStyles = {
    completed: { bg: 'bg-green-100', text: 'text-green-800', icon: CheckCircle },
    scheduled: { bg: 'bg-blue-100', text: 'text-blue-800', icon: Calendar },
    pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: Bell }
  };

  const handleAddTask = () => {
    setTasks([...tasks, { ...newTask, id: tasks.length + 1 }]);
    setShowForm(false);
    setNewTask({ name: '', date: '', status: 'scheduled', doctor: '' });
  };

  return (
    <div className="p-8 bg-gradient-to-br from-blue-200 to-purple-50 min-h-screen">
      <div className="max-w-7xl mx-auto ">
        <div className="flex items-center justify-between mb-8">
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
          >
            Preventive Care Hub
          </motion.h1>

          {showNotification && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center bg-white p-3 rounded-lg shadow-sm border border-blue-100"
            >
              <Award className="h-5 w-5 text-blue-600 mr-2" />
              <span className="text-sm text-gray-600">2 achievements unlocked!</span>
              <button
                onClick={() => setShowNotification(false)}
                className="ml-4 text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </motion.div>
          )}
        </div>

        {/* Progress Overview */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Your Health Progress</h2>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">70% Completed</span>
              <div className="w-24 h-2 bg-gray-200 rounded-full">
                <div
                  className="h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500"
                  style={{ width: '70%' }}
                />
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Tasks Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Care Schedule</h2>
              <div className="flex space-x-2">
                <button
                  onClick={() => setSelectedFilter('all')}
                  className={`px-3 py-1 rounded-full ${
                    selectedFilter === 'all'
                      ? 'bg-blue-100 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setSelectedFilter('completed')}
                  className={`px-3 py-1 rounded-full ${
                    selectedFilter === 'completed'
                      ? 'bg-green-100 text-green-600'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Completed
                </button>
                <button
                  onClick={() => setSelectedFilter('scheduled')}
                  className={`px-3 py-1 rounded-full ${
                    selectedFilter === 'scheduled'
                      ? 'bg-blue-100 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Scheduled
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {filteredTasks.map((task, idx) => {
                const StatusIcon = statusStyles[task.status].icon;
                return (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`p-2 rounded-lg ${statusStyles[task.status].bg}`}>
                          <StatusIcon className={`h-6 w-6 ${statusStyles[task.status].text}`} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-800">{task.name}</h3>
                          <p className="text-sm text-gray-600">{task.doctor}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-700">{task.date}</p>
                        <span className={`text-xs px-2 py-1 rounded-full ${statusStyles[task.status].bg} ${statusStyles[task.status].text}`}>
                          {task.status}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <button
              onClick={() => setShowForm(true)}
              className="w-full mt-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium flex items-center justify-center space-x-2 transition-all"
            >
              <Plus className="h-5 w-5" />
              <span>New Reminder</span>
            </button>

            {showForm && (
              <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Add New Reminder</h3>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Task Name"
                    value={newTask.name}
                    onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="Date"
                    value={newTask.date}
                    onChange={(e) => setNewTask({ ...newTask, date: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="Doctor"
                    value={newTask.doctor}
                    onChange={(e) => setNewTask({ ...newTask, doctor: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                  <select
                    value={newTask.status}
                    onChange={(e) => setNewTask({ ...newTask, status: e.target.value as TaskStatus })}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  >
                    <option value="scheduled">Scheduled</option>
                    <option value="completed">Completed</option>
                    <option value="pending">Pending</option>
                  </select>
                  <button
                    onClick={handleAddTask}
                    className="w-full py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-all"
                  >
                    Add Reminder
                  </button>
                </div>
              </div>
            )}
          </motion.div>

          {/* Health Tips Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Wellness Tips</h2>
              <Filter className="h-6 w-6 text-purple-600" />
            </div>

            <div className="grid grid-cols-1 gap-4">
              {tips.map((tip, idx) => {
                const Icon = tip.icon;
                return (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -2 }}
                    className="p-4 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 hover:shadow-md transition-all"
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-xl ${tip.color}`}>
                        <Icon className="h-6 w-6 text-gray-800" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">{tip.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{tip.description}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="mt-6 p-4 bg-orange-50 rounded-xl border border-orange-100">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Info className="h-5 w-5 text-orange-600" />
                </div>
                <p className="text-sm text-gray-600">
                  Remember: Early prevention can reduce health risks by up to 40%
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}