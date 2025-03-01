export interface User {
    id: string;
    name: string;
    email: string;
    role: 'doctor' | 'patient';
    specialty?: string;
    medicalHistory?: string;
  }
  
  export interface Prescription {
    id: string;
    doctorId: string;
    patientId: string;
    date: string;
    diagnosis: string;
    medications: Medication[];
    notes: string;
    attachments: Attachment[];
  }
  
  export interface Medication {
    name: string;
    dosage: string;
    frequency: string;
    duration: string;
  }
  
  export interface Attachment {
    id: string;
    name: string;
    type: string;
    url: string;
    uploadedBy: string;
    uploadDate: string;
  }
  
  export interface MedicalRecord {
    id: string;
    patientId: string;
    type: string;
    date: string;
    description: string;
    attachments: Attachment[];
  }