import React, { useState } from 'react';
import { Camera, Mic, Phone, MessageSquare, User, Video, Clipboard, Plus } from 'lucide-react';
import { motion } from 'framer-motion';

export function VirtualClinic() {
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [notes, setNotes] = useState([
    { id: 1, text: 'Patient reports persistent headache', time: '10:02 AM' },
    { id: 2, text: 'Blood pressure: 120/80 mmHg', time: '10:05 AM' },
    { id: 3, text: 'Recommended: Further neurological examination', time: '10:08 AM' },
  ]);
  const [newNote, setNewNote] = useState('');

  const addNote = () => {
    if (newNote.trim()) {
      setNotes([...notes, {
        id: notes.length + 1,
        text: newNote,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
      setNewNote('');
    }
  };

  return (
    <div className="p-8 bg-gradient-to-br from-blue-200 to-purple-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 ">
          {/* Video Call Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <div className="aspect-video bg-gray-200 rounded-xl mb-6 relative overflow-hidden">
                <img 
                  src="https://img.freepik.com/free-photo/pleased-young-female-doctor-wearing-medical-robe-stethoscope-around-neck-standing-with-closed-posture_409827-254.jpg?t=st=1739556461~exp=1739560061~hmac=7bc8f133be2c0e2c2d5930dbb48f2e896d94cca901eda874f36bc3dcdd0df267&w=740" 
                  alt="Doctor meeting"
                  className="w-full h-full object-cover"
                />
                
                {/* Call Header Overlay */}
                <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
                  <div className="bg-black/40 text-white px-3 py-1 rounded-full text-sm">
                    10:24 AM | Stable Connection
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="bg-black/40 text-white p-2 rounded-full">
                      <User className="h-4 w-4" />
                    </div>
                    <div className="bg-black/40 text-white p-2 rounded-full">
                      <Video className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Call Controls */}
              <div className="flex justify-center space-x-4">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setIsCameraOn(!isCameraOn)}
                  className={`p-4 rounded-full ${isCameraOn ? 'bg-blue-600' : 'bg-gray-600'} text-white transition-colors`}
                >
                  <Camera className="h-6 w-6" />
                </motion.button>
                
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setIsMicOn(!isMicOn)}
                  className={`p-4 rounded-full ${isMicOn ? 'bg-blue-600' : 'bg-gray-600'} text-white transition-colors`}
                >
                  <Mic className="h-6 w-6" />
                </motion.button>
                
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  className="p-4 rounded-full bg-red-600 text-white hover:bg-red-700 transition-colors"
                >
                  <Phone className="h-6 w-6" />
                </motion.button>
              </div>

              {/* Participants List */}
              <div className="mt-6 grid grid-cols-3 gap-4">
                {[1, 2, 3].map((participant) => (
                  <div key={participant} className="aspect-square bg-gray-200 rounded-xl flex items-center border border-black/20 justify-center">
                    <User className="h-8 w-8 text-gray-500" />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* AI Notes Section */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-2xl shadow-xl p-6 h-full border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Session Notes</h2>
                <Clipboard className="h-6 w-6 text-blue-600" />
              </div>

              {/* Notes Tabs */}
              <div className="flex mb-4 space-x-2">
                {['Notes', 'Prescription', 'Transcript'].map((tab) => (
                  <button 
                    key={tab}
                    className="px-3 py-1 text-sm rounded-full bg-blue-50 text-blue-600"
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Notes List */}
              <div className="space-y-3 h-96 overflow-y-auto pr-2">
                {notes.map((note) => (
                  <motion.div
                    key={note.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-3 bg-blue-50 rounded-lg border border-blue-100"
                  >
                    <p className="text-sm text-gray-800">{note.text}</p>
                    <p className="text-xs text-gray-500 mt-1">{note.time}</p>
                  </motion.div>
                ))}
              </div>

              {/* Add Note Input */}
              <div className="mt-4 flex space-x-2">
                <input
                  type="text"
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Add quick note..."
                  className="w-full p-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={addNote}
                  className="p-2 bg-blue-600 text-white rounded-lg"
                >
                  <Plus className="h-5 w-5" />
                </motion.button>
              </div>

              {/* Prescription Panel */}
              <div className="mt-6 p-4 bg-green-50 rounded-xl border border-green-100">
                <h3 className="text-sm font-semibold text-green-800 mb-2">Suggested Prescription</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Paracetamol 500mg</span>
                    <span className="text-gray-600">2x daily</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Ibuprofen 400mg</span>
                    <span className="text-gray-600">1x daily</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Floating Action Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="fixed bottom-8 right-8 p-4 bg-blue-600 text-white rounded-full shadow-xl"
        >
          <Plus className="h-6 w-6" />
        </motion.button>
      </div>
    </div>
  );
}